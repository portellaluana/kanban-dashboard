import { AppContext } from "../context/AppContext";
import { useContext, useState } from "react";
import Button from "../components/buttons/Button";
import Input from "../components/inputs/Input";
import Dashboard from "./Dashboard";
import "./cadastro.css";
import { useNavigate } from 'react-router-dom';

export const Cadastro = () => {
  const context = useContext(AppContext);
  const [emailValido, setEmailValido] = useState(true);
  const [senhaConfere, setSenhaConfere] = useState(true);
  const navigate = useNavigate();
  
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
    showPassword,
    setShowPassword,
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
    navigate("/kanban-dashboard/login");
  };

  function changeLogo() {
    setLogoOff(!logo);
  }
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setLogoOff(!logo);
  };
  return (
    <>
      {localStorage.getItem("cadastro") ? (
        <Dashboard />
      ) : (
        <div className="modal-container">
          <div className="modal-content">
          {logo ? <div className="logo" /> : <div className="logo-off" />}
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
              type={showPassword ? "text" : "password"}
              className="modal-input input-ativo"
              placeholder="Senha"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              onFocus={changeLogo}
              onBlur={changeLogo}
            />
            <a
              type="button"
              className="password-icon"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <a className="hide-password-1" onClick={toggleShowPassword} />
              ) : (
                <a className="show-password-1" onClick={toggleShowPassword} />
              )}
            </a>
            <Input
              type={showPassword ? "text" : "password"}
              className="modal-input input-ativo"
              placeholder="Confirmação de senha"
              value={confirmaUserPassword}
              onFocus={changeLogo}
              onBlur={changeLogo}
              onChange={(e) => setConfirmaUserPassword(e.target.value)}
            />
            <a
              type="button"
              className="password-icon"
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <a className="hide-password-2" onClick={toggleShowPassword} />
              ) : (
                <a className="show-password-2" onClick={toggleShowPassword} />
              )}
            </a>
            {!senhaConfere ? (
              <p className="input-error">Senhas não conferem</p>
            ) : (
              ""
            )}
              <Button
                type="submit"
                onClick={handleLogin}
                className="botao-primario"
              >
                cadastrar
              </Button>
          </div>
        </div>
      )}
    </>
  );
};
