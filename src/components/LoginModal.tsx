import { useState } from "react";
import Dashboard from "./Dashboard";


export const LoginModal = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);


  const handleLogin = () => {
    if(username === '' || password ===''){
      console.log('não')
    } else {
      const newUser = { username, password };
      localStorage.setItem("usuario", JSON.stringify([...user, newUser]));
    }
    window.location.reload();
  }

  return (
  <>
    {localStorage.getItem("usuario") ? <Dashboard/> : <div className="modal-container">
      <div className="modal-content">
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Nome"
          className="modal-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="modal-input"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleLogin} className="modal-button">
          Login
        </button>
      </div>
    </div>}
    </>
  );
};

