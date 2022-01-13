import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import HomeIcon from '@mui/icons-material/Home';

export const NavbarClienteData = [
    {
        texto : "Inicio",
        icono : <HomeIcon />,
        path  : "/InicioCliente/"
    },
    {
        texto : "Transacciones",
        icono : <AccountCircleIcon />,
        path  : "/InicioCliente/Transacciones"
    },
    {
        texto : "Pagar cuotas",
        icono : <FolderSharedIcon />,
        path  : "/InicioCliente/PCuotas"
    },
    {
        texto : "Pagar tarjeta",
        icono : <CreditCardIcon />,
        path  : "/InicioCliente/PTarjetas"
    }
]