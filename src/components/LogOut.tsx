import Cookies from "universal-cookie/es6";
import Button from '@mui/material/Button';

const cookies = new Cookies();

export const LogOut = () => {

    const cerrarSesion = () =>{
        cookies.remove('ID_USUARIO',{path: "/"});
        cookies.remove('USUARIO1',{path: "/"});
        cookies.remove('ID_CLIENTE',{path: "/"});
        cookies.remove('ADMINISTRA', {path: "/"});
        window.location.href='/'; 
    }

    return (
        <Button
        fullWidth
        variant="contained"
        color="error"
        onClick={()=> cerrarSesion()}
      >
        Cerrar Sesión
      </Button>
    )
}
