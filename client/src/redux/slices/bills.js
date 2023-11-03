import { createSlice } from "@reduxjs/toolkit";

const initialState = { clients: [] };
export const billsSlice = createSlice({
	name: "bills",
	initialState,
	reducers: {
		setClients: (state, { payload }) => {
			state.clients = payload;
			return state;
		},
		deleteClient: (state, { payload }) => {
			state.clients = state.clients.filter((client) => client._id !== payload);
			return state;
		},
	},
});

export const { setClients, deleteClient } = billsSlice.actions;
