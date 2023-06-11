const jwt = require('jsonwebtoken');
const getTokenSecretService = require('./get-token-secret.service');

exports.verifyToken = async function (token) {

    let tokenVerified = true;
    const privateKey = await getTokenSecretService.getTokenSecretService();

    jwt.verify(token, privateKey.Parameter.Value, {
        issuer: 'escoladesoftware'
    }, function (error, decoded) {
        if (error)
            return !tokenVerified;
        return tokenVerified;
    });

    return token;
}

