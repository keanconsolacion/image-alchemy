const fs = require("fs").promises;
const uuid = require("uuid");
const sharp = require("sharp");
const router = require("express").Router();
const multer = require("multer");

const {
	INVALID_PARAMS,
	INSUFFICIENT_PARAMS,
	IMAGE_NOT_FOUND,
	INVALID_TYPE,
	INVALID_PAYLOAD,
	WENT_WRONG,
} = require("../utils/error");
const { convertType, convertSize, applyWatermark } = require("../utils/sharpHelper");
const { generateZIP } = require("../utils/zipper");

const IMAGES_PATH = "images";

const upload = multer({
	limits: {
		fileSize: 1000 * 1000 * 10, // 10MB
	},
	fileFilter(req, file, cb) {
		if (!file.originalname.match(/\.(jpg|jpeg|png|webp|gif|heic|heif)$/)) {
			return cb(new Error("Please upload an image with the"));
		}
		cb(undefined, true);
	},
}).fields([
	{ name: "images", maxCount: 20 },
	{ name: "watermark", maxCount: 1 },
]);

const errorHandler = (error, req, res, next) => {
	console.log(error);
	res.status(400).send(INVALID_PAYLOAD);
};

router.post(
	"/transform",
	upload,
	async (req, res) => {
		const { width, height, type, fit, flip, flop } = req.body;
		const watermark = req.files.watermark?.[0];
		const requiredParams = ["type"];
		const allowedParams = ["width", "height", "type", "fit", "flip", "flop", "watermark"];
		const validTypes = ["jpg", "png", "webp", "gif"];

		if (req.files.images.length < 1) {
			return res.status(400).send(IMAGE_NOT_FOUND);
		}
		if (!requiredParams.every((requiredParam) => Object.keys(req.body).includes(requiredParam))) {
			return res.status(400).send(INSUFFICIENT_PARAMS);
		}
		if (!Object.keys(req.body).every((param) => allowedParams.includes(param))) {
			return res.status(400).send(INVALID_PARAMS);
		}
		if (type && !validTypes.includes(type)) {
			return res.status(400).send(INVALID_TYPE);
		}

		const id = uuid.v4();
		const filePaths = [];
		const processDirectory = `${IMAGES_PATH}/${id}`;

		await fs.mkdir(processDirectory);

		try {
			for (const [index, file] of req.files.images.entries()) {
				const filePath = `${IMAGES_PATH}/${id}/${index}.${type}`;
				let sharpImg = await sharp(file.buffer);

				// Type Conversion
				if (type) {
					sharpImg = convertType(sharpImg, type);
				}
				// Width & Height Conversion With Fit
				if (width && height) {
					sharpImg = convertSize(sharpImg, width, height, fit);
				}
				// Flip
				if (flip) {
					sharpImg = sharpImg.flip();
				}
				// Flop
				if (flop) {
					sharpImg = sharpImg.flop();
				}
				// Watermark
				if (watermark) {
					await applyWatermark(sharpImg, watermark);
				}

				const output = await sharpImg.toBuffer();

				await fs.writeFile(filePath, output);
				filePaths.push(filePath);
			}

			// Generate to ZIP File
			const zipFilePath = await generateZIP(filePaths, `${id}.zip`);

			res.attachment("images.zip");
			res.download(zipFilePath, async (error) => {
				// Delete all files generated into cache folder
				await fs.unlink(zipFilePath);
				await fs.rm(`${IMAGES_PATH}/${id}`, { recursive: true });
				if (error) {
					res.status(500).send(WENT_WRONG);
				}
			});
		} catch (e) {
			console.log(e);
			return res.status(500).send(WENT_WRONG);
		}
	},
	errorHandler
);

module.exports = router;
