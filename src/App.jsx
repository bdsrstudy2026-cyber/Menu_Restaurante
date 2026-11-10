import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import RutaProtegida from "./components/RutaProtegida";
import Navbar from "./components/Navbar";

import Login from "./pages/Login/Login";
import Menu from "./pages/Menu/Menu";
import Menu2 from "./pages/Menu2/Menu2";
import Menu3 from "./pages/Menu3/Menu3";
import Menu4 from "./pages/Menu4/Menu4";

function App() {
return (
<AuthProvider>
<BrowserRouter>

<Routes>

{/* Pública: no necesita sesión */}
<Route path="/login" element={<Login />} />

{/* Protegidas: sin sesión te manda a /login */}
<Route element={<RutaProtegida />}>
<Route
element={
<>
<Navbar />
<Outlet />
</>
}
>
<Route path="/" element={<Menu />} />
<Route path="/menu2" element={<Menu2 />} />
<Route path="/menu3" element={<Menu3 />} />
<Route path="/menu4" element={<Menu4 />} />
</Route>
</Route>

</Routes>

</BrowserRouter>
</AuthProvider>
);
}

export default App;
