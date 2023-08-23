import { useState, useEffect, createContext } from "react";
import {
  getDay,
  subtractDaysFromDate,
  getBoletas,
  validateRangeDate,
} from "../helpers";


const BoleteroContext = createContext();

const BoleteroProvider = ({ children }) => {
  const today = getDay();
  const fechaDesde = subtractDaysFromDate(today, 30);


  const [dataBoletero, setDataBoletero] = useState({
    boleta: "",
    orden: "",
    nota_venta: "",
    rut: "",
    fecha_desde: fechaDesde,
    fecha_hasta: today,
  });
  const [alerta, setAlerta] = useState({});
  const [region, setRegion] = useState({
    regiones: [],
    regionSelected: "",
    idRegionSelected: "",
    dataRegiones: [],
  });
  const [comuna, setComuna] = useState({
    comunas: [],
    dataComunas: [],
    comunaSelected: "",
    idComunaSelected: "",
  });
  const [tienda, setTienda] = useState({
    tiendas: [],
    dataTiendas: [],
    tiendasSelected: "",
    idTiendaSelected: "",
  });
  const [canal, setCanal] = useState({
    canales: [],
    canalSelected: "",
    dataCanales: [],
    idCanalSelected: "",
  });
  const [resultado, setResultado] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataUrl, setDataUrl] = useState("");
  const [page, setPage] = useState(1);
  const [viewMorePages, setViewMorePages] = useState(false);
  const [rangeDate, setRangeDate] = useState(1);

  const handleChangeDatos = (e) => {
    setDataBoletero({
      ...dataBoletero,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (
      dataBoletero.nombre &&
      dataBoletero.apellido_paterno === "" &&
      dataBoletero.apellido_materno === ""
    ) {
      setAlerta({
        msg: `Debe colocar el  apellido  paterno para realizar la búsqueda.`,
        error: true,
      });
      return;
    }
    if (
      (dataBoletero.apellido_paterno || dataBoletero.apellido_materno) &&
      dataBoletero.nombre === ""
    ) {
      setAlerta({
        msg: `Debe colocar el  nombre para realizar la búsqueda.`,
        error: true,
      });
      return;
    }
    setAlerta({});
  }, [dataBoletero.nombre, dataBoletero.apellido_paterno]);

  const getDataBoletas = async (url, origen, page) => {
    setLoading(true);
    const dataBoletas = await getBoletas(url, page);
    dataBoletas.length
      ? (origen === 1
          ? (setResultado(dataBoletas), setPage(1))
          : setResultado([...resultado, ...dataBoletas]),
        setAlerta({}),
        setLoading(false),
        setDataUrl(url))
      : (setResultado([]),
        setAlerta({
          msg: `No se encontraron resultados.`,
          error: true,
        }),
        setLoading(false),
        setDataUrl(""));

    if (dataBoletas.length < 100) {
      setViewMorePages(false);
      return;
    }
    setPage(page + 1);
    setViewMorePages(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setPage(1);
    const {
      boleta,
      orden,
      nota_venta,
      nombre,
      apellido_paterno,
      apellido_materno,
      email,
      rut,
      fecha_desde,
      fecha_hasta,
      sku,
    } = dataBoletero;

    const { tiendasSelected, idTiendaSelected } = tienda;
    const { idCanalSelected, canalSelected } = canal;
    const { idRegionSelected } = region;
    const { idComunaSelected } = comuna;
    let rangeDate = 0;
    let url = `${import.meta.env.VITE_BACKEND_URL}/${
      idRegionSelected || "-1"
    }/${idComunaSelected || "-1"}/${idTiendaSelected || "-1"}/${
      boleta || "-1"
    }/${orden || "-1"}/${nota_venta || "-1"}/${nombre || "-1"}/${
      apellido_paterno || "-1"
    }/${apellido_materno || "-1"}/${
      email || "-1"
    }/${fecha_desde}/${fecha_hasta}/${
      idCanalSelected !== "" ? idCanalSelected : "-1"
    }/${rut.split("-")[0] || "-1"}/${sku || -1}/100`;

    /* console.log("url", url); */

    setRangeDate(validateRangeDate(fecha_desde, fecha_hasta));
    /* console.log(rangeDate); */
    if (rangeDate > 31) {
      setAlerta({
        msg: `El rango de fechas no debe ser mayor a 30 días`,
        error: true,
      });
      setLoading(false);
      return;
    }
    if (rangeDate < 0) {
      setAlerta({
        msg: `La fecha desde no debe ser mayor a la fecha hasta`,
        error: true,
      });
      setLoading(false);
      return;
    }

    setAlerta({});

    if (
      fecha_desde &&
      fecha_hasta &&
      boleta === "" &&
      rut === "" &&
      nota_venta === "" &&
      orden === "" 
    ) {
      setAlerta({
        msg: `Búsqueda no válida, por favor complete alguno de los campos.`,
        error: true,
      });
      setResultado([]);
      setLoading(false);
      return;
    }

    await getDataBoletas(url, 1, 1);
  };
  return (
    <BoleteroContext.Provider
      value={{
        dataBoletero,
        setDataBoletero,
        alerta,
        setAlerta,
        region,
        setRegion,
        comuna,
        setComuna,
        tienda,
        setTienda,
        canal,
        setCanal,
        resultado,
        setResultado,
        handleChangeDatos,
        handleSubmit,
        loading,
        dataUrl,
        setDataUrl,
        page,
        setPage,
        viewMorePages,
        setViewMorePages,
        getDataBoletas,
        rangeDate,
        setRangeDate
      }}
    >
      {children}
    </BoleteroContext.Provider>
  );
};
export { BoleteroProvider };
export default BoleteroContext;
