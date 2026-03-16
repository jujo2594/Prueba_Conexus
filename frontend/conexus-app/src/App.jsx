import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

// Facturas

import ListaFacturas from './pages/Facturas/ListaFacturas'
import FormFactura from './pages/Facturas/FormFactura'
import ResumenFactura from './pages/Facturas/ResumenFactura'

// Clientes

import ListaClientes from './pages/Clientes/ListaClientes'
import FormCliente from './pages/Clientes/FormCliente'

// Productos

import ListaProductos from './pages/Productos/ListaProductos'
import FormProducto from './pages/Productos/FormProducto'

// Dashboard

import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        {/* Facturas */}

        <Route path="/" element={<ListaFacturas />} />
        <Route path="/facturas/nueva" element={<FormFactura />} />
        <Route path="/facturas/editar/:id" element={<FormFactura />} />
        <Route path="/facturas/resumen/:id" element={<ResumenFactura />} />

        {/* Clientes */}

        <Route path="/clientes" element={<ListaClientes />} />
        <Route path="/clientes/nuevo" element={<FormCliente />} />
        <Route path="/clientes/editar/:id" element={<FormCliente />} />

        {/* Productos */}

        <Route path="/productos" element={<ListaProductos />} />
        <Route path="/productos/nuevo" element={<FormProducto />} />
        <Route path="/productos/editar/:id" element={<FormProducto />} />

        {/* Dashboard */}

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
