import { React } from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import {
  Drawer,
  Box,
  List,
  ListItem,
  IconButton,
  Divider,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { AccountCircleRounded as AccountCircleRoundedIcon } from "@mui/icons-material";
import { ReceiptLongRounded as ReceiptLongRoundedIcon } from "@mui/icons-material/";

import useBoletero from "../hooks/useBoletero";
import { getDay, subtractDaysFromDate } from "../helpers";

const DrawerBoletero = ({ anchor, open, onClose }) => {


  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

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
    setAlerta
} = useBoletero() 

  const handleCerrarSesion = () => {
    


    setDataBoletero({
      ...dataBoletero,
      boleta: "",
      orden: "",
      nota_venta: "",
      nombre: "",
      paterno: "",
      apellido_materno: "",
      email: "",
      rut: "",
      mensaje: "",
      fecha_desde: fechaDesde,
      fecha_hasta: today
      
    });
   setRegion({
    ...region,
    regiones: [],
    regionSelected: "",
    });
   setComuna({
    ...comuna,
      comunaSelected: "",
      comunas: []
    });
    setTienda({
      ...tienda,
      tiendas: [],
      tiendasSelected: null,
      idTiendaSelected: "",
    });
   setCanal({
    ...canal,
    canales: [],
    canalSelected: "",
    });
    setResultado([]);
    setAlerta({});
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "left" ? 250 : "auto" }}
      role="presentation"
      onClick={onClose}
      onKeyDown={onClose}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/filtros-de-busqueda">
            <ListItemIcon>
              <ReceiptLongRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={"Boletero"} />
          </ListItemButton>
        </ListItem>
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={handleCerrarSesion}>
            <ListItemIcon>
              <AccountCircleRoundedIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor={anchor} open={open} onClose={onClose}>
        <DrawerHeader>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        {list(anchor)}
      </Drawer>
    </div>
  );
};

export default DrawerBoletero;
