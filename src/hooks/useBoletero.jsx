import { useContext } from "react";
import BoleteroContext from "../context/BoleteroProvider";

const useBoletero = () => {
  return useContext(BoleteroContext);
};

export default useBoletero;
