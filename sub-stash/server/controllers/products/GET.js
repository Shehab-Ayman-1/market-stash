import { Products } from "../../models/index.js";

export const GET_HOME_COMPANIES = async (req, res) => {
	try {
		const { limit } = req.query;

		const products = await Products.find()
			.select(["img", "company"])
			.sort("company")
			.limit(limit || 999);

		res.status(200).json(products);
	} catch (error) {
		res.status(404).json(`GET_HOME_COMPANIES: ${error.message}`);
	}
};

export const GET_LISTS = async (req, res) => {
	try {
		let lists = await Products.aggregate([
			{
				$group: {
					_id: "$catagory", // Group By Catagory
					companies: {
						$push: {
							company: "$company",
							products: "$products.name",
						},
					},
				},
			},
			{
				$project: {
					_id: 0, // Exclude _id Field
					catagory: "$_id", // Rename _id To catagory
					companies: 1, // Include companies
				},
			},
		]);

		res.status(200).json(lists);
	} catch (error) {
		res.status(404).json(`GET_LISTS_BY_KEY: ${error.message}`);
	}
};

export const TABLE_LISTS = async (req, res) => {
	try {
		const lists = await Products.aggregate([
			{
				$unwind: "$products", // Add this stage To Seperate Each Product In products To Single Document
			},

			{
				$group: {
					_id: { catagory: "$catagory", company: "$company" }, // Group By Catagory and Company
					total: {
						$sum: {
							$cond: [
								{ $and: [{ $ne: ["$products.price", 0] }, { $ne: ["$products.count", 0] }] }, // If price and count are not 0
								{ $multiply: ["$products.price", "$products.count"] }, // Then multiply them
								0, // Else return 0
							],
						},
					},
					products: { $push: "$products" }, // Add the products to an array
				},
			},

			{
				$group: {
					_id: "$_id.catagory", // Group By Catagory
					companies: {
						$push: {
							company: "$_id.company",
							total: "$total",
							products: "$products",
						},
					}, // Add the companies to an array
				},
			},

			{
				$project: {
					_id: 0, // Exclude _id Field
					catagory: "$_id", // Rename _id To catagory
					companies: 1, // Include companies
				},
			},
		]);
		res.status(200).json(lists);
	} catch (error) {
		res.status(404).json(`TABLE_LISTS: ${error.message}`);
	}
};

export const GET_COMPANY = async (req, res) => {
	try {
		const { id } = req.params;

		const company = await Products.findById(id).select(["_id", "catagory", "company", "products"]);
		if (!company) return res.status(400).json({ error: "لم يتم العثور علي المنتج" });

		res.status(200).json(company);
	} catch (error) {
		res.status(404).json(`GET_COMPANY: ${error.message}`);
	}
};
