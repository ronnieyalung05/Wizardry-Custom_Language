module.exports = (test) => {
    test(
        `
        whilst (x prevails 10) {
            x bind x deplete 1 <~>
        }
        `,
        {
            type: 'Program',
            body: [
              {
                type: 'WhileStatement',
                test: {
                  type: 'BinaryExpression',
                  operator: 'prevails',
                  left: {
                    type: 'Identifier',
                    name: 'x',
                  },
                  right: {
                    type: 'NumericLiteral',
                    value: 10
                  }
                },
                body: {
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
                          type: 'BinaryExpression',
                          operator: 'deplete',
                          left: {
                            type: 'Identifier',
                            name: 'x',
                          },
                          right: {
                            type: 'NumericLiteral',
                            value: 1
                          }
                        }
                      }
                    }
                  ]
                }
              }
            ]
          }
    );
}