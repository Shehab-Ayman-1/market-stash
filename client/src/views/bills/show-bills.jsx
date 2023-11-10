import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Table } from "@/components";
import { printLogo } from "@/assets";
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
						<img src={printLogo} alt="printLogo" />
					</div>
					<button className="btn print-btn" onClick={() => window.print()}>
						طباعة الفاتورة
					</button>
				</div>

				<hr className="hr" />

				<div className="mid-section">
					<div className="info">
						<div className="flex-start gap-10">
							<h4>الاسم: </h4>
							<p>{bill?.name}</p>
						</div>
						<div className="flex-start gap-10">
							<h4>العنوان: </h4>
							<p>{bill?.address}</p>
						</div>
						<div className="flex-start gap-10">
							<h4>التاريخ: </h4>
							<p>{new Date(bill?.createdAt).toLocaleDateString()}</p>
						</div>
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
					<div className="flex-between gap-10">
						<h4 className="total">سعر الفاتورة:</h4>
						<p>{bill?.totalPrices || 0} جنية</p>
					</div>
					<div className="flex-between gap-10">
						<h4 className="total">تم سداد:</h4>
						<p>{bill?.payment.value || 0} جنية</p>
					</div>
					<div className="flex-between gap-10">
						<h4 className="total">المبلغ الاجمالي:</h4>
						<p>{+bill?.totalPrices - +bill?.payment.value || 0} جنية</p>
					</div>
				</div>

				<hr className="hr" />

				<div className="footer">
					<h4>ابو رقية للتجارة والتوزيع</h4>
					<p>الورديان - نهاية شارع الامير لؤلؤ - موقف المتراس</p>
				</div>
			</main>
		</section>
	);
};
