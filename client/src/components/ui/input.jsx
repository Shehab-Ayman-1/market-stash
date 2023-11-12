import "./styles/field.scss";

export const Input = ({ type = "text", label, name, placeholder, classNames, searchSubmit, onChange, ...rest }) => {
	return (
		<div className="field">
			<label className="label-field">{label}</label>
			<input className={`input-field ${classNames || ""}`} type={type} name={name} placeholder={placeholder || label} onChange={onChange} {...rest} />
		</div>
	);
};
