import React from 'react'
import { Grid } from "@mui/material";
const AlertLogin = ({alerta}) => {

  return (
    <Grid marginTop={2}>
    <div className='warning-user'>{alerta.msg}</div>
    </Grid>
  )
}

export default AlertLogin