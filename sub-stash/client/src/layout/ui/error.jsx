import { useLocation } from "react-router-dom";
import "./styles/error.scss";

export const Error = ({ message }) => {
	const location = useLocation();
	return (
		<div className="error-section">
			<div className="top">
				<i className="fa fa-times-circle" />
			</div>
			<div className="bottom" dir="ltr">
				<h3>Oh My God !</h3>
				<p>{message}</p>
				<div className="">
					{Object.keys(location).map((key) => (
						<p key={key}>{location[key] && `${key} : [ ${location[key]} ]`}</p>
					))}
				</div>
			</div>
		</div>
	);
};
