/**
 * Letter parser: recursive descent implementation
 */

const { Tokenizer } = require('./tokenizer');

class Parser {
    /**
     * Initializes the parser
     */
    constructor() {
        this._string = '';
        this._tokenizer = new Tokenizer();
    }

    /**
     * Parses a string into an AST.
     */
    parse(string) {
        this._string = string;
        this._tokenizer.init(string);

        // Prime the tokenizer to obtain the first token which is our lookahead
        // The lookahead is used for predictive parsing
        this._lookahead = this._tokenizer.getNextToken();

        // Parse recursively starting from the main entry point, the Program
        return this.Program();
    }

    /**
     * Main entry point.
     * 
     * Program
     *   : StatementList
     *   ;
     */
    Program() {
        return {
            type: 'Program',
            body: this.StatementList(),
        };
    }

    /**
     * StatementList
     *   : Statement
     *   | StatemenetList Statement -> Statement Statement Statement Statement
     *   ;
     */
    StatementList(stopLookahead = null) {
        const statementList = [this.Statement()];

        while (this._lookahead != null && this._lookahead.type !== stopLookahead) {
            statementList.push(this.Statement());
        } 

        return statementList;
    }

    /**
     * Statement
     *   : ExpressionStatement
     *   | BlockStatement
     *   | EmptyStatement
     *   | IfStatement
     *   | IterationStatement
     *   | FunctionDeclaration
     *   | ReturnStatement
     *   ;
     */
    Statement() {
        switch(this._lookahead.type) {
            case '<~>':
                return this.EmptyStatement();
            case 'lest':
                return this.IfStatement();
            case '{': 
                return this.BlockStatement();
            case 'conjure':
                return this.VariableStatement();
            case 'enchant': 
                return this.FunctionDeclaration();
            case 'bestow': 
                return this.ReturnStatement();
            case 'whilst':
                return this.IterationStatement();
            default: 
                return this.ExpressionStatement();

        }
    }

    /**
     * FunctionDeclaration
     *   : 'enchant' Identifier '(' OptFormalParameterList ')' BlockStatement
     *   ;
     */
    FunctionDeclaration() {
        this._eat('enchant');
        const name = this.Identifier();

        this._eat('(');

        // OptFormalParameterList
        const params = 
            this._lookahead.type !== ')' ? this.FormalParamterList() : [];

        this._eat(')');

        const body = this.BlockStatement();

        return {
            type: 'FunctionDeclaration',
            name,
            params,
            body,
        };
    }

    /**
     * FormalParamterList
     *   : Identifier
     *   | FormalParamterList ',' Identifier
     */
    FormalParamterList() {
        const params = [];

        do {
            params.push(this.Identifier());
        } while (this._lookahead.type === ',' && this._eat(','));

        return params;
    }
    /**
     * ReturnStatement
     *   : 'bestow' OptExpression
     *   ;
     */
    ReturnStatement() {
        this._eat('bestow');
        const argument = this._lookahead.type !== '<~>' ? this.Expression() : null;
        this._eat('<~>');

        return {
            type: 'ReturnStatement',
            argument,
        }
    }

    /**
     * IterationStatement
     *   : WhileStatement
     *   ;
     */
    IterationStatement() {
        return this.WhileStatement();
    }

    /**
     * WhileStatement
     *   : 'whilst' '(' Expression ')' Statement
     *   ;
     */
    WhileStatement() {
        this._eat('whilst');

        this._eat('(');
        const test = this.Expression();
        this._eat(')');

        const body = this.Statement();

        return {
            type: 'WhileStatement',
            test,
            body,
        };
    }


    /**
     * IfStatement
     *   : 'lest' '(' Expression ')' Statement
     *   | 'lest' '(' Expression ')' Statement 'fallback' Statement
     *   ;
     */
    IfStatement() {
        this._eat('lest');

        this._eat('(');
        const test = this.Expression();
        this._eat(')');

        const consequent = this.Statement();

        const alternate = this._lookahead != null && this._lookahead.type === 'fallback'
            ? this._eat('fallback') && this.Statement()
            : null;
        
        return {
            type: 'IfStatement',
            test,
            consequent,
            alternate,
        };
    }

