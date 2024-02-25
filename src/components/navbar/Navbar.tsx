import { Link } from "react-router-dom";
import Button from "../buttons/Button";
import "./navbar.css";
import { Menu } from "../menu-mobile/Menu";

export const Navbar = () => {
  return (
    <div className="navbar-container">
      <a className="logo-navbar" />
      <div className="navbar-content-mobile">
      <Link to="/kanban-dashboard/cadastro">
              <Button type="submit" className="botao-secundario iniciar-mobile">
                iniciar sessão
              </Button>
            </Link>
      <Menu />
      </div>
      <div className="navbar-content">
        <ul>
          <li>preços</li>
          <li>fale conosco</li>
          <li>
            <Link to="/kanban-dashboard/cadastro">
              <Button type="submit" className="botao-secundario">
                iniciar sessão
              </Button>
            </Link>
          </li>
        </ul>
    
        <Link to="/kanban-dashboard/cadastro">
          <Button type="submit" className="botao-cta botao-nav">
            começar
          </Button>
        </Link>
      </div>
    </div>
  );
};
