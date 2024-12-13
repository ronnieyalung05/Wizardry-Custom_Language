module.exports = test => {
    // Addition:
    // LHS: 2
    // RHS: 2
    test(`2 imbue 2<~>`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    operator: 'imbue',
                    left: {
                        type: 'NumericLiteral',
                        value: 2,
                    },
                    right: {
                        type: 'NumericLiteral',
                        value: 2,
                    }
                }
            }
        ]
    });

    // Nested binary expression:
    // LHS: 3 + 2
    // RHS: 2
    test(`3 imbue 2 deplete 2<~>`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    operator: 'deplete',
                    left: {
                        type: 'BinaryExpression',
                        operator: 'imbue',
                        left: {
                            type: 'NumericLiteral',
                            value: 3,
                        },
                        right: {
                            type: 'NumericLiteral',
                            value: 2,
                        }
                    },
                    right: {
                        type: 'NumericLiteral',
                        value: 2,
                    }
                }
            }
        ]
    });

    // Simple TMS test
    test(`2 amplify 2<~>`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    operator: 'amplify',
                    left: {
                        type: 'NumericLiteral',
                        value: 2,
                    },
                    right: {
                        type: 'NumericLiteral',
                        value: 2,
                    }
                }
            }
        ]
    });

    // Precedence of operations
    test(`(2 imbue 2) amplify 2<~>`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    operator: 'amplify',
                    left: {
                        type: 'BinaryExpression',
                        operator: 'imbue',
                        left: {
                            type: 'NumericLiteral',
                            value: 2,
                        },
                        right: {
                            type: 'NumericLiteral',
                            value: 2,
                        },
                    },
                    right: {
                        type: 'NumericLiteral',
                        value: 2,
                    }
                }
            }
        ]
    });

    // Another precedence test
    test(`2 amplify 2 amplify 2<~>`, {
        type: 'Program',
        body: [
            {
                type: 'ExpressionStatement',
                expression: {
                    type: 'BinaryExpression',
                    operator: 'amplify',
                    left: {
                        type: 'BinaryExpression',
                        operator: 'amplify',
                        left: {
                            type: 'NumericLiteral',
                            value: 2,
                        },
                        right: {
                            type: 'NumericLiteral',
                            value: 2,
                        },
                    },
                    right: {
                        type: 'NumericLiteral',
                        value: 2,
                    }
                }
            }
        ]
    })
}