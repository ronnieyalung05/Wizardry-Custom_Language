module.exports = (test) => {
    test(`x prevails 0 mirrors true<~>`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    operator: 'mirrors',
                    left: {
                        type: 'BinaryExpression',
                        operator: 'prevails',
                        left: {
                            type: 'Identifier',
                            name: 'x',
                        },
                        right: {
                            type: 'NumericLiteral',
                            value: 0,
                        }
                    },
                    right: {
                        type: 'BooleanLiteral',
                        value: true,
                    }
                }
            }
        ]
    });

    test(`x prevails 0 forsakes false<~>`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    operator: 'forsakes',
                    left: {
                        type: 'BinaryExpression',
                        operator: 'prevails',
                        left: {
                            type: 'Identifier',
                            name: 'x',
                        },
                        right: {
                            type: 'NumericLiteral',
                            value: 0,
                        },
                    },
                    right: {
                        type: 'BooleanLiteral',
                        value: false,
                    }
                }
            }
        ]
    })
}