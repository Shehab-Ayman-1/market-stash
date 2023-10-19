import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/layout";
import "./styles/wrapper.scss"

export const Wrapper = () => {
	return (
		<Fragment>
			<Navbar />
			<div className="app">
				<Outlet />
			</div>
		</Fragment>
	);
};
