module.exports = (test) => {
    test(`x prevails 0 withal y falters 1 <~>`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'LogicalExpression',
                    operator: 'withal',
                    left: {
                        type: 'BinaryExpression',
                        operator: 'prevails',
                        left: {
                            type: 'Identifier',
                            name: 'x',
                        },
                        right: {
                            type: 'NumericLiteral',
                            value: 0
                        }
                    },
                    right: {
                        type: 'BinaryExpression',
                        operator: 'falters',
                        left: {
                            type: 'Identifier',
                            name: 'y',
                        },
                        right: {
                            type: 'NumericLiteral',
                            value: 1,
                        }
                    }
                }
            }
        ]
    })
}