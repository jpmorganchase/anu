import fs from 'fs';
import path from 'path';

/**
 * Adds a script tag to every .html file in the specified directory.
 * @param {string} dirPath - The path to the directory containing .html files.
 * @param {string} scriptSrc - The source URL of the script to be added.
 */
function addScriptTagToHtmlFiles() {
    let dirPath = "./public/tutorial"
    let scriptSrc = "coi-serviceworker.min.js"
  // Read the directory
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err.message}`);
      return;
    }

    // Filter for .html files
    const htmlFiles = files.filter(file => path.extname(file) === '.html');

    htmlFiles.forEach(file => {
      const filePath = path.join(dirPath, file);

      // Read each .html file
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(`Error reading file ${file}: ${err.message}`);
          return;
        }

        // Check if the script tag already exists
        if (data.includes(`<script src="${scriptSrc}"></script>`)) {
          console.log(`Script tag already exists in ${file}`);
          return;
        }

        // Add the script tag before the closing </body> tag
        const updatedData = data.replace(
          /<\/body>/i,
          `  <script src="${scriptSrc}"></script>\n</body>`
        );

        // Write the updated content back to the file
        fs.writeFile(filePath, updatedData, 'utf8', err => {
          if (err) {
            console.error(`Error writing file ${file}: ${err.message}`);
            return;
          }
          console.log(`Script tag added to ${file}`);
        });
      });
    });
  });
}

addScriptTagToHtmlFiles()

export default addScriptTagToHtmlFiles;