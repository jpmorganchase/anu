import fs from 'fs';
import path from 'path';

// Define the source and destination paths
const source = path.join(process.cwd(), 'src', 'assets', './', 'roboto-regular.png');
const destination = path.join(process.cwd(), 'dist', 'assets', './', 'roboto-regular.png');

// Ensure the destination directory exists
fs.mkdirSync(path.dirname(destination), { recursive: true });

// Copy the file
fs.copyFileSync(source, destination);

console.log('PNG file copied to the output directory.');