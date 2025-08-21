import { useContext } from "react";
import { SnackbarContext } from "../contexts/SnackbarContext";

export const useSnackbar = () => useContext(SnackbarContext);
