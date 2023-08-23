import React, { useState, useEffect } from "react";
import { Grid, imageListClasses, TextField } from "@mui/material";
import {
  getDay,
  minDate,
  subtractDaysFromDate,
  validateRangeDate,
  handleKeyDown,
  addDaysFromDate,
} from "../helpers";
import useBoletero from "../hooks/useBoletero";


const InputDateFrom = () => {
  const { dataBoletero, setDataBoletero, handleChangeDatos, rangeDate, setRangeDate } = useBoletero();
  const today = getDay();

  const [differenceDays, setDifferenceDays] = useState()

  useEffect(() => {

    const { fecha_desde, fecha_hasta } = dataBoletero;

    if (fecha_desde === today) {
      setRangeDate(0)
      setDataBoletero({
        ...dataBoletero,
        fecha_hasta: today,
        
      });
  
      return;
    }
 
     /*  console.log(validateRangeDate(fecha_desde, fecha_hasta)); */
      if (validateRangeDate(fecha_desde, fecha_hasta) > 31 ) {
        setRangeDate(2)
        setDataBoletero({
          ...dataBoletero,
          fecha_hasta: addDaysFromDate(fecha_desde, 31),
        });
        return;
      }
      if (validateRangeDate(fecha_desde, fecha_hasta) <= -1) {
        setDataBoletero({
          ...dataBoletero,
          fecha_hasta: addDaysFromDate(fecha_desde, 31),
        });
        return;
      }

      if (validateRangeDate(fecha_desde, fecha_hasta) === 0) {
        setDataBoletero({
          ...dataBoletero,
          fecha_hasta: fecha_desde,
        });
        return;
      }

      if (fecha_desde <= minDate) {
        setDataBoletero({
          ...dataBoletero,
          fecha_desde: minDate,
        });
        return;
      }
    
    
  }, [dataBoletero.fecha_desde]);
  

  return (
    <Grid item xs={12} sm={6} md={6}>
      <TextField
        sx={{ width: "100%" }}
        name="fecha_desde"
        label="Fecha Desde"
        InputLabelProps={{ shrink: true }}
        type="date"
        onKeyDown={handleKeyDown}
        value={dataBoletero.fecha_desde}
        onChange={handleChangeDatos}
        inputProps={{ min: minDate, max: today }}
      />
    </Grid>
  );
};

export default InputDateFrom;

// a partir del 2020 a la fecha actual
