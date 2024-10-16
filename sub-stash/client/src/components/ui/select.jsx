import "./styles/field.scss";

export const SelectBox = ({ label, name, options, ...rest }) => {
	return (
		<div className="field">
			<label className="label-field">{label}</label>

			<select className="input-field" name={name} {...rest}>
				<option value="">{label}</option>
				{options.map((option, i) => (
					<option value={option} key={i}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
};
