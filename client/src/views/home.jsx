import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { useAxios } from "@/hooks/useAxios";
import { setHomeProducts } from "@/redux";
import { Error, Loading } from "@/layout";
import { Company } from "@/components";
import "./styles/home.scss";

export const Home = () => {
	const { isSubmitted, loading, error, refetch } = useAxios();
	const [fetchAll, setFetchAll] = useState(false);

	const { homeProducts } = useSelector((state) => state.products);
	const dispatch = useDispatch();

	useEffect(() => {
		if (homeProducts?.length) return;

		(async () => {
			const { data } = await refetch("get", "/products/get-home-companies?limit=6");
			dispatch(setHomeProducts(data));
		})();
	}, []);

	useEffect(() => {
		if (!fetchAll) return;

		(async () => {
			const { data } = await refetch("get", "/products/get-home-companies");
			dispatch(setHomeProducts(data));
		})();
	}, [fetchAll]);

	if (error) return <Error message={error} />;
	if (!isSubmitted && loading) return <Loading />;

	return (
		<section className="home-section">
			{homeProducts?.map((company, i) => (
				<Company key={i} {...company} />
			))}

			<button
				className={`btn w-full ${fetchAll || homeProducts.length > 6 ? "hide-display" : ""}`}
				onClick={() => setFetchAll(true)}>
				عرض كل المنتجات
			</button>
		</section>
	);
};
