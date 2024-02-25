import { Link } from "react-router-dom";
import Button from "../buttons/Button";
import "./header.css";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export const Header = () => {
  const context = useContext(AppContext);

  if (!context) {
    return null;
  }

  const { logado, setLogado } = context;
  const user = localStorage.getItem("cadastro") ?? "";
  const nomeUsuario = JSON.parse(user as string);

  function deslogar() {
    setLogado(!logado);
    localStorage.setItem("logado", JSON.stringify(!logado));
    localStorage.removeItem("usuario");
  }

  return (
    <div className="header-container">
      <a className="logo-navbar" />
      <div className="header-content">
        <ul>
          <li className="user-name">
            Olá, <span> {nomeUsuario[0].userName}</span>
          </li>
        </ul>
        <a className="icon-sair" />
        <Link to="/kanban-dashboard/login">
          <Button type="submit" className="botao-secundario" onClick={deslogar}>
            sair
          </Button>
        </Link>
      </div>
    </div>
  );
};
