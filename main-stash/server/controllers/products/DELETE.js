import { Products } from "../../models/index.js";

export const DELETE_CATAGORY = async (req, res) => {
	try {
		const { catagory } = req.query;
		if (!catagory) return res.status(400).json({ error: "يجب ادخال اسم القسم" });

		const deleted = await Products.deleteMany({ catagory });
		if (!deleted.deletedCount) return res.status(400).json({ error: "حدث خطأ ولم يتم حذف المنتج" });

		res.status(200).json({ success: "لقم تم حذف القسم بنجاح" });
	} catch (error) {
		res.status(404).json(`DELETE_CATAGORY: ${error.message}`);
	}
};

export const DELETE_COMPANY = async (req, res) => {
	try {
		const { catagory, company } = req.query;
		if (!catagory || !company) return res.status(400).json({ error: "يجب ادخال اسم القسم والشركة" });

		const deleted = await Products.deleteOne({ catagory, company });
		if (!deleted.deletedCount) return res.status(400).json({ error: "حدث خطأ ولم يتم حذف الشركة" });

		return res.status(200).json({ success: "لقم تم حذف الشركة بنجاح" });
	} catch (error) {
		res.status(404).json(`DELETE_COMPANY: ${error.message}`);
	}
};

export const DELETE_PRODUCT = async (req, res) => {
	try {
		const { catagory, company, product } = req.query;
		if (!catagory || !company || !product) return res.status(400).json({ error: "يجب ادخال اسم القسم والشركة والمنتج" });

		const deleted = await Products.updateOne({ catagory, company }, { $pull: { products: { name: product } } });
		if (!deleted.modifiedCount) return res.status(400).json({ error: "حدث خطأ ولم يتم حذف المنتج" });

		res.status(200).json({ success: "لقم تم حذف المنتج بنجاح" });
	} catch (error) {
		res.status(404).json(`DELETE_PRODUCTS: ${error.message}`);
	}
};
