import { Fragment, useEffect, useState } from "react";
import { SelectBox } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { useAxios } from "@/hooks/useAxios";
import { filterLists, resetLists, setLists } from "@/redux";
import "./styles/catagory.scss";
import { Alert, Loading } from "@/layout";
import { useNavigate } from "react-router-dom";

const formState = { process: "catagory", catagory: "", company: "", product: "" };
export const DeleteProduct = () => {
	const { lists, catagoriesList, companiesList, productsList } = useSelector(({ products }) => products);
	const { data, loading, error, isSubmitted, refetch } = useAxios();
	const { error: lError, isSubmitted: lIsSubmitted, refetch: refetchLists } = useAxios();
	const [formData, setFormData] = useState(formState);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (lists.length) return;

		(async () => {
			const { data: lists, isSubmitted, error } = await refetchLists("get", `/get-lists`);
			if (isSubmitted && !error) dispatch(setLists(lists));
		})();
	}, []);

	const handleChange = ({ target: { id, name, value } }) => {
		if (name === "process") {
			setFormData(() => ({ ...formState, process: id }));
			return;
		}

		if (name === "catagory") {
			dispatch(filterLists({ catagory: value, company: "" }));
		}

		if (name === "company") {
			dispatch(filterLists({ catagory: formData.catagory, company: value }));
		}

		setFormData((f) => ({ ...f, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const { process, catagory, company, product } = formData;

		if (process === "catagory") {
			const query = `catagory=${catagory}`;
			const { isSubmitted, error } = await refetch("delete", `/products/delete-catagory?${query}`);
			if (isSubmitted && !error) {
				dispatch(resetLists());
				return navigate("/");
			}
		}
		if (process === "company") {
			const query = `catagory=${catagory}&company=${company}`;
			const { isSubmitted, error } = await refetch("delete", `/products/delete-company?${query}`);
			if (isSubmitted && !error) {
				dispatch(resetLists());
				return navigate("/");
			}
		}
		if (process === "product") {
			const query = `catagory=${catagory}&company=${company}&product=${product}`;
			const { isSubmitted, error } = await refetch("delete", `/products/delete-product?${query}`);
			if (isSubmitted && !error) {
				dispatch(resetLists());
				return navigate("/");
			}
		}
	};

	return (
		<section className="catagory">
			<div className="top-section">
				<h3 className="title gradient-text">حذف {formData.process === "catagory" ? "قسم" : formData.process === "company" ? "شركة" : "منتج"}</h3>
			</div>

			{!isSubmitted && loading && <Loading />}
			{isSubmitted && error && <Alert message={error} error />}
			{lIsSubmitted && lError && <Alert message={lError} error />}
			{isSubmitted && !error && <Alert message={data?.success} success />}

			<div className="mid-section">
				<div className="process">
					<button name="process" id="catagory" className={`btn ${formData.process === "catagory" ? "bg-primary text-white" : ""}`} onClick={handleChange}>
						حذف قسم
					</button>
					<button name="process" id="company" className={`btn ${formData.process === "company" ? "bg-primary text-white" : ""}`} onClick={handleChange}>
						حذف شركة
					</button>
					<button name="process" id="product" className={`btn ${formData.process === "product" ? "bg-primary text-white" : ""}`} onClick={handleChange}>
						حذف منتج
					</button>
				</div>

				<form className="form" onSubmit={handleSubmit}>
					{formData.process === "catagory" && (
						<Fragment>
							<SelectBox label="اسم القسم" name="catagory" options={catagoriesList} onChange={handleChange} required />
						</Fragment>
					)}

					{formData.process === "company" && (
						<Fragment>
							<SelectBox label="اسم القسم" name="catagory" options={catagoriesList} onChange={handleChange} required />
							<SelectBox label="اسم الشركة" name="company" options={companiesList} onChange={handleChange} required />
						</Fragment>
					)}

					{formData.process === "product" && (
						<Fragment>
							<SelectBox label="اسم القسم" name="catagory" options={catagoriesList} onChange={handleChange} required />
							<SelectBox label="اسم الشركة" name="company" options={companiesList} onChange={handleChange} required />
							<SelectBox label="اسم المنتج" name="product" options={productsList} onChange={handleChange} required />
						</Fragment>
					)}

					<button type="submit" className="btn w-full">
						حذف
					</button>
				</form>
			</div>
		</section>
	);
};
