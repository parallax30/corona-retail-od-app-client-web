import React from "react";
import { Grid, Paper } from "@mui/material";
import { Container } from "@mui/system";
import BotonBuscar from "./BotonBuscar";
import BotonClear from "./BotonClear";
import SelectRegion from "./SelectRegion";
import SelectComuna from "./SelectComuna";
import SelectTienda from "./SelectTienda";
import SelectCanalVenta from "./SelectCanalVenta";
import InputBoleta from "./InputBoleta";
import InputOrden from "./InputOrden";
import InputNotaVenta from "./InputNotaVenta";
import InputNombre from "./InputNombre";
import InputPaterno from "./InputPaterno";
import InputMaterno from "./InputMaterno";
import InputRut from "./InputRut";
import InputEmail from "./InputEmail";
import InputDateFrom from "./InputDateFrom";
import InputDateTo from "./InputDateTo";
import SearchResult from "./SearchResult";
import InputSku from "./InputSku";
import AlertLogin from "./AlertLogin";
import useBoletero from "../hooks/useBoletero";

const FiltersAdmin = () => {
  const { handleSubmit, alerta } = useBoletero();
  const { msg } = alerta;

  return (
    <Container maxWidth="xl" style={{marginTop:"6rem"}}>
      <form onSubmit={handleSubmit}>
        <Paper
          variant="outlined"
          style={{
            padding: "2rem",
            marginTop: "5rem",
            justifyContent: "center",
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
          }}
        >
          <Grid
            container
            rowSpacing={3}
            columnSpacing={{ xs: 2, sm: 2, md: 8 }}
            justify="center"
            maxWidth={"90%"}
            marginTop=".5rem"
          
          >
            <SelectRegion />
            <SelectComuna />
            <SelectTienda />
            <SelectCanalVenta />
            <InputDateFrom />
            <InputDateTo />
            <InputBoleta />
            <InputOrden />
            <InputNotaVenta />
            <InputNombre />
            <InputPaterno />
            <InputMaterno />
            <InputRut />
            <InputEmail />
            <InputSku />
          </Grid>
          <Grid item xs={12} sm={6} md={4} paddingTop={2} paddingBottom={2} width="86%">
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

export default FiltersAdmin;
