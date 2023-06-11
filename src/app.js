const validateTokenInputObjectService = require('./services/token/validate-token-input-object.service');
const policyGeneratorService = require('./services/policy/generate-policy.service');
const getTokenItemDynamoDbService = require('./services/token/get-token-item-dynamodb.service');
const verifyTokenService = require('./services/token/verify-token.service');

exports.lambdaHandler = async (event, context, callback) => {
    const errors = validateTokenInputObjectService.validateTokenInputService(event);
    if (errors.length > 0)
        return policyGeneratorService.generatePolicy('user', 'Deny', event.methodArn);
    try {
        const dbItem = await getTokenItemDynamoDbService.getTokenFromDataBase(event.authorizationToken);
        if (!dbItem.Item)
            return policyGeneratorService.generatePolicy('user', 'Deny', event.methodArn);

        console.log('verificando token');
        if (verifyTokenService.verifyToken(event.authorizationToken))
            return policyGeneratorService.generatePolicy('user', 'Allow', event.methodArn);

        return policyGeneratorService.generatePolicy('user', 'Deny', event.methodArn);
    }
    catch (error) {
        console.log(error);
        return policyGeneratorService.generatePolicy('user', 'Deny', event.methodArn);
    }

}
