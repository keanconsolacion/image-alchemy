import React from "react";

const Hero = () => {
	return (
		<div className="flex flex-col items-center gap-4">
			<div className="flex flex-col text-center">
				<h1 className="p-2 text-6xl lg:text-7xl xl:text-8xl font-extrabold text-transparent bg-gradient-to-r bg-clip-text from-[#FF00D6] via-[#654BFF] to-[#FF0000]">
					Image Alchemy
				</h1>
			</div>
			<div className="flex flex-col md:flex-row gap-4 mx-6 font-light">
				<p className="text-lg text-center p-2 max-w-[600px] rounded lg:max-w-[700px] text-slate-300">
						With Image Alchemy, you can effortlessly transform, convert, apply watermark, and optimize images—all in one seamless
						process. Say goodbye to tedious tasks and hello to efficiency!
				</p>
			</div>
		</div>
	);
};

export default Hero;
