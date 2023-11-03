import { Routes, Route } from "react-router-dom";
import { Wrapper, _404 } from "@/layout";
import { Home } from "@/views";
import { Products, AddProduct, UpdateProduct, DeleteProduct } from "@/views";
import { Show, Buy, Edit, Sale } from "@/views";
import { Bills, AddBill, ShowBill, UpdateClient } from "@/views";

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

			<Route path="/bills" element={<Wrapper />}>
				<Route index element={<Bills />} />
				<Route path="show-bills" element={<ShowBill />} />
				<Route path="add-bill" element={<AddBill />} />
				<Route path="edit-client" element={<UpdateClient />} />
			</Route>
		</Routes>
	);
};
