const fs = require('fs');
const path = require('path');

function getAllSvgFiles(dirPath, regex) {
  const files = fs.readdirSync(dirPath);

  let filepaths = [];

  files.forEach(function (file) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      filepaths = filepaths.concat(getAllSvgFiles(filePath, regex));
    } else if (regex.test(file)) {
      filepaths.push(filePath);
    }
  });

  return filepaths;
}

const svgFiles = getAllSvgFiles('src/themes', /\.svg$/);
const output = `export default ${JSON.stringify(svgFiles)};`;

fs.writeFileSync('themesDirectory.ts', output);
