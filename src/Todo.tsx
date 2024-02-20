import { useState, FormEvent, useEffect } from "react";
import { Tarefa } from "./Tarefa";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

function Todo() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([{
    id: null,
    name: null
  }]);

  function handleAddTask(event: FormEvent) {
    event.preventDefault();

    if (newTask === "") return;

    const newItem = {
      id: `${tasks.length + 1}`,
      name: newTask,
    };

    setTasks((allTasks) => [...allTasks, newItem]);
    setNewTask("");

    localStorage.setItem("tarefas", JSON.stringify([...tasks, newItem]));
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

    const items = reoder(tasks, result.source.index, result.destination.index);
    setTasks(items);

    localStorage.setItem("tarefas", JSON.stringify(items));
  }

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tarefas")) || [];
    setTasks(storedTasks);
  }, []);

  return (
    <>
    <div className="coluna">
      <h4 className="title">A fazer</h4>

      <section className="container-tarefas">
        <DragDropContext onDragEnd={ondragend}>
          <Droppable droppableId="tasks" type="list" direction="vertical">
            {(provided) => (
              <article ref={provided.innerRef} {...provided.droppableProps}>
                {tasks.map((task, index) => (
                  <Tarefa key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </article>
            )}
          </Droppable>
        </DragDropContext>
        <form className="form-container" onSubmit={handleAddTask}>
          <input
            type="text"
            placeholder="Nova tarefa"
            className="input"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
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

export default Todo;
