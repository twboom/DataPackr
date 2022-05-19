import * as path from 'path';
import * as fs from 'fs';
import { input } from '../utility/prompt-input.mjs';

export function init() {
    // Get Current Working Directory
    const cwd = process.cwd();
    const cwdName = path.basename(cwd);

    // Check if the current directory is empty
    const cwdc = fs.readdirSync(cwd);
    if (cwdc.length !== 0) {
        if (cwdc.includes('packconfig.json') || cwdc.includes('src')) {
            console.log('The current directory already contains a packconfig.json or src directory.');
            console.log('Aborting...');
            return;
        };
    };
    

    // Introduction
    console.log('This utility will help you with setting up a new datapack');
    console.log('It will create a new datapack folder and initialise it with the default files');
    
    // Information
    console.log('\nThe following information is needed to generate the boilerplate code');
    const name = input(`\tWhat is the name of the datapack? (${cwdName}) `, cwdName);
    const description = input('\tDescribe the datapack? ', '');
    const packImage = input('\tSpecify the full name of the pack image (pack.png) ', 'pack.png');

    // Confirmation
    console.log('\nThe following information will be used to generate the boilerplate code and build settings');
    console.log('Please note that you can always update these settings later in the `packconfig.json` file');
    console.log(`\tName: ${name}`);
    console.log(`\tDescription: ${description}`);
    console.log(`\tPack Image: ${packImage}`);


    // Create config file
    const configPath = path.join(cwd, 'packconfig.json');
    const config = {
        name,
        description,
        packImage,
    };
    const configString = JSON.stringify(config, null, 4);
    fs.writeFileSync(configPath, configString);

    // Create the datapack source folder
    const sourcePath = path.join(cwd, 'src');
    fs.mkdirSync(sourcePath);
};