import { AppContext } from "../context/AppContext";
import { useContext, useState } from "react";
import Button from "../components/buttons/Button";
import Input from "../components/inputs/Input";
import Dashboard from "./Dashboard";
import "./cadastro.css";
import { useNavigate } from "react-router-dom";

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
    showConfirmaPassword,
    setShowConfirmaPassword,
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

  const toggleShowConfirmaPassword = () => {
    setShowConfirmaPassword(!showConfirmaPassword);
    setLogoOff(!logo);
  };
  return (
    <>
      {localStorage.getItem("cadastro") ? (
        <Dashboard />
      ) : (
        <div className="container">
          <div className="content">
            {logo ? <div className="logo" /> : <div className="logo-off" />}
            <Input
              type="text"
              placeholder="Nome"
              value={userName}
              onInput={(e) => setUserName(e.currentTarget.value)}
            />
            <Input
              type="email"
              placeholder="Email"
              value={userEmail}
              onInput={(e) => setUserEmail(e.currentTarget.value)}
            />
            
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={userPassword}
              onInput={(e) => setUserPassword(e.currentTarget.value)}
              onFocus={changeLogo}
              onBlur={changeLogo}
            />
              {showPassword ? (
                <a className="hide-password-1" onClick={toggleShowPassword} />
              ) : (
                <a className="show-password-1" onClick={toggleShowPassword} />
              )}

            <Input
              type={showConfirmaPassword ? "text" : "password"}
              placeholder="Confirmação de senha"
              value={confirmaUserPassword}
              onFocus={changeLogo}
              onBlur={changeLogo}
              onInput={(e) => setConfirmaUserPassword(e.currentTarget.value)}
            />
              {showConfirmaPassword ? (
                <a
                  className="hide-password-2"
                  onClick={toggleShowConfirmaPassword}
                />
              ) : (
                <a
                  className="show-password-2"
                  onClick={toggleShowConfirmaPassword}
                />
              )}
            {!senhaConfere ? (
              <p className="input-text-error">Senhas não conferem</p>
            ) : (
              ""
            )}
            {!emailValido ? (
              <p className="input-text-error">Insira um endereço de e-mail válido</p>
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
