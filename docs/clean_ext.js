import fs from "fs";
import path from "path"

// Directory to search
const directory = './public/tutorial';

// Function to rename files
function renameFiles(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error(`Error reading directory: ${err}`);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(dir, file);

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error(`Error getting stats of file: ${err}`);
                    return;
                }

                if (stats.isDirectory()) {
                    // Recursively rename files in subdirectories
                    renameFiles(filePath);
                } else if (file.endsWith('.html.html')) {
                    const newFilePath = path.join(dir, file.replace(/\.html\.html$/, '.html'));
                    fs.rename(filePath, newFilePath, err => {
                        if (err) {
                            console.error(`Error renaming file: ${err}`);
                        } else {
                            console.log(`Renamed: ${filePath} -> ${newFilePath}`);
                        }
                    });
                }
            });
        });
    });
}

// Start renaming process
renameFiles(directory);