import "./styles/loading.scss";

export const Loading = () => {
	return (
		<div className="loading-section">
			<div className="linear-progress" />
			<div className="loader fa-spin" />
		</div>
	);
};
