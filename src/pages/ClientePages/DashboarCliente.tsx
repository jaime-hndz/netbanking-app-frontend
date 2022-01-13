import { Button, Card, CardActions, CardContent } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie/es6"

const URLcliente = "https://localhost:44327/api/Clientes/{id}"
const URLCuentas = "https://localhost:44327/api/Cuentas/PorCliente/{id}"
const URLPrestamos = "https://localhost:44327/api/Prestamos/PorCliente/{id}"
const URLTarjetas = "https://localhost:44327/api/Tarjetas/PorCliente/{id}"

type tipoPrestamo = {
    ID_PRESTAMO : Number,
    ID_CLIENTE : Number,
    BALANCE : Number,
    FECHA_CREACION : Date,
    ESTATUS : Boolean,
}

type tipoCuenta = {
    ID_CUENTA : Number,
    ID_CLIENTE : Number,
    BALANCE : Number,
    FECHA_CREACION : Date,
    ESTATUS : Boolean,
}

type tipoTarjeta = {
    ID_TARJETA : Number,
    ID_CLIENTE : Number,
    BALANCE : Number,
    FECHA_CREACION : Date,
    ESTATUS : Boolean,
}

const cookies = new Cookies();

export const DashboarCliente = () => {

    const idCliente = cookies.get('ID_CLIENTE');
    const [dataCuentas, setDataCuentas] = useState([])
    const [dataPrestamos, setDataPrestamos] = useState([])
    const [dataTarjetas, setDataTarjetas] = useState([])

    const [cliente, setCliente] = useState({
        ID_CLIENTE: 0,
        CEDULA: "",
        NOMBRE: "",
        APELLIDO: "",
        CORREO: "",
        TELEFONO: "",
        DIRECCION: "",
        FECHA_CREACION: new Date(),
        ESTATUS: true
    });
    
    useEffect(() => {
        peticionGetCliente()
        peticionGetCuentas()
        peticionGetPrestamos()
        peticionGetTarjetas()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const peticionGetCliente = async() =>{
        await axios.get(URLcliente, {params : {id : idCliente}} )
        .then(response=>{
         setCliente(response.data);
        }).catch(error=>{
          console.log(error);
        })
    }
    const peticionGetCuentas = async() =>{
        await axios.get(URLCuentas, {params : {id : idCliente}} )
        .then(response=>{
         setDataCuentas(response.data);
        }).catch(error=>{
          console.log(error);
        })
    }
    const peticionGetPrestamos = async() =>{
        await axios.get(URLPrestamos, {params : {id : idCliente}} )
        .then(response=>{
         setDataPrestamos(response.data);
        }).catch(error=>{
          console.log(error);
        })
    }
    const peticionGetTarjetas = async() =>{
        await axios.get(URLTarjetas, {params : {id : idCliente}} )
        .then(response=>{
         setDataTarjetas(response.data);
        }).catch(error=>{
          console.log(error);
        })
    }

    return (
      <>
        {idCliente === 'null' ? (
          <div>
            <h1>Tu cuenta no esta enlazada a ningun cliente</h1>
            <h3>
              Contacta con alguno de nuestros agentes al +1 (829) 284-7781 para
              ser registrado en el sistema
            </h3>
          </div>
        ) : (
          <div>
            <h1>Bienvenido {cliente.NOMBRE} {cliente.APELLIDO}</h1>
            <hr />
            <h2>Tus productos</h2>
            <div style={{display: 'flex'}}>
                {dataCuentas.map((Producto : tipoCuenta) =>{
                    return(
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <h3>Cuenta: {Producto.ID_CUENTA}</h3>
                                <h4>Balance: {Producto.BALANCE}.00 RD$</h4>
                            </CardContent>
                            <CardActions>
                                <Link to="./Transacciones" style={{textDecoration: 'none', color: 'black'}}>
                                    <Button size="small">Hacer transacciones</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    )
                })}
                {"\u00A0\u00A0"}
                {dataPrestamos.map((Producto : tipoPrestamo) =>{
                    return(
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <h3>Prestamo: {Producto.ID_PRESTAMO}</h3>
                                <h4>Balance: {Producto.BALANCE}.00 RD$</h4>
                            </CardContent>
                            <CardActions>
                                <Link to="./PCuotas" style={{textDecoration: 'none', color: 'black'}}>
                                    <Button color="secondary" size="small">Cuotas</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    )
                })}
                {"\u00A0\u00A0"}
                {dataTarjetas.map((Producto : tipoTarjeta) =>{
                    return(
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <h3>Tarjeta: {Producto.ID_TARJETA}</h3>
                                <h4>Balance: {Producto.BALANCE}.00 RD$</h4>
                            </CardContent>
                            <CardActions>
                                <Link to="./PTarjetas" style={{textDecoration: 'none', color: 'black'}}>
                                    <Button color="success" size="small">Pagar tarjeta</Button>
                                </Link>
                            </CardActions>
                        </Card>
                    )
                })}
            </div>
          </div>
        )}
      </>
    );
}
