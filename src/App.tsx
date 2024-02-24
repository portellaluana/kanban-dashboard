import { Cadastro } from "./pages/Cadastro";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "./context/Provider";
import { Login } from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
    <BrowserRouter>
      <Provider>
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Provider>
    </BrowserRouter>
    </>
  );
}

export default App;
