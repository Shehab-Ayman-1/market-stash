import "./styles/field.scss";

export const Input = ({ type = "text", label, name, placeholder, classNames, searchSubmit, handleChange, ...rest }) => {
	if (type === "search") {
		return (
			<div className="field">
				<label className="label-field">{label}</label>
				<div className="search">
					<input className={`input-field ${classNames || ""}`} type={type} name={name} placeholder={placeholder || label} onChange={handleChange} {...rest} />
					<div className="icon">
						<i className="fa fa-search" onClick={searchSubmit} />
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="field">
			<label className="label-field">{label}</label>
			<input className={`input-field ${classNames || ""}`} type={type} name={name} placeholder={placeholder || label} onChange={handleChange} {...rest} />
		</div>
	);
};
