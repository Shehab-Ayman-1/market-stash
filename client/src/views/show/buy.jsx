import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components";
import { useAxios } from "@/hooks/useAxios";
import "./styles/widget.scss";
import { Alert, Loading } from "@/layout";

const formState = { count: 0, price: 0 };
export const Buy = () => {
	const [formData, setFormData] = useState(formState);
	const { data, isSubmitted, loading, error, refetch } = useAxios();
	const { company, product } = useLocation().state;
	const navigate = useNavigate();

	const handleChange = ({ target: { name, value } }) => {
		setFormData((f) => ({ ...f, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		const { isSubmitted, error } = await refetch("put", `/buy-products/${company?._id}/${product?._id}`, formData);
		if (isSubmitted && !error) return navigate("..", { state: company?._id });
	};

	return (
		<section className="widget-section">
			<h3 className="title gradient-text">
				{company?.company} {product?.name}
			</h3>

			{!isSubmitted && loading && <Loading />}
			{isSubmitted && error && <Alert message={error} error />}
			{isSubmitted && !error && <Alert message={data?.success} success />}

			<form className="form" onSubmit={handleSubmit}>
				<Input type="number" label="عدد القطع" name="count" onChange={handleChange} required />
				<Input type="number" label="سعر المنتج" name="price" onChange={handleChange} required disabled={!formData.count} />
				<Input label="الاجمالي" value={+formData.count * +formData.price || ""} disabled />

				<button type="submit" className="btn w-full">
					شراء
				</button>
			</form>
		</section>
	);
};
