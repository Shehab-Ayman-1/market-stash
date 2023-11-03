import { model, Schema } from "mongoose";

const schema = new Schema(
	{
		name: String,
		address: String,
		products: [
			{
				name: String,
				count: Number,
				price: Number,
			},
		],
	},
	{ timestamps: true }
);

export const Bills = model("bills", schema);
