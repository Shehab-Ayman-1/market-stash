import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultImg } from "@/assets";
import { Input, SelectBox } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { useAxios } from "@/hooks/useAxios";
import { filterLists, resetLists, setLists } from "@/redux";
import { Alert, Loading } from "@/layout";
import "./styles/catagory.scss";

const formState = { process: "catagory", img: defaultImg, catagory: "", company: "", product: "", oldCatagory: "", oldCompany: "", oldProduct: "" };
export const UpdateProduct = () => {
	const { lists, catagoriesList, companiesList, productsList } = useSelector((state) => state.products);
	const [formData, setFormData] = useState(formState);

	const { data, isSubmitted, loading, error, refetch } = useAxios();
	const { isSubmitted: lIsSubmitted, error: lError, refetch: refetchLists } = useAxios();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (lists.length) return;

		(async () => {
			const { data: lists, isSubmitted, error } = await refetchLists("get", `/products/get-lists`);
			if (isSubmitted && !error) dispatch(setLists(lists));
		})();
	}, []);

	const handleChange = ({ target: { id, name, value } }) => {
		if (name === "process") {
			setFormData(() => ({ ...formState, process: id }));
			return;
		}

		if (name === "oldCatagory") {
			setFormData((f) => ({ ...f, [name]: value }));
			dispatch(filterLists({ catagory: value, company: "" }));
		}

		if (name === "oldCompany") {
			setFormData((f) => ({ ...f, [name]: value }));
			dispatch(filterLists({ catagory: formData.oldCatagory, company: value }));
		}

		setFormData((f) => ({ ...f, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const { process, ...data } = formData;

		data.img === defaultImg && delete data.img;

		if (process === "catagory") {
			const body = { replace: { catagory: formData.oldCatagory }, to: { catagory: formData.catagory.trim() } };
			const { isSubmitted, error } = await refetch("put", "/products/update-catagory", body);

			if (isSubmitted && !error) {
				dispatch(resetLists());
				return navigate("/");
			}
		}
		if (process === "company") {
			const body = { replace: { catagory: formData.oldCatagory, company: formData.oldCompany }, to: { img: formData.img, company: formData.company.trim() } };
			const { isSubmitted, error } = await refetch("put", "/products/update-company", body);

			if (isSubmitted && !error) {
				dispatch(resetLists());
				return navigate("/");
			}
		}
		if (process === "product") {
			const body = { replace: { catagory: formData.oldCatagory, company: formData.oldCompany, product: formData.oldProduct }, to: { product: formData.product.trim() } };
			const { isSubmitted, error } = await refetch("put", "/products/update-product", body);

			if (isSubmitted && !error) {
				dispatch(resetLists());
				return navigate("/");
			}
		}
	};

	return (
		<section className="catagory">
			<div className="top-section">
				<h3 className="title gradient-text">تعديل {formData.process === "catagory" ? "قسم" : formData.process === "company" ? "شركة" : "منتج"}</h3>
			</div>

			{!isSubmitted && loading && <Loading />}
			{isSubmitted && error && <Alert message={error} error />}
			{lIsSubmitted && lError && <Alert message={lError} error />}
			{isSubmitted && !error && <Alert message={data?.success} success />}

			<div className="mid-section">
				<div className="process">
					<button name="process" id="catagory" className={`btn ${formData.process === "catagory" ? "bg-primary text-white" : ""}`} onClick={handleChange}>
						تعديل قسم
					</button>
					<button name="process" id="company" className={`btn ${formData.process === "company" ? "bg-primary text-white" : ""}`} onClick={handleChange}>
						تعديل شركة
					</button>
					<button name="process" id="product" className={`btn ${formData.process === "product" ? "bg-primary text-white" : ""}`} onClick={handleChange}>
						تعديل منتج
					</button>
				</div>

				<form className="form" onSubmit={handleSubmit}>
					{formData.process === "catagory" && (
						<Fragment>
							<SelectBox label="اسم القسم القديم" name="oldCatagory" options={catagoriesList} onChange={handleChange} required />

							<Input label="اسم القسم الجديد" name="catagory" onChange={handleChange} required />
						</Fragment>
					)}

					{formData.process === "company" && (
						<Fragment>
							<div className="img">
								<img src={formData.img || defaultImg} alt="img" />
								<Input type="url" label="رابط صورة الشركة (اختيارة)" name="img" onChange={handleChange} />
							</div>

							<SelectBox label="اسم القسم" name="oldCatagory" options={catagoriesList} onChange={handleChange} required />

							<SelectBox label="اسم الشركة القديم" name="oldCompany" options={companiesList} onChange={handleChange} required />

							<Input label="اسم الشركة الجديد" name="company" onChange={handleChange} required />
						</Fragment>
					)}

					{formData.process === "product" && (
						<Fragment>
							<SelectBox label="اسم القسم" name="oldCatagory" options={catagoriesList} onChange={handleChange} required />

							<SelectBox label="اسم الشركة" name="oldCompany" options={companiesList} onChange={handleChange} required />

							<SelectBox label="اسم المنتج القديم" name="oldProduct" options={productsList} onChange={handleChange} required />

							<Input label="اسم المنتج الجديد" name="product" onChange={handleChange} required />
						</Fragment>
					)}

					<button type="submit" className="btn w-full">
						تعديل
					</button>
				</form>
			</div>
		</section>
	);
};
