import { AppContext } from "../context/AppContext";
import { useContext, useState } from "react";
import Button from "../components/buttons/Button";
import Input from "../components/inputs/Input";
import Dashboard from "./Dashboard";
import { Link } from "react-router-dom";

export const Cadastro = () => {
  const context = useContext(AppContext);
  const [emailValido, setEmailValido] = useState(true);
  const [senhaConfere, setSenhaConfere] = useState(true);

  if (!context) {
    return null;
  }

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
    logo,
    setLogoOff,
  } = context;

  const handleLogin = () => {
    if (userName === "" || userPassword === "" || userEmail === "") {
      return;
    } else if (userPassword !== confirmaUserPassword) {
      setSenhaConfere(!senhaConfere);
      return;
    } else if (!userEmail.includes("@")) {
      setEmailValido(!emailValido);
      return;
    } else {
      const novoCadastro = { userName, userEmail, userPassword };
      localStorage.setItem("cadastro", JSON.stringify([...user, novoCadastro]));
    }
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
            {!emailValido ? (
              <p className="input-error">Insira um endereço de e-mail válido</p>
            ) : (
              ""
            )}
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
            {!senhaConfere ? (
              <p className="input-error">Senhas não conferem</p>
            ) : (
              ""
            )}
            <Link to="/kanban-dashboard/login">
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
