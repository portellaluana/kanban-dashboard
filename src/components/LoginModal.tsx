import { useState } from "react";
import Dashboard from "./Dashboard";

export const LoginModal = () => {
  const [userEmailLogin, setUserEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [user, setUser] = useState([]);

  const handleLogin = () => {
    const cadastro = localStorage.getItem("cadastro");
    console.log(cadastro?.includes(userEmailLogin));
    if (
      !cadastro?.includes(userEmailLogin) ||
      !cadastro?.includes(passwordLogin) ||
      userEmailLogin === "" ||
      passwordLogin === ""
    ) {
      return;
    } else {
      const newUser = { userEmailLogin, passwordLogin };
      localStorage.setItem("usuario", JSON.stringify([...user, newUser]));
    }
    window.location.reload();
  };

  return (
    <>
      {localStorage.getItem("usuario") ? (
        <Dashboard />
      ) : (
        <div className="modal-container">
          <div className="modal-content">
            <h2>Login</h2>

            <input
              type="text"
              placeholder="Email"
              className="modal-input"
              value={userEmailLogin}
              onChange={(e) => setUserEmailLogin(e.target.value)}
            />

            <input
              type="password"
              className="modal-input"
              placeholder="Senha"
              value={passwordLogin}
              onChange={(e) => setPasswordLogin(e.target.value)}
            />
            <button
              type="submit"
              onClick={handleLogin}
              className="modal-button"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </>
  );
};
