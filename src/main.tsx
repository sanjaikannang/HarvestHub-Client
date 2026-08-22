import "./global.css";
import "./i18n";
import App from "./App.tsx";
import { createRoot } from "react-dom/client";
import { AppProvider } from "./app/providers/AppProvider.tsx";

createRoot(document.getElementById("root")!).render(
    <>
        <AppProvider>
            <App />
        </AppProvider>
    </>
);
