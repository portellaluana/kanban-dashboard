import { useContext } from "react";
import Button from "../buttons/Button";
import "./modal.css";
import { AppContext } from "../../context/AppContext";

export function Modal() {
  const context = useContext(AppContext);

  if (!context) {
    return null;
  }

  const { openModal, setOpenModal } = context;

  function abrirModal() {
    console.log("clique");
    setOpenModal(!openModal);
  }

  return (
    <>
      {openModal ? (
        <div className="filter">
        <div className="modal-container">
          <div className="modal-content">
            <h4 className="modal-title">Excluir tarefa?</h4>
            <div className="modal-content-button">
              <Button className="botao-primario-modal" onClick={abrirModal}>
                não excluir
              </Button>
              <Button className="botao-secundario-modal">excluir</Button>
            </div>
          </div>
        </div>
      </div>

      ) : null}
    </>
  );
}
