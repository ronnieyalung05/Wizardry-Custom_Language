module.exports = test => {
    test(
        `
        x.y<~>
        `,
        {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'MemberExpression',
                        computed: false,
                        object: {
                            type: 'Identifier',
                            name: 'x',
                        },
                        property: {
                            type: 'Identifier',
                            name: 'y',
                        }
                    }
                }
            ]
        }
    );

    test(
        `
        x.y bind 1 <~>
        `,
        {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        operator: 'bind',
                        left: {
                            type: 'MemberExpression',
                            computed: false,
                            object: {
                                type: 'Identifier',
                                name: 'x',
                            },
                            property: {
                                type: 'Identifier',
                                name: 'y',
                            }
                        },
                        right: {
                            type: 'NumericLiteral',
                            value: 1,
                        }
                    }
                }
            ]
        }
    );

    /*
    test(
        `
        x[0] bind 1 <~>
        `,
        {
            type: 'Program',
            body: [
                {
                    type: 'ExpressionStatement',
                    expression: {
                        type: 'AssignmentExpression',
                        operator: 'bind',
                        left: {
                            type: 'MemberExpression',
                            computed: true,
                            object: {
                                type: 'Identifier',
                                name: 'x',
                            },
                            property: {
                                type: 'NumericLiteral',
                                value: '0',
                            }
                        },
                        right: {
                            type: 'NumericLiteral',
                            value: 1,
                        }
                    }
                }
                
            ]
        }
    );

    THIS TEST DOES NOT WORK... somehow the [] is not supported? idk hopefully not a future issure
    */
}