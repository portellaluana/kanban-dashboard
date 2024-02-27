import { Draggable } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import Input from "../inputs/Input";
import './card.css'


interface CardProps {
  task: {
    id: string;
    name: string;
    description: string;
    column?: string;
  };
  index: number;
  onCardNameChange: (cardId: string, newName: string) => void;
  onCardDescriptionChange: (cardId: string, newDescription: string) => void;
}

export function Card({
  task,
  index,
  onCardNameChange,
  onCardDescriptionChange,
}: CardProps) {
  const [cardName, setCardName] = useState(task.name);
  const [cardDescription, setCardDescription] = useState(task.description);
  const [isEditingName, setEditingName] = useState(false);
  const [isEditingDescription, setEditingDescription] = useState(false);

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardName(e.target.value);
  };

  const handleDescriptionInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCardDescription(e.target.value);
  };

  const handleInputKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      setEditingName(false);
      setEditingDescription(false);

      setCardName((prevCardName) => {
        onCardNameChange(task.id, prevCardName);
        return prevCardName;
      });

      setCardDescription((prevCardDescription) => {
        onCardDescriptionChange(task.id, prevCardDescription);
        return prevCardDescription;
      });

      onCardDescriptionChange(task.id, cardDescription);
    }
  };

  const handleClickName = () => {
    setEditingName(true);
  };

  const handleClickDescription = () => {
    setEditingDescription(true);
  };

  useEffect(() => {
    const storedCard = JSON.parse(localStorage.getItem(task.id) || "{}");
    setCardName(storedCard.name || task.name);
    setCardDescription(storedCard.description || task.description);
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
                className="modal-input modal-input-editing"
                onChange={handleNameInputChange}
                onKeyDown={handleInputKeyDown}
                value={cardName}
                onBlur={() => {
                  setEditingName(false);
                  onCardNameChange(task.id, cardName);
                }}
                autoFocus
              />
            ) : (
              <p className="card-title" onClick={handleClickName}>
                {cardName}
              </p>
            )}

            {isEditingDescription ? (
              <textarea
                placeholder={task.description}
                className="modal-input textarea-editing"
                onChange={handleDescriptionInputChange}
                onKeyDown={handleInputKeyDown}
                value={cardDescription}
                onBlur={() => {
                  setEditingDescription(false);
                  onCardDescriptionChange(task.id, cardDescription);
                }}
                autoFocus
              />
            ) : (
              <p className="card-description" onClick={handleClickDescription}>
                {cardDescription}
              </p>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}
