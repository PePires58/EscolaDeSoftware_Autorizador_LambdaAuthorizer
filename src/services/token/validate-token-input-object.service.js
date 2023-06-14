exports.validateTokenInputService = function (tokenInput) {
    let errors = [];

    if (!tokenInput || Object.keys(tokenInput).length === 0) {
        errors.push('Objeto de token é obrigatório');
    }
    else {
        if (!tokenInput.type)
            errors.push('Tipo de autorização é obrigatório');
        else if (tokenInput.type !== 'TOKEN')
            errors.push('Tipo de autorização inválido');

        if (!tokenInput.Authorization)
            errors.push('Token de autorização é obrigatório');
        else if (!tokenInput.Authorization.startsWith('Bearer '))
            errors.push('Token de autorização é inválido');

        if (!tokenInput.methodArn)
            errors.push('ARN do método é obrigatório');
    }

    return errors;
}