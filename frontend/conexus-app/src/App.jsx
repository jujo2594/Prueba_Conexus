import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ListaFacturas from './pages/Facturas/ListaFacturas'
import FormFactura from './pages/Facturas/FormFactura'
import ResumenFactura from './pages/Facturas/ResumenFactura'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ListaFacturas />} />
        <Route path="/facturas/nueva" element={<FormFactura />} />
        <Route path="/facturas/editar/:id" element={<FormFactura />} />
        <Route path="/facturas/resumen/:id" element={<ResumenFactura />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App