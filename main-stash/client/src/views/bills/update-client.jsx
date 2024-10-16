import { useEffect, useState } from "react";
import { Input, SelectBox } from "@/components";
import { useAxios } from "@/hooks/useAxios";
import { Alert } from "@/layout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./styles/form-widget.scss";

export const UpdateClient = () => {
	const [client, setClient] = useState({ oldName: "", name: "", address: "" });
	const [options, setOptions] = useState([]);

	const { data, loading, error, isSubmitted, refetch } = useAxios();
	const { clients } = useSelector((state) => state.bills);

	const navigate = useNavigate();

	useEffect(() => {
		if (!clients.length) return navigate("/bills");
		setOptions(() => Array.from(new Set(clients.map((client) => client.name))));
	}, [clients]);

	const handleChange = ({ target: { name, value } }) => {
		setClient((f) => ({ ...f, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!client.oldName) return alert("يجب ادخال اسم العميل");
		if (!client.name && !client.address) return alert("يجب ادخال اسم العميل او العنوان الخاص به");
		if (!client.name) delete client.name;
		if (!client.address) delete client.address;

		const { isSubmitted, error } = await refetch("put", "/bills/update-client", client);
		if (isSubmitted && !error) {
			setTimeout(() => navigate("/bills"), 2000);
		}
	};

	return (
		<section className="form-widget">
			<h3 className="title gradient-text">تعديل مستخدم</h3>

			{isSubmitted && error && <Alert error message={error} />}
			{isSubmitted && !error && <Alert success message={data.success} />}

			<form className="form" onSubmit={handleSubmit}>
				<SelectBox label="اسم العميل" name="oldName" options={options} onChange={handleChange} />
				<Input label="اسم العميل الجديد (اختياري)" name="name" onChange={handleChange} />
				<Input label="عنوان المحل (اختياري)" name="address" onChange={handleChange} />
				<button type="submit" className="btn m-auto" disabled={loading}>
					{loading ? "تحميل..." : "تعديل"}
				</button>
			</form>
		</section>
	);
};
