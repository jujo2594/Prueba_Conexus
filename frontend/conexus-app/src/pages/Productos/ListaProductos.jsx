import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProductos, deleteProducto } from '../../services/productoService'
import '../../App.css'

const ListaProductos = () => {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    cargarProductos()
  }, [])

  const cargarProductos = async () => {
    try {
      setLoading(true)
      const response = await getProductos()
      setProductos(response.data)
    } catch {
      setError('No se pudieron cargar los productos.')
    } finally {
      setLoading(false)
    }
  }

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar este producto?')) return
    try {
      await deleteProducto(id)
      cargarProductos()
    } catch {
      setError('Error al eliminar el producto.')
    }
  }

  if (loading) return (
    <div className="page-wide">
      <div className="state-box">
        <div className="spinner" />
        <p className="state-text">Cargando productos...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="page-wide">
      <div className="state-box state-error">
        <span className="state-icon">⚠️</span>
        <p className="state-text">{error}</p>
      </div>
    </div>
  )

  return (
    <div className="page-wide">
      <div className="page-header">
        <div>
          <h2 className="page-title">Productos</h2>
          <p className="page-subtitle">{productos.length} registro{productos.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/productos/nuevo')}
        >
          + Nuevo Producto
        </button>
      </div>

      {productos.length === 0 ? (
        <div className="state-box">
          <span className="state-icon">📦</span>
          <p className="state-text">No hay productos registrados aún.</p>
          <button className="btn btn-primary" onClick={() => navigate('/productos/nuevo')}>
            Crear primer producto
          </button>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre del Producto</th>
                <th>Precio Base</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.idProducto}>
                  <td style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                    #{producto.idProducto}
                  </td>
                  <td style={{ fontWeight: 500 }}>{producto.nombreProducto}</td>
                  <td>
                    <span style={{
                      color: 'var(--accent)',
                      fontWeight: 700,
                      fontVariantNumeric: 'tabular-nums'
                    }}>
                      ${producto.precioBase.toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => navigate(`/productos/editar/${producto.idProducto}`)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleEliminar(producto.idProducto)}
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

export default ListaProductos
