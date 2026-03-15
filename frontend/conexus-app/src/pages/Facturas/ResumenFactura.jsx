import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getFacturaById } from '../../services/facturaService'

const ResumenFactura = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [factura, setFactura] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    cargarFactura()
  }, [id])

  const cargarFactura = async () => {
    try {
      setLoading(true)
      const response = await getFacturaById(id)
      setFactura(response.data)
    } catch (err) {
      setError('Error al cargar la factura')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p style={{ padding: '2rem' }}>Cargando...</p>
  if (error) return <p style={{ padding: '2rem', color: 'red' }}>{error}</p>
  if (!factura) return <p style={{ padding: '2rem' }}>Factura no encontrada</p>

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>

      {/* Encabezado */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h2>Resumen de Factura #{factura.idFactura}</h2>
        <button
          onClick={() => navigate('/')}
          style={{ backgroundColor: '#555', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', color: 'white' }}
        >
          ← Volver
        </button>
      </div>

      {/* Datos generales */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <div style={cardStyle}>
          <h4 style={{ color: '#00d4ff', marginBottom: '0.5rem' }}>Cliente</h4>
          <p>{factura.nombreCliente}</p>
        </div>
        <div style={cardStyle}>
          <h4 style={{ color: '#00d4ff', marginBottom: '0.5rem' }}>Emisor</h4>
          <p>{factura.razonSocial}</p>
        </div>
        <div style={cardStyle}>
          <h4 style={{ color: '#00d4ff', marginBottom: '0.5rem' }}>Fecha</h4>
          <p>{new Date(factura.fechaFactura).toLocaleDateString()}</p>
        </div>
        <div style={cardStyle}>
          <h4 style={{ color: '#00d4ff', marginBottom: '0.5rem' }}>Total</h4>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>${factura.totalFactura.toLocaleString()}</p>
        </div>
      </div>

      {/* Detalles */}
      <h3 style={{ marginBottom: '1rem' }}>Productos</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#1a1a2e', color: 'white' }}>
            <th style={thStyle}>Producto</th>
            <th style={thStyle}>Cantidad</th>
            <th style={thStyle}>Precio Unitario</th>
            <th style={thStyle}>Subtotal</th>
            <th style={thStyle}>Total</th>
          </tr>
        </thead>
        <tbody>
          {factura.detalles?.map((detalle) => (
            <tr key={detalle.idDetalleFactura} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={tdStyle}>{detalle.nombreProducto}</td>
              <td style={tdStyle}>{detalle.cantidad}</td>
              <td style={tdStyle}>${detalle.precioUnitario.toLocaleString()}</td>
              <td style={tdStyle}>${detalle.subtotal.toLocaleString()}</td>
              <td style={tdStyle}>${detalle.total.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr style={{ backgroundColor: '#1a1a2e', color: 'white' }}>
            <td colSpan="4" style={{ ...tdStyle, textAlign: 'right', fontWeight: 'bold' }}>Total Factura:</td>
            <td style={{ ...tdStyle, fontWeight: 'bold' }}>${factura.totalFactura.toLocaleString()}</td>
          </tr>
        </tfoot>
      </table>

      {/* Botones */}
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <button
          onClick={() => navigate(`/facturas/editar/${factura.idFactura}`)}
          style={{ backgroundColor: '#ffa500', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Editar Factura
        </button>
        <button
          onClick={() => navigate('/')}
          style={{ backgroundColor: '#555', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '4px', cursor: 'pointer', color: 'white' }}
        >
          Volver a Lista
        </button>
      </div>
    </div>
  )
}

const cardStyle = {
  backgroundColor: '#1a1a2e',
  padding: '1rem',
  borderRadius: '8px',
  color: 'white'
}
const thStyle = { padding: '0.75rem 1rem', textAlign: 'left' }
const tdStyle = { padding: '0.75rem 1rem' }

export default ResumenFactura