import React, {useState, useEffect} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  IconButton
} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(0),
      


      
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(2),
      
    },
  }));
  
  function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle md={{ m: 2, p: 2 }} {...other} bgcolor="#6a3fb9"  color="#fff">
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

const DetalleBoleta = ({ detalle, setDetalle, open, setOpen }) => {

      const handleClose = () => {
        setOpen(false);
        setDetalle({});
      };
  return (
    <div >
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "600px",
              maxWidth: "600px",  // Set your width here
            },
          },
        }}
      
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} >
        Detalle de Boleta
        </BootstrapDialogTitle>
        { detalle &&
        <DialogContent>
        <p className="details-props">
        <span>Fecha Compra: </span><span>{detalle.fechaEmision? detalle.fechaEmision :"---"}</span>
        </p>
        <p className="details-props">
        <span>Nota de venta:</span><span> {detalle.nroNotaVenta || "---"}</span>
        </p>
        <p className="details-props">
        <span>Boleta Electrónica:</span><span> {detalle.boletaElectronica || "---"}</span>
        </p>
        <p className="details-props">
        <span>Canal de Venta:</span><span> {detalle.atendidoPor || "---"}</span>
        </p>
        <p className="details-props">
        <span>Rut Cliente Comprador:</span><span> {detalle.clienteRut || "---"}</span>
        </p>
        <p className="details-props">
        <span>Nombre:</span><span> {detalle.clienteNombre || "---"}</span>
        </p>
        <p className="details-props">
        <span>Ap. Paterno:</span><span> {detalle.clienteApellidoPaterno || "---"}</span>
        </p>
        <p className="details-props">
        <span>Ap. Materno:</span><span> {detalle.clienteApellidoMaterno || "---"}</span>
        </p>
        <p className="details-props">
        <span>Email:</span><span> {detalle.clienteEmail ? detalle.clienteEmail : "---"}</span>
        </p>

        </DialogContent>
}
        <DialogActions padding={4}>
        <Button autoFocus variant="contained">
            Imprimir
          </Button>
          <Button autoFocus onClick={handleClose} variant="contained">
            Cerrar
          </Button>
          
        </DialogActions>
      </BootstrapDialog>
    </div>
  
    );
};

export default DetalleBoleta;
