import "./styles/field.scss";

export const Input = ({ type = "text", label, name, ...rest }) => {
	return (
		<div className="field">
			<label className="label-field">{label}</label>
			<input type={type} className="input-field" name={name} placeholder={label} {...rest} />
		</div>
	);
};
