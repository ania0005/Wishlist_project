
import { createContext } from "react";
import User from "../types/index";

interface Context {
  user?: User;
  setUser?: React.Dispatch<React.SetStateAction<User | undefined>>;
  
}
const AuthContext = createContext<Context>({});

export default AuthContext;
