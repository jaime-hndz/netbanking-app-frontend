import { useEffect, useState } from "react"
import axios from 'axios';
import md5 from 'md5';
import Cookies from "universal-cookie/es6";

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Copyright } from "../components/Copyright";

const URL = "https://localhost:44327/api/Usuarios/login/{user}/{pass}"
const cookies = new Cookies();
const theme = createTheme();

export const Login = () => {

    const [state, setState] = useState({form : {
        usuario : "",
        contra : ""
    }})

    const handleChange = async (e:any) =>{
        await setState({
            form:{
                ...state.form,
                [e.target.name] : e.target.value
            }
        })
    }

    useEffect(() => {
      if(cookies.get('ID_USUARIO')){
        if(cookies.get('ADMINISTRA')){
          window.location.href="./InicioAdmin"
        }else{
          window.location.href="./InicioCliente"
        }
      }
    }, [])

    //Mandando a buscar en la base de datos para validar el inicio de sesion
    const iniciarSesion = async() =>{
        await axios.get(URL, {params: {user: state.form.usuario, pass: md5(state.form.contra)}})
        .then(response =>{
            return response.data;
        })
        .then(response =>{
          if(response.length > 0){
            let respuesta = response[0]
            //Validando que el usuario esta activo
            if(respuesta.ESTATUS){
              cookies.set('ID_USUARIO', respuesta.ID_USUARIO, {path: "/"});
              cookies.set('USUARIO1', respuesta.USUARIO1, {path: "/"});
              cookies.set('ID_CLIENTE', respuesta.ID_CLIENTE, {path: "/"});
              cookies.set('ADMINISTRA', respuesta.ADMINISTRA, {path: "/"});
              if(respuesta.ADMINISTRA){
                window.location.href="./InicioAdmin"
              }else{
                window.location.href="./InicioCliente"
              }              
            }
            
          }else{
            alert("El usuario o la contraseña no son correctas")
          }
        })
        .catch(error =>{
            console.log(error);
        })
    }

    return (
      <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Iniciar Sesión
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="usuario"
                label="Usuario"
                name="usuario"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="contra"
                label="Contraseña"
                type="password"
                id="contra"
                autoComplete="current-password"
                onChange={handleChange}
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={()=> iniciarSesion()}
              >
                INICIAR SESIÓN
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="./Register" variant="body2">
                    {"No tienes una cuenta? Registrese"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    )
}
