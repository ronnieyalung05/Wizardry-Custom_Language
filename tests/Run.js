/**
 * Main test runner.
 */

const {Parser} = require('../src/Parser');
const assert = require('assert');

/**
 * List of tests.
 */
const tests = [
    require('./literal-tests.js'),
    require('./statement-list-test.js'),
    require('./block-test.js'),
    require('./empty-statement-test.js'),
    require('./math-test.js'),
    require('./assignment-test.js'),
    require('./variable-test.js'),
    require('./if-test.js'),
    require('./relational-test.js'),
    require('./equality-test.js'),
    require('./logical-test.js'),
    require('./unary-test.js'),
    require('./while-test.js'),
    require('./function-declaration-test.js'),
    require('./member-test.js'),
    require('./call-test.js'),
];

const parser = new Parser();

/**
 * For manual tests...
 */
function exec() {
    const program = `
 
    enchant square(x) {
        x amplify x <~>
    }
    square(2) <~>

    `;
    const ast = parser.parse(program);

    console.log(JSON.stringify(ast, null, 2));
}


//exec();

/** 
 * Test function
 */
function test(program, expected) {
    const ast = parser.parse(program);
    assert.deepEqual(ast, expected);
}

// Run all tests:

tests.forEach(testRun => testRun(test));

console.log('All assertions passed!');

