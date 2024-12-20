#!/usr/bin/env node

'use strict';

const {Parser} = require('../src/Parser');

const fs = require('fs');


function main(argv) {
    const [_node, _path, mode, exp] = argv;

    const parser = new Parser();

    let ast = null;

    // Direct expression:
    if (mode === '-e') {
        ast = parser.parse(exp);
    }

    if (mode === '-f') {
        const src = fs.readFileSync(exp, 'utf-8');
        ast = parser.parse(src);
    }

    console.log(JSON.stringify(ast, null, 2));
}

main(process.argv);