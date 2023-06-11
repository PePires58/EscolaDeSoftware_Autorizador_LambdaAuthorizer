const validateTokenInputObjectService = require('./services/token/validate-token-input-object.service');
const policyGeneratorService = require('./services/policy/generate-policy.service');
const getTokenItemDynamoDbService = require('./services/token/get-token-item-dynamodb.service');
const verifyTokenService = require('./services/token/verify-token.service');

exports.lambdaHandler = async (event, context, callback) => {
    const errors = validateTokenInputObjectService.validateTokenInputService(event);
    if (errors.length > 0)
        callback(null, policyGeneratorService.generatePolicy('user', 'Deny', event.methodArn));
    else {
        try {
            const dbItem = await getTokenItemDynamoDbService.getTokenFromDataBase(event.authorizationToken);
            if (!dbItem.Item) {
                callback(null, policyGeneratorService.generatePolicy('user', 'Deny', event.methodArn));
            }
            else (verifyTokenService.verifyToken(event.authorizationToken)) {
                callback(null, policyGeneratorService.generatePolicy('user', 'Allow', event.methodArn));
            }
        }
        catch (error) {
            console.log(error);
            callback(null, policyGeneratorService.generatePolicy('user', 'Deny', event.methodArn));
        }
    }
}
