import { Bills } from "../../models/index.js";

export const GET_BILLS = async (req, res) => {
	try {
		const query = Object.keys(req.query);
		const bills = await Bills.find().select(query).sort({ createdAt: -1 });

		res.status(200).json(bills);
	} catch (error) {
		res.status(404).json(`GET_BILLS: ${error.message}`);
	}
};

export const GET_BILL = async (req, res) => {
	try {
		const { id } = req.params;

		const bill = await Bills.findById(id);
		if (!bill) return res.status(400).json({ error: "لم يتم العثور علي الفاتورة" });

		const totalPrices = bill.products.reduce((prev, cur) => prev + cur.count * cur.price, 0);
		res.status(200).json({ totalPrices, ...bill._doc });
	} catch (error) {
		res.status(404).json(`GET_BILL: ${error.message}`);
	}
};
