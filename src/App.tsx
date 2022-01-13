import './App.css';
import {BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { InicioAdmin } from './pages/InicioAdmin';
import { InicioCliente } from './pages/InicioCliente';
import { Register } from './pages/Register';
import { DashboarAdmin } from './pages/AdminPages/DashboarAdmin';
import { CrudClientes } from './pages/AdminPages/CrudClientes';
import { CrudCuentas } from './pages/AdminPages/CrudCuentas';
import { CrudPrestamos } from './pages/AdminPages/CrudPrestamos';
import { CrudTarjetas } from './pages/AdminPages/CrudTarjetas';
import { CrudTransacciones } from './pages/AdminPages/CrudTransacciones';
import { CrudUsuarios } from './pages/AdminPages/CrudUsuarios';
import { CrudCuotas } from './pages/AdminPages/CrudCuotas';
import { DashboarCliente } from './pages/ClientePages/DashboarCliente';
import { PCuotas } from './pages/ClientePages/PCuotas';
import { PTarjetas } from './pages/ClientePages/PTarjetas';
import { Transacciones } from './pages/ClientePages/Transacciones';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/InicioAdmin" element={<InicioAdmin />}>
            <Route path="/InicioAdmin/"  element={<DashboarAdmin />} />
            <Route path="/InicioAdmin/CrudClientes"  element={<CrudClientes />} />
            <Route path="/InicioAdmin/CrudCuentas"  element={<CrudCuentas />} />
            <Route path="/InicioAdmin/CrudPrestamos"  element={<CrudPrestamos />} />
            <Route path="/InicioAdmin/CrudTarjetas"  element={<CrudTarjetas />} />
            <Route path="/InicioAdmin/CrudTransacciones"  element={<CrudTransacciones />} />
            <Route path="/InicioAdmin/CrudUsuarios"  element={<CrudUsuarios />} />
            <Route path="/InicioAdmin/CrudCuotas"  element={<CrudCuotas />} />
          </Route>
          <Route path="/InicioCliente/" element={<InicioCliente />}>
            <Route path="/InicioCliente/"  element={<DashboarCliente />} />
            <Route path="/InicioCliente/Transacciones"  element={<Transacciones />} />
            <Route path="/InicioCliente/PCuotas"  element={<PCuotas />} />
            <Route path="/InicioCliente/PTarjetas"  element={<PTarjetas />} />
          </Route>
          <Route path="/Register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;