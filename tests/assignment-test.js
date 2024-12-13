module.exports = test => {
    // Simple assignment:
    test(`x bind 42<~>`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: 'bind',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                    },
                    right: {
                        type: 'NumericLiteral',
                        value: 42,
                    }
                }
            }
        ]
    });

    // Chained assignment:
    test(`x bind y bind 42<~>`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'AssignmentExpression',
                    operator: 'bind',
                    left: {
                        type: 'Identifier',
                        name: 'x',
                    },
                    right: {
                        type: 'AssignmentExpression',
                        operator: 'bind',
                        left: {
                            type: 'Identifier',
                            name: 'y',
                        },
                        right: {
                            type: 'NumericLiteral',
                            value: 42,
                        },
                    }
                }
            }
        ]
    });
}