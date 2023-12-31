import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { Alert, Loading } from "@/layout";
import { billsDropdown } from "@/constants";
import { Dropdown, Input, PayWidget } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { setClients, deleteClient } from "@/redux";
import "./styles/bills.scss";

const payState = { state: false, id: "", payment: { value: 0, finished: false } };
export const Bills = () => {
	const { loading, error, isSubmitted, refetch } = useAxios();
	const { data: dData, loading: dLoading, error: dError, isSubmitted: dIsSubmitted, refetch: dRefetch } = useAxios();

	const { clients } = useSelector((state) => state.bills);

	const [filterdData, setFilterdData] = useState();
	const [pay, setPay] = useState(payState);

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

		const { isSubmitted, error } = await dRefetch("delete", `/bills/delete-bill/${id}`);
		if (isSubmitted && !error) {
			dispatch(deleteClient(id));
		}
	};

	if (!isSubmitted && loading) return <Loading />;

	return (
		<section className="bills-section">
			{error && <Alert error message={error} />}
			{dError && <Alert error message={dError} />}

			{dIsSubmitted && !dError && <Alert success message={dData.success} />}
			{dIsSubmitted && dError && <Alert error message={dError} />}

			{pay.state && <PayWidget pay={pay} setPay={setPay} />}

			<div className="searchbar">
				<Input label="بحث..." type="search" name="search" onChange={searchbarList} />
				<Dropdown icon="fas fa-ellipsis-v" windowClose>
					{billsDropdown.map(({ name, icon, path }, i) => (
						<Link to={{ pathname: path, hash: "isFirstCreate" }} className={`dropdown-item ${i + 1 === billsDropdown.length ? "last-item" : ""}`} key={i}>
							<i className={`${icon} gradient-text icon`} />
							<p className="content">{name}</p>
						</Link>
					))}
				</Dropdown>
			</div>

			<div className="clients">
				{(filterdData || clients).map((client, i) => (
					<div className="client" key={i} style={{ backgroundColor: i % 2 ? "" : "#333" }}>
						<div className="right-section">
							<div className="icons" style={{ pointerEvents: dLoading ? "none" : "auto" }}>
								<i className="far fa-trash-alt" onClick={() => handleDeleteClient(client._id)} />
								<i className="fas fa-edit" onClick={() => navigate(`/bills/edit-bill/${client._id}`)} />
								<i className="fas fa-money-bill-wave" onClick={() => setPay({ state: true, id: client._id, payment: client.payment })} />
							</div>
							<p className="date">{new Date(client.createdAt).toLocaleDateString()}</p>
							<h3 className="name">{client.name}</h3>
						</div>

						<i className="fas fa-eye" onClick={() => navigate(`/bills/show-bills/${client._id}`)} />

						{client.payment.finished && <div className="line-through" />}
					</div>
				))}
			</div>
		</section>
	);
};
