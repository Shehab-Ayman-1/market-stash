import { useState } from "react";
import "./styles/dropdown.scss";

export const Dropdown = ({ icon, autoClosable, children }) => {
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<section className={`dropdown-section ${open ? "" : "close"}`}>
			<div className="dropdown-icon" onClick={handleOpen}>
				{typeof icon === "string" ? <i className={icon} /> : icon}
			</div>

			<div className="dropdown-items">{children}</div>

			<div className={`overlay ${open ? "" : "hide-display"}`} onClick={handleClose} />
		</section>
	);
};
