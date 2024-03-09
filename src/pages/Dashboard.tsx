import { Card } from "../components/card/Card";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import Button from "../components/buttons/Button";
import Input from "../components/inputs/Input";
import { Login } from "./Login";
import { Header } from "../components/header/Header";
import { Link } from "react-router-dom";
import { Modal } from "../components/modal/Modal";

interface CardsProps {
  id: string;
  name: string;
  description: string;
  status: string;
}

interface ColunaProps {
  id: string;
  title: string;
  tasks: CardsProps[];
}

function Dashboard() {
  const [colunas, setColunas] = useState<ColunaProps[]>([
    { id: "tarefas-a-fazer", title: "A fazer", tasks: [] },
    { id: "tarefas-fazendo", title: "Fazendo", tasks: [] },
    { id: "tarefas-prontas", title: "Prontos", tasks: [] },
  ]);

  const context = useContext(AppContext);
  const [tarefaExcluida, setTarefaExcluida] = useState<boolean>(false);

  if (!context) {
    return null;
  }

  const {
    nomeTarefa,
    setNomeTarefa,
    descricaoTarefa,
    setDescricaoTarefa,
    statusTarefa,
    setStatusTarefa,
    open,
    setOpen,
    modalExcluirTarefa,
    setModalExcluirTarefa,
    idTarefa
  } = context;

  function handleAddTask(
    nomeTarefa: string,
    descricaoTarefa: string,
    statusTarefa: string
  ) {
    if (nomeTarefa === "" || descricaoTarefa === "") {
      return;
    }
    if (statusTarefa === "feito") {
      const colunaFeito = colunas.find(
        (coluna) => coluna.id === "tarefas-prontas"
      );

      if (colunaFeito) {
        const novaTarefa = {
          id: geradorID(),
          name: nomeTarefa,
          description: descricaoTarefa,
          status: statusTarefa,
        };

        const atualizaColunas = colunas.map((coluna) =>
          coluna.id === colunaFeito.id
            ? { ...colunaFeito, tasks: [...colunaFeito.tasks, novaTarefa] }
            : coluna
        );

        setColunas(atualizaColunas);
        atualizaLocalStorage(atualizaColunas);
        setNomeTarefa("");
        setDescricaoTarefa("");
        setStatusTarefa("a-fazer");
        return;
      }
    }

    const colunaAlvoIndex = colunas.findIndex(
      (coluna) => coluna.id === `tarefas-${statusTarefa}`
    );

    const colunaAlvo = { ...colunas[colunaAlvoIndex] };

    const novaTarefa = {
      id: geradorID(),
      name: nomeTarefa,
      description: descricaoTarefa,
      status: statusTarefa,
    };

    colunaAlvo.tasks = [...colunaAlvo.tasks, novaTarefa];

    const atualizaColunas = [...colunas];
    atualizaColunas[colunaAlvoIndex] = colunaAlvo;

    setColunas(atualizaColunas);
    atualizaLocalStorage(atualizaColunas);
    setNomeTarefa("");
    setDescricaoTarefa("");
    setStatusTarefa("a-fazer");
  }

  function geradorID(): string {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomId = "";

    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }

    return randomId;
  }

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    const indexColunaAnterior = parseInt(result.source.droppableId, 10);
    const indexColunaDestino =
      result.destination && result.destination.droppableId
        ? parseInt(result.destination.droppableId, 10)
        : -1;

    const indexAnterior = result.source.index;
    const indexDestino = result.destination.index;

    const atualizaColunas = [...colunas];
    const [TarefaMovida] = atualizaColunas[indexColunaAnterior].tasks.splice(
      indexAnterior,
      1
    );
    atualizaColunas[indexColunaDestino].tasks.splice(
      indexDestino,
      0,
      TarefaMovida
    );

    setColunas(atualizaColunas);
    atualizaLocalStorage(atualizaColunas);
  }

  function atualizaLocalStorage(colunas: ColunaProps[]) {
    colunas.forEach((coluna) => {
      localStorage.setItem(coluna.id, JSON.stringify(coluna.tasks));
    });
  }

  function openModalTarefa() {
    setOpen(!open);
  }

  function excluirUsuario() {
    localStorage.removeItem("logado");
    localStorage.removeItem("usuario");
    localStorage.removeItem("cadastro");
    localStorage.removeItem("tarefas-a-fazer");
    localStorage.removeItem("tarefas-fazendo");
    localStorage.removeItem("tarefas-prontas");
  }

  function handleCardNameChange(taskId: string, newName: string) {
    const updatedColunas = colunas.map((coluna) => ({
      ...coluna,
      tasks: coluna.tasks.map((task) =>
        task.id === taskId ? { ...task, name: newName } : task
      ),
    }));

    setColunas(updatedColunas);
    atualizaLocalStorage(updatedColunas);
  }

  function handleCardDescriptionChange(taskId: string, newDescription: string) {
    const updatedColunas = colunas.map((coluna) => ({
      ...coluna,
      tasks: coluna.tasks.map((task) =>
        task.id === taskId ? { ...task, description: newDescription } : task
      ),
    }));

    setColunas(updatedColunas);
    atualizaLocalStorage(updatedColunas);
  }

  function abrirModal() {
    setModalExcluirTarefa(!modalExcluirTarefa);
  }

  function deletarTarefa() {
    const tarefasAfazer = JSON.parse(localStorage["tarefas-a-fazer"]);
    const tarefasFazendo = JSON.parse(localStorage["tarefas-fazendo"]);
    const tarefasProntas = JSON.parse(localStorage["tarefas-prontas"]);

    let apagar = false;
    let indexDaTarefa;

    for (const [index, element] of tarefasAfazer.entries()) {
      if (element.id === idTarefa) {
        indexDaTarefa = index;
        apagar = true;
        const novaLista = tarefasAfazer;

        if (apagar) {
          novaLista.splice(indexDaTarefa, 1);
          localStorage.removeItem("tarefas-a-fazer");
          localStorage.setItem("tarefas-a-fazer", JSON.stringify(novaLista));
        }
      }
    }
    for (const [index, element] of tarefasFazendo.entries()) {
      if (element.id === idTarefa) {
        indexDaTarefa = index;
        apagar = true;
        const novaLista = tarefasFazendo;

        if (apagar) {
          novaLista.splice(indexDaTarefa, 1);
          localStorage.removeItem("tarefas-fazendo");
          localStorage.setItem("tarefas-fazendo", JSON.stringify(novaLista));
        }
      }
    }
    for (const [index, element] of tarefasProntas.entries()) {
      if (element.id === idTarefa) {
        indexDaTarefa = index;
        apagar = true;
        const novaLista = tarefasProntas;

        if (apagar) {
          novaLista.splice(indexDaTarefa, 1);
          localStorage.removeItem("tarefas-prontas");
          localStorage.setItem("tarefas-prontas", JSON.stringify(novaLista));
        }
      }
    }
    abrirModal();
    setTarefaExcluida(true);
  }

  useEffect(() => {
    const storedcolunas = colunas.map((coluna) => ({
      ...coluna,
      tasks: JSON.parse(localStorage.getItem(coluna.id) || "[]") || [],
    }));

    setColunas(storedcolunas);
  }, [tarefaExcluida]);

  return (
    <>
      {localStorage.getItem("usuario") ? (
        <div className="dashboard">
          <Header />

          {open ? (
            <form
              onSubmit={() => {
                handleAddTask(nomeTarefa, descricaoTarefa, statusTarefa);
              }}
            >
              <Input
                type="text"
                placeholder="Título da tarefa"
                className="input"
                value={nomeTarefa}
                onChange={(event) => setNomeTarefa(event.target.value)}
              />
              <textarea
                placeholder="Descrição da tarefa"
                className="input"
                value={descricaoTarefa}
                onChange={(event) => setDescricaoTarefa(event.target.value)}
              ></textarea>

              <select
                name="status"
                id="status"
                value={statusTarefa}
                onChange={(event) => setStatusTarefa(event.target.value)}
              >
                <option value="a-fazer">A fazer</option>
                <option value="fazendo">Fazendo</option>
                <option value="feito">Feito</option>
              </select>
              <Button className="botao-add">criar tarefa</Button>
            </form>
          ) : (
            <div className="form-container">
              <Button
                type="submit"
                className="botao-plus"
                onClick={openModalTarefa}
              >
                +
              </Button>
            </div>
          )}
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="colunas">
              {colunas.map((coluna, indexColuna) => (
                <Droppable
                  key={coluna.id}
                  droppableId={indexColuna.toString()}
                  type="list"
                  direction="vertical"
                >
                  {(provided) => (
                    <div
                      className="coluna"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <h4 className="coluna-title">{coluna.title}</h4>
                      {coluna.tasks.map((task, indexTarefa) => (
                        <Card
                          key={task.id}
                          task={task}
                          index={indexTarefa}
                          onCardNameChange={handleCardNameChange}
                          onCardDescriptionChange={handleCardDescriptionChange}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        </div>
      ) : (
        <Login />
      )}
      <Link to="/kanban-dashboard/cadastro">
        <Button
          type="submit"
          className="botao-secundario text-right"
          onClick={excluirUsuario}
        >
          excluir conta
        </Button>
      </Link>
      {modalExcluirTarefa ? (
        <Modal>
          <div className="filter">
            <div className="modal-container">
              <div className="modal-content">
                <h4 className="modal-title">Excluir tarefa?</h4>
                <div className="modal-content-button">
                  <Button className="botao-primario-modal" onClick={abrirModal}>
                    não excluir
                  </Button>
                  <Button
                    type="submit"
                    className="botao-secundario-modal"
                    onClick={deletarTarefa}
                  >
                    excluir
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

export default Dashboard;
