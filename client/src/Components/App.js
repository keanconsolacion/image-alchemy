import React from "react";
import Hero from "./Hero";
import Actions from "./Actions";

const App = () => {
	return (
		<div className="flex flex-1 flex-col lg:flex-row justify-center items-center gap-[40px] lg:gap-[180px] mx-6 py-16">
			<Hero />
			<Actions />
		</div>
	);
};

export default App;
