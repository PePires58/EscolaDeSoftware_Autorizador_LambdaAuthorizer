const assert = require('assert').strict;
const validateTokenInputObjectService = require('../services/token/validate-token-input-object.service');

describe('Validate token input object service tests', function () {
    it('Should have an error "Objeto de token é obrigatório"', function () {
        const errors = validateTokenInputObjectService.validateTokenInputService({});

        assert.ok(errors.length > 0);
        assert.ok(errors.find(c => c === "Objeto de token é obrigatório"));
    });

    it('Should have an error "Tipo de autorização é obrigatório"', function () {
        const tokenObjectInput = {
            type: ''
        }

        const errors = validateTokenInputObjectService.validateTokenInputService(tokenObjectInput);

        assert.ok(errors.length > 0);
        assert.ok(errors.find(c => c === "Tipo de autorização é obrigatório"));
    });

    it('Should have an error "Tipo de autorização inválido"', function () {
        const tokenObjectInput = {
            type: 'JSON'
        }

        const errors = validateTokenInputObjectService.validateTokenInputService(tokenObjectInput);

        assert.ok(errors.length > 0);
        assert.ok(errors.find(c => c === "Tipo de autorização inválido"));
    });

    it('Should have an error "Token de autorização é obrigatório"', function () {
        const tokenObjectInput = {
            type: 'TOKEN',
            Authorization: ''
        }

        const errors = validateTokenInputObjectService.validateTokenInputService(tokenObjectInput);

        assert.ok(errors.length > 0);
        assert.ok(errors.find(c => c === "Token de autorização é obrigatório"));
    });

    it('Should have an error "Token de autorização é inválido"', function () {
        const tokenObjectInput = {
            type: 'TOKEN',
            Authorization: 'TipoErrado [token]'
        }

        const errors = validateTokenInputObjectService.validateTokenInputService(tokenObjectInput);

        assert.ok(errors.length > 0);
        assert.ok(errors.find(c => c === "Token de autorização é inválido"));
    });

    it('Should have an error "ARN do método é obrigatório"', function () {
        const tokenObjectInput = {
            type: 'TOKEN',
            Authorization: 'Bearer [token]'
        }

        const errors = validateTokenInputObjectService.validateTokenInputService(tokenObjectInput);

        assert.ok(errors.length > 0);
        assert.ok(errors.find(c => c === "ARN do método é obrigatório"));
    });

    it('Should not have errors', function () {
        const tokenObjectInput = {
            type: 'TOKEN',
            Authorization: 'Bearer [token]',
            methodArn: 'arn:aws:execute-api:{regionId}:{accountId}:{apiId}/{stage}/{httpVerb}/[{resource}'
        }

        const errors = validateTokenInputObjectService.validateTokenInputService(tokenObjectInput);

        assert.equal(0, errors.length);
    });
});