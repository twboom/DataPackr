import { platform } from 'os';
import { spawnSync } from 'child_process';

// Synchronously prompts the user for input.
// Like in Python
export function input(message, defaultInput = undefined) {
    // Write the message
    process.stdout.write(message);

    // Work out shell command to prompt for a string and echo it to stdout
    let cmd;
    let args;
    if (platform() == "win32") {
        cmd = 'cmd';
        args = [ '/V:ON', '/C', 'set /p response= && echo !response!' ];
    } else {
        cmd = 'bash';
        args = [ '-c', 'read response; echo "$response"' ];
    }

    // Pipe stdout back to self so we can read the echoed value
    let opts = { 
        stdio: [ 'inherit', 'pipe', 'inherit' ],
        shell: false,
    };

    // Run it
    const result = spawnSync(cmd, args, opts).stdout.toString().trim();
    if (result === '') {
        return defaultInput;
    } else {
        return result;
    };
};