import { createSlice } from "@reduxjs/toolkit";

const initialState = { homeProducts: [], tableLists: [], lists: [], catagoriesList: [], companiesList: [], productsList: [] };
export const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setHomeProducts: (state, { payload }) => {
			state.homeProducts = payload;
			return state;
		},
		setTableLists: (state, { payload }) => {
			state.tableLists = payload;
			return state;
		},
		setLists: (state, { payload }) => {
			state.lists = payload;
			state.catagoriesList = payload.map((item) => item.catagory).sort((a, b) => a.localeCompare(b)) || [];
			return state;
		},
		filterLists: (state, { payload }) => {
			const companies = state.lists.find((list) => list.catagory === payload.catagory)?.companies;
			console.log(payload);
			const products = companies?.find((item) => item.company === payload.company)?.products;

			state.companiesList = companies?.map((item) => item.company).sort((a, b) => a.localeCompare(b)) || [];
			state.productsList = products?.sort((a, b) => a.localeCompare(b)) || [];

			return state;
		},
		resetLists: (state) => {
			state.lists = [];
			return state;
		},
	},
});

export const { setHomeProducts, setTableLists, setLists, filterLists, resetLists } = productsSlice.actions;
