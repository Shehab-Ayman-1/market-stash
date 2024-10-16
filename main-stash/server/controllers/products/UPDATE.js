import { Products } from "../../models/index.js";

export const UPDATE_CATAGORY = async (req, res) => {
	try {
		const { replace, to } = req.body;
		if (replace.catagory === to.catagory) return res.status(400).json({ error: "اسم القسم مطابق للاسم الجديد" });

		const updated = await Products.updateMany(replace, to);
		if (!updated.modifiedCount) return res.status(400).json({ error: "حدث خطأ ولم يتم تعديل القسم" });

		res.status(200).json({ success: "لقم تم تعديل القسم بنجاح" });
	} catch (error) {
		res.status(404).json(`UPDATE_CATAGORY: ${error.message}`);
	}
};

export const UPDATE_COMPANY = async (req, res) => {
	try {
		const { replace, to } = req.body;

		const updated = await Products.updateOne(replace, to);
		if (!updated.modifiedCount) return res.status(400).json({ error: "حدث خطأ ولم يتم تعديل الشركة" });

		res.status(200).json({ success: "لقم تم تعديل الشركة بنجاح" });
	} catch (error) {
		res.status(404).json(`UPDATE_COMPANY: ${error.message}`);
	}
};

export const UPDATE_PRODUCT = async (req, res) => {
	try {
		const { replace, to } = req.body;
		if (replace.product === to.product) return res.status(400).json({ error: "اسم المنتج مطابق للاسم الجديد" });

		const updated = await Products.updateOne(
			{
				catagory: replace.catagory,
				company: replace.company,
				"products.name": replace.product,
			},
			{
				$set: { "products.$.name": to.product },
			}
		);
		if (!updated.modifiedCount) return res.status(400).json({ error: "حدث خطأ ولم يتم تعديل المنتج" });

		res.status(200).json({ success: "لقم تم تعديل المنتج بنجاح" });
	} catch (error) {
		res.status(404).json(`UPDATE_PRODUCT: ${error.message}`);
	}
};

export const BUY_PRODUCTS = async (req, res) => {
	try {
		const { price, count, lastEdit } = req.body;
		const { companyId, productId } = req.params;

		const edit = { date: new Date(), count };

		await Products.updateOne(
			{
				_id: companyId,
				"products._id": productId,
			},
			{
				$set: {
					"products.$.price": price,
					"products.$.lastEdits": [edit, lastEdit || edit],
				},
				$inc: {
					"products.$.count": count,
				},
			}
		);

		res.status(200).json({ success: "لقد تمت عمليه الشراء" });
	} catch (error) {
		res.status(404).json(`BUY_PRODUCTS: ${error.message}`);
	}
};

export const EDIT_PRICE = async (req, res) => {
	try {
		const { price } = req.body;
		const { companyId, productId } = req.params;

		await Products.updateOne(
			{
				_id: companyId,
				"products._id": productId,
			},
			{
				$set: {
					"products.$.price": price,
				},
			}
		);

		res.status(200).json({ success: "لقد تمت تعديل السعر" });
	} catch (error) {
		res.status(404).json(`EDIT_PRICE: ${error.message}`);
	}
};

export const SALE_PRODUCTS = async (req, res) => {
	try {
		const { count, lastEdit } = req.body;
		const { companyId, productId } = req.params;

		const edit = { date: new Date(), count: -count };
		await Products.updateOne(
			{
				_id: companyId,
				"products._id": productId,
			},
			{
				$set: {
					"products.$.lastEdits": [edit, lastEdit || edit],
				},
				$inc: {
					"products.$.count": -count,
				},
			}
		);

		res.status(200).json({ success: "لقد تمت عمليه البيع" });
	} catch (error) {
		res.status(404).json(`SALE_PRODUCTS: ${error.message}`);
	}
};
