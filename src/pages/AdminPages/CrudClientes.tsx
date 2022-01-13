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
  Input,
  Modal
} from "@mui/material/";

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const columnas= [
  { name: 'ID_CLIENTE' },
  { name: 'CEDULA'  },
  { name: 'NOMBRE'  },
  { name: 'APELLIDO'  },
  { name: 'CORREO'  },
  { name: 'TELEFONO' },
  { name: 'DIRECCION' },
  { name: 'FECHA_CREACION' }
];

const baseUrl="https://localhost:44327/api/Clientes/";

type tipoObjecto = {
    ID_CLIENTE : Number,
    CEDULA : String,
    NOMBRE : String,
    APELLIDO : String,
    CORREO : String,
    TELEFONO : String,
    DIRECCION : String,
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

export const CrudClientes = () => {
  
  let fecha = new Date();
  const styles= useStyles();

  const [data, setData]= useState([]);
  const [dataFiltrada, setDataFiltrada] = useState([])

  const [sorteadoPor, setSorteadoPor] = useState("")
  const [orden, setOrden] = useState("ASC")

  const [busqueda, setBusqueda] = useState("")
  const [seleccionado, setSeleccionado]=useState({
    ID_CLIENTE: 0,
    CEDULA: "",
    NOMBRE: "",
    APELLIDO: "",
    CORREO: "",
    TELEFONO: "",
    DIRECCION: "",
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

  const handleChangeBuscar=(e:any)=>{
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  }

  const filtrar = (terminoBusqueda:string) =>{
    let resultadosBusqueda = dataFiltrada.filter((elemento:tipoObjecto) =>{
      if (
        elemento.CEDULA.toString().includes(terminoBusqueda) ||
        elemento.ID_CLIENTE.toString().includes(terminoBusqueda)
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
    await axios.put(baseUrl+seleccionado.ID_CLIENTE, seleccionado)
    .then(response=>{
      var dataNueva= data;
      // eslint-disable-next-line array-callback-return
      dataNueva.map((cliente:tipoObjecto)=>{
        if(cliente.ID_CLIENTE===seleccionado.ID_CLIENTE){
          cliente.CEDULA = seleccionado.CEDULA;
          cliente.NOMBRE = seleccionado.NOMBRE;
          cliente.APELLIDO = seleccionado.APELLIDO;
          cliente.CORREO = seleccionado.CORREO;
          cliente.TELEFONO = seleccionado.TELEFONO;
          cliente.DIRECCION = seleccionado.DIRECCION;
          cliente.FECHA_CREACION = seleccionado.FECHA_CREACION;
          cliente.ESTATUS = seleccionado.ESTATUS;
        }
      });
      setData(dataNueva);
      abrirCerrarModalEditar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const peticionDelete=async()=>{
    await axios.delete(baseUrl+seleccionado.ID_CLIENTE)
    .then(response=>{
      setData(data.filter((cliente:tipoObjecto)=>cliente.ID_CLIENTE !== seleccionado.ID_CLIENTE));
      abrirCerrarModalEliminar();
    }).catch(error=>{
      console.log(error);
    })
  }

  const seleccionarCliente=(cliente:any, caso:string)=>{
    setSeleccionado(cliente);
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
      <h3>Agregar Nuevo Cliente</h3>
      <TextField
        className={styles.inputMaterial}
        label="Cedula"
        name="CEDULA"
        onChange={handleChange}
        size="small"
      />
      <br />
      <br />

      <TextField
        className={styles.inputMaterial}
        label="Nombre"
        name="NOMBRE"
        onChange={handleChange}
        size="small"

      />
      <br />
      <br />


      <TextField
        className={styles.inputMaterial}
        label="Apellido"
        name="APELLIDO"
        onChange={handleChange}
        size="small"

      />
      <br />
      <br />


      <TextField
        className={styles.inputMaterial}
        label="Correo"
        name="CORREO"
        onChange={handleChange}
        size="small"

      />
      <br />
      <br />


      <TextField
        className={styles.inputMaterial}
        label="Telefono"
        name="TELEFONO"
        onChange={handleChange}
        size="small"

      />
      <br />
      <br />

      <TextField
        className={styles.inputMaterial}
        label="Direccion"
        name="DIRECCION"
        onChange={handleChange}
        size="small"

      />
      <br />
      <br />
      <br />

      <div>
        <Button color="primary" variant="contained" onClick={() => peticionPost()}>
          Insertar
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
      <h3>Editar Cliente {seleccionado && seleccionado.ID_CLIENTE} </h3>
      <TextField
        className={styles.inputMaterial}
        label="Cedula"
        name="CEDULA"
        onChange={handleChange}
        size="small"
        value={seleccionado && seleccionado.CEDULA}

      />
      <br />
      <br />

      <TextField
        className={styles.inputMaterial}
        label="Nombre"
        name="NOMBRE"
        onChange={handleChange}
        size="small"
        value={seleccionado && seleccionado.NOMBRE}

      />
      <br />
      <br />


      <TextField
        className={styles.inputMaterial}
        label="Apellido"
        name="APELLIDO"
        onChange={handleChange}
        size="small"
        value={seleccionado && seleccionado.APELLIDO}
      />
      <br />
      <br />


      <TextField
        className={styles.inputMaterial}
        label="Correo"
        name="CORREO"
        onChange={handleChange}
        size="small"
        value={seleccionado && seleccionado.CORREO}
      />
      <br />
      <br />


      <TextField
        className={styles.inputMaterial}
        label="Telefono"
        name="TELEFONO"
        onChange={handleChange}
        size="small"
        value={seleccionado && seleccionado.TELEFONO}
      />
      <br />
      <br />

      <TextField
        className={styles.inputMaterial}
        label="Direccion"
        name="DIRECCION"
        onChange={handleChange}
        size="small"
        value={seleccionado && seleccionado.DIRECCION}
      />
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
      <p>Estás seguro que deseas eliminar al cliente <b>{seleccionado && seleccionado.ID_CLIENTE}</b>? </p>
      <div>
        <Button color="secondary" onClick={()=>peticionDelete()}>Sí</Button>
        <Button onClick={()=>abrirCerrarModalEliminar()}>No</Button>
      </div>

    </div>
  )

  return (
    <div>
      <h1>Clientes</h1>
      <div style={{ display: "flex" }}>
        <Button
          color="success"
          variant="outlined"
          onClick={() => abrirCerrarModalInsertar()}
        >
          Insertar Cliente
        </Button>
        {"\u00A0\u00A0"}
        <div>
          <Input
            color="success"
            value={busqueda}
            placeholder="Buscar por Cedula/ID"
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
                <TableCell>{elemento.ID_CLIENTE}</TableCell>
                <TableCell>{elemento.CEDULA}</TableCell>
                <TableCell>{elemento.NOMBRE}</TableCell>
                <TableCell>{elemento.APELLIDO}</TableCell>
                <TableCell>{elemento.CORREO}</TableCell>
                <TableCell>{elemento.TELEFONO}</TableCell>
                <TableCell>{elemento.DIRECCION}</TableCell>
                <TableCell>{elemento.FECHA_CREACION}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => seleccionarCliente(elemento, "Editar")}
                  >
                    <EditIcon />
                  </Button>
                  <Button
                    color="error"
                    variant="outlined"
                    onClick={() => seleccionarCliente(elemento, "Eliminar")}
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