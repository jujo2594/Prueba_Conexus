import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getFacturaById } from '../../services/facturaService'
import '../../App.css'

/* Logica de carga  */

const ResumenFactura = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [factura, setFactura] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => { cargarFactura() }, [id])

  const cargarFactura = async () => {
    try {
      setLoading(true)
      const response = await getFacturaById(id)
      setFactura(response.data)
    } catch {
      setError('Error al cargar la factura.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div className="page">
      <div className="state-box">
        <div className="spinner" />
        <p className="state-text">Cargando factura...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="page">
      <div className="state-box state-error">
        <p className="state-text">{error}</p>
      </div>
    </div>
  )

  if (!factura) return (
    <div className="page">
      <div className="state-box">
        <p className="state-text">Factura no encontrada.</p>
      </div>
    </div>
  )

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">Factura #{factura.idFactura}</h2>
          <p className="page-subtitle">
            Emitida el {new Date(factura.fechaFactura).toLocaleDateString('es-CO', {
              day: '2-digit', month: 'long', year: 'numeric'
            })}
          </p>
        </div>
        <button className="btn btn-ghost" onClick={() => navigate('/')}>
          ← Volver
        </button>
      </div>

      {/* Info cards */}
      <div className="card-grid-2">
        <div className="card">
          <p className="card-label">Cliente</p>
          <p className="card-value">{factura.nombreCliente}</p>
        </div>
        <div className="card">
          <p className="card-label">Emisor</p>
          <p className="card-value">{factura.razonSocial}</p>
        </div>
        <div className="card">
          <p className="card-label">Fecha</p>
          <p className="card-value">
            {new Date(factura.fechaFactura).toLocaleDateString('es-CO', {
              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
            })}
          </p>
        </div>
        <div className="card" style={{ borderColor: 'var(--accent-border)', background: 'var(--accent-dim)' }}>
          <p className="card-label">Total Factura</p>
          <p className="card-value" style={{ fontSize: '1.5rem', color: 'var(--accent)' }}>
            ${factura.totalFactura.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Productos */}
      <p className="section-heading">Productos</p>
      <div className="table-wrapper" style={{ marginBottom: '2rem' }}>
        <table className="table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unit.</th>
              <th>Subtotal</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {factura.detalles?.map((detalle) => (
              <tr key={detalle.idDetalleFactura}>
                <td style={{ fontWeight: 500 }}>{detalle.nombreProducto}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{detalle.cantidad}</td>
                <td style={{ color: 'var(--text-secondary)' }}>${detalle.precioUnitario.toLocaleString()}</td>
                <td style={{ color: 'var(--text-secondary)' }}>${detalle.subtotal.toLocaleString()}</td>
                <td style={{ fontWeight: 700 }}>${detalle.total.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" className="table-total-label">Total Factura:</td>
              <td style={{ color: 'var(--accent)' }}>${factura.totalFactura.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Actions */}
      <div className="btn-group">
        <button
          className="btn btn-warning"
          onClick={() => navigate(`/facturas/editar/${factura.idFactura}`)}
        >
           Editar Factura
        </button>
        <button className="btn btn-ghost" onClick={() => navigate('/')}>
          ← Volver a Lista
        </button>
      </div>
    </div>
  )
}

export default ResumenFactura
