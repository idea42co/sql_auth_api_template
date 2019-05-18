import crypto from 'crypto';
import Joi from 'joi';

import authTypes from '../../../constants/authTypes';
import regularHandler from '../../../utils/requestHandler';
import { getUser } from '../../../data/queries/userQueries';
import { createToken } from '../../../utils/authUtils';


/**
 * @swagger
 * /api/v1/login:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Used to log in
 *     produces:
 *       - application/json
 *     parameters: 
 *       - $ref: '#/parameters/ClientBearerToken'
 *       - in: body
 *         name: data
 *         required: true
 *         schema: 
 *            type: string
 *            example: { 
 *              "userName": "swagger", 
 *              "password": "swagger"
 *            }
 *     responses:
 *       200:
 *         description: Bearer token information
 */
const extract = request => {
    let validationResults = Joi.validate(request.body, bodySchema);
    let userAgent = request.headers['user-agent'];
    let ipAddress = request.connection.remoteAddress;

    if (validationResults.error) {
        throw new Error(validationResults.error);
    }

    let { userName, password } = request.body;

    const hash = crypto.createHash('sha256');
    hash.update(password);
    password = hash.digest('hex')

    return { userName, password, userAgent, ipAddress };
}

const bodySchema = {
    userName: Joi.string().required(),
    password: Joi.string().required()
}

const execute = async (request, params) => {
    let { userName, password, userAgent, ipAddress } = params;

    var user = await getUser(userName, password);

    if (!user) {
        throw new Error('Invalid user information');
    }

    var bearerToken = await createToken(user.id, { userId: user.id, userName: user.userName }, userAgent, ipAddress);

    return prepareResults(bearerToken, userName);
}

const prepareResults = (bearerToken, userName) => {
    return {
        userName,
        bearerToken
    }
}

export default {
    handler: regularHandler(extract, execute),
    authScheme: authTypes.CLIENT_TOKEN
};