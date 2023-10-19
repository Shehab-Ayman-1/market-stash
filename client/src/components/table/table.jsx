import "./table.scss";

export const Table = ({ children, headers, footers }) => {
	return (
		<table className="table-section">
			<thead className="table-head">
				{headers?.title ? (
					<tr>
						<th className="table-title gradient-text" colSpan={headers?.body?.length || 1}>
							{headers.title}
						</th>
					</tr>
				) : null}

				{headers?.body?.length ? (
					<tr>
						{headers.body.map((name, i) => (
							<th key={i}>{name}</th>
						))}
					</tr>
				) : null}
			</thead>

			{children}

			<tfoot className="table-foot">
				{footers?.title ? (
					<tr>
						<th colSpan={footers?.body?.length || 1}>{footers.title}</th>
					</tr>
				) : null}

				{footers?.body?.length ? (
					<tr>
						{footers.body.map((name, i) => (
							<th key={i} colSpan={headers?.body?.length}>
								{name}
							</th>
						))}
					</tr>
				) : null}

				{footers?.values?.length ? (
					<tr>
						{footers.values.map((value, i) => (
							<th key={i} colSpan={headers?.body?.length} style={{ background: `linear-gradient(rgb(18, 102, 178), rgb(0, 0, 0))` }}>
								{value}
							</th>
						))}
					</tr>
				) : null}
			</tfoot>
		</table>
	);
};
