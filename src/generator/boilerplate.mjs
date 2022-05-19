import * as path from 'path';
import * as fs from 'fs';
import { input } from '../utility/prompt-input.mjs';

export function generateBoilerplate() {
    console.log('This tool will set you up with a normal datapack project');

    // Get the config
    const config = {
        name: input('Name of the datapack: (my-datapack)', 'my-datapack'),
        description: input('Describe the datapack: ', ''),
        packFormat: parseInt(input('Datapack format: (9)', '9')),
    };

    // Check if folder does not exist
    const cwd = process.cwd();
    const datapackPath = path.join(cwd, config.name);
    if (fs.existsSync(datapackPath)) {
        console.log('The datapack folder already exists');
        console.log('Aborting...');
        return;
    };

    // Create the datapack folder
    fs.mkdirSync(datapackPath);

    // Create the data folder
    fs.mkdirSync(path.join(datapackPath, 'data'));

    // Create the minecraft namespace
    fs.mkdirSync(path.join(datapackPath, 'data', 'minecraft'));
    fs.mkdirSync(path.join(datapackPath, 'data', 'minecraft', 'tags'));
    
    // Create the user's namespace
    const nspath = path.join(datapackPath, 'data', config.name);
    fs.mkdirSync(nspath);
    fs.mkdirSync(path.join(nspath, 'advancements'));
    fs.mkdirSync(path.join(nspath, 'functions'));
    fs.mkdirSync(path.join(nspath, 'loot_tables'));
    fs.mkdirSync(path.join(nspath, 'predicates',));
    fs.mkdirSync(path.join(nspath, 'recipes',));
    fs.mkdirSync(path.join(nspath, 'structures',));
    fs.mkdirSync(path.join(nspath, 'tags',));

    // Create the pack.mcmeta file
    const mcmetaPath = path.join(datapackPath, 'pack.mcmeta');
    const mcmeta = {
        pack: {
            pack_format: config.packFormat,
            description: config.description,
        },
    };

    fs.writeFileSync(mcmetaPath, JSON.stringify(mcmeta));

    console.log('Done!');
};