    /**
     * VariableStatement
     *   : 'conjure' VariableDeclarationList '<~>'
     *   ;
     */
    VariableStatement() {
        this._eat('conjure');
        const declarations = this.VariableDeclarationList();
        this._eat('<~>');
        return {
            type: 'VariableStatement',
            declarations,
        };
    }

    /**
     * VariableDeclarationList
     *   : VariableDeclaration
     *   | VariableDeclaration ',' VariableDeclaration
     *   ;
     */
    VariableDeclarationList() {
        const declarations = [];

        do {
            declarations.push(this.VariableDeclaration());
        } while (this._lookahead.type === ',' && this._eat(','));

        return declarations;
    }

    /**
     * VariableDeclaration
     *   : Identifier OptVariableInitialized
     *   ;
     */
    VariableDeclaration() {
        const id = this.Identifier();

        // OptVariableInitializer
        const init = this._lookahead.type !== '<~>' && this._lookahead.type !== ','
            ? this.VariableInitializer()
            : null;
        
            return {
                type: 'VariableDeclaration',
                id,
                init,
            };
    }

    /**
     * VariableInitializer
     *   : SIMPLE_ASSIGN AssignmentExpression
     *   ;
     */
    VariableInitializer() {
        this._eat('SIMPLE_ASSIGN');
        return this.AssignmentExpression();
    }

    /**
     * EmptyStatement
     *   : '<~>'
     *   ;
     */
    EmptyStatement() {
        this._eat('<~>');
        return {
            type: 'EmptyStatement',
        }
    }

    /**
     * BlockStatement
     *   : '{' OptStatementList '}'
     *   ;
     */
    BlockStatement() {
        this._eat('{');

        const body = this._lookahead.type !== '}' ? this.StatementList('}') : [];

        this._eat('}');

        return {
            type: 'BlockStatement',
            body,
        };
    }

    /**
     * ExpressionStatement
     *   : Expression '<~>'
     */
    ExpressionStatement() {
        const expression = this.Expression();
        this._eat('<~>');
        return {
            type: 'ExpressionStatement',
            expression,
        }
    }

    /**
     * Expression
     *   : Literal
     *   ;
     */
    Expression() {
        return this.AssignmentExpression();
    }

    /**
     * AssignmentExpression
     *   : LogicalORExpression
     *   | LeftHandSideExpression AssignmentOperator AssignmentExpression
     */
    AssignmentExpression() {
        const left = this.LogicalORExpression();

        if (!this._isAssignmentOperator(this._lookahead.type)) {
            return left;
        }

        return {
            type: 'AssignmentExpression',
            operator: this.AssignmentOperator().value,
            left: this._checkValidAssignmentTarget(left),
            right: this.AssignmentExpression(),
        }
    }

    /**
     * LeftHandSideExpression
     *   : MemberExpression
     *   ;
     */
    LeftHandSideExpression() {
        return this.CallMemberExpression();
    }

    /**
     * CallMemberExpression
     *   : MemberExpression
     *   | CallExpression
     */
    CallMemberExpression() {
        // Member part, might be part of a call:
        const member = this.MemberExpression();

        // See if we have a call expression:
        if (this._lookahead.type === '(') {
            return this._CallExpression(member);
        }

        // Simple member expression:
        return member;
    }

    /**
     * Generic call expression helper.
     * 
     * CallExpression
     *   : Callee Arguments
     *   ;
     * 
     * Callee
     *   : MemberExpression
     *   | CallExpression
     *   ;
     */
    _CallExpression(callee) {
        let callExpression = {
            type: 'CallExpression',
            callee,
            arguments: this.Arguments(),
        };

        if (this._lookahead.type === '(') {
            callExpression = this._CallExpression(callExpression);
        }

        return callExpression;
    }

    /**
     * Arguments
     *   : '(' OptArgumentList ')'
     *   ;
     */
    Arguments() {
        this._eat('(');

        const argumentList = this._lookahead.type !== ')' ? this.ArgumentList() : [];

        this._eat(')');

        return argumentList;
    }

    /**
     * ArgumentList
     *   : AssignmentExpression
     *   | ArgumentList ',' AssignmentExpression
     *   ;
     */
    ArgumentList() {
        const argumentList = [];

        do {
            argumentList.push(this.AssignmentExpression());
        } while (this._lookahead.type === ',' && this._eat(','));

        return argumentList;
    }


