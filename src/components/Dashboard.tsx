import { Tarefa } from "../Tarefa";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

function Dashboard() {
  const [columns, setColumns] = useState([
    { id: 'tasks-a-fazer', title: 'A fazer', tasks: [] },
    { id: 'tasks-fazendo', title: 'Fazendo', tasks: [] },
    { id: 'tasks-prontas', title: 'Prontos', tasks: [] },
  ]);

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  function handleAddTask(columnIndex, taskName, taskDescription) {
    const updatedColumns = columns.map((column, index) => {
      if (index === columnIndex) {
        const newTask = {
          id: `${column.tasks.length + 1}`,
          name: taskName,
          description: taskDescription,
        };
        return { ...column, tasks: [...column.tasks, newTask] };
      }
      return column;
    });

    setColumns(updatedColumns);
    updateLocalStorage(updatedColumns);
    setTaskName('');  // Clear input fields after adding task
    setTaskDescription('');
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const sourceColumnIndex = parseInt(result.source.droppableId, 10);
    const destinationColumnIndex = parseInt(result.destination.droppableId, 10);

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    const updatedColumns = [...columns];
    const [movedTask] = updatedColumns[sourceColumnIndex].tasks.splice(sourceIndex, 1);
    updatedColumns[destinationColumnIndex].tasks.splice(destinationIndex, 0, movedTask);

    setColumns(updatedColumns);
    updateLocalStorage(updatedColumns);
  }

  function updateLocalStorage(columns) {
    columns.forEach((column) => {
      localStorage.setItem(column.id, JSON.stringify(column.tasks));
    });
  }

  useEffect(() => {
    const storedColumns = columns.map((column) => ({
      ...column,
      tasks: JSON.parse(localStorage.getItem(column.id)) || [],
    }));
    setColumns(storedColumns);
  }, []);

  return (
    <div className="dashboard">
      <DragDropContext onDragEnd={onDragEnd}>
        {columns.map((column, columnIndex) => (
          <Droppable key={column.id} droppableId={columnIndex.toString()} type="list" direction="vertical">
            {(provided) => (
              <div className="column" ref={provided.innerRef} {...provided.droppableProps}>
                 {columnIndex === 0 && (  
                  <form
                    className="form-container"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleAddTask(columnIndex, taskName, taskDescription);
                    }}
                  >
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
                )}
                <h4 className="column-title">{column.title}</h4>
                {column.tasks.map((task, index) => (
                  <Tarefa key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
               
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
}

export default Dashboard;
