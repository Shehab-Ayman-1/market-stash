import { configureStore } from "@reduxjs/toolkit";
import { controllerSlice, productsSlice } from "@/redux";

export const store = configureStore({
	reducer: {
		controllers: controllerSlice.reducer,
		products: productsSlice.reducer,
	},
});
