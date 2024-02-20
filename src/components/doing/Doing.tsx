import { useState, FormEvent, useEffect } from "react";
import { Tarefa } from "../../Tarefa";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

function Doing() {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [title, setTitle] = useState([]);

  function handleAddTask(event: FormEvent) {
    event.preventDefault();

    if (taskName === "") return;

    const newItem = {
      id: `${title.length + 1}`,
      name: taskName,
      description: taskDescription,
    };

    setTitle((allTasks) => [...allTasks, newItem]);
    setTaskName(""); 
    setTaskDescription(""); 

    localStorage.setItem("tarefas-fazendo", JSON.stringify([...title, newItem]));
  }

  function reoder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  function ondragend(result: any) {
    if (!result.destination) {
      return;
    }

    const items = reoder(title, result.source.index, result.destination.index);
    setTitle(items);

    localStorage.setItem("tarefas-fazendo", JSON.stringify(items));
  }

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tarefas-fazendo")) || [];
    setTitle(storedTasks);
  }, []);

  return (
    <>
      <div className="coluna">
        <h4 className="title-doing">Fazendo</h4>

        <section className="container-tarefas">
          <DragDropContext onDragEnd={ondragend}>
            <Droppable droppableId="tasks" type="list" direction="vertical">
              {(provided) => (
                <article ref={provided.innerRef} {...provided.droppableProps}>
                  {title.map((task, index) => (
                    <Tarefa key={index} task={task} index={index} />
                  ))}
                  {provided.placeholder}
                </article>
              )}
            </Droppable>
          </DragDropContext>
          <form className="form-container" onSubmit={handleAddTask}>
            <input
              type="text"
              placeholder="Título da tarefa"
              className="input"
              value={taskName}
              onChange={(event) => setTaskName(event.target.value)}
            />
            <input
              type="text"
              placeholder="Descrição da tarefa"
              className="input"
              value={taskDescription}
              onChange={(event) => setTaskDescription(event.target.value)}
            />
            <button type="submit" className="button-add">
              +
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default Doing;
