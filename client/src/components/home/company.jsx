import { useNavigate } from "react-router-dom";
import { defaultImg } from "@/assets";
import "./styles/company.scss";

export const Company = ({ img, ...product }) => {
	const navigate = useNavigate();

	return (
		<div className="company">
			<img src={img || defaultImg} alt="img" />
			<h3 className="gradient-text">{product?.company}</h3>
			<div className="overlay">
				<h4 onClick={() => navigate("/show", { state: product._id })}>عرض التفاصيل</h4>
			</div>
		</div>
	);
};
