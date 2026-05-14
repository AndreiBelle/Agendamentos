import { Routes, Route } from "react-router-dom";
import { AppCadastro } from "../cadastro";
import {App} from "../App"


export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/cadastro" element={<AppCadastro />} />
            <Route path="/" element={<App />} />
        </Routes>
    )
}