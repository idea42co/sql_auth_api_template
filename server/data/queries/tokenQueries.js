import moment from 'moment';
import { Op } from 'sequelize'

import { token as Token } from '../models';
import config from '../../config'

const getUserTokens = async (userId) => {
    let tokens = await Token.findAll({
        where: {
            userId
        }
    });

    return tokens
}

const findByToken = async (tokenToCheck) => {
    let token = await Token.findOne({
        where: {
            token: tokenToCheck,
            expiresOn: { [Op.gte]: new Date() }
        }
    });

    return token;
}

const deleteUserTokens = async (userId) => {
    await Token.destroy({
        where: {
            userId
        }
    });
}

const deleteOldUserTokens = async (userId, limit) => {
    await Token.destroy({
        where: {
            userId
        },
        orderBy: [['issuedOn', 'ASC']],
        limit
    });
}

const addUserToken = async (userId, token) => {
    let issueDate = new moment();
    let expirationDate = new moment().add(config.jwt.expiresInSeconds, "seconds");

    await Token.create({
        userId,
        token,
        issuedOn: issueDate,
        expiresOn: expirationDate
    })
}

export { deleteUserTokens, addUserToken, getUserTokens, deleteOldUserTokens, findByToken };