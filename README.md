# Wizardry-Custom_Language
Credits to: Dmitry Soshnikov -> https://www.youtube.com/watch?v=4m7ubrdbWQU&t=2s&ab_channel=DmitrySoshnikov
Contains: recursive descent parser, tokenizer, & transpiler

Table of Contents:
_______________________________
/bin

letter-rdp.js:
    The file in which we run our 'example.lt' files to generate ASTs. Run this file in the terminal
_______________________________
~
_______________________________
/run

transpiledCode.js:
    The file that generated JS code from Wizardry code is outputted
_______________________________
~
_______________________________
/src

Parser.js:
    Recursive descent parser

Tokenizer.js:
    Tokenizer for Wizardry (this is where we can view and alter keywords, operators, etc. in our langauge)
_______________________________
~
_______________________________
/tests

Run.js:
    Main file that runs all of the testing files

.js files:
    Testing files for different functionalities of the language

.lt files (example...lt):
    Files containing Wizardry code that can be used with letter-rdp.js to generate ASTs for said code.
_______________________________
~
_______________________________
/transpiler

transpile.js
    This is where we input our AST. Running this file generates and writes valid JS code into /run/transpiledCode.js from
    the Wizardry AST.
_______________________________