import { Link } from "react-router-dom";
import Button from "../components/buttons/Button";
import { Navbar } from "../components/navbar/Navbar";

export const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="bg-home">
          <h1>Plataforma desenvolvida para trabalhos inovadores.</h1>
          <h5>
            Descubra um ambiente de trabalho simplificado e flexível, ideal para
            equipes distribuídas. Tudo centralizado, fácil de usar e eficiente.
            Obtenha uma visão clara das tarefas com apenas alguns cliques.
          </h5>
          <Link to="/kanban-dashboard/cadastro">
            <Button type="submit" className="botao-cta">
              começar
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
