import Dashboard from "./Dashboard";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";
import Button from "../components/buttons/Button";
import Input from "../components/inputs/input";

export const Login = () => {
  const {
    user,
    setUser,
    logo,
    setLogoOff,
    userEmail,
    setUserEmail,
    userPassword,
    setUserPassword,
  } = useContext(AppContext);

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
    window.location.reload();
  };

  function changeLogo() {
    setLogoOff(!logo);
  }

  return (
    <>
      {localStorage.getItem("usuario") ? (
        <Dashboard />
      ) : (
        <div className="modal-container">
          <div className="modal-content">
            <h2>Login</h2>
            {logo ? (
              <a className="logo-icon" />
            ) : (
              <a className="logo-icon-off" />
            )}
            <Input
                type="text"
                placeholder="Email"
                className="modal-input"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}/>
            <Input
                type="password"
                className="modal-input"
                placeholder="Senha"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
                onFocus={changeLogo}
                onBlur={changeLogo}/>

            <Button
              type="submit"
              onClick={handleLogin}
              className="modal-button"
            >
              fazer login
            </Button>
          </div>
        </div>
      )}
    </>
  );
};
