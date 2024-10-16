import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	homeProducts: [],
	tableLists: [],
	lists: [],
	catagoriesList: [],
	companiesList: [],
	productsList: [],
};

export const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setHomeProducts: (state, { payload }) => {
			state.homeProducts = payload;
			return state;
		},

		setTableLists: (state, { payload }) => {
			const data = payload
				?.sort((a, b) => a.catagory.localeCompare(b.catagory))
				.map(({ catagory, companies }) => {
					const comp = companies
						?.sort((a, b) => a.company.localeCompare(b.company))
						.map(({ products, ...company }) => {
							const prods = products?.sort((a, b) => a.name.localeCompare(b.name));
							return { ...company, products: prods };
						});

					return { catagory, companies: comp };
				});

			state.tableLists = data;
			return state;
		},

		setLists: (state, { payload }) => {
			state.lists = payload;
			state.catagoriesList = payload.map((item) => item.catagory)?.sort((a, b) => a.localeCompare(b)) || [];
			return state;
		},

		filterLists: (state, { payload }) => {
			const companies = state.lists.find((list) => list.catagory === payload.catagory)?.companies;
			const products = companies?.find((item) => item.company === payload.company)?.products;

			state.companiesList = companies?.map((item) => item.company)?.sort((a, b) => a.localeCompare(b)) || [];
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
