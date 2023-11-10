import { useEffect, useState } from "react";
import { Table } from "@/components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAxios } from "@/hooks/useAxios";
import { Error, Loading } from "@/layout";
import "./styles/form-widget.scss";

const productState = { isUpdated: false, index: null, name: "", count: "", price: "" };
export const UpdateBill = () => {
	const { id } = useParams();

	const [client, setClient] = useState({ name: "", address: "" });
	const [updatedProduct, setUpdatedProduct] = useState(productState);
	const [products, setProducts] = useState([]);

	const { data, loading, error, isSubmitted } = useAxios("get", `/bills/get-bill/${id}`);
	const { refetch } = useAxios();

	const navigate = useNavigate();

	useEffect(() => {
		if ((isSubmitted && error) || !data) return;
		setClient(() => ({ name: data.name, address: data.address }));
		setProducts(() => data.products);
	}, [id, data]);

	const handleChange = ({ target: { name, value } }) => {
		setUpdatedProduct((p) => ({ ...p, [name]: name === "name" ? value : +value }));
	};

	const openUpdateField = (index, name) => {
		setUpdatedProduct((p) => ({ ...productState, isUpdated: true, index, name }));
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const updatedField = () => {
		setProducts((products) => {
			const { index, ...updated } = updatedProduct;
			products[index] = updated;
			return products;
		});
		setUpdatedProduct((p) => ({ ...productState, isUpdated: true }));
	};

	const deleteField = (i) => {
		const confirm = window.confirm("هل انت متاكد من حذف هذا المنتج");
		if (!confirm) return;

		setProducts((products) => products.filter((_, index) => index !== i));
		setUpdatedProduct((p) => ({ ...productState, isUpdated: true }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!data.products || !updatedProduct.isUpdated) return;

		const { isSubmitted, error } = await refetch("put", `/bills/update-bill/${id}`, { products });
		if (isSubmitted && error) return alert(error);

		navigate("/bills");
	};

	const tableOptions = {
		headers: {
			body: ["#", "الاسم", "العدد", "السعر", "الاجمالي"],
		},
	};

	if (error) return <Error message={error} />;
	if (loading) return <Loading />;

	return (
		<section className="form-widget update-bill">
			<h3 className="title gradient-text">تعديل فاتورة</h3>

			<form className="form" onSubmit={handleSubmit}>
				<div className="info">
					<div className="field">
						<h3>العميل: {client.name}</h3>
						<p>العنوان: {client.address}</p>
					</div>
					<button type="button" className="btn" onClick={() => setUpdatedProduct(() => ({ ...productState, index: products.length }))}>
						اضافة منتج جديد
					</button>
				</div>

				<Table {...tableOptions}>
					<tbody className="table-body">
						<tr className={`controllers ${updatedProduct.index === null ? "hide-display" : ""}`}>
							<td onClick={updatedField}>{updatedProduct.index === products.length ? <i className="fa fa-plus" /> : <i className="fa fa-edit" />}</td>
							<td>
								<input type="text" value={updatedProduct?.name} name="name" onChange={handleChange} />
							</td>
							<td>
								<input type="number" value={updatedProduct?.count} name="count" min={0} onChange={handleChange} />
							</td>
							<td>
								<input type="number" value={updatedProduct?.price} name="price" min={0} onChange={handleChange} />
							</td>
							<td>{+updatedProduct?.count * +updatedProduct?.price}</td>
						</tr>
						{products?.map((product, i) => (
							<tr key={i}>
								<td className="hash">
									<i className="far fa-trash-alt" onClick={() => deleteField(i)} />
									<i className="fas fa-edit" onClick={() => openUpdateField(i, product?.name)} />
								</td>
								<td className="name">{product?.name}</td>
								<td className="count">{product?.count}</td>
								<td className="price">{product?.price}</td>
								<td className="total">{+product?.count * +product?.price}</td>
							</tr>
						))}
					</tbody>
				</Table>

				<p className="total">الاجمالي: {products.reduce((prev, cur) => prev + cur.price * cur.count, 0) || 0} جنية</p>

				<button type="submit" className="btn submit" disabled={loading}>
					{loading ? "تحميل......" : "تعديل فاتورة"}
				</button>
			</form>
		</section>
	);
};
