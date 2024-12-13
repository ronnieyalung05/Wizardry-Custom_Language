module.exports = (test) => {
    test(
        `
        lest (x) {
            x bind 1 <~>
        } fallback {
            x bind 2 <~>
        }
        `,
        
        {
            type: 'Program',
            body: [
                {
                    type: 'IfStatement',
                    test: {
                        type: 'Identifier',
                        name: 'x',
                    },
                    consequent: {
                        type: 'BlockStatement',
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
                                        value: 1,
                                    }
                                }
                            }
                        ]
                    },
                    alternate: {
                        type: 'BlockStatement',
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
                                        value: 2,
                                    }
                                }
                            }
                        ]
                    }
                }
            ]
        }
    );

    // No else part:
    test(
        `
        lest (x) {
            x bind 1 <~>
        }
        `,
        {
            type: 'Program',
            body: [
                {
                    type: 'IfStatement',
                    test: {
                        type: 'Identifier',
                        name: 'x',
                    },
                    consequent: {
                        type: 'BlockStatement',
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
                                        value: 1,
                                    }
                                }
                            }
                        ]
                    },
                    alternate: null,
                }
            ]
        }
    )


}