import { Bills } from "../../models/index.js";

export const CREATE_BILL = async (req, res) => {
	try {
		const body = req.body;

		// Keep The Last 50 Orders
		const maxDocs = 49;
		const bills = await Bills.find()
			.sort({ createdAt: -1 })
			.limit(maxDocs + 1);

		if (bills.length > maxDocs) {
			const lastCreatedAt = bills[maxDocs]?.createdAt;
			if (lastCreatedAt) {
				const { _id, createdAt } = await Bills.findOneAndReplace({ createdAt: lastCreatedAt }, body, { new: true });
				return res.status(200).json({ success: "لقد تم اضافه الفاتورة بنجاح", _id, createdAt });
			}
		}

		const { _id, createdAt } = await Bills.create(body);
		res.status(200).json({ success: "لقد تم اضافه الفاتورة بنجاح", _id, createdAt });
	} catch (error) {
		res.status(404).json(`CREATE_BILL: ${error.message}`);
	}
};
