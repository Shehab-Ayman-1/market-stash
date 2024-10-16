import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components";
import { useAxios } from "@/hooks/useAxios";
import { Alert, Loading } from "@/layout";
import "./styles/widget.scss";

const formState = { price: 0 };
export const Edit = () => {
	const { company, product } = useLocation().state;
	const [formData, setFormData] = useState(formState);

	const { data, isSubmitted, loading, error, refetch } = useAxios();
	const navigate = useNavigate();

	const handleChange = ({ target: { name, value } }) => {
		setFormData((f) => ({ ...f, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const { isSubmitted, error } = await refetch("put", `/products/edit-price/${company?._id}/${product?._id}`, formData);
		if (isSubmitted && !error) return navigate("/show", { state: company?._id });
	};

	return (
		<section className="widget-section">
			<h3 className="title gradient-text">
				{company?.company} {">>"} {product?.name}
			</h3>

			{!isSubmitted && loading && <Loading />}
			{isSubmitted && error && <Alert message={error} error />}
			{isSubmitted && !error && <Alert message={data?.success} success />}

			<h2 className="title">السعر الحالي: {product?.price || 0} قطعه</h2>

			<form className="form" onSubmit={handleSubmit}>
				<Input type="number" label="سعر المنتج الجديد" name="price" onChange={handleChange} required />

				<button type="submit" className="btn w-full">
					تعديل
				</button>
			</form>
		</section>
	);
};
