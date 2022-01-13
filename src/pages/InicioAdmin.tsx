import { useEffect } from "react"
import {Outlet} from 'react-router-dom';
import Cookies from "universal-cookie/es6";
import { Menu } from "../components/Menu";

const cookies = new Cookies();

export const InicioAdmin = () => {

    useEffect(() => {
        if(cookies.get('ID_USUARIO')){

        }else{
          window.location.href="/"
        }
    }, [])

    return (
        <>
            <Menu>
                <Outlet />
            </Menu>
        </>
    )
}
