
/**
 * Service to generate JWT
 * @author :: Tej Mhatre
 */
import jwt from "jsonwebtoken";
import TokenGenerator from "./TokenGenerator";


export const sign = function (payload) {
        const tokenGenerator = new TokenGenerator('a', 'a', { algorithm: 'HS256', keyid: '1', noTimestamp: false, expiresIn: '1440m', notBefore: '2s' })
        return tokenGenerator.sign({ data: payload }, { audience: payload, issuer: payload, jwtid: '1', subject: 'user' })
    }

export const verify = function (token, callback) {
        jwt.verify(token, 'Test', callback);
    }

export const refreshToken = function (token, payload) {
        const tokenGenerator = new TokenGenerator('a', 'a', { algorithm: 'HS256', keyid: '1', noTimestamp: false, expiresIn: '1440m' })
        return tokenGenerator.refresh(token, { verify: { audience: payload, issuer: payload }, jwtid: '2' })
    }


