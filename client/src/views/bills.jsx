import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { Alert, Loading } from "@/layout";
import { Input, PayWidget } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { setClients, deleteClient } from "@/redux";
import "./styles/bills.scss";

export const Bills = () => {
	const { loading, error, isSubmitted, refetch } = useAxios();
	const { data: dData, loading: dLoading, error: dError, isSubmitted: dIsSubmitted, refetch: dRefetch } = useAxios();
	const { clients } = useSelector((state) => state.bills);
	const [filterdData, setFilterdData] = useState();
	const [pay, setPay] = useState({ state: false, id: "", payment: { value: 0, finished: false } });
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (clients.length) return;
		(async () => {
			const { data, isSubmitted, error } = await refetch("get", "/bills/get-bills?name&address&createdAt&payment");
			if (isSubmitted && !error) return dispatch(setClients(data));
		})();
	}, []);

	const searchbarList = ({ target: { value } }) => {
		const list = clients.filter((client) => client.name.includes(value));
		setFilterdData(() => list);
	};

	const handleDeleteClient = async (id) => {
		const confirm = window.confirm("هل انت متاكد من حذف كل الفواتير السابقة لهذا العميل ؟");
		if (!confirm) return;

		const { data, isSubmitted, error } = await dRefetch("delete", `/bills/delete-bill/${id}`);
		if (isSubmitted && !error) dispatch(deleteClient(id));
		alert(data?.success || data?.error);
	};

	if (!isSubmitted && loading) return <Loading />;

	return (
		<section className="bills-section">
			{error || (dError && <Alert error message={error || dError} />)}
			{dIsSubmitted && !dError && <Alert success message={dData.success} />}
			{!isSubmitted && loading && <Loading />}

			{pay.state && <PayWidget pay={pay} setPay={setPay} />}

			<div className="searchbar">
				<Input label="بحث..." type="search" name="search" handleChange={searchbarList} />
			</div>

			<div className="flex-between gap-5">
				<button className="btn add-client-btn" onClick={() => navigate("/bills/add-bill", { state: { isFirstCreate: true } })}>
					اضافه مستخدم
				</button>
				<button className="btn add-client-btn" onClick={() => navigate("/bills/edit-client")}>
					تعديل مستخدم
				</button>
				<button className="btn add-client-btn" onClick={() => navigate("/bills/add-bill")}>
					اضافه فاتورة
				</button>
			</div>

			<div className="clients">
				{(filterdData || clients).map((client, i) => (
					<div className="client" key={i} style={{ backgroundColor: i % 2 ? "" : "#333" }}>
						<div className="right-section">
							<div className="icons" style={{ pointerEvents: dLoading ? "none" : "auto" }}>
								<i className="far fa-trash-alt" onClick={() => handleDeleteClient(client._id)} />
								<i className="fas fa-edit" onClick={() => navigate("/bills/edit-bill", { state: { id: client._id } })} />
								<i className="fas fa-money-bill-wave" onClick={() => setPay({ state: true, id: client._id, payment: client.payment })} />
							</div>
							<p className="date">{new Date(client.createdAt).toLocaleDateString()}</p>
							<h3 className="name">{client.name}</h3>
						</div>

						<i className="fas fa-eye" onClick={() => navigate("/bills/show-bills", { state: { id: client._id } })} />

						{client.payment.finished && <div className="line-through" />}
					</div>
				))}
			</div>
		</section>
	);
};