    /**
     * MemberExpression
     *   : PrimaryExpression
     *   | MemberExpression '.' Identifier
     *   | MemberExpression '[' Expression ']'
     *   ;
     */
    MemberExpression() {
        let object = this.PrimaryExpression();

        while (this._lookahead.type === '.' || this._lookahead.type === '[') {
            // MemberExpression '.' Identifier
            if (this._lookahead.type === '.') {
                this._eat('.');
                const property = this.Identifier();
                object = {
                    type: 'MemberExpression',
                    computed: false,
                    object,
                    property,
                };
            }

            // MemberExpression '[' Expression ']'
            if (this._lookahead.type === '[') {
                this._eat('[');
                const property = this.Expression();
                this._eat(']');
                object = {
                    type: 'MemberExpression',
                    computed: true,
                    object,
                    property,
                };
            }
        }

        return object;
    }

    /**
     * Identifier
     *   : IDENTIFIER
     *   ;
     */
    Identifier() {
        const name = this._eat('IDENTIFIER').value;
        return {
            type: 'Identifier',
            name,
        }
    }

    /**
     * Extra check whether it's a valid assignment target.
     */
    _checkValidAssignmentTarget(node) {
        if (node.type === 'Identifier' || node.type === 'MemberExpression') {
            return node;
        }
        throw new SyntaxError('Invalid left-hand side in assignment expression');
    }

    /**
     * Whether the token is an assignment operator.
     */
    _isAssignmentOperator(tokenType) {
        return tokenType === 'SIMPLE_ASSIGN';
    }

    /**
     * AssignmentOperator
     *   : SIMPLE_ASSIGNMENT
     *   ;
     */
    AssignmentOperator() {
        return this._eat('SIMPLE_ASSIGN');
    }

    /**
     * Logical OR expression
     * 
     *   x atwill y (x || y)
     * 
     * LogicalORExpression
     *   : LogicalANDExpression LOGICAL_OR LogicalORExpression
     *   | LogicalORExpression
     */
    LogicalORExpression() {
        return this._LogicalExpression('LogicalANDExpression', 'LOGICAL_OR');
    }

    /**
     * Logical AND expression
     * 
     *   x withal y (x && y)
     * 
     * LogicalANDExpression
     *   : EqualityExpression LOGICAL_AND LogicalANDExpression
     *   | EqualityExpression
     *   ;
     */
    LogicalANDExpression() {
        return this._LogicalExpression('EqualityExpression', 'LOGICAL_AND');
    }

    /**
     * EQUALITY_OPERATOR: factum, negatum (==, !=)
     * 
     *   x factum y (x == y)
     *   x negatum y (x != y)
     * 
     * EqualityExpression
     *   : RelationalExpression EQUALITY_OPERATOR EqualityExpression
     *   | RelationalExpression
     *   ;
     */
    EqualityExpression() {
        return this._BinaryExpression('RelationalExpression', 'EQUALITY_OPERATOR');
    }

    /**
     * RELATIONAL_OPERATOR: prevails, prevailsORmirrors, falters, faltersORmirrors (>, >=, <, <=)
     * 
     *   x prevails y
     *   x prevailsORmirrors y
     *   x falters y
     *   x faltersORmirrors y
     * 
     * RelationalExpression
     *   : AdditiveExpression
     *   | AdditiveExpression RELAITONAL_OPERATOR RelationalExpression
     *   ;
     */
    RelationalExpression() {
        return this._BinaryExpression('AdditiveExpression', 'RELATIONAL_OPERATOR');
    }

    /**
     * AdditiveExpression
     *   : MultiplicativeExpression
     *   | AdditiveExpression ADDITIVE_OPERATOR MultplicativeExpression
     *   ;
     */
    AdditiveExpression() {
        return this._BinaryExpression(
            'MultiplicativeExpression',
            'ADDITIVE_OPERATOR',
        );
    }

    /**
     * MultiplicativeExpression
     *   : UnaryExpression
     *   | AdditiveExpression MULTIPLICATIVE_OPERATOR UnaryExpression
     */
    MultiplicativeExpression() {
        return this._BinaryExpression(
            'UnaryExpression',
            'MULTIPLICATIVE_OPERATOR',
        );
    }

    /**
     * Generic Helper for LogicalExpression nodes.
     */
    _LogicalExpression(builderName, operatorToken) {
        let left = this[builderName]();

        while (this._lookahead.type === operatorToken) {
            const operator = this._eat(operatorToken).value;

            const right = this[builderName]();

            left = {
                type: 'LogicalExpression',
                operator,
                left,
                right,
            };
        }

        return left;
    }

