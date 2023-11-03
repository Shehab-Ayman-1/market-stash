import { Products } from "../../models/index.js";

export const CREATE_CATAGORY = async (req, res) => {
	try {
		const { img, catagory, companies } = req.body;
		if (!img || !catagory || !companies?.length) return res.status(400).json({ error: "يجب ادخال اسم القسم و اسم الشركة" });

		const isCatagoryExist = await Products.findOne({ catagory: catagory.trim() });
		if (isCatagoryExist) return res.status(400).json({ error: "هذا القسم موجود بالفعل" });

		const products = Array.from(new Set(companies)).map((company) => ({ img, catagory, company: company.trim() }));
		await Products.create(products);

		return res.status(200).json({ success: `تم انشاء ${products.length} شركات` });
	} catch (error) {
		res.status(404).json(`CREATE_CATAGORY: ${error.message}`);
	}
};

export const CREATE_COMPANY = async (req, res) => {
	try {
		const { img, catagory, companies } = req.body;

		const products = await Products.find({ catagory: catagory.trim() });
		if (!products.length) return res.status(400).json({ error: "لم يتم العثور علي القسم" });

		const uniques = companies.filter((company) => !products.map((item) => item.company).includes(company.trim()));
		if (!uniques.length) return res.status(400).json({ error: "هذه الشركات موجوده بالفعل" });

		const _products = uniques.map((company) => ({ img, catagory, company: company.trim() }));
		await Products.create(_products);

		res.status(200).json({ success: "تم الاضافه الشركات بنجاح" });
	} catch (error) {
		res.status(404).json(`CREATE_COMPANY: ${error.message}`);
	}
};

export const CREATE_PRODUCTS = async (req, res) => {
	try {
		const body = req.body; // { catagory, company, products }

		// Find Company
		const company = await Products.findOne({ catagory: body.catagory, company: body.company });
		if (!company) return res.status(400).json({ error: "لم يتم العثور علي الشركة" });

		// Get Uniques Names
		const companyNames = company.products.map((item) => item.name);
		const uniques = body.products.filter((name) => !companyNames.includes(name));
		if (!uniques.length) return res.status(400).json({ error: "هذه المنتجات موجوده بالفعل" });

		// Create New Products
		const newProducts = uniques.map((name) => ({ name }));
		await Products.updateOne({ catagory: body.catagory, company: body.company }, { $push: { products: newProducts } }, { new: true });
		await company.save();

		res.status(200).json({ success: "تم الاضافه بنجاح" });
	} catch (error) {
		res.status(404).json(`CREATE_PRODUCTS: ${error.message}`);
	}
};
