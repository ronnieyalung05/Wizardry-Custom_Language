module.exports = test => {
    // Simple variable declaration:
    test(`conjure x bind 42 <~>`, {
        type: 'Program',
        body: [
            {
                type: 'VariableStatement',
                declarations: [
                    {
                        type: 'VariableDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'x',
                        },
                        init: {
                            type: 'NumericLiteral',
                            value: 42,
                        }
                    }             
                ]
            }
        ]
    });

    // Variable declaration, no init
    test(`conjure x <~>`, {
        type: 'Program',
        body: [
            {
                type: 'VariableStatement',
                declarations: [
                    {
                        type: 'VariableDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'x',
                        },
                        init: null,
                    }             
                ]
            }
        ]
    });

    // Multiple variable declaration, no init
    test(`conjure x, y <~>`, {
        type: 'Program',
        body: [
            {
                type: 'VariableStatement',
                declarations: [
                    {
                        type: 'VariableDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'x',
                        },
                        init: null,
                    },
                    {
                        type: 'VariableDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'y',
                        },
                        init: null,
                    },          
                ]
            }
        ]
    });

       // Multiple variable declaration, y init
       test(`conjure x, y bind 42 <~>`, {
        type: 'Program',
        body: [
            {
                type: 'VariableStatement',
                declarations: [
                    {
                        type: 'VariableDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'x',
                        },
                        init: null,
                    },
                    {
                        type: 'VariableDeclaration',
                        id: {
                            type: 'Identifier',
                            name: 'y',
                        },
                        init: {
                            type: 'NumericLiteral',
                            value: 42,
                        },
                    },          
                ]
            }
        ]
    });
}