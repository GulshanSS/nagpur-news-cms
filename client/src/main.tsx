import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.tsx";
import { CookiesProvider } from "react-cookie";
import AuthMiddleware from "./components/AuthMiddleware.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <CookiesProvider>
      <AuthMiddleware>
        <App />
      </AuthMiddleware>
    </CookiesProvider>
  </Provider>
);
