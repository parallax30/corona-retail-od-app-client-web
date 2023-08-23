import { React, useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Avatar,
  Menu,
  MenuItem
} from "@mui/material";
import DrawerBoletero from "./DrawerBoletero";
import { Menu as MenuIcon } from "@mui/icons-material";
import Logo from "../assets/images/Logo_HeaderMail.png"
import {AccountCircle} from '@mui/icons-material'

import useBoletero from "../hooks/useBoletero";
import { getDay, subtractDaysFromDate } from "../helpers";

const Header = () => {

  const [toggle, setToggle] = useState({ left: false });
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const nameUser = sessionStorage.getItem('nombre');
  const lastNameUser = sessionStorage.getItem('apellido')
  const profile = sessionStorage.getItem('profile')
  const [anchorEl, setAnchorEl] = useState(null);



  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setToggle({ ...toggle, [anchor]: open });
  };
 
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
    
    cerrarSesionAuth();
    const today = getDay();
    const fechaDesde = subtractDaysFromDate(today,30)
    


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
  return (
    <Box sx={{ flexGrow: 1 }}>
  
    <AppBar position="fixed" style={{backgroundColor: "#9347ff", boxShadow:"none"}}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <div className="content-header-logo">
        <img src= {Logo} alt="Logo" width="150" height="40"/>
        <Typography variant="h6" component="h1" sx={{ flexGrow: 1, color:"#fff", marginTop:"-3px", marginLeft:"3px", fontSize:"1.05rem" }}>
        Consulta Boleta
        </Typography>
       
        </div>
        </Typography>
 {/* 
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              style={{ color: '#fff' }}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>{nameUser} {lastNameUser}</MenuItem>
              <MenuItem onClick={handleClose}>{profile}</MenuItem>
              <MenuItem onClick={handleCerrarSesion}>CERRAR SESIÓN</MenuItem>
     
            </Menu> 
          </div>
          */}
      </Toolbar>
    </AppBar>
  </Box>
  );
};
export default Header;
