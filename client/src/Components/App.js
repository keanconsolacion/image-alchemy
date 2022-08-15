import React from "react";
import Hero from "./Hero";
import Actions from "./Actions";

const App = () => {
	return (
		<div className="w-full mt-10 mb-32 md:mt-20">
			<div className="flex flex-col items-center">
				<Hero />
				<Actions />
			</div>
		</div>
	);
};

export default App;
