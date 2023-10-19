import { model, Schema } from "mongoose";

const schema = new Schema({
	img: { type: String, default: "" }, // compony img
	catagory: { type: String, trim: true },
	company: { type: String, trim: true },
	products: [
		{
			name: { type: String, trim: true },
			count: { type: Number, default: 0 },
			price: { type: Number, default: 0 },
		},
	],
});

export const Products = model("products", schema);
