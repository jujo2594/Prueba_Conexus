import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFacturas, deleteFactura } from '../../services/facturaService'

const ListaFacturas = () => {
  const [facturas, setFacturas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    cargarFacturas()
  }, [])

  const cargarFacturas = async () => {
    try {
      setLoading(true)
      const response = await getFacturas()
      setFacturas(response.data)
    } catch (err) {
      setError('Error al cargar las facturas')
    } finally {
      setLoading(false)
    }
  }

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar esta factura?')) return
    try {
      await deleteFactura(id)
      cargarFacturas()
    } catch (err) {
      setError('Error al eliminar la factura')
    }
  }

  if (loading) return <p style={{ padding: '2rem' }}>Cargando facturas...</p>
  if (error) return <p style={{ padding: '2rem', color: 'red' }}>{error}</p>

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Facturas</h2>
        <button
          onClick={() => navigate('/facturas/nueva')}
          style={{ backgroundColor: '#00d4ff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          + Nueva Factura
        </button>
      </div>

      {facturas.length === 0 ? (
        <p>No hay facturas registradas.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#1a1a2e', color: 'white' }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Cliente</th>
              <th style={thStyle}>Emisor</th>
              <th style={thStyle}>Fecha</th>
              <th style={thStyle}>Total</th>
              <th style={thStyle}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {facturas.map((factura) => (
              <tr key={factura.idFactura} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={tdStyle}>{factura.idFactura}</td>
                <td style={tdStyle}>{factura.nombreCliente}</td>
                <td style={tdStyle}>{factura.razonSocial}</td>
                <td style={tdStyle}>{new Date(factura.fechaFactura).toLocaleDateString()}</td>
                <td style={tdStyle}>${factura.totalFactura.toLocaleString()}</td>
                <td style={tdStyle}>
                  <button
                    onClick={() => navigate(`/facturas/resumen/${factura.idFactura}`)}
                    style={btnVerStyle}
                  >
                    Ver
                  </button>
                  <button
                    onClick={() => navigate(`/facturas/editar/${factura.idFactura}`)}
                    style={btnEditarStyle}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminar(factura.idFactura)}
                    style={btnEliminarStyle}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

const thStyle = { padding: '0.75rem 1rem', textAlign: 'left' }
const tdStyle = { padding: '0.75rem 1rem' }
const btnVerStyle = { backgroundColor: '#00d4ff', border: 'none', padding: '0.3rem 0.7rem', borderRadius: '4px', cursor: 'pointer', marginRight: '0.5rem' }
const btnEditarStyle = { backgroundColor: '#ffa500', border: 'none', padding: '0.3rem 0.7rem', borderRadius: '4px', cursor: 'pointer', marginRight: '0.5rem' }
const btnEliminarStyle = { backgroundColor: '#ff4444', border: 'none', padding: '0.3rem 0.7rem', borderRadius: '4px', cursor: 'pointer', color: 'white' }

export default ListaFacturas