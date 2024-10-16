import { Bills } from "../../models/index.js";

export const UPDATE_CLIENT = async (req, res) => {
	try {
		const body = req.body;
		const updated = await Bills.updateMany({ name: body.oldName }, body);

		if (!updated.modifiedCount) return res.status(400).json({ error: "حدث خطا ولم يتم تعديل العميل" });
		res.status(200).json({ success: "لقد تم تعديل العميل بنجاح" });
	} catch (error) {
		res.status(404).json(`UPDATE_CLIENT: ${error.message}`);
	}
};

export const UPDATE_BILL = async (req, res) => {
	try {
		const { id } = req.params;
		const { products } = req.body;

		const updated = await Bills.updateOne({ _id: id }, { products });
		if (!updated.modifiedCount) return res.status(400).json({ error: "حدث خطأ ، ولم يتم تعديل الفاتورة" });

		res.status(200).json({ success: "لقد تم تعديل المنتج بنجاح" });
	} catch (error) {
		res.status(404).json(`UPDATE_BILL: ${error.message}`);
	}
};

export const PAYMENT = async (req, res) => {
	try {
		const { id } = req.params;
		const { value } = req.body;

		const bill = await Bills.findById(id);
		const total = bill.products.reduce((prev, cur) => prev + cur.price * cur.count, 0);

		const updated = await Bills.updateOne(
			{ _id: id },
			{
				$inc: { "payment.value": value },
				$set: { "payment.finished": total <= value + bill.payment.value },
			}
		);
		if (!updated.modifiedCount) return res.status(400).json({ error: "حدث خطأ ولم يتم دفع الفاتورة" });

		res.status(200).json({ success: "لقد تم دفع المبلغ بنجاح" });
	} catch (error) {
		res.status(404).json(`PAYMENT: ${error.message}`);
	}
};
