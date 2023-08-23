import React, { useDebugValue, useEffect, useState } from "react";
import { Button } from "@mui/material";
import useBoletero from "../hooks/useBoletero";
import { getDay, subtractDaysFromDate } from "../helpers";

const BotonClear = () => {
  const {  dataBoletero,
    setDataBoletero,
    region,
    setRegion,
    comuna,
    setComuna,
    tienda,
    setTienda,
    canal,
    setCanal,
    setResultado,
    setAlerta,
    setPage
} = useBoletero() 

const today = getDay();
const fechaDesde = subtractDaysFromDate(today,30)

  const clearFiltros = () => {
    setDataBoletero({
      ...dataBoletero,
      boleta: "",
      orden: "",
      nota_venta: "",
      nombre: "",
      apellido_paterno: "",
      apellido_materno: "",
      email: "",
      rut: "",
      mensaje: "",
      sku:"",
      fecha_desde: fechaDesde,
      fecha_hasta: today,
      
    });
   setRegion({
    ...region,
      regionSelected: "",
    });
   setComuna({
    ...comuna,
      comunaSelected: "",
      comunas: comuna.dataComunas
    });
    setTienda({
      ...tienda,
      tiendasSelected: "",
      idTiendaSelected: "",
      tiendas: tienda.dataTiendas
    });
   setCanal({
    ...canal,
      canalSelected: "",
      canales: canal.dataCanales
    });
    setResultado([]);
    setAlerta({});
    setPage(1)
  };

  return (
    <Button
      variant="contained"
      size="large"
      onClick={clearFiltros}
      style={{color:"#fff"}}
    >
      Limpiar filtros
    </Button>
  );
};

export default BotonClear;
