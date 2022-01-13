import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';

import { Copyright } from "../components/Copyright";
import axios from 'axios';
import md5 from 'md5';

const theme = createTheme();
const URL = "https://localhost:44327/api/Usuarios/"

export const Register = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fecha = new Date();
    const [state, setState] = useState({form : {
        usuario : "",
        contra : "",
        contra2 : ""
    }})
    const [coinciden, setcoinciden] = useState(true)

    const peticionPost=async()=>{
        console.log(coinciden)
        if(coinciden){
            const fecha = new Date();
            await axios.post(URL, {
                USUARIO1 : state.form.usuario,
                CONTRA : md5(state.form.contra),
                ID_CLIENTE : null,
                ADMINISTRA: false,
                FECHA_CREACION: fecha,
                ESTATUS: true
            })
            .then(response=>{
                alert('Registrado con exito.')
                window.location.href="./"
            })
            .catch(error =>{
                alert(error)
            })
        }else{
            alert('las contraseñas no coinciden')
        }
    }

    const handleChange = (e:any) =>{
        setState({
            form:{
                ...state.form,
                [e.target.name] : e.target.value
            }
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {

        if(state.form.contra === state.form.contra2){
            setcoinciden(true)
         }else{
            setcoinciden(false)
         }
    })
    
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrate
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="usuario"
                  label="Usuario"
                  name="usuario"
                  autoComplete="usuario"
                  onChange={handleChange}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="contra"
                  label="Escriba su contraseña"
                  type="password"
                  id="contra"
                  autoComplete="new-password"
                  onChange={handleChange}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="contra2"
                  label="Reescriba su contraseña"
                  type="password"
                  id="contra2"
                  autoComplete="new-password"
                  onChange={handleChange}

                />
              </Grid>

            </Grid>

            {coinciden ? null : <p style={{color : 'red'}}>Las contraseñas no coinciden*</p>}

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=> peticionPost()}
            >
              Registrarse
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="./" variant="body2">
                  Ya tienes una cuenta? Inicia Sesion
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
