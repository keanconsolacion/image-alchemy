import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./Components/App";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

const root = createRoot(document.querySelector("#root"));

root.render(
	<BrowserRouter>
		<div className="relative flex flex-col items-center w-full min-h-screen">
			<Navbar />
			<Routes>
				<Route index path="/" element={<App />} />
			</Routes>
			<Footer />
		</div>
	</BrowserRouter>
);
