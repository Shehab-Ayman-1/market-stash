import { useAxios } from "@/hooks/useAxios";
import { Input } from "@/components";
import { Alert } from "@/layout";
import "./styles/pay-widget.scss";

export const PayWidget = ({ pay, setPay }) => {
	const { data, error, isSubmitted, refetch } = useAxios();

	const handleChange = ({ target: { value } }) => {
		setPay((p) => ({ ...p, value: +value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		await refetch("put", `/bills/payment/${pay?.id}`, { value: pay?.value || 0 });
		setTimeout(() => setPay({ state: false, id: "", payment: { value: 0, finished: false } }), 5000);
	};

	if (isSubmitted && !error) return <Alert success message={data.success} />;
	if (isSubmitted && error) return <Alert error message={error} />;

	return (
		<form className="pay-widget" onSubmit={handleSubmit}>
			<div className="">
				<h3 className="title gradient-text">دفع فاتورة</h3>
				<i className="fa fa-times" onClick={() => setPay((p) => ({ state: false, payment: 0 }))} />
			</div>
			<div className="">
				<Input type="number" label={`المبلغ المدفوع مسبقاً - - - ${pay?.payment?.value + " جنية" || ""}`} placeholder="المبلغ..." min={0} required onChange={handleChange} />
				<button type="submit" className="btn">
					تاكيد الدفع
				</button>
			</div>
		</form>
	);
};
