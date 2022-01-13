import { useEffect } from "react"
import Cookies from "universal-cookie/es6";
import {Outlet} from 'react-router-dom';
import { MenuCliente } from "../components/MenuCliente";


const cookies = new Cookies();

export const InicioCliente = () => {

    useEffect(() => {

        if(cookies.get('ID_USUARIO')){

        }else{
          window.location.href="./"
        }

    }, [])

    return (
        <>
            <MenuCliente>
                <Outlet />
            </MenuCliente>
        </>
    )
}

