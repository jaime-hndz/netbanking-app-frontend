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
  Checkbox,
  Input,
  Modal,
  Select,
  MenuItem
} from "@mui/material/";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import md5 from 'md5';

const columnas= [
  { name: 'ID_USUARIO' },
  { name: 'USUARIO' },
  { name: 'ID_CLIENTE' },
  { name: 'ADMINISTRA'  },
  { name: 'FECHA_CREACION' }
];

const baseUrl="https://localhost:44327/api/Usuarios/";

type tipoObjecto = {
    ID_USUARIO : Number,
    USUARIO1 : String,
    CONTRA : String,
    ID_CLIENTE : Number,
    ADMINISTRA : Boolean,
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

export const CrudUsuarios = () => {
  
  let fecha = new Date();
  const styles= useStyles();

  const [data, setData]= useState([]);
  const [dataFiltrada, setDataFiltrada] = useState([])

  const [sorteadoPor, setSorteadoPor] = useState("")
  const [orden, setOrden] = useState("ASC")

  const [busqueda, setBusqueda] = useState("")
  const [seleccionado, setSeleccionado]=useState({
    ID_USUARIO: 0,
    USUARIO1: "",
    CONTRA: "",
    ID_CLIENTE: 0,
    ADMINISTRA: false,
    FECHA_CREACION: fecha,
    ESTATUS: true
  })

  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);



  const handleChange=(e:any)=>{
    const {name, value}=e.target;
    setSeleccionado(prevState=>({
      ...prevState,
      [name]: value
    }));
  }
  const handleChangeContra=(e:any)=>{
    const {name, value}=e.target;
    setSeleccionado(prevState=>({
      ...prevState,
      [name]: md5(value)
    }));
  }

  const handleChangeBuscar=(e:any)=>{
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }

  const filtrar = (terminoBusqueda:string) =>{
    let resultadosBusqueda = dataFiltrada.filter((elemento:tipoObjecto) =>{
      if (
        elemento.USUARIO1.toString().includes(terminoBusqueda) ||
        elemento.ID_USUARIO.toString().includes(terminoBusqueda)
      ){
        return elemento;
      }
    })
    setData(resultadosBusqueda)
  }

  const sortear = (col:string) =>{
    setSorteadoPor(col)
    if(orden === "ASC"){
      const sorted = [...dataFiltrada].sort((a,b)=>
        a[col] > b[col] ? 1 : -1
      );
      setData(sorted)
      setOrden("DSC")
    }else if(orden === "DSC"){
      const sorted = [...dataFiltrada].sort((a,b)=>
        a[col] < b[col] ? 1 : -1
      );
      setData(sorted)
      setOrden("ASC")
    }
  }

  const peticionGet=async()=>{
    await axios.get(baseUrl)
    .then(response=>{
     setData(response.data);
     setDataFiltrada(response.data);
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPost=async()=>{
    await axios.post(baseUrl, seleccionado)
    .then(response=>{
      setData(data.concat(response.data));
      abrirCerrarModalInsertar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionPut=async()=>{
    await axios.put(baseUrl+seleccionado.ID_USUARIO, seleccionado)
    .then(response=>{
      var dataNueva= data;
      // eslint-disable-next-line array-callback-return
      dataNueva.map((usuario:tipoObjecto)=>{
        if(usuario.ID_USUARIO===seleccionado.ID_USUARIO){
          usuario.USUARIO1 = seleccionado.USUARIO1;
          usuario.CONTRA = seleccionado.CONTRA;
          usuario.ID_CLIENTE = seleccionado.ID_CLIENTE;
          usuario.ADMINISTRA = seleccionado.ADMINISTRA;
          usuario.FECHA_CREACION = seleccionado.FECHA_CREACION;
          usuario.ESTATUS = seleccionado.ESTATUS;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+seleccionado.ID_USUARIO)
    .then(response=>{
      setData(data.filter((usuario:tipoObjecto)=>usuario.ID_USUARIO !== seleccionado.ID_USUARIO));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarUsuario=(usuario:any, caso:string)=>{
    setSeleccionado(usuario);
    (caso==="Editar")?abrirCerrarModalEditar()
    :
    abrirCerrarModalEliminar()
  }

  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }
  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }
  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  useEffect(()=>{
    peticionGet();
  }, [])

  const bodyInsertar = (
    <div className={styles.modal}>
      <h3>Agregar Nuevo Usuario</h3>
      <TextField
        className={styles.inputMaterial}
        label="Nombre de usuario"
        name="USUARIO1"
        onChange={handleChange}
        size="small"
      />
      <br />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Contraseña"
        name="CONTRA"
        onChange={handleChangeContra}
        type="password"
        size="small"
      />
      <br />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="ID del cliente"
        name="ID_CLIENTE"
        onChange={handleChange}
        size="small"
      />
      <br />
      <br />
      <Select
        className={styles.inputMaterial}
        name="ADMINISTRA"
        onChange={handleChange}
        size="small"
      >
        <MenuItem value={0}>Estandar</MenuItem>
        <MenuItem value={1}>Administrador</MenuItem>
      </Select>
      <br />
      <br />
      <br />

      <div>
        <Button
          color="primary"
          variant="contained"
          onClick={() => peticionPost()}
        >
          Insertar
        </Button>{" "}
        <Button
          color="error"
          variant="contained"
          className="btn btn-danger"
          onClick={() => abrirCerrarModalInsertar()}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );

  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Usuario {seleccionado && seleccionado.ID_USUARIO} </h3>
      <TextField
        className={styles.inputMaterial}
        label="Nombre de usuario"
        name="USUARIO1"
        onChange={handleChange}
        size="small"
        value={seleccionado && seleccionado.USUARIO1}
      />
      <br />
      <br />
      <TextField
        className={styles.inputMaterial}
        label="Contraseña"
        name="CONTRA"
        onChange={handleChange}
        size="small"
        value={seleccionado && seleccionado.CONTRA}
        disabled
      />
      <br />
      <br />

      <TextField
        className={styles.inputMaterial}
        label="ID del cliente"
        name="ID_CLIENTE"
        onChange={handleChange}
        size="small"
        value={seleccionado && seleccionado.ID_CLIENTE}
      />
      <br />
      <br />
      <Select
        defaultValue={seleccionado.ADMINISTRA ? 1 : 0}
        className={styles.inputMaterial}
        name="ADMINISTRA"
        onChange={handleChange}
        size="small"
      >
        <MenuItem value={0}>Estandar</MenuItem>
        <MenuItem value={1}>Administrador</MenuItem>
      </Select>
      <br />
      <br />
      <br />

      <div>
        <Button color="secondary" variant="contained" onClick={() => peticionPut()}>
          Editar
        </Button>
        {" "}
        <Button color="error" variant="contained" className="btn btn-danger" onClick={() => abrirCerrarModalEditar()}>
          Cancelar
        </Button>
      </div>
    </div>
  );

  const bodyEliminar=(
    <div className={styles.modal}>
      <p>Estás seguro que deseas eliminar al usuario <b>{seleccionado && seleccionado.ID_USUARIO}</b>? </p>
      <div>
        <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
      </div>

    </div>
  )

  return (
    <div>
      <h1>Usuarios</h1>
      <div style={{ display: "flex" }}>
        <Button
          color="success"
          variant="outlined"
          onClick={() => abrirCerrarModalInsertar()}
        >
          Insertar Usuario
        </Button>
        {"\u00A0\u00A0"}
        <div>
          <Input
            color="success"
            value={busqueda}
            placeholder="Buscar por Usuario/ID"
            aria-label="description"
            onChange={handleChangeBuscar}
          />{" "}
          <Button color="success" variant="outlined">
            <SearchIcon />
          </Button>
        </div>
      </div>
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
              <TableCell>ACCIONES</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((elemento: tipoObjecto, index: number) => (
              <TableRow key={index}>
                <TableCell>{elemento.ID_USUARIO}</TableCell>
                <TableCell>{elemento.USUARIO1}</TableCell>
                <TableCell>{elemento.ID_CLIENTE}</TableCell>
                <TableCell>{elemento.ADMINISTRA? <Checkbox size="small" disabled  checked /> : <Checkbox size="small" disabled /> }</TableCell>
                <TableCell>{elemento.FECHA_CREACION}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => seleccionarUsuario(elemento, "Editar")}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() => seleccionarUsuario(elemento, "Eliminar")}
                  >
                    <DeleteIcon />
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
      
      <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
      </Modal>
    </div>
  );
}