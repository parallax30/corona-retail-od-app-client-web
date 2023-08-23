import React from "react";
import SearchBoletero from "./components/SearchBoletero";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BoleteroProvider } from "./context/BoleteroProvider";


const theme = createTheme({
  typography: {
    fontFamily: 'Source Sans Pro',
  },
  palette: {
    primary: {
      main: "#B283FF"
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
 {/*      <AuthProvider> */}
        <BoleteroProvider>
        <SearchBoletero />
          <Routes>
            <Route path="/" element={<BoleteroProvider />}>
            </Route>
          </Routes>
        </BoleteroProvider>
   {/*    </AuthProvider> */}
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
