import { Tarefa } from "../Tarefa";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

function Dashboard() {
  const [colunas, setColunas] = useState([
    { id: "tarefas-a-fazer", title: "A fazer", tasks: [] },
    { id: "tarefas-fazendo", title: "Fazendo", tasks: [] },
    { id: "tarefas-prontas", title: "Prontos", tasks: [] },
  ]);

  const [nomeTarefa, setNomeTarefa] = useState("");
  const [descricaoTarefa, setDescricaoTarefa] = useState("");
  const [statusTarefa, setStatusTarefa] = useState("a-fazer");
  const [open, setOpen] = useState(false);

  function handleAddTask(nomeTarefa, descricaoTarefa, statusTarefa) {
    if (statusTarefa === "feito") {
      const colunaFeito = colunas.find(
        (coluna) => coluna.id === "tarefas-prontas"
      );

      if (colunaFeito) {
        const newTask = {
          id: `${colunaFeito.tasks} ${Math.floor(Math.random() * 100)}`,
          name: nomeTarefa,
          description: descricaoTarefa,
          status: statusTarefa,
        };

        const atualizaColunas = colunas.map((coluna) =>
          coluna.id === colunaFeito.id
            ? { ...colunaFeito, tasks: [...colunaFeito.tasks, newTask] }
            : coluna
        );

        setColunas(atualizaColunas);
        atualizaLocalStorage(atualizaColunas);
        setNomeTarefa("");
        setDescricaoTarefa("");
        setStatusTarefa("a-fazer");
        return;
      }
      window.location.reload();
    }

    const colunaAlvoIndex = colunas.findIndex(
      (coluna) => coluna.id === `tarefas-${statusTarefa}`
    );

    const colunaAlvo = { ...colunas[colunaAlvoIndex] };

    const newTask = {
      id: `${colunaAlvo.tasks} ${Math.floor(Math.random() * 100)}`,
      name: nomeTarefa,
      description: descricaoTarefa,
      status: statusTarefa,
    };

    colunaAlvo.tasks = [...colunaAlvo.tasks, newTask];

    const atualizaColunas = [...colunas];
    atualizaColunas[colunaAlvoIndex] = colunaAlvo;

    setColunas(atualizaColunas);
    atualizaLocalStorage(atualizaColunas);
    setNomeTarefa("");
    setDescricaoTarefa("");
    setStatusTarefa("a-fazer");
    window.location.reload();
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const indexColunaAnterior = parseInt(result.source.droppableId, 10);
    const indexColunaDestino = parseInt(result.destination.droppableId, 10);

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

  localStorage.removeItem;

  function atualizaLocalStorage(colunas) {
    colunas.forEach((coluna) => {
      localStorage.setItem(coluna.id, JSON.stringify(coluna.tasks));
    });
  }

  function openModalTarefa() {
    setOpen(!open);
    console.log(open);
  }

  // function handleDeleteTask(colunaId, taskId) {
  //   const atualizaColunas = [...colunas];
  //   const colunaAlvo = atualizaColunas.find((coluna) => coluna.id === colunaId);

  //   if (colunaAlvo) {
  //     const indexTarefaNaColuna = colunaAlvo.tasks.findIndex(
  //       (task) => task.id === taskId
  //     );

  //     if (indexTarefaNaColuna !== -1) {
  //       colunaAlvo.tasks.splice(indexTarefaNaColuna, 1);
  //       setColunas(atualizaColunas);
  //       atualizaLocalStorage(atualizaColunas);
  //     }
  //   }
  // }

  useEffect(() => {
    const storedcolunas = colunas.map((coluna) => ({
      ...coluna,
      tasks: JSON.parse(localStorage.getItem(coluna.id)) || [],
    }));
    setColunas(storedcolunas);
  }, []);

  return (
    <>
      <div className="dashboard">
        {open ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddTask(nomeTarefa, descricaoTarefa, statusTarefa);
            }}
          >
            <input
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
            <button type="submit" className="button-add">
              criar tarefa
            </button>
          </form>
        ) : (
          <div className="form-container">
            <button
              type="submit"
              className="button-plus"
              onClick={openModalTarefa}
            >
              +
            </button>
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
                    {coluna.tasks.map((task) => (
                      <Tarefa
                        key={task.id}
                        task={task}
                        // onDelete={(colunaId, taskId) =>
                        //   handleDeleteTask(colunaId, taskId)
                        // }
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
    </>
  );
}

export default Dashboard;