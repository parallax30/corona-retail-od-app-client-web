
export const validateInput = (text) => {
   return text !== "" && text !== null ? true : false;

}

export const getBoletas = async (url, page) => {
   const requestOptions = {
      method: 'GET',
      headers: {
         'x-api-key': import.meta.env.VITE_API_KEY_BOLETAS,
         'Content-Type': 'application/json'
      }
   };
  /*  console.log("consulta api", `${url}/${page}`) */

   try {
      const response = await fetch(`${url}/${page}`, requestOptions)
      const respuesta = await response.json();
      return respuesta.data;
   /*    if (respuesta.results === 100) {
         page++;
         return await getBoletas(url, page, data)
      } */
/*       else { */
      /*    return data; */
     /*  } */
   }
   catch (error) {
      console.log(error.message);
   }

}

export const getDay = () => {
   let today = ""
   let date = new Date();
   let day = `${(date.getDate())}`.padStart(2, '0');
   let month = `${(date.getMonth() + 1)}`.padStart(2, '0');
   let year = date.getFullYear();
   today = `${year}-${month}-${day}`

   return today
}

export const minDate = "2020-01-01";

export const  subtractDaysFromDate= (actualDate, days) => {
   let dateInitial = new Date(actualDate);
   let monthAgo = 1000 * 60 * 60 * 24 * days;
   let resultDate = dateInitial.getTime() - monthAgo;
   let dateMonthago = new Date(resultDate);
   let day = `${(dateMonthago.getDate())}`.padStart(2, '0');
   let month = `${(dateMonthago.getMonth() + 1)}`.padStart(2, '0');
   let year = dateMonthago.getFullYear();
   let initial = `${year}-${month}-${day}`

   return initial
}

export const  addDaysFromDate= (actualDate, days) => {
   let dateInitial = new Date(actualDate);
   let monthAfter = 1000 * 60 * 60 * 24 * days;
   let resultDate = dateInitial.getTime() + monthAfter;
   let dateMonthAfter = new Date(resultDate);
   let day = `${(dateMonthAfter.getDate())}`.padStart(2, '0');
   let month = `${(dateMonthAfter.getMonth() + 1)}`.padStart(2, '0');
   let year = dateMonthAfter.getFullYear();
   let initial = `${year}-${month}-${day}`

   return initial
}

export const getUser = async (email, password) => {

   const requestOptions = {
      method: 'POST',
      headers: {
         'x-api-key': import.meta.env.VITE_API_KEY,
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
         "email": email,
         "password": password

      })
   }
   return await fetch(`${import.meta.env.VITE_URL_DATA}/auth`, requestOptions)
      .then(response => response.json())
      .then(respuesta => {
         return respuesta
      })
      .catch(function (error) {
         console.log(error.message);
      });

}



export const dataLocation = async (config) => {

   var config = {
      headers: {
         "x-api-key": import.meta.env.VITE_API_KEY,
         Authorization: `Bearer ${token}`
      },
      method: "GET"
   };

   return await fetch(`${import.meta.env.VITE_URL_DATA}/region/comuna/tienda`, config)
      .then(response => response.json())
      .then(respuesta => {
         return respuesta
      })
      .catch(function (error) {
         console.log(error.message);
      });
}

export const obtenerDataRegiones = (data) => {
   let arrRegion = [];
   data.map((region) => {
      arrRegion = [...arrRegion, region.nombre];
   });
   return orderData(arrRegion)

};

export const obtenerDataComunas = (data) => {
   let arrComunas = [];
   data.map((el) => {
      el.comunas.map((comuna) => {
         arrComunas = [...arrComunas, comuna.nombre];
      });
      return arrComunas

   })
}


export const orderData = (data) => {
   return data.sort((a, b) => {
      if (a.nombre < b.nombre) {
         return -1;
      }
      if (a > b) {
         return 1;
      }
      return 0;
   });
}

export const validateCanal = (canal) => {

   if (canal === "TIENDA" || canal === "CORONA.CL")
      return false
   else return true

}

export const validateRangeDate = (dateFrom, dateTo) => {
   const date1InMs = new Date(dateFrom);
   const date2InMs = new Date(dateTo);
   const diffInDays = (date2InMs.getTime() - date1InMs.getTime())
   const daysDiferrence = diffInDays / (1000 * 60 * 60 * 24);
   return Math.trunc(daysDiferrence);

}

export const filtrarDataComunas = (id, comunas) => {

   let filtroComunas = comunas.filter(el => el.regionId === id)
   return filtroComunas

}
export const filtrarDataRegiones = (id, regiones, comunas) => {
   let idRegion = comunas.filter(el => {
      if (el.id === id)
         return el || ""
   })
   /* console.log(idRegion[0].regionId) */
   let filtroRegiones = regiones.filter(el => el.id === idRegion[0].regionId)
   return filtroRegiones
}

export const filtrarDataTiendasRegion = (id, regiones) => {
   let arrayTiendas = []
   regiones.filter(el => {
      if (el.id === id) {
         el.comunas.map(comuna => {
            arrayTiendas = [...arrayTiendas, ...comuna.tiendas]

         })
      }

   })
   return arrayTiendas

}



export const filtrarDataTiendaComuna = (id, tienda) => {

   let filtroTienda = tienda.filter(el => el.comunaId === id)
   /* console.log("filtroTienda", filtroTienda) */
   return filtroTienda

}

export const filtrarDataComunasPorTienda = (id, dataComunas, dataTiendas) => {
   /* console.log(id) */

   let idComuna = dataTiendas.filter(el => {
      if (el.idExterno === id)
      return el
   })


let filtroComuna = dataComunas.filter(el => el.id === idComuna[0].comunaId)

   return filtroComuna



}
export const filtrarDataRegionesPorTienda = (id, dataRegiones, dataTiendas) => {
/* console.log(dataRegiones) */


}


export const handleKeyDown = event => {
   if (event.key === "Backspace") {
      event.preventDefault();
   }
};

export const validateInputTypeNumber = (value) => {
   const regex = /^[0-9\b]+$/;
   if (value === "" || regex.test(value)) {
     return true
   }
}

export const validateInputTypeText = (value) => {
   const regex = /^[a-zA-Z\u00F1\u00D1]+$/;
   if (value === "" || regex.test(value)) {
     return true
   }
}

export const validateInputOrder = (value) => {
   const regex = /^[0-9-]*$/;
   if (value === "" || regex.test(value)) {
     return true
   }
}