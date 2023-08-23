import React from "react";
import { Grid, TextField } from "@mui/material";
import useBoletero from "../hooks/useBoletero";

import {validateInputTypeNumber} from "../helpers"

const InputBoleta = () => {

const {dataBoletero, setDataBoletero, handleChangeDatos} = useBoletero()


const handleChange = (e) => {
  if (validateInputTypeNumber(e.target.value)) {
    setDataBoletero({...dataBoletero,
      [e.target.name]:e.target.value});
  }
};

  return (

    <Grid item xs={12} sm={6} md={6}>
    <TextField
      sx={{ width: "100%" }}
      value={dataBoletero.boleta}
      name="boleta"
      id="boleta"
      label="Nro de boleta"
      InputLabelProps={{ shrink: true }}
      type="text"
      onChange={(e) => {handleChange(e)}
      }
      inputProps={{maxLength: 13}}
    />
  </Grid>
  )
}

export default InputBoleta