import { Draggable } from '@hello-pangea/dnd'

interface TarefaProps {
    task: {
      id: string;
      name: string;
    }
    index: number;
  }
  
  export function Tarefa({ task, index }: TarefaProps) {
    return (
<Draggable draggableId={task.id} index={index}>
{
    (provided) => (
        <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        
        className="tarefa"
      >
        <p className="tarefa-text">{task.name}</p>

      </div>
    )
}
      </Draggable>
    );
  }