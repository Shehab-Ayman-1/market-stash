import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultImg } from "@/assets";
import { useAxios } from "@/hooks/useAxios";
import { Input, SelectBox } from "@/components";
import { Alert, Loading } from "@/layout";
import { useSelector, useDispatch } from "react-redux";
import { filterLists, resetLists, setLists } from "@/redux";
import "./styles/catagory.scss";

const formState = { process: "catagory", img: defaultImg, catagory: "", company: "", products: [""] };
export const AddProduct = () => {
	const { lists, catagoriesList, companiesList } = useSelector(({ products }) => products);
	const [formData, setFormData] = useState(formState);
	const { data, loading, error, isSubmitted, refetch } = useAxios();
	const { error: lError, isSubmitted: lIsSubmitted, refetch: refetchLists } = useAxios();
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

		if (id === "add-product") {
			setFormData((f) => ({ ...f, products: [...f.products, ""] }));
			return;
		}

		if (name === "product") {
			setFormData((f) => {
				f.products[+id] = value;
				return f;
			});
			return;
		}

		if (name === "catagory") {
			setFormData((f) => ({ ...f, [name]: value }));
			dispatch(filterLists({ catagory: value, company: "" }));
		}

		if (name === "company") {
			setFormData((f) => ({ ...f, [name]: value }));
			dispatch(filterLists({ catagory: formData.catagory, company: value }));
		}

		setFormData((f) => ({ ...f, [name]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const { process, ...data } = formData;

		if (process === "catagory") {
			const { isSubmitted, error } = await refetch("post", `/products/create-catagory`, { img: data.img, catagory: data.catagory, companies: data.products });
			if (isSubmitted && !error) {
				dispatch(resetLists());
				return navigate("/");
			}
		}
		if (process === "company") {
			const { isSubmitted, error } = await refetch("post", `/products/create-company`, { img: data.img, catagory: data.catagory, companies: data.products });
			if (isSubmitted && !error) {
				dispatch(resetLists());
				return navigate("/");
			}
		}
		if (process === "product") {
			const { isSubmitted, error } = await refetch("post", `/products/create-products`, { catagory: data.catagory, company: data.company, products: data.products });
			if (isSubmitted && !error) {
				dispatch(resetLists());
				return navigate("/");
			}
		}
	};

	return (
		<section className="catagory">
			<div className="top-section">
				<h3 className="title gradient-text">اضافة {formData.process === "catagory" ? "قسم" : formData.process === "company" ? "شركة" : "منتج"}</h3>
			</div>

			{!isSubmitted && loading && <Loading />}
			{isSubmitted && error && <Alert message={error} error />}
			{lIsSubmitted && lError && <Alert message={lError} error />}
			{isSubmitted && !error && <Alert message={data?.success} success />}

			<div className="mid-section">
				<div className="process">
					<button name="process" id="catagory" className={`btn ${formData.process === "catagory" ? "bg-primary text-white" : ""}`} onClick={handleChange}>
						اضافة قسم
					</button>
					<button name="process" id="company" className={`btn ${formData.process === "company" ? "bg-primary text-white" : ""}`} onClick={handleChange}>
						اضافة شركة
					</button>
					<button name="process" id="product" className={`btn ${formData.process === "product" ? "bg-primary text-white" : ""}`} onClick={handleChange}>
						اضافة منتج
					</button>
				</div>

				<form className="form" onSubmit={handleSubmit}>
					{formData.process === "catagory" && (
						<Fragment>
							<div className="img">
								<img src={formData.img} alt="img" />
								<Input type="url" label="رابط صورة الشركة (اختيارة)" name="img" onChange={handleChange} />
							</div>

							<Input label="اسم القسم" name="catagory" onChange={handleChange} required />

							<div className="catagories">
								{formData.products.map((_, i) => (
									<div className="field" key={i}>
										<Input label={`الشركة`} id={i} name="product" onChange={handleChange} required />
									</div>
								))}
							</div>
						</Fragment>
					)}

					{formData.process === "company" && (
						<Fragment>
							<div className="img">
								<img src={formData.img} alt="img" />
								<Input type="url" label="رابط صورة الشركة (اختيارة)" name="img" onChange={handleChange} />
							</div>

							<SelectBox label="اسم القسم" name="catagory" options={catagoriesList} onChange={handleChange} required />

							<div className="companies">
								{formData.products.map((_, i) => (
									<div className="field" key={i}>
										<Input label={`اسم الشركة الجديدة`} id={i} name="product" onChange={handleChange} required />
									</div>
								))}
							</div>
						</Fragment>
					)}

					{formData.process === "product" && (
						<Fragment>
							<SelectBox label="اسم القسم" name="catagory" options={catagoriesList} onChange={handleChange} required />

							<SelectBox label="اسم الشركة" name="company" options={companiesList} onChange={handleChange} required />

							<div className="products">
								{formData.products.map((_, i) => (
									<div className="field" key={i}>
										<Input label={`اسم المنتج التابع للشركة ${i + 1}`} id={i} name="product" onChange={handleChange} required />
									</div>
								))}
							</div>

							<p className="add-other-product gradient-text" id="add-product" onClick={handleChange}>
								اضافة منتج اخر
							</p>
						</Fragment>
					)}

					<button type="submit" className="btn w-full">
						اضافة
					</button>
				</form>
			</div>
		</section>
	);
};
