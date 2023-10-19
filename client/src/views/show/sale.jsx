import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components";
import "./styles/widget.scss";
import { useAxios } from "@/hooks/useAxios";

const formState = { count: 0 };
export const Sale = () => {
	const [formData, setFormData] = useState(formState);
	const { data, isSubmitted, loading, error, refetch } = useAxios();
	const { company, product } = useLocation().state;
	const navigate = useNavigate();

	const handleChange = ({ target: { name, value } }) => {
		setFormData((f) => ({ ...f, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (+formData.count > +product?.count) return alert("هذا العدد غير متوفر حالياً");

		const { isSubmitted, error } = await refetch("put", `/sale-products/${company?._id}/${product?._id}`, formData);
		if (isSubmitted && !error) return navigate("..", { state: company?._id });
	};

	return (
		<section className="widget-section">
			<h3 className="title gradient-text">
				{company?.company} {product?.name}
			</h3>

			<h2 className="title text-white">العدد الحالي: {product?.count} جنيه</h2>

			<form className="form" onSubmit={handleSubmit}>
				<Input type="number" label="العدد المراد بيعه" name="count" onChange={handleChange} required />
				<button type="submit" className="btn w-full">
					بيع
				</button>
			</form>
		</section>
	);
};
