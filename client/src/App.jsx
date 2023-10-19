import { Routes, Route } from "react-router-dom";
import { Home, Products, Show } from "@/views";
import { AddProduct, UpdateProduct, DeleteProduct } from "@/views";
import { Buy, Edit, Sale } from "@/views";
import { Wrapper, _404 } from "@/layout";

export const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Wrapper />}>
				<Route index element={<Home />} />
				<Route path="*" element={<_404 />} />
			</Route>

			<Route path="/products" element={<Wrapper />}>
				<Route index element={<Products />} />
				<Route path="add" element={<AddProduct />} />
				<Route path="update" element={<UpdateProduct />} />
				<Route path="delete" element={<DeleteProduct />} />
			</Route>

			<Route path="/show" element={<Wrapper />}>
				<Route index element={<Show />} />
				<Route path="buy" element={<Buy />} />
				<Route path="edit" element={<Edit />} />
				<Route path="sale" element={<Sale />} />
			</Route>
		</Routes>
	);
};
