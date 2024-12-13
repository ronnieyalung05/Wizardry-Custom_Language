const ast = {
    "type": "Program",
    "body": [
      {
        "type": "VariableStatement",
        "declarations": [
          {
            "type": "VariableDeclaration",
            "id": {
              "type": "Identifier",
              "name": "mana"
            },
            "init": {
              "type": "NumericLiteral",
              "value": 10
            }
          }
        ]
      },
      {
        "type": "FunctionDeclaration",
        "name": {
          "type": "Identifier",
          "name": "replenish"
        },
        "params": [
          {
            "type": "Identifier",
            "name": "resource"
          }
        ],
        "body": {
          "type": "BlockStatement",
          "body": [
            {
              "type": "IfStatement",
              "test": {
                "type": "BinaryExpression",
                "operator": "mirrors",
                "left": {
                  "type": "Identifier",
                  "name": "resource"
                },
                "right": {
                  "type": "NumericLiteral",
                  "value": 0
                }
              },
              "consequent": {
                "type": "BlockStatement",
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "expression": {
                      "type": "AssignmentExpression",
                      "operator": "bind",
                      "left": {
                        "type": "Identifier",
                        "name": "resource"
                      },
                      "right": {
                        "type": "BinaryExpression",
                        "operator": "imbue",
                        "left": {
                          "type": "Identifier",
                          "name": "resource"
                        },
                        "right": {
                          "type": "NumericLiteral",
                          "value": 10
                        }
                      }
                    }
                  }
                ]
              },
              "alternate": {
                "type": "BlockStatement",
                "body": [
                  {
                    "type": "ExpressionStatement",
                    "expression": {
                      "type": "AssignmentExpression",
                      "operator": "bind",
                      "left": {
                        "type": "Identifier",
                        "name": "resource"
                      },
                      "right": {
                        "type": "BinaryExpression",
                        "operator": "deplete",
                        "left": {
                          "type": "Identifier",
                          "name": "resource"
                        },
                        "right": {
                          "type": "NumericLiteral",
                          "value": 10
                        }
                      }
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      {
        "type": "VariableStatement",
        "declarations": [
          {
            "type": "VariableDeclaration",
            "id": {
              "type": "Identifier",
              "name": "empty"
            },
            "init": {
              "type": "NumericLiteral",
              "value": 0
            }
          }
        ]
      },
      {
        "type": "VariableStatement",
        "declarations": [
          {
            "type": "VariableDeclaration",
            "id": {
              "type": "Identifier",
              "name": "spellcast"
            },
            "init": {
              "type": "BinaryExpression",
              "operator": "forsakes",
              "left": {
                "type": "Identifier",
                "name": "mana"
              },
              "right": {
                "type": "Identifier",
                "name": "empty"
              }
            }
          }
        ]
      }
    ]
  };



class Transpiler {
    constructor(ast) {
        this.ast = ast;
    }

    transpile() {
        return this.handleNode(this.ast);
    }

    // handler for the different nodes of the ast
    handleNode(node) {
        switch (node.type) {
            case 'Program':
                return node.body.map(statement => this.handleNode(statement)).join('\n\n');
            case 'VariableStatement':
                return node.declarations.map(declaration => this.handleNode(declaration)).join('\n');
            case 'VariableDeclaration':
                return `let ${node.id.name} = ${this.handleNode(node.init)};`;
            case 'Identifier':
                return node.name;
            case 'NumericLiteral':
                return node.value;
            case 'FunctionDeclaration':
                return `function ${this.handleNode(node.name)}(${node.params.map(param => this.handleNode(param)).join(', ')}) {\n${this.transpileBlock(node.body)}\n}`;
            case 'ExpressionStatement':
                return `${this.handleNode(node.expression)};`;
            case 'BinaryExpression':
                return `${this.handleNode(node.left)} ${this.mapOperator(node.operator)} ${this.handleNode(node.right)}`;
            case 'ReturnStatement':
                return `return ${this.handleNode(node.argument)};`;
            case 'IfStatement':
                return `if (${this.handleNode(node.test)}) {\n${this.transpileBlock(node.consequent)}\n} else {\n${this.transpileBlock(node.alternate)}\n}`;
            case 'AssignmentExpression':
                return `${this.handleNode(node.left)} = ${this.handleNode(node.right)}`;
            case 'WhileStatement':
                return `while (${this.handleNode(node.test)}) {\n${this.transpileBlock(node.body)}\n}`;
            default:
                return '';
        }
    }

    transpileBlock(block) {
        return block.body.map(statement => this.handleNode(statement)).join('\n');
    }

    // Map custom operators to JavaScript equivalents
    mapOperator(operator) {
        const operatorMap = {
            'bind': '=', // assignment
            'imbue': '+', // addition
            'deplete': '-', // subtraction and unary negative
            'amplify': '*', // multiplication
            'split': '/', // division
            'prevails': '>', // greater than
            'falters': '<', // less than
            'mirrors': '===', // equal to
            'forsakes': '!==', // not equal to
            '!': '!', // logical not
            'whilst': 'while', // while loop
            'enchant': 'function', // function declaration
            'bestow': 'return' // return
        };
        return operatorMap[operator] || operator;
    }
}

const fs = require('fs');
const path = require('path');

// Transpile the AST
const transpiler = new Transpiler(ast);
const transpiledCode = transpiler.transpile();

// Define the path to the directory where you want to save the file
const directory = path.join(__dirname, '../run'); // Replace with your desired directory path
const fileName = 'transpiledCode.js'; // You can change the name of the file here

// Create the full file path
const filePath = path.join(directory, fileName);

// Ensure the directory exists, if not, create it
if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
}

// Write the transpiled code to the file
fs.writeFileSync(filePath, transpiledCode);

console.log(`Transpiled code has been written to ${filePath}`);