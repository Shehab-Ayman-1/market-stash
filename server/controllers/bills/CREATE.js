import { Bills } from "../../models/index.js";

export const CREATE_BILL = async (req, res) => {
	try {
		const body = req.body;
		// await Bills.create(body);

		const bills = await Bills.find().sort("createdAt");
		console.log(bills.length);

		res.status(200).json(bills);
	} catch (error) {
		res.status(404).json(`CREATE_BILL: ${error.message}`);
	}
};

export const CREATE_CLIENT = async (req, res) => {
	try {
		const body = req.body;
		if (!body.name || !body.address) return res.status(400).json({ error: "يجب ادخال اسم العميل والعنوان الخاص به" });

		const isExists = await Bills.exists({ name: body.name });
		if (isExists) return res.status(400).json({ error: "هذا المستخدم موجود بالفعل" });

		const newOne = await Bills.create(body);
		res.status(200).json({ success: "لقد تم اضافه العميل بنجاح", _id: newOne._id });
	} catch (error) {
		res.status(404).json(`CREATE_CLIENT: ${error.message}`);
	}
};
