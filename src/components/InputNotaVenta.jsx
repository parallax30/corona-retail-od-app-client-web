import React, { useEffect, useState } from "react";
import { Grid, TextField, Autocomplete } from "@mui/material";
import useBoletero from "../hooks/useBoletero";
import {validateInputTypeNumber} from "../helpers"

const InputNotaVenta = () => {
  
 const {dataBoletero,setDataBoletero} = useBoletero() 


 const handleChange = (e) => {
  if (validateInputTypeNumber(e.target.value)) {
    setDataBoletero({...dataBoletero,
      [e.target.name]:e.target.value});
  }
};
   
  return (
    <Grid item xs={12} sm={6} md={6}>
    <TextField
      value={dataBoletero.nota_venta}
      sx={{ width: "100%" }}
      name="nota_venta"
      label="Nro Nota Venta"
      InputLabelProps={{ shrink: true }}
      type="text"
      onChange={(e) => handleChange(e)}
      inputProps={{maxLength: 13}}
    />
  </Grid>
  )
}

export default InputNotaVenta