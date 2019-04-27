import passport from 'passport';
import moment from 'moment';
import { Strategy as BearerStrategy } from 'passport-http-bearer';
import { Strategy as AnonymousStrategy } from 'passport-anonymous';
import jwt from 'jsonwebtoken';
import { token as Token } from '../data/models';

import config from '../config'
import authTypes from '../constants/authTypes'

const verifyServerToken = new BearerStrategy((token, callback) => {
    try {
        token = Buffer.from(token, 'base64').toString();
        const decodedToken = jwt.verify(token, config.jwt.issuers.server.publicKey);
        return callback(null, decodedToken);
    }
    catch (error) {
        console.log(`Invalid token: ${error.message}`);
        return callback(null, false, error.message)
    }
});

const verifyClientToken = new BearerStrategy((token, callback) => {
    try {
        token = Buffer.from(token, 'base64').toString();
        const decodedToken = jwt.verify(token, config.jwt.issuers.client.publicKey);
        return callback(null, decodedToken);
    }
    catch (error) {
        console.log(`Invalid token: ${error.message}`);
        return callback(null, false, error.message)
    }
});

const preparePassport = (() => {
    passport.use(authTypes.CLIENT_TOKEN, verifyClientToken);
    passport.use(authTypes.SERVER_TOKEN, verifyServerToken);
    passport.use(authTypes.ANONYMOUS, new AnonymousStrategy());
})();

const createToken = async (userId, payload) => {
    const jwtToken = jwt.sign(payload, config.jwt.issuers.server.publicKey, {
        audience: config.environmentName,
        issuer: 'server',
        expiresIn: config.jwt.expiresInSeconds
    });

    let token = Buffer.from(jwtToken).toString('base64');

    // Do we need to do anything with tokens in the DB? 

    let issueDate = new moment();
    let expirationDate = new moment().add(config.jwt.expiresInSeconds, "seconds");

    switch (config.jwt.management.toLowerCase()) {
        case "oneperuser":
            await Token.destroy({
                where: {
                    userId
                }
            });
            await Token.create({
                userId,
                token,
                issuedOn: issueDate,
                expiresOn: expirationDate
            })
            break;
        case "multipleperuser":
            let issuedTokens = await Token.findAll({
                where: {
                    userId
                }
            });

            if (config.jwt.maxPerUser > 1 && issuedTokens.length >= config.jwt.maxPerUser) {
                await Token.destroy({
                    where: {
                        userId
                    },
                    orderBy: [['issuedOn', 'ASC']],
                    limit: (issuedTokens.length + 1) - config.jwt.maxPerUser
                })
            }

            await Token.create({
                userId,
                token,
                issuedOn: issueDate,
                expiresOn: expirationDate
            })
            break;
    }

    return token;
}

export { passport as authUtils, createToken }