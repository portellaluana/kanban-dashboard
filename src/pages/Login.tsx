import Dashboard from "./Dashboard";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import Button from "../components/buttons/Button";
import Input from "../components/inputs/input";
import { Link } from "react-router-dom";

export const Login = () => {
  const context = useContext(AppContext);

  if (!context) {
    return null;
  }

  const {
    user,
    logo,
    setLogoOff,
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    logado,
    setLogado,
  } = context;

  const handleLogin = () => {
    const cadastro = localStorage.getItem("cadastro");

    if (
      !cadastro?.includes(userEmail) ||
      !cadastro?.includes(userPassword) ||
      userEmail === "" ||
      userPassword === ""
    ) {
      return;
    } else {
      const newUser = { userEmail, userPassword };
      localStorage.setItem("usuario", JSON.stringify([...user, newUser]));
    }
    setLogado(!logado);
    localStorage.setItem("logado", JSON.stringify(!logado));
  };

  function changeLogo() {
    setLogoOff(!logo);
  }

  return (
    <>
      {localStorage.getItem("usuario") ? (
        <Dashboard />
      ) : (
        <div className="modal-container">
          <div className="modal-content">
            <h2>Login</h2>
            {logo ? (
              <a className="logo-icon" />
            ) : (
              <a className="logo-icon-off" />
            )}
            <Input
              type="text"
              placeholder="Email"
              className="modal-input"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <Input
              type="password"
              className="modal-input"
              placeholder="Senha"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              onFocus={changeLogo}
              onBlur={changeLogo}
            />
            <Link to="/kanban-dashboard/dashboard">
              <Button
                type="submit"
                onClick={handleLogin}
                className="botao-primario"
              >
                fazer login
              </Button>
            </Link>
            <Link to="/kanban-dashboard/cadastro">
              <p className="text-center">
                Ainda não tem cadastro?<span className="botao-secundario">Cadastre-se</span>
              </p>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
