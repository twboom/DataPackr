#!/usr/bin/env node
import { init } from './generator/init.mjs';
import { generateBoilerplate } from './generator/boilerplate.mjs';

// Valid operations
const operations = ['build', 'startproject', 'boilerplate'];

// Main function
function main() {
    // Get the arguments
    const args = process.argv.slice(2);
    const operation = args[0];

    // Run the operation
    switch(operation) {
        case 'build':
            break;

        case 'start':
            init();
            break;

        case 'boilerplate':
            generateBoilerplate();
            break;

        case undefined:
            console.log('No operation specified');
            break;

        default:
            console.log(`Unknown operation: ${operation}`);
            break;
    };

};

// Call the main function
main();