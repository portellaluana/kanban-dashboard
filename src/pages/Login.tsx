import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import Button from "../components/buttons/Button";
import Input from "../components/inputs/Input";
import { Link } from "react-router-dom";
import { Cadastro } from "./Cadastro";
import './login.css'

export const Login = () => {
  const context = useContext(AppContext);

  if (!context) {
    return null;
  }

  const {
    user,
    logo,
    setLogoOff,
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
    logado,
    setLogado,
    showPassword,
    setShowPassword,
  } = context;

  const handleLogin = () => {
    const cadastro = localStorage.getItem("cadastro");
    if (
      !cadastro?.includes(userEmail) ||
      !cadastro?.includes(userPassword) ||
      userEmail === "" ||
      userPassword === ""
    ) {
      return;
    } else {
      const newUser = { userEmail, userPassword };
      localStorage.setItem("usuario", JSON.stringify([...user, newUser]));
    }
    setLogado(!logado);
    localStorage.setItem("logado", JSON.stringify(!logado));
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    setLogoOff(!logo);
  };

  function changeLogo() {
    setLogoOff(!logo);
  }

  return (
    <>
      {localStorage.getItem("cadastro") ? (
        <div className="container">
          <div className="content">
          {logo ? <div className="logo-icon" /> : <div className="logo-icon-off" />}
            <Input
              type="text"
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
                <a className="hide-password-login" onClick={toggleShowPassword} />
              ) : (
                <a className="show-password-login" onClick={toggleShowPassword} />
              )}
            <Link to="/kanban-dashboard/dashboard">
              <Button
                type="submit"
                onClick={handleLogin}
                className="botao-primario"
              >
                fazer login
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <Cadastro />
      )}
    </>
  );
};
