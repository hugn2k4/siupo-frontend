import { createContext } from "react";
import type { User } from "../types/models/user";

export interface GlobalState {
  user: User | null;
  accessToken: string | null;
  isLogin: boolean;
}
interface GlobalContextProps extends GlobalState {
  setGlobal: (state: Partial<GlobalState>) => void;
  logout: () => void;
}

export const GlobalContext = createContext<GlobalContextProps | null>(null);
