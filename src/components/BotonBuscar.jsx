import React, { useEffect, useState } from "react";
import { LoadingButton } from '@mui/lab'
import useBoletero from "../hooks/useBoletero";

const BotonBuscar = () => {

  const {  loading
} = useBoletero() 
  return (
    <LoadingButton
    size="large"
    type="submit"
    loading={loading}
    loadingIndicator="Cargando..."
    variant="contained"
    style={{color:"#fff"}}
  >
    <span>Buscar</span>
  </LoadingButton>
  );
};

export default BotonBuscar;
