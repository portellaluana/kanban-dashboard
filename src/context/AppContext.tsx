import { createContext, Dispatch, SetStateAction } from "react";

export interface AppContextProps {
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

  idTarefa: string;
  setIdTarefa: Dispatch<SetStateAction<string>>;
}

export const AppContext = createContext<AppContextProps | null>(null);
