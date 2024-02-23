import { useState } from "react";
import Dashboard from "./Dashboard";

export const Cadastro = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmaUserPassword, setConfirmaUserPassword] = useState("");
  const [user, setUser] = useState([]);

  const handleLogin = () => {
    if (userName === "" || userPassword === "" || userEmail === "") {
    console.log('setUserName, setUserEmail, setUserPassword')

      return;
    } else if (setUserPassword != setConfirmaUserPassword) {
    console.log('setUserPassword, setConfirmaUserPassword')

      return;
    } else {
      const novoCadastro = { userName, userEmail, userPassword };
      localStorage.setItem("cadastro", JSON.stringify([...user, novoCadastro]));
    }
    console.log('setUserName, setUserEmail, setUserPassword, setConfirmaUserPassword')
    window.location.reload();
  };

  return (
    <>
      {/* {localStorage.getItem("usuario") ? <Dashboard/> :  */}
      <div className="modal-container">
        <div className="modal-content">
          <h2>Criar conta</h2>

          <input
            type="text"
            placeholder="Nome"
            className="modal-input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="modal-input"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />

          <input
            type="number"
            className="modal-input"
            placeholder="Senha"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />

          <input
            type="number"
            className="modal-input"
            placeholder="Confirmação de senha"
            value={confirmaUserPassword}
            onChange={(e) => setConfirmaUserPassword(e.target.value)}
          />
          <button type="submit" onClick={handleLogin} className="modal-button">
            Login
          </button>
        </div>
      </div>
      {/* } */}
    </>
  );
};
