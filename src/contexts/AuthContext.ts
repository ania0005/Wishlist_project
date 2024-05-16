import { Wishlist } from "./../components/Wishlists/types/index";
import { createContext } from "react";
import User from "../types/User";

interface Context {
  user?: User;
  setUser?: React.Dispatch<React.SetStateAction<User | undefined>>;
  wishlist?: Wishlist;
}
const AuthContext = createContext<Context>({});

export default AuthContext;
