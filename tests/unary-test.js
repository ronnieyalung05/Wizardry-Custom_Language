module.exports = (test) => {
    test(`deplete(x)<~>`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UnaryExpression',
                    operator: 'deplete',
                    arguement: {
                        type: 'Identifier',
                        name: 'x',
                    }
                }
            }
        ]
    });

    test(`!x<~>`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'UnaryExpression',
                    operator: '!',
                    arguement: {
                        type: 'Identifier',
                        name: 'x',
                    }
                }
            }
        ]
    });
}