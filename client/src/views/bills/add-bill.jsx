import { useEffect, useState } from "react";
import { SelectBox, Table } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AddClient } from "@/components";
import { useAxios } from "@/hooks/useAxios";
import { setClients } from "@/redux";
import "./styles/client-form.scss";

const productState = { name: "", count: "", price: "" };
export const AddBill = () => {
	const state = useLocation().state?.isFirstCreate;

	const [isFirstCreate, setisFirstCreate] = useState(state); // come from bill.jsx
	const [products, setProducts] = useState([]); // all exists product

	const [client, setClient] = useState({}); // client info
	const [product, setProduct] = useState(productState); // product underprocess

	const [total, setTotal] = useState(0); // total bill price
	const [options, setOptions] = useState([]); // selectBox options

	const { loading, refetch } = useAxios();
	const { clients } = useSelector((state) => state.bills);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!clients.length && !isFirstCreate) return navigate("/bills");
		setOptions(() => Array.from(new Set(clients.map((client) => client.name))));
	}, []);

	useEffect(() => {
		setTotal(() => products.reduce((prev, cur) => prev + cur.price * cur.count, 0));
	}, [products]);

	const handleChange = ({ target: { name, value } }) => {
		if (name === "client.name") return setClient((c) => ({ ...c, name: value }));
		if (name === "client.address") return setClient((c) => ({ ...c, address: value }));
		setProduct((f) => ({ ...f, [name]: value }));
	};

	const saveNewField = () => {
		const isFilled = Object.values(product).every((value) => value);
		if (!isFilled) return alert("يجب ادخال الاسم, السعر, والعدد");

		setProducts((b) => [...b, product]);
		setProduct((b) => (b = productState));
	};

	const deleteField = (i) => {
		setProducts((products) => products.filter((_, index) => index !== i));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const newClient = state;

		// Check Fields Validate
		if (!client.name) return alert("ادخل اسم العميل القديم");
		if (!products.length) return alert("لا يمكن اضافه فاتورة فارغه");

		// Make Body Is Ready To Send
		let body = null;
		if (newClient) {
			const { name, address } = client;
			body = { name, address };
		} else {
			const { name, address } = clients.find((c) => c.name === client.name);
			body = { name, address };
		}

		// Send POST Request
		const { data, isSubmitted, error } = await refetch("post", "/bills/create-bill", { name: body.name, address: body.address, products });

		// Error
		if (isSubmitted && error) return alert(error);

		// Success
		navigate("/bills");
		dispatch(setClients([]));
		alert(data?.success);
	};

	const tableOptions = {
		headers: {
			body: ["#", "الاسم", "العدد", "السعر", "الاجمالي"],
		},
	};

	if (isFirstCreate) return <AddClient client={client} setClient={setClient} setisFirstCreate={setisFirstCreate} />;

	return (
		<section className="form-widget add-bill">
			<h3 className="title gradient-text">عمل فاتورة</h3>

			<form className="form" onSubmit={handleSubmit}>
				<div className="info">
					{state ? (
						<div className="field">
							<h3>{client.name}</h3>
							<p>{client.address}</p>
						</div>
					) : (
						<SelectBox label="اسم العميل القديم" name="client.name" options={options} onChange={handleChange} />
					)}
				</div>

				<Table {...tableOptions}>
					<tbody className="table-body">
						{products?.map((product, i) => (
							<tr key={i}>
								<td onClick={() => deleteField(i)}>
									<i className="far fa-trash-alt" />
								</td>
								<td>{product?.name}</td>
								<td>{product?.count}</td>
								<td>{product?.price}</td>
								<td>{+product?.count * +product?.price}</td>
							</tr>
						))}
						<tr className="controllers">
							<td colSpan={2}>
								<input type="text" value={product.name} name="name" onChange={handleChange} />
							</td>
							<td>
								<input type="number" value={product.count} name="count" min={0} onChange={handleChange} />
							</td>
							<td>
								<input type="number" value={product.price} name="price" min={0} onChange={handleChange} />
							</td>
							<td onClick={saveNewField}>
								<i className="fa fa-plus" />
							</td>
						</tr>
					</tbody>
				</Table>

				<p className="total">الاجمالي: {total} جنية</p>

				<button type="submit" className="btn submit" disabled={loading}>
					{loading ? "تحميل......" : "انشاء فاتورة"}
				</button>
			</form>
		</section>
	);
};
