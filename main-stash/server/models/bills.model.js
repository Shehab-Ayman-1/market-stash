import { model, Schema } from "mongoose";

const schema = new Schema(
	{
		name: String,
		address: String,
		payment: {
			finished: { type: Boolean, default: false },
			value: { type: Number, default: 0 },
		},
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
