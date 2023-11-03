import { Input } from "@/components";

export const AddClient = ({ client, setClient, setisFirstCreate }) => {
	const handleChange = ({ target: { name, value } }) => {
		setClient((f) => ({ ...f, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setisFirstCreate(() => false);
	};

	return (
		<section className="form-widget">
			<h3 className="title gradient-text">اضافه عميل</h3>
			<form className="form" onSubmit={handleSubmit}>
				<Input label="اسم العميل" name="name" handleChange={handleChange} />
				<Input label="عنوان المحل" name="address" handleChange={handleChange} />
				<button type="submit" className="btn m-auto">
					اضافه
				</button>
			</form>
		</section>
	);
};
