const JSZip = require("jszip");
const fs = require("fs").promises;

const ZIP_PATH = "cache/images-zip";

const generateZIP = async (filePaths, name) => {
  const zipFilePath = `${ZIP_PATH}/${name}`;
  try {
    //Initialize Zip
    const zip = new JSZip();
    //Stage files to zip folder
    for (const filePath of filePaths) {
      const fileContent = fs.readFile(filePath);
      zip.file(filePath, fileContent, { base64: true });
    }
    //Generate Zip file
    const content = await zip.generateAsync({ type: "nodebuffer" });
    await fs.writeFile(zipFilePath, content);
  } catch (e) {
    console.log(`Zip Compression Failed: ${e.message}`);
  }
  return zipFilePath;
};

module.exports = {
  generateZIP,
};
