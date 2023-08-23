import React from "react";
import { Grid, Paper } from "@mui/material";
import { Container } from "@mui/system";
import BotonBuscar from "./BotonBuscar";
import BotonClear from "./BotonClear";
import InputBoleta from "./InputBoleta";
import InputOrden from "./InputOrden";
import InputNotaVenta from "./InputNotaVenta";
import InputRut from "./InputRut";
import InputDateFrom from "./InputDateFrom";
import InputDateTo from "./InputDateTo";
import SearchResult from "./SearchResult";
import AlertLogin from "./AlertLogin";
import useBoletero from "../hooks/useBoletero";

const FiltersUser = () => {
  const { handleSubmit, alerta } = useBoletero();
  const { msg } = alerta;

  return (
    <Container maxWidth="xl" style={{marginTop:"8rem"}}>
      <form onSubmit={handleSubmit}>
        <Paper
          variant="outlined"
          style={{
            padding: "2rem",
            justifyContent: "center",
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
            
          }}

        >
          <Grid
            container
            rowSpacing={4}
            columnSpacing={{ xs: 2, sm: 2, md: 2 }}
            justify="center"
            maxWidth={"80%"}
            marginTop=".5rem"
          
          >

            <InputDateFrom />
            <InputDateTo />
            <InputRut />
            <InputBoleta />
            <InputOrden />
            <InputNotaVenta />
          </Grid>
          <Grid item xs={12} sm={6} md={4} paddingTop={2} paddingBottom={2} width="80%" >
            <BotonBuscar />
            <BotonClear />
          </Grid>
          {msg && <AlertLogin alerta={alerta} />}
        </Paper>
      </form>
      <SearchResult />
    </Container>
  );
};

export default FiltersUser;
