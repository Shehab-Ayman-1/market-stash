import { useLocation } from "react-router-dom";
import "./styles/error.scss";

export const Error = ({ message }) => {
	const { pathname, state } = useLocation();
	return (
		<div className="error-section">
			<div className="top">
				<i className="fa fa-times-circle" />
			</div>
			<div className="bottom">
				<h3>Oh My God!</h3>
				<p>{message}</p>
				<p>{pathname}</p>
				<p>{state}</p>
			</div>
		</div>
	);
};
