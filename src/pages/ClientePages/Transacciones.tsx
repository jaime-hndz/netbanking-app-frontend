/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {makeStyles} from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Modal
} from "@mui/material/";


import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Cookies from "universal-cookie/es6"

const cookies = new Cookies();
const idCliente = cookies.get('ID_CLIENTE');

const columnas= [
  { name: 'ID_CUENTA' },
  { name: 'BALANCE'  }
];

const baseUrl = "https://localhost:44327/api/Cuentas/PorCliente/{id}"
const URLPut = "https://localhost:44327/api/Cuentas/"

type tipoObjeto = {
    ID_CUENTA : Number,
    ID_CLIENTE : Number,
    BALANCE : Number,
    FECHA_CREACION : Date,
    ESTATUS : Boolean,
}

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 
  inputMaterial:{
    width: '100%'
  }
}));

export const Transacciones = () => {
  
  let fecha = new Date();
  const styles= useStyles();

  const [data, setData]= useState([]);
  const [sorteadoPor, setSorteadoPor] = useState("")
  const [orden, setOrden] = useState("ASC")
  const [monto, setMonto] = useState(0)
  const [seleccionado, setSeleccionado]=useState({
    ID_CUENTA: 0,
    ID_CLIENTE: 0,
    BALANCE: 0,
    FECHA_CREACION: fecha,
    ESTATUS: true
  })

  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);



  const handleChange=(e:any)=>{
    const {value}=e.target;
    setMonto(monto);
  }

  const sortear = (col:string) =>{
    setSorteadoPor(col)
    if(orden === "ASC"){
      const sorted = [...data].sort((a,b)=>
        a[col] > b[col] ? 1 : -1
      );
      setData(sorted)
      setOrden("DSC")
    }else if(orden === "DSC"){
      const sorted = [...data].sort((a,b)=>
        a[col] < b[col] ? 1 : -1
      );
      setData(sorted)
      setOrden("ASC")
    }
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl, {params : {id : idCliente}})
    .then(response=>{
     setData(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const depositar = () => {
    peticionPut();
  };

  const retirar = () => {
    peticionPut();
  };

  const peticionPut=async()=>{
    await axios.put(baseUrl+seleccionado.ID_CUENTA, seleccionado)
    .then(response=>{
      var dataNueva= data;
      // eslint-disable-next-line array-callback-return
      dataNueva.map((cuenta:tipoObjeto)=>{
        if(cuenta.ID_CUENTA===seleccionado.ID_CUENTA){
          cuenta.ID_CLIENTE = seleccionado.ID_CLIENTE;
          cuenta.BALANCE = seleccionado.BALANCE;
          cuenta.FECHA_CREACION = seleccionado.FECHA_CREACION;
          cuenta.ESTATUS = seleccionado.ESTATUS;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarCliente=(cuenta:any, caso:string)=>{
    setSeleccionado(cuenta);
    (caso==="Editar")?abrirCerrarModalEditar() : abrirCerrarModalInsertar()
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }
  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }


  useEffect(()=>{
    peticionGet();
  }, [])

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Cuanto Quieres retirar?</h3>
      <TextField
        className={styles.inputMaterial}
        label="MONTO"
        name="BALANCE"
        type="number"
        onChange={handleChange}
        size="small"
      />

      <br />
      <br />    
  
      <div>
        <Button color="secondary" variant="contained" onClick={() => retirar()}>
          Retirar
        </Button>
        {" "}
        <Button color="error" variant="contained" className="btn btn-danger" onClick={() => abrirCerrarModalInsertar()}>
          Cancelar
        </Button>
      </div>
    </div>
  );

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Cuanto Quieres Depositar?</h3>
      <TextField
        className={styles.inputMaterial}
        label="MONTO"
        name="BALANCE"
        type="number"
        onChange={handleChange}
        size="small"
      />

      <br />
      <br />
  
      <div>
        <Button color="success" variant="contained" onClick={() => depositar()}>
          Depositar
        </Button>
        {" "}
        <Button color="error" variant="contained" className="btn btn-danger" onClick={() => abrirCerrarModalEditar()}>
          Cancelar
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      <h1>Tus cuentas</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columnas.map((columna, index) => {
                return (
                  <TableCell
                    key={index}
                    onClick={() => sortear(columna.name.toString())}
                  >
                    {columna.name}
                    {sorteadoPor === columna.name.toString() && orden === "ASC" ? " ↑" : null}
                    {sorteadoPor === columna.name.toString() && orden === "DSC" ? " ↓" : null}
                  </TableCell>
                );
              })}
              <TableCell>ACCIONES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((elemento: tipoObjeto, index: number) => (
              <TableRow key={index}>
                <TableCell>{elemento.ID_CUENTA}</TableCell>
                <TableCell>{elemento.BALANCE}</TableCell>
                <TableCell>
                  <Button
                    color="success"
                    variant="outlined"
                    onClick={() => seleccionarCliente(elemento, "Editar")}
                  >
                    <AddCircleIcon />
                  </Button>
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() => seleccionarCliente(elemento, "Eliminar")}
                  >
                    <RemoveCircleIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
      </Modal>

      <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>
      <div>
      {/* <h1>Transacciones</h1>
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columnas.map((columna, index) => {
                return (
                  <TableCell
                    key={index}
                    onClick={() => sortear(columna.name.toString())}
                  >
                    {columna.name}
                    {sorteadoPor === columna.name.toString() && orden === "ASC" ? " ↑" : null}
                    {sorteadoPor === columna.name.toString() && orden === "DSC" ? " ↓" : null}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((elemento: tipoObjeto, index: number) => (
              <TableRow key={index}>
              </TableRow>
            ))}
          </TableBody>
        </Table>
            </TableContainer>*/}
    </div>
    </div> 

    
  );
}

