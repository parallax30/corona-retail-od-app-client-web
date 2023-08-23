import React, { useEffect, useState } from "react";
import { Grid, TextField, Autocomplete } from "@mui/material";
import useBoletero from "../hooks/useBoletero";
import {validateInputOrder} from "../helpers"

const InputOrden = () => {

  const {dataBoletero,setDataBoletero} = useBoletero()

  const handleChange = (e) => {
  
      setDataBoletero({...dataBoletero,
        [e.target.name]:e.target.value});
    
  
};

  

  return (
    <Grid item xs={12} sm={6} md={6}>
    <TextField
      value={dataBoletero.orden}
      sx={{ width: "100%" }}
      name="orden"
      id="orden"
      label="Nro Orden de Compra"
      InputLabelProps={{ shrink: true }}
      type="text"
      onChange={(e) => handleChange(e)}
      inputProps={{ maxLength: 16 }}
      placeholder="0000000000000-01"
    />
  </Grid>
  )
}

export default InputOrden