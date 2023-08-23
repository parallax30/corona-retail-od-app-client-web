import React, { Fragment, useEffect, useState } from "react";
import { Stack, Alert, Box, Link, Button } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { DataGrid } from "@mui/x-data-grid";
import NoResults from "./NoResults";
import useBoletero from "../hooks/useBoletero";
import DetalleBoleta from "./DetalleBoleta";
import Loading from "./Loading";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { getBoletas } from "../helpers";

const columns = [
  {
    field: "fechaEmision",
    headerName: "Fecha Compra",
    headerClassName: "grid-header",
    headerAlign: "center",
    type: "dateTime",
    width: 160,
    renderCell: (params) =>
      params.value
        ? params.value.includes("T")
          ? params.value.split("T")[0]
          : params.value
        : "-",
  },
  {
    field: "nroNotaVenta",
    headerName: "Nota venta",
    headerClassName: "grid-header",
    headerAlign: "center",
    align: "center",
    width: 100,
    renderCell: (params) => params.value || "-",
  },
  {
    field: "nroOrdencompra",
    headerName: "Nro. Orden de Compra",
    headerClassName: "grid-header",
    headerAlign: "center",
    width: 180,
    renderCell: (params) => params.value || "-",
  },
  {
    field: "boletaElectronica",
    headerName: "Nro. Boleta",
    headerClassName: "grid-header",
    headerAlign: "center",
    align: "center",
    width: 100,
    renderCell: (params) => params.value || "-",
  },
  {
    field: "atendidoPor",
    headerName: "Canal Venta",
    headerClassName: "grid-header",
    headerAlign: "center",
    align: "center",
    width: 120,
    renderCell: (params) => params.value || "-",
  },
  {
    field: "clienteRut",
    headerName: "Rut Comprador",
    headerClassName: "grid-header",
    headerAlign: "center",
    width: 130,
    renderCell: (params) => params.value || "-",
  },
  {
    field: "clienteNombre",
    headerName: "Nombre",
    headerClassName: "grid-header",
    headerAlign: "center",
    width: 100,
    renderCell: (params) => params.value || "-",
  },
  {
    field: "clienteApellidoPaterno",
    headerName: "Ap. Paterno",
    headerClassName: "grid-header",
    headerAlign: "center",
    align: "center",
    width: 120,
    renderCell: (params) => params.value || "-",
  },
  {
    field: "clienteApellidoMaterno",
    headerName: "Ap. Materno",
    headerClassName: "grid-header",
    headerAlign: "center",
    align: "center",
    width: 120,
    renderCell: (params) => params.value || "-",
  },
  {
    field: "clienteEmail",
    headerName: "Email",
    headerClassName: "grid-header",
    headerAlign: "center",
    align: "center",
    width: 250,
    renderCell: (params) => params.value || "-",
  },
  {
    field: "urlBoleta",
    width: 110,
    headerName: "Boleta",
    headerClassName: "grid-header",
    headerAlign: "center",
    align: "center",
    renderCell: (params) =>
      params.row.urlBoleta.length > 1 ? (
        <Link target="_blank" href={`${params.row.urlBoleta}`}>
          <DescriptionOutlinedIcon />
        </Link>
      ) : (
        <p className="visibility-off">
          <VisibilityOffIcon />
        </p>
      ),
  },
];

const SearchResult = () => {
  const {
    resultado,
    loading,
    setLoading,
    dataUrl,
    viewMorePages,
    getDataBoletas,
    page,
  } = useBoletero();

  const handleAddRow = async () => {
    await getDataBoletas(dataUrl, 2, page);
  };

  return (
    <Fragment>
      {!loading ? (
        resultado.length ? (
          <Stack
            spacing={2}
            sx={{ width: "100%" }}
            style={{ marginTop: 10, position: "relative" }}
          >
          
            <Box
              sx={{
                height: 400,
                width: "100%",
                "& .grid-header": {
                  backgroundColor: "#A270FF",
                  color: "#fff",
                  fontSize: "1rem",
                },
                "& .grid-row": {
                  backgroundColor: "#FFF",
                  color: "#333",
                  fontSize: "1rem",
                  textAlign: "center",
                },
              }}
              style={{ marginTop: 0 }}
            >
              <div className="title-resultado">Resultado de la búsqueda</div>

              {viewMorePages && (
                <Button size="small" onClick={handleAddRow}>
                  Ver más
                </Button>
              )}

              <DataGrid
                rows={resultado}
                columns={columns}
                pageSize={25}
                rowsPerPageOptions={[25]}
                getRowId={(row) => row.rnum}
                autoHeight={true}
                disableColumnFilter
                disableColumnMenu
                disableColumnSelector
                getRowClassName={(params) => `grid-row`}
              />
            </Box>
          </Stack>
        ) : (
          <NoResults />
        )
      ) : (
        <Loading />
      )}
    </Fragment>
  );
};

export default SearchResult;
