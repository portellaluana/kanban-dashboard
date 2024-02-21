// import { useState, FormEvent, useEffect } from "react";
// import { Tarefa } from "../../Tarefa";
// import { DragDropContext, Droppable } from "@hello-pangea/dnd";

// function Todo() {
//   const [taskName, setTaskName] = useState('');
//   const [taskDescription, setTaskDescription] = useState('');
//   const [tasks, setTasks] = useState([]);

//   function handleAddTask(event: FormEvent) {
//     event.preventDefault();

//     if (taskName === "") return;

//     const newItem = {
//       id: `${tasks.length + 1}`,
//       name: taskName,
//       description: taskDescription,
//     };

//     setTasks((prevTasks) => [...prevTasks, newItem]);
//     setTaskName(""); 
//     setTaskDescription(""); 

//     localStorage.setItem("tarefas-a-fazer", JSON.stringify([...tasks, newItem]));
//   }

//   function reoder<T>(list: T[], startIndex: number, endIndex: number) {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);
//     return result;
//   }

//   function ondragend(result: any) {
//     if (!result.destination) {
//       return;
//     }
//     const sourceIndex = result.source.index;
//     const destinationIndex = result.destination.index;

//     console.log(result.destination.droppableId)
//     if (result.source.droppableId !== result.destination.droppableId) {

//       const updatedSourceTasks = [...tasks];
//       const [removed] = updatedSourceTasks.splice(sourceIndex, 1);

//       const updatedDestinationTasks = [...tasks];
//       updatedDestinationTasks.splice(destinationIndex, 0, removed);

//       setTasks(updatedDestinationTasks);

//       localStorage.setItem("tarefas-a-fazer", JSON.stringify(updatedSourceTasks));
//       localStorage.setItem("tarefas-fazendo", JSON.stringify(updatedDestinationTasks));
//     } else {
//       const updatedTasks = reoder([...tasks], sourceIndex, destinationIndex);
//       setTasks(updatedTasks);

//       localStorage.setItem("tarefas-a-fazer", JSON.stringify(updatedTasks));
//     }
//   }

//   useEffect(() => {
//     const storedTasks = JSON.parse(localStorage.getItem("tarefas-a-fazer")) || [];
//     setTasks(storedTasks);
//   }, []);

//   return (
//     <>
//       <div className="coluna">
//         <h4 className="title">A fazer</h4>

//         <section className="container-tarefas">
//           <DragDropContext onDragEnd={ondragend}>
//             <Droppable droppableId="tasks-todo" type="list" direction="vertical">
//               {(provided) => (
//                 <article ref={provided.innerRef} {...provided.droppableProps}>
//                   {tasks.map((task, index) => (
//                     <Tarefa key={task.id} task={task} index={index} />
//                   ))}
//                   {provided.placeholder}
//                 </article>
//               )}
//             </Droppable>
//           </DragDropContext>
//           <form className="form-container" onSubmit={handleAddTask}>
//             <input
//               type="text"
//               placeholder="Título da tarefa"
//               className="input"
//               value={taskName}
//               onChange={(event) => setTaskName(event.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Descrição da tarefa"
//               className="input"
//               value={taskDescription}
//               onChange={(event) => setTaskDescription(event.target.value)}
//             />
//             <button type="submit" className="button-add">
//               +
//             </button>
//           </form>
//         </section>
//       </div>
//     </>
//   );
// }

// export default Todo;
