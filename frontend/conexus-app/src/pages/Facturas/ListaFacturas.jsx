import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFacturas, deleteFactura } from '../../services/facturaService'
import '../../App.css'

/* Estados de react */

const ListaFacturas = () => {
  const [facturas, setFacturas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    cargarFacturas()
  }, [])

/* Se realiza la peticion a la API de manera asincrona */
  const cargarFacturas = async () => {
    try {
      setLoading(true)
      const response = await getFacturas()
      setFacturas(response.data)
    } catch {
      setError('No se pudieron cargar las facturas.')
    } finally {
      setLoading(false)
    }
  }

  /* La funcion que permite eliminar una factura, usando el dialogo del navegador para confirmar la eliminacion. 
  Llamando al servicio de eliminacion */

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar esta factura?')) return
    try {
      await deleteFactura(id)
      cargarFacturas()
    } catch {
      setError('Error al eliminar la factura.')
    }
  }


  /* Early returns: En caso de carga o de error devuelven una pantalla. La informacion de la tabla se ejecuta si todo es correcto */

  if (loading) return (
    <div className="page-wide">
      <div className="state-box">
        <div className="spinner" />
        <p className="state-text">Cargando facturas...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="page-wide">
      <div className="state-box state-error">
        <p className="state-text">{error}</p>
      </div>
    </div>
  )


   /* en el header, hay el manejo de plural en caso de que halla mas de una factura se agrega la "s" en "registros" */
  return (
    <div className="page-wide">
      <div className="page-header">
        <div>
          <h2 className="page-title">Facturas</h2>
          <p className="page-subtitle">{facturas.length} registro{facturas.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/facturas/nueva')}
        >
          + Nueva Factura
        </button>
      </div>

{/* Manejo del estado vacio, si no hay facturas registradas se muestra un mensaje. De lo contrario, se muestra la tabla */}

      {facturas.length === 0 ? (
        <div className="state-box">
          <p className="state-text">No hay facturas registradas aún.</p>
          <button className="btn btn-primary" onClick={() => navigate('/facturas/nueva')}>
            Crear primera factura
          </button>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Emisor</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>

{/* map permite recorrer el array de facturas y generar una fila para cada una */}

              {facturas.map((factura) => (
                <tr key={factura.idFactura}>
                  <td style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                    #{factura.idFactura}
                  </td>
                  <td style={{ fontWeight: 500 }}>{factura.nombreCliente}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{factura.razonSocial}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>
                    {new Date(factura.fechaFactura).toLocaleDateString('es-CO', {
                      day: '2-digit', month: 'short', year: 'numeric'
                    })}
                  </td>
                  <td>
                    <span style={{
                      color: 'var(--accent)',
                      fontWeight: 700,
                      fontVariantNumeric: 'tabular-nums'
                    }}>
                      ${factura.totalFactura.toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-ghost"
                        onClick={() => navigate(`/facturas/resumen/${factura.idFactura}`)}
                      >
                        Ver
                      </button>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => navigate(`/facturas/editar/${factura.idFactura}`)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleEliminar(factura.idFactura)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ListaFacturas
