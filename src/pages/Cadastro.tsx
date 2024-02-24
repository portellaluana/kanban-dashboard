import { Login } from "./Login";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import Button from "../components/buttons/Button";
import Input from "../components/inputs/input";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

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
    logo,
    setLogoOff,
    logado, setLogado
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
      setLogado(!logado)
      localStorage.setItem("logado", JSON.stringify(!logado));
    }

    window.location.reload();
  };
  function changeLogo() {
    setLogoOff(!logo);
  }
  return (
    <>
      {localStorage.getItem("cadastro") ? (
        <Dashboard />
      ) : (
        <div className="modal-container">
          <div className="modal-content">
            <h2>Criar conta</h2>
            {logo ? <a className="logo" /> : <a className="logo-off" />}
            <Input
              type="text"
              placeholder="Nome"
              className="modal-input"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Email"
              className="modal-input"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />

            <Input
              type="password"
              className="modal-input input-ativo"
              placeholder="Senha"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              onFocus={changeLogo}
              onBlur={changeLogo}
            />

            <Input
              type="password"
              className="modal-input input-ativo"
              placeholder="Confirmação de senha"
              value={confirmaUserPassword}
              onFocus={changeLogo}
              onBlur={changeLogo}
              onChange={(e) => setConfirmaUserPassword(e.target.value)}
            />
            <Link to="/dashboard">
              <Button
                type="submit"
                onClick={handleLogin}
                className="botao-primario"
              >
                cadastrar
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
