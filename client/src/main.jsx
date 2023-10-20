// React
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

// Cloude
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

// Redux
import { Provider } from "react-redux";
import { store } from "@/redux";

// Styles
import "@/assets/sass/index.scss";
import "@/assets/fonts/fontAwasome.css";

// Environments
if (import.meta.env.MODE === "production") disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
);
