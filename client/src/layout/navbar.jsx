import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { links } from "@/constants";
import { logo } from "@/assets";
import "./styles/navbar.scss";

export const Navbar = () => {
	const [toggler, setToggler] = useState(false);
	const navigate = useNavigate();

	const handleToggler = () => {
		setToggler((t) => !t);
	};

	return (
		<nav className="navbar-section">
			<Link to="/" className="logo-section">
				<img src={logo} alt="logo" />
				<h3 className="gradient-text">المخزن الرئيسي</h3>
			</Link>

			<div className="icons">
				<i className="fas fa-store-alt gradient-text" onClick={() => navigate("/bills")} />
				<i className="fas fa-table gradient-text" onClick={() => navigate("/products")} />
				<i className="fa fa-bars gradient-text" onClick={handleToggler} />
			</div>

			<div className={`dropdown ${toggler ? "" : "hide-scale"}`}>
				<ul>
					{links.map((link) => (
						<li key={link.name} className="gradient-text" onClick={handleToggler}>
							<Link to={link.path}>
								<i className={link.icon} />
								<p>{link.name}</p>
							</Link>
						</li>
					))}
				</ul>
			</div>

			<div className={`overlay ${toggler ? "" : "hide-display"}`} onClick={handleToggler} />
		</nav>
	);
};
