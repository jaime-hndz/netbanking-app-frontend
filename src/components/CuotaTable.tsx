/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material/";

import SearchIcon from '@mui/icons-material/Search';

const columnas= [
  { name: 'ID_CUOTA' },
  { name: 'ID_PRESTAMO'  },
  { name: 'MONTO'  },
  { name: 'FECHA_CREACION'  }
];

const baseUrl="https://localhost:44327/api/Cuotas/";

type tipoObjeto = {
    ID_CUOTA : Number,
    ID_PRESTAMO : Number,
    MONTO : Number,
    FECHA_CREACION : Date
}

interface Props {
    toFilter: string
}

export const CuotaTable:React.FC<Props> = ({toFilter}) => {
  
  const [data, setData]= useState([]);
  const [dataFiltrada, setDataFiltrada] = useState([])

  const [sorteadoPor, setSorteadoPor] = useState("")
  const [orden, setOrden] = useState("ASC")

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

  useEffect(()=>{
    peticionGet();
  }, [])

  console.log("el to filter: "+toFilter)
  return (
    <div>
      
      <h2>Registro de Cuotas</h2>
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
            {data.filter((elemento: tipoObjeto) => {
                  if (elemento.ID_PRESTAMO.toString().includes(toFilter)) {
                    return elemento;
                  }
                }).map((elemento: tipoObjeto, index: number) => (
              <TableRow key={index}>
                <TableCell>{elemento.ID_CUOTA}</TableCell>
                <TableCell>{elemento.ID_PRESTAMO}</TableCell>
                <TableCell>{elemento.MONTO}</TableCell>
                <TableCell>{elemento.FECHA_CREACION}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}