import { Link, useNavigate } from "react-router-dom";
import { links } from "@/constants";
import { logo } from "@/assets";
import { Dropdown } from "@/components";
import "./styles/navbar.scss";

export const Navbar = () => {
	const navigate = useNavigate();

	return (
		<nav className="navbar-section">
			<Link to="/" className="logo-section">
				<img src={logo} alt="logo" />
				<h3 className="gradient-text">المخزن الرئيسي</h3>
			</Link>

			<div className="icons">
				<a href="https://sub-market-stash-client.vercel.app" className="fas fa-city gradient-text" />
				<i className="fas fa-store-alt gradient-text" onClick={() => navigate("/bills")} />
				<i className="fas fa-table gradient-text" onClick={() => navigate("/products")} />
				<Dropdown icon="fa fa-bars gradient-text" windowClose linkClose>
					{links.map(({ name, icon, path }, i) => (
						<Link to={path} className={`dropdown-item ${i + 1 === links.length ? "last-item" : ""}`} key={i}>
							<i className={`${icon} gradient-text icon`} />
							<p className="content">{name}</p>
						</Link>
					))}
				</Dropdown>
			</div>
		</nav>
	);
};
