import React from "react";

const Hero = () => {
	return (
		<div className="flex flex-col items-center gap-12">
			<div className="flex flex-col text-center">
				<h1 className="text-3xl font-bold md:text-4xl">Welcome to</h1>
				<h1 className="p-2 text-7xl md:text-8xl font-black text-transparent bg-gradient-to-r bg-clip-text from-[#FF00D6] via-[#654BFF] to-[#FF0000]">
					Image Alchemy
				</h1>
			</div>
			<div className="flex gap-4 mx-6 font-serif">
				<div className="p-2 border border-white">
					<h1 className="font-bold text-[#FFC700]">What is it?</h1>
					<h1>
						Image Alchemy is a bulk image processing tool
						<br /> based on the Sharp npm module that transforms
						<br /> and edit you images. (up to 20 images at a time!)
					</h1>
				</div>
				<div className="p-2 border border-white">
					<h1 className="font-bold text-[#FFC700]">Why use it?</h1>
					<h1>
						By using Image Alchemy, you can transform, <br /> convert type, and minify images all <br /> in one go.
						Thus, eliminating tedious tasks!
					</h1>
				</div>
			</div>
		</div>
	);
};

export default Hero;
