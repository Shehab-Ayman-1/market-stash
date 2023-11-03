import { Table } from "@/components";
import { useEffect, useState } from "react";
import { useAxios } from "@/hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { setTableLists } from "@/redux";
import { colors } from "@/constants";
import "./styles/products.scss";

let index = 0;
export const Products = () => {
	const { isSubmitted, error, refetch } = useAxios();
	const { tableLists } = useSelector((state) => state.products);
	const [total, setTotal] = useState(0);
	const dispatch = useDispatch();

	useEffect(() => {
		if (tableLists.length) return;

		(async () => {
			const { data: tableLists, isSubmitted, error } = await refetch("get", `/products/get-table-lists`);
			if (isSubmitted && !error) dispatch(setTableLists(tableLists));
		})();
	}, []);

	useEffect(() => {
		const total = tableLists.map(({ companies }) => {
			return companies.map(({ total }) => total).reduce((prev, cur) => prev + cur, 0);
		});

		setTotal(() => total.reduce((prev, cur) => prev + cur, 0));
	}, [tableLists]);

	const tableOptions = {
		headers: {
			title: "عرض كل المنتجات",
			body: ["الشركة", "المنتج", "العدد", "السعر", "الاجمالي", "الكلي"],
		},
		footers: {
			body: ["السعر الاجمالي للمخزن"],
			values: [total.toLocaleString()],
		},
	};

	return (
		<section className="products-section">
			<Table {...tableOptions}>
				{tableLists?.map(({ catagory, companies }, i) => {
					return companies?.map(({ company, total, products }, j) => {
						const backgroundColor = { background: `linear-gradient(rgb(${colors[index++ % 13]}), rgb(0, 0, 0))` };

						return products.length ? (
							<tbody className="table-body" key={j} style={backgroundColor}>
								{products?.map(({ name, price, count }, x) => {
									return (
										<tr key={x} className={`${!count ? "text-gray" : count <= 5 ? "text-orange" : ""}`}>
											{!x && (
												<td rowSpan={products.length} className="!text-white">
													{company}
												</td>
											)}
											<td>{name}</td>
											<td>{count}</td>
											<td>{price}</td>
											<td>{+count * +price}</td>
											{!x && (
												<td rowSpan={products.length} className="!text-white">
													{total}
												</td>
											)}
										</tr>
									);
								})}
							</tbody>
						) : null;
					});
				})}
			</Table>
		</section>
	);
};
