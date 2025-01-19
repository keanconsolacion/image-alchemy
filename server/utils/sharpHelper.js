const sharp = require("sharp");

const convertType = (image, type) => {
	if (!image || !type) throw new Error("Failed to convert type due to missing parameters");
	switch (type) {
		case "jpg":
			return image.jpeg();
		case "png":
			return image.png();
		case "webp":
			return image.webp();
		case "gif":
			return image.gif();
		default:
			return null;
	}
};

const convertSize = (image, width, height, fit = "cover") => {
	const validFits = ["cover", "contain", "fill", "inside", "outside"];
	if (!image || !width || !height) throw new Error("Failed to resize due to missing parameters");
	if (!validFits.includes(fit)) fit = "cover";
	return image.resize(parseInt(width), parseInt(height), { fit: fit });
};

const applyWatermark = async (sharpImg, watermark) => {
	const { width, height } = await sharpImg.metadata();
	const sharpWatermark = await sharp(watermark.buffer).png().ensureAlpha(0.1);
	const processedWatermark = await sharpWatermark
		.resize({
			width: Math.floor(width * 0.33),
			height: Math.floor(height * 0.33),
			fit: "inside",
		})
		.toBuffer();
	return sharpImg.composite([
		{
			input: processedWatermark,
			gravity: "southeast",
			blend: "overlay",
		},
	]);
};

module.exports = {
	convertType,
	convertSize,
	applyWatermark,
};
