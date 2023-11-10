import { Fragment } from "react";

export const LastEdits = ({ index, lastEdits }) => {
	const date = new Date(lastEdits[index]?.date);
	const count = Math.abs(lastEdits[index]?.count);

	return (
		<Fragment>
			<span className="count">{count || ""}</span>

			<div className="date">
				<span>{date.toLocaleDateString() || ""}</span>
				<span>{date.toLocaleTimeString() || ""}</span>
			</div>
		</Fragment>
	);
};
