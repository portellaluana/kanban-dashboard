import { Tarefa } from "../Tarefa";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import Button from "../components/buttons/Button";
import Input from "../components/inputs/input";
import { Link } from "react-router-dom";

interface TarefasProps {
  id: string;
  name: string;
  description: string;
  status: string;
}

interface ColunaProps {
  id: string;
  title: string;
  tasks: TarefasProps[];
}

function Dashboard() {
  const [colunas, setColunas] = useState<ColunaProps[]>([
    { id: "tarefas-a-fazer", title: "A fazer", tasks: [] },
    { id: "tarefas-fazendo", title: "Fazendo", tasks: [] },
    { id: "tarefas-prontas", title: "Prontos", tasks: [] },
  ]);

  const context = useContext(AppContext);

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
    logado,
    setLogado,
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
          id: `${colunaFeito.tasks} ${Math.floor(Math.random() * 100)}`,
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
      // window.location.reload();
    }

    const colunaAlvoIndex = colunas.findIndex(
      (coluna) => coluna.id === `tarefas-${statusTarefa}`
    );

    const colunaAlvo = { ...colunas[colunaAlvoIndex] };

    const novaTarefa = {
      id: `${colunaAlvo.tasks} ${Math.floor(Math.random() * 100)}`,
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
    // window.location.reload();
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

  // localStorage.removeItem;

  function atualizaLocalStorage(colunas: ColunaProps[]) {
    colunas.forEach((coluna) => {
      localStorage.setItem(coluna.id, JSON.stringify(coluna.tasks));
      console.log(colunas);
    });
  }

  function openModalTarefa() {
    setOpen(!open);
    console.log(open);
  }

  function deslogar() {
    setLogado(logado);
    localStorage.setItem("logado", JSON.stringify(logado));
    localStorage.removeItem('usuario')
  }

  useEffect(() => {
    const storedcolunas = colunas.map((coluna) => ({
      ...coluna,
      tasks: JSON.parse(localStorage.getItem(coluna.id) || '[]') || [],
    }));
  
    setColunas(storedcolunas);
  }, []);

  return (
    <>
      <div className="dashboard">
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
            <Button type="submit" className="button-add">
              criar tarefa
            </Button>
          </form>
        ) : (
          <div className="form-container">
            <Button
              type="submit"
              className="button-plus"
              onClick={openModalTarefa}
            >
              +
            </Button>
          </div>
        )}
        <Link to="/kanban-dashboard/login">
          <Button type="submit" className="botao-secundario" onClick={deslogar}>
            deslogar
          </Button>
        </Link>
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
  <Tarefa key={task.id} task={task} index={indexTarefa} />
))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </>
  );
}

export default Dashboard;
