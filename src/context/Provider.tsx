import { ReactNode, useState, Dispatch, SetStateAction } from "react";
import { AppContext } from "./AppContext";

interface ProviderProps {
  children: ReactNode;
}

interface AppContextProps {
  userName: string;
  setUserName: (value: string) => void;

  userEmail: string;
  setUserEmail: Dispatch<SetStateAction<string>>;

  userPassword: string;
  setUserPassword: Dispatch<SetStateAction<string>>;

  confirmaUserPassword: string;
  setConfirmaUserPassword: Dispatch<SetStateAction<string>>;

  user: string;
  setUser: Dispatch<SetStateAction<string>>;

  logo: boolean;
  setLogoOff: Dispatch<SetStateAction<boolean>>;

  nomeTarefa: string;
  setNomeTarefa: Dispatch<SetStateAction<string>>;

  descricaoTarefa: string;
  setDescricaoTarefa: Dispatch<SetStateAction<string>>;

  statusTarefa: string;
  setStatusTarefa: Dispatch<SetStateAction<string>>;

  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;

  logado: boolean;
  setLogado: Dispatch<SetStateAction<boolean>>;

  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;

  showConfirmaPassword: boolean;
  setShowConfirmaPassword: Dispatch<SetStateAction<boolean>>;

  modalExcluirTarefa: boolean;
  setModalExcluirTarefa: Dispatch<SetStateAction<boolean>>;
}

export const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [confirmaUserPassword, setConfirmaUserPassword] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [logo, setLogoOff] = useState<boolean>(true);
  const [nomeTarefa, setNomeTarefa] = useState<string>("");
  const [descricaoTarefa, setDescricaoTarefa] = useState<string>("");
  const [statusTarefa, setStatusTarefa] = useState<string>("a-fazer");
  const [open, setOpen] = useState<boolean>(false);
  const [logado, setLogado] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmaPassword, setShowConfirmaPassword] = useState<boolean>(false);
  const [modalExcluirTarefa, setModalExcluirTarefa] = useState<boolean>(false);



  const value: AppContextProps = {
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
    nomeTarefa,
    setNomeTarefa,
    descricaoTarefa,
    setDescricaoTarefa,
    statusTarefa,
    setStatusTarefa,
    open,
    setOpen,
    logado,
    setLogado,
    showPassword,
    setShowPassword,
    showConfirmaPassword,
    setShowConfirmaPassword,
    modalExcluirTarefa,
    setModalExcluirTarefa
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
