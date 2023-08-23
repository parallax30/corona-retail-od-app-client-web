import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import {
  getDay,
  minDate,
  handleKeyDown,
  addDaysFromDate,
  subtractDaysFromDate,
  validateRangeDate,
} from "../helpers";
import useBoletero from "../hooks/useBoletero";


const InputDateTo = () => {
  const { dataBoletero, setDataBoletero, handleChangeDatos, rangeDate, setRangeDate } = useBoletero();
  const today = getDay();



  useEffect(() => {
    const { fecha_desde, fecha_hasta } = dataBoletero;

    if (rangeDate === 0 ){
      setDataBoletero({
        ...dataBoletero,
        fecha_hasta: fecha_desde,
      });
      return;
    }

    if (
      validateRangeDate(fecha_desde, fecha_hasta) > 31 &&
      fecha_hasta > minDate
    ) {
      setDataBoletero({
        ...dataBoletero,
        fecha_desde: subtractDaysFromDate(fecha_hasta, 31),
      });
      return;
    }

    if (
      validateRangeDate(fecha_desde, fecha_hasta) <= 1 &&
      fecha_hasta > minDate
    ) {
      setDataBoletero({
        ...dataBoletero,
        fecha_desde: subtractDaysFromDate(fecha_hasta, 31),
      });
      return;
    }

    if (validateRangeDate(fecha_desde, fecha_hasta) === 0) {
      setDataBoletero({
        ...dataBoletero,
        fecha_desde: fecha_hasta,
      });
      return;
    }
    if (fecha_hasta > today) {
      setDataBoletero({
        ...dataBoletero,
        fecha_hasta: today,
      });
      return;
    }
    if (fecha_hasta === minDate) {
      setDataBoletero({
        ...dataBoletero,
        fecha_desde: minDate,
      });
      return;
    }

    /*    if (fecha_hasta >= minDate && fecha_hasta <= today) {
      if (validateRangeDate(fecha_desde, fecha_hasta) > 31) {
        setDataBoletero({
          ...dataBoletero,
          fecha_desde: subtractDaysFromDate(fecha_hasta, 31),
        });
        return;
      }
      if (validateRangeDate(fecha_desde, fecha_hasta) <= 0) {
        setDataBoletero({
          ...dataBoletero,
          fecha_desde: subtractDaysFromDate(fecha_hasta, 31),
        });
        return;
      }

      if (validateRangeDate(fecha_hasta, fecha_desde) > 0) {
        setDataBoletero({
          ...dataBoletero,
          fecha_desde: subtractDaysFromDate(fecha_hasta, 31)
        });
        return;
      }
   
    } */
  }, [dataBoletero.fecha_hasta]);

  return (
    <Grid item xs={12} sm={6} md={6}>
      <TextField
        sx={{ width: "100%" }}
        name="fecha_hasta"
        label="Fecha Hasta"
        InputLabelProps={{ shrink: true }}
        type="date"
        onKeyDown={handleKeyDown}
        value={dataBoletero.fecha_hasta}
        onChange={handleChangeDatos}
        inputProps={{ min: minDate, max: today }}
      />
    </Grid>
  );
};

export default InputDateTo;
