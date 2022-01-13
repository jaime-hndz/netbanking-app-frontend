import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import HomeIcon from '@mui/icons-material/Home';

export const NavbarData = [
    {
        texto : "Inicio",
        icono : <HomeIcon />,
        path  : "/InicioAdmin/"
    },
    {
        texto : "Clientes",
        icono : <AccountCircleIcon />,
        path  : "/InicioAdmin/CrudClientes"
    },
    {
        texto : "Cuentas",
        icono : <FolderSharedIcon />,
        path  : "/InicioAdmin/CrudCuentas"
    },
    {
        texto : "Prestamos",
        icono : <CreditCardIcon />,
        path  : "/InicioAdmin/CrudPrestamos"
    },
    {
        texto : "Tarjetas",
        icono : <CreditCardIcon />,
        path  : "/InicioAdmin/CrudTarjetas"
    },
    {
        texto : "Usuarios",
        icono : <AccountCircleIcon />,
        path  : "/InicioAdmin/CrudUsuarios"
    },
    {
        texto : "Transacciones",
        icono : <PointOfSaleIcon />,
        path  : "/InicioAdmin/CrudTransacciones"
    },
    {
        texto : "Cuotas",
        icono : <PointOfSaleIcon />,
        path  : "/InicioAdmin/CrudCuotas"
    },
]