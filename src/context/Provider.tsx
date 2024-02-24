import { useState } from "react";
import { AppContext } from "./AppContext";

export const Provider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmaUserPassword, setConfirmaUserPassword] = useState("");
  const [user, setUser] = useState([]);
  const [logo, setLogoOff] = useState<boolean>(true);

  const [nomeTarefa, setNomeTarefa] = useState<string>("");
  const [descricaoTarefa, setDescricaoTarefa] = useState<string>("");
  const [statusTarefa, setStatusTarefa] = useState<string>("a-fazer");
  const [open, setOpen] = useState<boolean>(false);
  const [logado, setLogado] = useState<boolean>(false);


  const value = {
    userName, setUserName,
    userEmail, setUserEmail,
    userPassword, setUserPassword,
    confirmaUserPassword, setConfirmaUserPassword,
    user, setUser,
    logo, setLogoOff,
    nomeTarefa, setNomeTarefa,
    descricaoTarefa, setDescricaoTarefa,
    statusTarefa, setStatusTarefa,
    open, setOpen,
    logado, setLogado
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
