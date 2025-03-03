import fs from "fs";
import path from "path";

// Directory to search
const directory = './public/tutorial';

// Function to rename files and update index.html
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
                } else if (file === 'index.html') {
                    // Add script tag to index.html
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            console.error(`Error reading index.html: ${err}`);
                            return;
                        }

                        // Check if the script tag already exists
                        if (!data.includes('<script src="coi-serviceworker.min.js"></script>')) {
                            const updatedData = data.replace(
                                /<\/body>/i,
                                '    <script src="coi-serviceworker.min.js"></script>\n</body>'
                            );

                            fs.writeFile(filePath, updatedData, 'utf8', err => {
                                if (err) {
                                    console.error(`Error writing to index.html: ${err}`);
                                } else {
                                    console.log(`Updated index.html with script tag.`);
                                }
                            });
                        }
                    });
                }
            });
        });
    });
}

// Start renaming process
renameFiles(directory);