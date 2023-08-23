import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import useBoletero from "../hooks/useBoletero";
import {validateInputTypeText} from "../helpers"

const InputNombre = (s) => {

  const {dataBoletero,setDataBoletero} = useBoletero() 

  const handleChange = (e) => {
    if (validateInputTypeText(e.target.value)) {
      setDataBoletero({...dataBoletero,
        [e.target.name]:e.target.value});
    }
  }; 
  return (
             <Grid item xs={12} sm={6} md={4}>
            <TextField
              value={dataBoletero.nombre}
              sx={{ width: "100%" }}
              name="nombre"
              label="Nombre"
              InputLabelProps={{ shrink: true }}
              type="text"
              onChange={(e) => handleChange(e)}
              inputProps={{maxLength: 50}}
            />
          </Grid>
  )
}

export default InputNombre