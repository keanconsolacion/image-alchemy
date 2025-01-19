import React, { useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { isEmpty } from "lodash-es";
import { useController, FormProvider, useForm } from "react-hook-form";
import ActionUtils from "./utils";
const FileDownload = require("js-file-download");

const DROPZONE_ACCEPT = {
	"image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp", ".heic", ".heif"],
};

const COOK_STATUS = {
	INITIAL: "initial",
	PROCESSING: "processing",
	COMPLETED: "completed",
};

const COOK_STATUS_TO_BUTTON_CONTENT_MAPPING = {
	[COOK_STATUS.INITIAL]: <p>Download</p>,
	[COOK_STATUS.PROCESSING]: (
		<svg
			className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
			<path
				className="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			></path>
		</svg>
	),
	[COOK_STATUS.COMPLETED]: <p>Cook again</p>,
};

const Actions = () => {
	const formMethods = useForm({});
	const { control, reset, setValue } = formMethods;

	const [cookStatus, setCookStatus] = useState(COOK_STATUS.INITIAL);

	const {
		field: { value: width, onChange: onChangeWidth },
	} = useController({
		name: "width",
		control,
	});
	const {
		field: { value: height, onChange: onChangeHeight },
	} = useController({
		name: "height",
		control,
	});
	const {
		field: { value: fit, onChange: onChangeFit },
	} = useController({
		name: "fit",
		control,
		defaultValue: "cover",
	});
	const {
		field: { value: type, onChange: onChangeType },
	} = useController({
		name: "type",
		control,
		defaultValue: "jpg",
	});
	const {
		field: { value: flip, onChange: onChangeFlip },
	} = useController({
		name: "flip",
		control,
		defaultValue: false,
	});
	const {
		field: { value: flop, onChange: onChangeFlop },
	} = useController({
		name: "flop",
		control,
		defaultValue: false,
	});
	const {
		field: { value: watermark, onChange: onChangeWatermark },
	} = useController({
		name: "watermark",
		control,
	});
	const {
		field: { value: files, onChange: onChangeFiles },
	} = useController({
		name: "files",
		control,
	});

	const onClickCook = async () => {
		try {
			setCookStatus(COOK_STATUS.PROCESSING);
			const data = new FormData();
			const options = { height, width, fit, flip, flop, type };

			Object.entries(options).forEach(([key, value]) => {
				if (value) data.append(key, value);
			});

			if (!isEmpty(watermark)) {
				data.append("watermark", watermark[0]);
			}

			files.forEach((file) => data.append("images", file));

			const res = await axios.post("/transform", data, { responseType: "blob" });

			FileDownload(res.data, "images.zip");
		} catch (e) {
			alert("Something went wrong. Try again later");
			setCookStatus(COOK_STATUS.INITIAL);
		} finally {
			setTimeout(() => {
				setCookStatus(COOK_STATUS.COMPLETED);
			}, 2000);
		}
	};

	const onClickCookAgain = () => {
		setCookStatus(COOK_STATUS.INITIAL);
		reset();
	};

	return (
		<FormProvider {...formMethods}>
			<div className="flex flex-col items-center justify-center gap-12 mx-4">
				{/* Options */}
				<div className="flex flex-col items-center gap-6 text-center md:relative">
					<div className="md:absolute md:left-[-180px] md:top-10 text-xl text-end">
						<h1 className="text-slate-300 text-lg">
							Just <span className="text-[#ffc800] font-bold">select</span> your <br /> preferred options:
						</h1>
					</div>

					<div className="flex flex-col gap-3 p-3 bg-transparent border border-slate-500 rounded w-[248px]">
						<div className="flex flex-col gap-1 items-start">
							<label>Width in pixels</label>
							<input
								className="p-1 w-[222px] bg-transparent border border-slate-400 placeholder-slate-700 rounded"
								type="number"
								placeholder="Default"
								onChange={(e) => onChangeWidth(e.target.value)}
								value={width}
							/>
						</div>

						<div className="flex flex-col gap-1 items-start">
							<label>Height in pixels</label>
							<input
								className="p-1 w-[222px] bg-transparent border border-slate-400 placeholder-slate-700 rounded"
								type="number"
								placeholder="Default"
								onChange={(e) => onChangeHeight(e.target.value)}
								value={height}
							/>
						</div>

						<div className="flex flex-col gap-1 items-start">
							<label className="flex gap-1">
								Fit {ActionUtils.addTip("Dictates how the image is fitted whenever width and height must be changed.")}
							</label>
							<select
								className="p-1 w-[222px] text-white bg-transparent border border-slate-400 rounded"
								onChange={(e) => onChangeFit(e.target.value)}
								value={fit}
							>
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
						</div>

						<div className="flex flex-col gap-1 items-start">
							<label>File type</label>
							<select
								className="p-1 w-[222px] text-white bg-transparent border border-slate-400 rounded"
								onChange={(e) => onChangeType(e.target.value)}
								value={type}
							>
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
						</div>

						<div className="flex flex-col gap-1 items-start">
							<label>Watermark</label>
							<div className="flex flex-col gap-2 items-end">
								<Dropzone
									onDrop={(acceptedFiles) => {
										isEmpty(acceptedFiles) ? onChangeWatermark() : onChangeWatermark(acceptedFiles);
									}}
									accept={DROPZONE_ACCEPT}
									maxFiles={1}
								>
									{({ getRootProps, getInputProps }) => (
										<section className="cursor-pointer">
											<div className="flex flex-col items-center gap-6 text-center md:relative" {...getRootProps()}>
												<div className="flex flex-col gap-2 p-2 w-[222px] justify-center items-center  border-2 border-dashed border-slate-500 rounded scale-animation">
													<div className="">
														<h1 className="flex items-center gap-1 font-bold">
															{watermark ? (
																"Uploaded"
															) : (
																<div className="flex items-center gap-2 ">
																	<svg
																		xmlns="http://www.w3.org/2000/svg"
																		className="w-4 h-4"
																		fill="none"
																		viewBox="0 0 24 24"
																		stroke="currentColor"
																	>
																		<path
																			strokeLinecap="round"
																			strokeLinejoin="round"
																			strokeWidth="2"
																			d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
																		/>
																	</svg>{" "}
																	Upload watermark
																</div>
															)}
														</h1>
													</div>
													<input {...getInputProps()} />
												</div>
											</div>
										</section>
									)}
								</Dropzone>
								{watermark && (
									<button className="w-12 underline text-xs" onClick={() => setValue("watermark", undefined)}>
										Clear?
									</button>
								)}
							</div>
						</div>

						<div className="flex flex-col gap-1 items-start">
							<label>Rotations</label>
							<div className="flex justify-center gap-2">
								<div className="flex gap-1">
									<input type="checkbox" onClick={() => onChangeFlip(!flip)} />
									<label>Flip {ActionUtils.addTip("Flip the image about the vertical Y axis.")}</label>
								</div>
								<div className="flex gap-1">
									<input type="checkbox" onClick={() => onChangeFlop(!flop)} />
									<label>Flop {ActionUtils.addTip("Flop the image about the horizontal X axis.")}</label>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Image drop */}
				<div className="flex flex-col gap-2 items-end">
					<Dropzone onDrop={(acceptedFiles) => onChangeFiles(acceptedFiles)} accept={DROPZONE_ACCEPT} maxFiles={20}>
						{({ getRootProps, getInputProps }) => (
							<section className="cursor-pointer">
								<div className="flex flex-col items-center gap-6 text-center md:relative" {...getRootProps()}>
									<h1 className="md:absolute md:left-[-140px] md:top-10 text-slate-300 text-lg text-end">
										<span className="text-[#FFC700] font-bold">Upload </span>
										your <br /> images here:
									</h1>
									<div className="flex flex-col gap-2 p-6 justify-center items-center w-[248px] border-2 border-dashed border-slate-500 rounded scale-animation">
										<div className="flex flex-col items-center">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="w-7 h-7"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
												/>
											</svg>
											<h1 className="font-bold">Upload images</h1>
										</div>
										<div className="text-center">
											<h1 className="text-sm text-slate-500">
												{files
													? `${files.length} image/s uploaded`
													: "Allowed types are jpg/jpeg, png, webp, gif, & heic/heif"}
											</h1>
										</div>
										<input {...getInputProps()} />
									</div>
								</div>
							</section>
						)}
					</Dropzone>
					{files && (
						<button className="w-12 underline text-xs" onClick={() => setValue("files", undefined)}>
							Clear?
						</button>
					)}
				</div>

				{/* Cook button */}
				<div className="flex flex-col items-center gap-6 text-center md:relative">
					<h1 className="md:absolute md:left-[-220px] top-2 text-lg text-end text-slate-300 ">
						And finally,
						<span className="text-[#FFC700] font-bold"> Download!</span>
					</h1>
					<div className="flex flex-col gap-6 justify-center items-center w-[248px]">
						<button
							className={`w-full text-lg font-bold border border-slate-300 rounded scale-animation py-1.5 ${
								isEmpty(files) ? "cursor-not-allowed" : "cursor-pointer"
							}`}
							onClick={cookStatus === COOK_STATUS.COMPLETED ? onClickCookAgain : onClickCook}
							disabled={isEmpty(files)}
						>
							{COOK_STATUS_TO_BUTTON_CONTENT_MAPPING[cookStatus]}
						</button>
					</div>
				</div>
			</div>
		</FormProvider>
	);
};

export default Actions;
