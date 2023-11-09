import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Table } from "@/components";
import { logo } from "@/assets";
import { useAxios } from "@/hooks/useAxios";
import { Error, Loading } from "@/layout";
import "./styles/show-bill.scss";

export const ShowBill = () => {
	const { data: bill, loading, error, isSubmitted, refetch } = useAxios();
	const { id } = useLocation().state;

	useEffect(() => {
		(async () => await refetch("get", `/bills/get-bill/${id}`))();
	}, []);

	const tableOptions = {
		headers: {
			body: ["#", "الاسم", "الكمية", "السعر", "الاجمالي"],
		},
	};

	if (isSubmitted && error) return <Error message={error} />;
	if (!isSubmitted && loading) return <Loading />;
	return (
		<section className="show-bill-section">
			<main className="main">
				<div className="head-section">
					<div className="info">
						<h3>ابو رقية للتجارة والتوزيع</h3>
						<img src={logo} alt="logo" />
					</div>
					<button className="btn print-btn" onClick={() => window.print()}>
						طباعة الفاتورة
					</button>
				</div>

				<div className="mid-section">
					<div className="info">
						<h4>{bill?.name}</h4>
						<p>{bill?.address}</p>
						<p>{new Date(bill?.createdAt).toLocaleDateString()}</p>
					</div>
					<div className="">
						<Table {...tableOptions}>
							<tbody className="table-body">
								{bill?.products?.map((bill, i) => (
									<tr key={i}>
										<td>{i + 1}</td>
										<td>{bill?.name}</td>
										<td>{bill?.count}</td>
										<td>{bill?.price}</td>
										<td>{+bill?.count * +bill?.price}</td>
									</tr>
								))}
							</tbody>
						</Table>
					</div>
				</div>

				<div className="foot-section">
					<div className="">
						<h3 className="total">سعر الفاتورة:</h3>
						<h3>{bill?.totalPrices || 0} جنية</h3>
					</div>
					<div className="">
						<h3 className="total">القيمة المضافة:</h3>
						<h3>0%</h3>
					</div>
					<div className="">
						<h3 className="total">المبلغ الاجمالي:</h3>
						<h3>{bill?.totalPrices || 0} جنية</h3>
					</div>
				</div>

				<div className="footer">
					<h3>ابو رقية للتجارة والتوزيع</h3>
					<p>الورديان - نهاية شارع الامير لؤلؤ - موقف المتراس</p>
				</div>
			</main>
		</section>
	);
};