    /**
     * Generic binary expression
     */
    _BinaryExpression(builderName, operatorToken) {
        let left = this[builderName]();

        while (this._lookahead.type === operatorToken) {
            const operator = this._eat(operatorToken).value;

            const right = this[builderName]();

            left = {
                type: 'BinaryExpression',
                operator,
                left,
                right,
            };
        }

        return left;
    }

    /**
     * UnaryExpression
     *   : LeftHandSideExpression
     *   | ADDITIVE_OPERATOR UnaryExpresion
     *   | LOGICAL_NOT UnaryExpression
     */
    UnaryExpression() {
        let operator;
        switch(this._lookahead.type) {
            case 'ADDITIVE_OPERATOR':
                operator = this._eat('ADDITIVE_OPERATOR').value;
                break;
            case 'LOGICAL_NOT':
                operator = this._eat('LOGICAL_NOT').value;
                break;
        }
        if (operator != null) {
            return {
                type: 'UnaryExpression',
                operator,
                arguement: this.UnaryExpression(),
            }
        };
        return this.LeftHandSideExpression();
    }


    /**
     * PrimaryExpression
     *   : Literal
     *   | ParenthesizedExpression
     *   | Identifier
     *   ;
     */
    PrimaryExpression() {
        if (this._isLiteral(this._lookahead.type)) {
            return this.Literal()
        }
        switch(this._lookahead.type) {
            case '(':
                return this.ParenthesizedExpression();
            case 'IDENTIFIER':
                return this.Identifier();
            default:
                return this.LeftHandSideExpression();
        }
    }

    /**
     * Whether the token is a literal
     */
    _isLiteral(tokenType) {
        return (
        tokenType === 'NUMBER' 
        || tokenType === 'STRING' 
        || tokenType === 'true'
        || tokenType === 'false'
        || tokenType === 'null'
        );
    }

    /**
     * ParenthesizedExpression
     *   : '(' Expression ')'
     *   ;
     */
    ParenthesizedExpression() {
        this._eat('(');
        const expression = this.Expression();
        this._eat(')');
        return expression;
    }

    /**
     * Literal
     *    : NumericLiteral
     *    | StringLiteral
     *    | BooleanLiteral
     *    | NullLiteral
     *    ;
     */
    Literal() {
        switch (this._lookahead.type) {
            case 'NUMBER':
                return this.NumericLiteral();
            case 'STRING':
                return this.StringLiteral();
            case 'true':
                return this.BooleanLiteral(true);
            case 'false':
                return this.BooleanLiteral(false);
            case 'null':
                return this.NullLiteral(false);
        }
        throw new SyntaxError(`Literal: unexpected literal production`);
    }

    /**
     * BooleanLiteral
     *   : 'factum'
     *   | 'negatum'
     *   ;
     */
    BooleanLiteral(value) {
        this._eat(value ? 'true' : 'false');
        return {
            type: 'BooleanLiteral',
            value,
        };
    }

    /**
     * NullLiteral
     *   : 'voidance'
     *   ;
     */
    NullLiteral() {
        this._eat('null');
        return {
            type: 'NullLiteral',
            value: null,
        }
    }

    /**
     * StringLiteral
     *    : STRING
     *    ;
     */
    StringLiteral() {
        const token = this._eat('STRING');
        return {
            type: 'StringLiteral',
            value: token.value.slice(1, -1), // Remove quotes
        };
    }

    /**
     * NumericLiteral
     *    : NUMBER
     *    ;
     */
    NumericLiteral() {
        const token = this._eat('NUMBER');
        return {
            type: 'NumericLiteral',
            value: Number(token.value),
        };
    }

    /**
     * Expects a token of a given type
     */
    _eat(tokenType) {
        const token = this._lookahead;

        if (token == null) {
            throw new SyntaxError(
                `Unexpected end of input, expected: "${tokenType}"`,
            );
        }

        if (token.type !== tokenType) {
            throw new SyntaxError(
                `Unexpected token: "${token.value}", expected: "${tokenType}"`,
            );
        }

        // Advance to next token
        this._lookahead = this._tokenizer.getNextToken();

        return token;
    }
}

module.exports = {
    Parser,
};



