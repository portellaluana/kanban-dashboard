import Button from "../buttons/Button";
import "./header.css";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from 'react-router-dom';


export const Header = () => {
  const context = useContext(AppContext);
  const navigate = useNavigate();

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
    navigate("/kanban-dashboard/login");
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
          <Button type="submit" className="botao-secundario" onClick={deslogar}>
            sair
          </Button>
      </div>
    </div>
  );
};
