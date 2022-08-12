const fs = require("fs").promises;
const uuid = require("uuid");
const sharp = require("sharp");
const router = require("express").Router();

const { INVALID_PARAMS, INSUFFICIENT_PARAMS, IMAGE_NOT_FOUND, INVALID_TYPE, INVALID_PAYLOAD, WENT_WRONG } = require("../utils/error");
const { convertType, convertSize } = require("../utils/sharpHelper");
const { generateZIP } = require("../utils/zipper");

const IMAGES_PATH = "cache/images";

const upload = require("multer")({
  limits: {
    fileSize: 1000 * 1000 * 10, // 10MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp|gif|heic|heif)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(undefined, true);
  },
});
const errorHandler = (error, req, res, next) => {
  res.status(400).send(INVALID_PAYLOAD);
};

router.post(
  "/transform",
  upload.array("images", 20),
  async (req, res) => {
    const { width, height, type, fit, flip, flop } = req.body;
    const requiredParams = ["type"];
    const allowedParams = ["width", "height", "type", "fit", "flip", "flop"];
    const validTypes = ["jpg", "png", "webp", "gif"];

    if (req.files.length < 1) return res.status(400).send(IMAGE_NOT_FOUND);
    if (!requiredParams.every((requiredParam) => Object.keys(req.body).includes(requiredParam))) return res.status(400).send(INSUFFICIENT_PARAMS);
    if (!Object.keys(req.body).every((param) => allowedParams.includes(param))) return res.status(400).send(INVALID_PARAMS);
    if (type && !validTypes.includes(type)) return res.status(400).send(INVALID_TYPE);

    const id = uuid.v4();
    const filePaths = [];
    const processDirectory = `${IMAGES_PATH}/${id}`;
    await fs.mkdir(processDirectory);

    try {
      for (const [index, file] of req.files.entries()) {
        const filePath = `${IMAGES_PATH}/${id}/${index}.${type}`;
        let sharpImg = sharp(file.buffer);

        // Type Conversion
        sharpImg = convertType(sharpImg, type);
        // Width & Height Conversion With Fit
        sharpImg = width && height ? convertSize(sharpImg, width, height, fit) : sharpImg;
        // Flip & Flop
        sharpImg = flip ? sharpImg.flip() : sharpImg;
        sharpImg = flop ? sharpImg.flop() : sharpImg;
        // To Buffer
        const output = await sharpImg.toBuffer();

        await fs.writeFile(filePath, output);
        filePaths.push(filePath);
      }

      // Generate ZIP File
      const zipFilePath = await generateZIP(filePaths, `${id}.zip`);

      res.attachment("images.zip");
      res.download(zipFilePath, async (error) => {
        if (error) res.status(500).send(WENT_WRONG);
        // Delete all files generated into cache folder
        try {
          await fs.unlink(zipFilePath);
          await fs.rmdir(`${IMAGES_PATH}/${id}`, { recursive: true });
        } catch (e) {
          console.log("Error on deleting", e.message);
        }
      });
    } catch (e) {
      return res.status(500).send(WENT_WRONG);
    }
  },
  errorHandler
);

module.exports = router;
