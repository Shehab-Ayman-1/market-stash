import { useEffect, useState } from "react";
import { Error, Loading } from "@/layout";
import { useAxios } from "@/hooks/useAxios";
import { Company } from "@/components";
import { useDispatch, useSelector } from "react-redux";
import { setHomeProducts } from "@/redux";
import "./styles/home.scss";

export const Home = () => {
	const { homeProducts } = useSelector((state) => state.products);
	const { isSubmitted, loading, error, refetch } = useAxios();
	const [fetchAll, setFetchAll] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (homeProducts?.length) return;

		(async () => {
			const { data } = await refetch("get", "/get-home-companies?limit=6");
			dispatch(setHomeProducts(data));
		})();
	}, []);

	useEffect(() => {
		if (!fetchAll) return;

		(async () => {
			const { data } = await refetch("get", "/get-home-companies");
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

			<button className={`btn w-full ${fetchAll || homeProducts.length > 6 ? "hide-display" : ""}`} onClick={() => setFetchAll(true)}>
				عرض كل المنتجات
			</button>
		</section>
	);
};
