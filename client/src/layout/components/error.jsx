import "./styles/error.scss";

export const Error = ({ message }) => {
	return (
		<div className="error-section">
			<div className="top">
				<i className="fa fa-times-circle" />
			</div>
			<div className="bottom">
				<h3>Oh Snap!</h3>
				<p>{message}</p>
			</div>
		</div>
	);
};
