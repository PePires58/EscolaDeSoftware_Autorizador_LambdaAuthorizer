const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.getTokenFromDataBase = async function (token) {
    const params = {
        TableName: process.env.TokenTableName,
        ConsistentRead: false,
        Key: {
            "jwt_token": {
                S: token
            }
        }
    };

    return await dynamodb.getItem(params)
        .promise()
        .then((data) => {
            return data;
        });
}