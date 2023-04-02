const fs = require('fs');
const path = require('path');
const xmldoc = require('xmldoc');

const SVG_DIR = 'src/themes'; // directory containing the SVG files
const SPRITE_SOURCES_FILE = './__SPRITE_SOURCES__.js'; // output file

// Recursively read all files in a directory and its subdirectories
function readFiles(dir, filesList = []) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      readFiles(filePath, filesList);
    } else {
      filesList.push(filePath);
    }
  }

  return filesList;
}

// Extract SVG content from a file and convert it to an XML document object
function extractSvgContent(filePath) {
  const svgContent = fs.readFileSync(filePath, 'utf-8');
  const svgXml = new xmldoc.XmlDocument(svgContent);
  return svgXml.toString();
}

// Get all SVG files and extract their content as XML document objects
const svgFiles = readFiles(SVG_DIR).filter(
  (filePath) => path.extname(filePath) === '.svg'
);
const spriteSources = {};
for (const filePath of svgFiles) {
  const fileName = path.basename(filePath);
  spriteSources[fileName] = extractSvgContent(filePath);
}

// Write the spriteSources object to a file as a JS variable
fs.writeFileSync(
  SPRITE_SOURCES_FILE,
  `const __SPRITE_SOURCES__ = ${JSON.stringify(
    spriteSources,
    null,
    2
  )};\nmodule.exports = __SPRITE_SOURCES__;`
);

console.log(`__SPRITE_SOURCES__ file generated: ${SPRITE_SOURCES_FILE}`);
