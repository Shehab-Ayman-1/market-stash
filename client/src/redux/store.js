import { configureStore } from "@reduxjs/toolkit";
import { billsSlice, productsSlice } from "@/redux";

export const store = configureStore({
	reducer: {
		bills: billsSlice.reducer,
		products: productsSlice.reducer,
	},
});
