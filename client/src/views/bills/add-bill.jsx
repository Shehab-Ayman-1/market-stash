import { useEffect, useState } from "react";
import { SelectBox, Table } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AddClient } from "@/components";
import "./styles/client-form.scss";
import { useAxios } from "@/hooks/useAxios";
import { setClients } from "@/redux";

const billState = { name: "", count: "", price: "" };
export const AddBill = () => {
	const state = useLocation().state?.isFirstCreate;
	const [isFirstCreate, setisFirstCreate] = useState(state);
	const [products, setProducts] = useState([]);
	const [bill, setBill] = useState(billState);
	const [options, setOptions] = useState([]);
	const [client, setClient] = useState({});
	const [total, setTotal] = useState(0);
	const { refetch } = useAxios();
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
		setBill((f) => ({ ...f, [name]: value }));
	};

	const saveNewField = () => {
		const isFilled = Object.values(bill).every((value) => value);
		if (!isFilled) return alert("يجب ادخال الاسم, السعر, والعدد");

		setProducts((b) => [...b, bill]);
		setBill((b) => (b = billState));
	};

	const deleteField = (i) => {
		setProducts((products) => products.filter((_, index) => index !== i));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!client.name) return alert("ادخل اسم العميل القديم");
		if (!products.length) return alert("لا يمكن اضافه فاتورة فارغه");

		// New User
		if (state) {
			const { data, isSubmitted, error } = await refetch("post", "/bills/create-bill", { ...client, products });
			if (isSubmitted && !error) {
				navigate("/bills");
			}
			dispatch(setClients([...clients, { ...client, createdAt: new Date(), products }]));

			alert(data?.success || data?.error);
		} else {
			const { name, address } = clients.find((c) => c.name === client.name);
			const { data, isSubmitted, error } = await refetch("post", "/bills/create-bill", { name, address, products });

			if (isSubmitted && !error) {
				navigate("/bills");
				dispatch(setClients([...clients, { name, address, createdAt: new Date(), products }]));
			}
			alert(data?.success || data?.error);
		}
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
						{products?.map((bill, i) => (
							<tr key={i}>
								<td onClick={() => deleteField(i)}>
									<i className="far fa-trash-alt" style={{ color: "crimson" }} />
								</td>
								<td>{bill?.name}</td>
								<td>{bill?.count}</td>
								<td>{bill?.price}</td>
								<td>{+bill?.count * +bill?.price}</td>
							</tr>
						))}
						<tr className="controllers">
							<td colSpan={2}>
								<input type="text" value={bill.name} name="name" onChange={handleChange} />
							</td>
							<td>
								<input type="number" value={bill.count} name="count" onChange={handleChange} />
							</td>
							<td>
								<input type="number" value={bill.price} name="price" onChange={handleChange} />
							</td>
							<td onClick={saveNewField}>
								<i className="fa fa-plus" />
							</td>
						</tr>
					</tbody>
				</Table>

				<p className="total">الاجمالي: {total} جنية</p>

				<button type="submit" className="btn submit">
					انشاء فاتورة
				</button>
			</form>
		</section>
	);
};
