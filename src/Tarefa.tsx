import { Draggable } from '@hello-pangea/dnd'

interface TarefaProps {
  task: {
    id: string;
    name: string;
    description: string;
    column: string;
  };
  index: number;
}

export function Tarefa({ task, index }: TarefaProps) {

  
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
            <p className="tarefa-title">{task.name}</p>
            <p className="tarefa-description">{task.description}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
}
