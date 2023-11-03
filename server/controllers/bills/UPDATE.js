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
