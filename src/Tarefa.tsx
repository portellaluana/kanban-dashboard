// Tarefa.tsx
import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import Button from "./components/buttons/Button";

interface TarefaProps {
  task: {
    id: string;
    name: string;
    description: string;
    column?: string; 
  };
  index: number;
}

export function Tarefa({ task, index }: TarefaProps) {
  const [open, setOpen] = useState<boolean>(false);

  function openModalSets() {
    setOpen(!open);
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="tarefa"
        >
          <div className="tarefa-container">
            <p className="tarefa-title">
              {task.name}
              {open ? (
                <div className="modal-sets">
                  <div className="background-modal-sets">
                    <Button onClick={openModalSets}>x</Button>
                    <Button className="button-editar">editar tarefa</Button>
                    <Button className="button-excluir">excluir tarefa</Button>
                  </div>
                </div>
              ) : (
                <Button onClick={openModalSets} className="button-sets">
                  <a className="menu-icon" />
                </Button>
              )}
            </p>
            <p className="tarefa-description">{task.description}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
}
