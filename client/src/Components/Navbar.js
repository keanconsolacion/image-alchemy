import React from "react";
import { NavLink, Link } from "react-router-dom";

const logo = (
	<svg className="inline w-6 h-6" fill="#FFC700" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
		<path
			fillRule="evenodd"
			d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z"
			clipRule="evenodd"
		/>
	</svg>
);

const Navbar = () => {
	return (
		<div className="w-full">
			<div className="flex items-end justify-between m-10">
				<Link to="/" className="flex items-end gap-2 scale-animation">
					{logo}
					<h1 className="font-bold">
						Image <span className="text-[#FFC700]">Alchemy</span>
					</h1>
				</Link>
				<div className="flex gap-4 text-sm">
					<NavLink to="/" className={({ isActive }) => (isActive ? "font-bold scale-animation" : "scale-animation")}>
						Home
					</NavLink>
					<a href="https://github.com/keanconsolacion/image-alchemy" className="scale-animation">
						Get Access
					</a>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
