import React, { useState } from "react";
import axios from "axios";
const FileDownload = require("js-file-download");

const Actions = () => {
	const [width, setWidth] = useState();
	const [height, setHeight] = useState();
	const [fit, setFit] = useState("cover");
	const [type, setType] = useState("jpg");
	const [flip, setFlip] = useState(false);
	const [flop, setFlop] = useState(false);
	const [files, setFiles] = useState();
	const [fileCount, setFileCount] = useState("Allowed types are jpg/jpeg, png, webp, gif, & heic/heif");
	const [cookStatus, setCookStatus] = useState(0);

	const onChangeWidth = (e) => setWidth(e.target.value);
	const onChangeHeight = (e) => setHeight(e.target.value);
	const onChangeFit = (e) => setFit(e.target.value);
	const onChangeType = (e) => setType(e.target.value);
	const onClickFlip = () => setFlip(!flip);
	const onClickFlop = () => setFlop(!flop);
	const onChangeFiles = (e) => {
		const allowedTypes = ["jpg", "jpeg", "png", "webp", "gif", "heic", "heif"];
		const isValid = Object.values(e.target.files).every((file) => {
			return allowedTypes.includes(file.type.replace("image/", ""));
		});
		if (!isValid) {
			setFiles();
			alert("Please only upload valid file types (jpg/jpeg, png, webp, gif & heic/heif)");
			return;
		}
		setFileCount(`${e.target.files.length} image/s uploaded`);
		setFiles(e.target.files);
		console.log("files", e.target.value);
	};

	const onClickCook = async () => {
		if (!files) return;

		//Set Cook Status to 1 - In progress
		setCookStatus(1);

		try {
			// Set form data
			const data = new FormData();
			if (height && width) {
				data.append("height", height);
				data.append("width", width);
				data.append("fit", fit);
			}
			if (flip) data.append("flip", true);
			if (flop) data.append("flop", true);
			for (const file of files) {
				data.append("images", file);
			}
			data.append("type", type);

			// Submit Form
			const res = await axios.post("/transform", data, { responseType: "blob" });
			// Download File
			FileDownload(res.data, "images.zip");
			// Set Cook Status to 2 - Completed
			setTimeout(() => {
				setCookStatus(2);
			}, 5000);
		} catch (e) {
			console.log(e.response.data.detail ?? e.response.data.error);
			alert(e.response.data.detail ?? e.response.data.error ?? "Something went wrong. Try again later");
			setCookStatus(0);
		}
	};

	const onClickCookAgain = () => {
		setCookStatus(0);
		setFiles();
		setFileCount("Allowed types are jpg/jpeg, png, webp, gif, & heic/heif");
	};

	const renderCookProgress = () => {
		if (cookStatus === 0) {
			return (
				<div className="text-lg font-bold border rounded scale-animation">
					<button className="py-1.5 px-6" onClick={onClickCook}>
						Cook
					</button>
				</div>
			);
		}
		if (cookStatus === 1) {
			return (
				<>
					<img className="w-full h-full rounded" src="./cooking.gif" alt="cooking.gif" />
					<h1>Processing...</h1>
				</>
			);
		}
		if (cookStatus === 2) {
			return (
				<button className="py-1.5 px-6 border rounded scale-animation" onClick={onClickCookAgain}>
					Cook again!
				</button>
			);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center gap-12 mx-4 mt-20">
			{/* Options */}
			<div className="flex gap-4">
				<div className="font-serif text-xl w-44 text-end">
					<h1>
						Just <span className="text-[#FFC700] font-bold">select</span>
						<br />
						your preferred
						<br />
						options,
					</h1>
				</div>

				<div className="flex flex-col gap-2 p-2 bg-transparent border rounded">
					<label>Width in pixels</label>
					<input
						className="p-1 bg-transparent border border-white placeholder-slate-700"
						type="number"
						placeholder="Default"
						onChange={onChangeWidth}
					/>
					<label>Height in pixels</label>
					<input
						className="p-1 bg-transparent border border-white placeholder-slate-700"
						type="number"
						placeholder="Default"
						onChange={onChangeHeight}
					/>

					<label className="flex gap-1">
						Fit {addTip("Dictates how the image is fitted whenever width and height must be changed.")}
					</label>
					<select className="p-1 text-white bg-transparent border border-white" onChange={onChangeFit}>
						<option className="text-black" value="cover">
							Cover
						</option>
						<option className="text-black" value="contain">
							Contain
						</option>
						<option className="text-black" value="fill">
							Fill
						</option>
						<option className="text-black" value="inside">
							Inside
						</option>
						<option className="text-black" value="outside">
							Outside
						</option>
					</select>

					<label>File type destination</label>
					<select className="p-1 text-white bg-transparent border border-white" onChange={onChangeType}>
						<option className="text-black" disabled={true}>
							File Type
						</option>
						<option className="text-black" value="jpg">
							jpg/jpeg
						</option>
						<option className="text-black" value="png">
							png
						</option>
						<option className="text-black" value="webp">
							webp
						</option>
						<option className="text-black" value="gif">
							gif
						</option>
					</select>

					<label>Rotations</label>
					<div className="flex justify-start gap-2">
						<div className="flex gap-1">
							<input type="checkbox" onClick={onClickFlip} />
							<label>Flip {addTip("Flip the image about the vertical Y axis.")}</label>
						</div>
						<div className="flex gap-1">
							<input type="checkbox" onClick={onClickFlop} />
							<label>Flop {addTip("Flop the image about the horizontal X axis.")}</label>
						</div>
					</div>
				</div>
			</div>

			{/* Image drop */}
			<div className="flex gap-4">
				<h1 className="font-serif text-xl w-44 text-end">
					<span className="text-[#FFC700] font-bold"> Upload</span>
					<br />
					your images
					<br />
					here,
				</h1>
				<label className="flex flex-col gap-2 p-6 justify-center items-center w-[248px] border-2 border-dashed rounded scale-animation">
					<div className="flex flex-col items-center">
						{uploadLogo}
						<h1 className="font-bold">Upload images</h1>
					</div>
					<div className="text-center">
						<h1 className="text-sm text-slate-500">{fileCount}</h1>
					</div>
					<input type="file" className="w-[248px] opacity-0 hidden" multiple={true} onChange={onChangeFiles} />
				</label>
			</div>

			{/* Cook button */}
			<div className="flex w-full gap-4">
				<h1 className="font-serif text-xl w-44 text-end">
					And Finally, <br />
					<span className="text-[#FFC700] font-bold">Cook!</span>
				</h1>
				<div className="flex flex-col gap-6 justify-center items-center w-[248px]">{renderCookProgress()}</div>
			</div>
		</div>
	);
};

const addTip = (text = "tip") => {
	return (
		<span data-toggle="tooltip" title={text}>
			<svg
				className="inline w-4 h-4 scale-animation"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		</span>
	);
};
const uploadLogo = (
	<svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
		/>
	</svg>
);

export default Actions;
