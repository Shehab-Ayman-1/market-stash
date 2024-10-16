import { useEffect, useState } from "react";
import "./styles/alert.scss";

export const Alert = ({ message, success, error }) => {
	const [show, setShow] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setShow(false);
		}, 5000);
	}, [success, error, message]);

	return (
		<div className={`alert-section ${show ? "" : "hide-display"}`}>
			{success && (
				<div className="success">
					<i className="far fa-check-square" />
					<p>{message}</p>
				</div>
			)}

			{error && (
				<div className="error">
					<i className="fa fa-times" />
					<p>{message}</p>
				</div>
			)}
		</div>
	);
};
