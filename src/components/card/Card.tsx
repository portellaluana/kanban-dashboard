import { Draggable } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import Input from "../inputs/input";

interface CardProps {
  task: {
    id: string;
    name: string;
    description: string;
    column?: string;
  };
  index: number;
  onCardNameChange: (taskId: string, newName: string) => void;
  onCardDescriptionChange: (taskId: string, newDescription: string) => void;
}

export function Card({
  task,
  index,
  onCardNameChange,
  onCardDescriptionChange,
}: CardProps) {
  const [taskName, setTaskName] = useState(task.name);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [isEditingName, setEditingName] = useState(false);
  const [isEditingDescription, setEditingDescription] = useState(false);

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  const handleDescriptionInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTaskDescription(e.target.value);
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      setEditingName(false);
      setEditingDescription(false);

      setTaskName((prevTaskName) => {
        onCardNameChange(task.id, prevTaskName);
        return prevTaskName;
      });

      onCardDescriptionChange(task.id, taskDescription);
    }
  };

  const handleClickName = () => {
    setEditingName(true);
  };

  const handleClickDescription = () => {
    setEditingDescription(true);
  };

  useEffect(() => {
    const storedTask = JSON.parse(localStorage.getItem(task.id) || "{}");
    setTaskName(storedTask.name || task.name);
    setTaskDescription(storedTask.description || task.description);
  }, [task.id, task.name, task.description]);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="card"
        >
          <div className="card-container">
            {isEditingName ? (
              <Input
                type="text"
                placeholder={task.name}
                className="modal-input"
                onChange={handleNameInputChange}
                onKeyDown={handleInputKeyDown}
                value={taskName}
                onBlur={() => {
                  setEditingName(false);
                  onCardNameChange(task.id, taskName);
                }}
                autoFocus
              />
            ) : (
              <p className="card-title" onClick={handleClickName}>
                {taskName}
              </p>
            )}

            {isEditingDescription ? (
              <textarea
                placeholder={task.description}
                className="modal-input"
                onChange={handleDescriptionInputChange}
                onKeyDown={handleInputKeyDown}
                value={taskDescription}
                onBlur={() => {
                  setEditingDescription(false);
                  onCardDescriptionChange(task.id, taskDescription);
                }}
                autoFocus
              />
            ) : (
              <p className="card-description" onClick={handleClickDescription}>
                {taskDescription}
              </p>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}
