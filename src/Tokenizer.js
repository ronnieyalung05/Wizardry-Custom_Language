/**
 * Tokenizer spec.
 */
const Spec = [
    // -------------------------------------------------
    // Whitespace:
    [/^\s+/, null],

    // -------------------------------------------------
    // Comments: ***DOES NOT SUPPORT MULTILINE COMMENTS***: /=/
    [/^\/\=\/.*/, null],

    // -------------------------------------------------
    // Numbers:
    [/^\d+/, 'NUMBER'],

    // -------------------------------------------------
    // Assignment operators: (will not support complex assign (i.e. +=, -=, etc))
    [/^\bbind\b/, 'SIMPLE_ASSIGN'],

    // -------------------------------------------------
    // Symbols, delimiters:
    [/^<~>/, '<~>'], // delimiter (;)
    [/^\{/, '{'],
    [/^\}/, '}'],
    [/^\(/, '('],
    [/^\)/, ')'],
    [/^\./, '.'],
    [/^\[/, ']'],
    [/^\]/, ']'],
    [/^,/, ','],

    // -------------------------------------------------
    // Keywords:
    [/^\bconjure\b/, 'conjure'],
    [/^\blest\b/, 'lest'],
    [/^\bfallback\b/, 'fallback'],
    [/^\btrue\b/, 'true'],
    [/^\bfalse\b/, 'false'],
    [/^\bnull\b/, 'null'],
    [/^\bwhilst\b/, 'whilst'],
    [/^\benchant\b/, 'enchant'],
    [/^\bbestow\b/, 'bestow'],

    // -------------------------------------------------
    // Math operators: PLS, MNS, TMS, DIV (respectively, +, -, *, /)
    [/^\bimbue\b/, 'ADDITIVE_OPERATOR'],
    [/^\bdeplete\b/, 'ADDITIVE_OPERATOR'],
    [/^\bamplify\b/, 'MULTIPLICATIVE_OPERATOR'],
    [/^\bsplit\b/, 'MULTIPLICATIVE_OPERATOR'],

    // -------------------------------------------------
    // Relational operators: prevails, prevailsORmirrors, falters, faltersORmirrors (>, >=, <, <=)
    [/^\bprevails\b/, 'RELATIONAL_OPERATOR'],
    [/^\bprevailsORmirrors\b/, 'RELATIONAL_OPERATOR'],
    [/^\bfalters\b/, 'RELATIONAL_OPERATOR'],
    [/^\bfaltersORmirrors\b/, 'RELATIONAL_OPERATOR'],

    // -------------------------------------------------
    // Equality operators: factum, negatum (==, !=)
    [/^\bmirrors\b/, 'EQUALITY_OPERATOR'],
    [/^\bforsakes\b/, 'EQUALITY_OPERATOR'],

    // -------------------------------------------------
    // Logical operators: withal, atwill (&&, ||)
    [/^\bwithal\b/, 'LOGICAL_AND'],
    [/^\batwill\b/, 'LOGICAL_OR'],
    [/^\!/, 'LOGICAL_NOT'],

    // -------------------------------------------------
    // Identifiers:
    [/^\w+/, 'IDENTIFIER'], // \w+ means any word character (i.e. a-z, A-Z, _, 0-9)

    // -------------------------------------------------
    // Strings: *** ONLY WORKS WITH DOUBLE QUOTES ""
    [/^"[^"]*"/, 'STRING'],

];

/**
 * Tokenizer class.
 * 
 * Lazily pulls a token from a stream
 */
class Tokenizer {
    /**
     * Initializes the string
     */
    init(string) {
        this._string = string;
        this._cursor = 0;
    }

    /**
     * Checks whether tokenizer reached EOF (end of file)
     */
    isEOF() {
        return this._cursor === this._string.length;
    }

    /**
     * Checks whether we still have more tokens
     */
    hasMoreTokens() {
        return this._cursor < this._string.length;
    }

    /**
     * Obtains all tokens, processing until the :> delimiter or EOF.
     */
    tokenize() {
        const tokens = [];
        while (this.hasMoreTokens()) {
            const token = this.getNextToken();
            if (token) {
                tokens.push(token);
            }
        }
        return tokens;
    }

    /**
     * Obtains next token.
     */
    getNextToken() {
        if (!this.hasMoreTokens()) {
            return null;
        }

        const string = this._string.slice(this._cursor);
        
        for (const [regexp, tokenType] of Spec) {
            const tokenValue = this._match(regexp, string);

            if (tokenValue == null) {
                continue;
            }

            // Should skip token, e.g. whitespace.
            if (tokenType == null) {
                return this.getNextToken();
            }
            
            return {
                type: tokenType,
                value: tokenValue,
            };
        }

        throw new SyntaxError(`Unexpected token: "${string[0]}"`);
    }

    _match(regexp, string) {
        const matched = regexp.exec(string);
        if (matched == null) {
            return null;
        }
        this._cursor += matched[0].length;
        return matched[0];
    }
}

module.exports = {
    Tokenizer,
};