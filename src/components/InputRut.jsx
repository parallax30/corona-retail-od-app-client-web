import React, { useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import useBoletero from "../hooks/useBoletero";

import { formatRut } from "react-rut-formatter";
import { validate } from "rut.js";

const InputRut = () => {
  const { dataBoletero, setDataBoletero, alerta, setAlerta } = useBoletero();

  const handleChange = (e) => {
    setDataBoletero({ ...dataBoletero, rut: formatRut(e.target.value) });
  };

  useEffect(() => {
    if (dataBoletero.rut && !validate(dataBoletero.rut)) {
      setAlerta({
        msg: `Rut inválido`,
        error: true,
      });
      return;
    }
    setAlerta({});
  }, [dataBoletero.rut]);

  const keyDownHandler = (e) => {
    let idRut = document.getElementById("rut").value;
    let codeKey = e.which || e.keyCode;
    if (codeKey === 8) {
      if (idRut.length == 3) {
        setDataBoletero({ ...dataBoletero, rut: "" });
      }
    }
  };

  return (
    <Grid item xs={12} sm={6} md={6}>
      <TextField
        value={dataBoletero.rut}
        sx={{ width: "100%" }}
        name="rut"
        id="rut"
        placeholder="11111111-1"
        label="Rut Comprador"
        InputLabelProps={{ shrink: true }}
        inputProps={{ maxLength: 10 }}
        type="text"
        onChange={(e) => handleChange(e)}
        onKeyDown={keyDownHandler}
      />
    </Grid>
  );
};

export default InputRut;
