module.exports = test => {
    test(
        `
        enchant square(x) {
            bestow x amplify x <~>
        }
        `,
        {
            type: 'Program',
            body: [
                {
                    type: 'FunctionDeclaration',
                    name: {
                        type: 'Identifier',
                        name: 'square',
                    },
                    params: [
                        {
                            type: 'Identifier',
                            name: 'x',
                        }
                    ],
                    body: {
                        type: 'BlockStatement',
                        body: [
                            {
                                type: 'ReturnStatement',
                                argument: {
                                    type: 'BinaryExpression',
                                    operator: 'amplify',
                                    left: {
                                        type: 'Identifier',
                                        name: 'x',
                                    },
                                    right: {
                                        type: 'Identifier',
                                        name: 'x',
                                    }
                                }
                            }
                        ]
                    }
                }
            ]
        }
    )
}