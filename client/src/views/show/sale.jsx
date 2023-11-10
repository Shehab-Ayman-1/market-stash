import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LastEdits, Input } from "@/components";
import { useAxios } from "@/hooks/useAxios";
import { Alert, Loading } from "@/layout";
import "./styles/widget.scss";

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

		const { isSubmitted, error } = await refetch("put", `/products/sale-products/${company?._id}/${product?._id}`, { ...formData, lastEdit: product?.lastEdits[0] });
		if (isSubmitted && !error) return navigate("/show", { state: company?._id });
	};

	return (
		<section className="widget-section sale-section">
			<h3 className="title gradient-text">
				{company?.company} {">>"} {product?.name}
			</h3>

			{!isSubmitted && loading && <Loading />}
			{isSubmitted && error && <Alert message={error} error />}
			{isSubmitted && !error && <Alert message={data?.success} success />}

			<div className="last-edits">
				{product?.lastEdits.map(({ count }, i) =>
					count > 0 ? (
						<div className="buy" key={i}>
							<LastEdits index={i} lastEdits={product?.lastEdits} />
						</div>
					) : (
						<div className="sale" key={i}>
							<LastEdits index={i} lastEdits={product?.lastEdits} />
						</div>
					)
				)}
			</div>

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
