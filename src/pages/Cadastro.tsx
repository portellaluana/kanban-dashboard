import { Login } from "./Login";
import { AppContext } from "../context/AppContext";
import { useContext,  } from "react";
import Button from "../components/buttons/Button";

export const Cadastro = () => {
  const {
    userName,
    setUserName,
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    confirmaUserPassword,
    setConfirmaUserPassword,
    user,
    setUser,
    logo, setLogoOff
  } = useContext(AppContext);

  const handleLogin = () => {
    if (userName === "" || userPassword === "" || userEmail === "") {
      return;
    } else if (userPassword != confirmaUserPassword) {
      return;
    } else if (!userEmail.includes("@")) {
      return;
    } else {
      const novoCadastro = { userName, userEmail, userPassword };
      localStorage.setItem("cadastro", JSON.stringify([...user, novoCadastro]));
    }

    window.location.reload();
  };
  function changeLogo() {
    setLogoOff(!logo);
  }
  return (
    <>
      {localStorage.getItem("cadastro") ? (
        <Login />
      ) : (
        <div className="modal-container">
          <div className="modal-content">
            <h2>Criar conta</h2>
            {logo ? <a className="logo" /> : <a className="logo-off" />}
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
              type="password"
              className="modal-input input-ativo"
              placeholder="Senha"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              onFocus={changeLogo}
              onBlur={changeLogo}
            />

            <input
              type="password"
              className="modal-input input-ativo"
              placeholder="Confirmação de senha"
              value={confirmaUserPassword}
              onFocus={changeLogo}
              onBlur={changeLogo}
              onChange={(e) => setConfirmaUserPassword(e.target.value)}
            />
            <Button
              type="submit"
              onClick={handleLogin}
              className="modal-button"
            >cadastrar
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
