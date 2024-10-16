import { useState } from "react";
import "./styles/dropdown.scss";

export const Dropdown = ({ icon, windowClose, linkClose, children }) => {
	const [open, setOpen] = useState(false);

	const handleToggle = () => {
		setOpen(!open);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<section className={`dropdown-section ${open ? "" : "close"}`}>
			<div className="dropdown-icon" onClick={handleToggle}>
				{typeof icon === "string" ? <i className={icon} /> : icon}
			</div>

			<div className="dropdown-items" onClick={linkClose ? handleClose : () => {}}>
				{children}
			</div>

			{windowClose && <div className={`overlay ${open ? "" : "hide-display"}`} onClick={handleClose} />}
		</section>
	);
};
