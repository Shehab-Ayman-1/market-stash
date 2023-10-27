import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAxios } from "@/hooks/useAxios";
import { Table } from "@/components";
import { Alert, Loading } from "@/layout";
import "./styles/edit.scss";

export const Show = () => {
	const { data: company, isSubmitted, loading, error, refetch } = useAxios();
	const id = useLocation().state;
	const navigate = useNavigate();

	useEffect(() => {
		if (company) return;

		(async () => {
			await refetch("get", `/get-company/${id}`);
		})();
	}, [id]);

	const tableOptions = {
		headers: {
			title: (
				<div className="title">
					<i className="fa fa-times-circle" onClick={() => navigate("/")} />
					<p>
						{company?.catagory || ""} {" >> "} {company?.company || ""}
					</p>
				</div>
			),
			body: ["التحكم", "المنتج", "العدد", "السعر", "الاجمالي"],
		},
	};

	return (
		<section className="edit-section">
			{!isSubmitted && loading && <Loading />}
			{isSubmitted && error && <Alert message={error} error />}

			<Table {...tableOptions}>
				<tbody className="table-body">
					{company?.products?.map((product, i) => (
						<tr key={i} className={`${!product?.count ? "text-gray" : product?.count <= 5 ? "text-orange" : ""}`}>
							<td className="controllers">
								<i className="fas fa-shopping-bag" onClick={() => navigate("/show/buy", { state: { company, product } })} />
								<i className="fas fa-edit" onClick={() => navigate("/show/edit", { state: { company, product } })} />
								<i className="fas fa-trash-alt" onClick={() => navigate("/show/sale", { state: { company, product } })} />
							</td>
							<td>{product?.name}</td>
							<td>{product?.count}</td>
							<td>{product?.price}</td>
							<td>{+product?.count * +product?.price}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</section>
	);
};
