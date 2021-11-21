const jwt = require('express-jwt');
const secret = process.env.SECRET;
function getTokenFromHeader(req){
    const {headers: {authorization}} = req;

    if(authorization && authorization.split(' ')[0] === 'Token'){
        return authorization.split(' ')[1];
    }

    return null;
}

const auth = {
    required: jwt({
        secret: secret,
        userProperty: 'payload',
        algorithms: ['sha1', 'RS256', 'HS256'],
        getToken: getTokenFromHeader
    }),
    optional: jwt({
        secret: secret,
        userProperty: 'payload',
        algorithms: ['sha1', 'RS256', 'HS256'],
        getToken: getTokenFromHeader,
        credentialsRequired: false,
    })
};

module.exports = auth;