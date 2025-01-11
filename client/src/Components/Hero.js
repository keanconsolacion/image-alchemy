import React from "react";

const Hero = () => {
	return (
		<div className="flex flex-col items-center gap-12">
			<div className="flex flex-col text-center">
				<h1 className="p-2 text-6xl lg:text-7xl xl:text-8xl font-extrabold text-transparent bg-gradient-to-r bg-clip-text from-[#FF00D6] via-[#654BFF] to-[#FF0000]">
					Image Alchemy
				</h1>
			</div>
			<div className="flex flex-col md:flex-row gap-4 mx-6 font-light">
			<div className="p-2 border border-slate-500 w-[300px] lg-[400px]">
					<h1 className="font-bold text-[#FFC700] text-lg">What is it?</h1>
					<p>
						Image Alchemy is a powerful bulk image processing tool built on the Sharp npm module. It enables you to
						transform and edit up to 20 images at once with ease!
					</p>
				</div>
				<div className="p-2 border border-slate-500 w-[300px] lg-[400px]">
					<h1 className="font-bold text-[#FFC700] text-lg">Why use it?</h1>
					<p>
						With Image Alchemy, you can effortlessly transform, convert, and optimize images—all in one seamless
						process. Say goodbye to tedious tasks and hello to efficiency!
					</p>
				</div>
			</div>
		</div>
	);
};

export default Hero;
