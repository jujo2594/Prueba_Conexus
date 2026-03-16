import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getClientes, deleteCliente } from '../../services/clienteService'
import '../../App.css'

const ListaClientes = () => {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    cargarClientes()
  }, [])

  const cargarClientes = async () => {
    try {
      setLoading(true)
      const response = await getClientes()
      setClientes(response.data)
    } catch {
      setError('No se pudieron cargar los clientes.')
    } finally {
      setLoading(false)
    }
  }

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar este cliente?')) return
    try {
      await deleteCliente(id)
      cargarClientes()
    } catch {
      setError('Error al eliminar el cliente.')
    }
  }

  if (loading) return (
    <div className="page-wide">
      <div className="state-box">
        <div className="spinner" />
        <p className="state-text">Cargando clientes...</p>
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

  return (
    <div className="page-wide">
      <div className="page-header">
        <div>
          <h2 className="page-title">Clientes</h2>
          <p className="page-subtitle">{clientes.length} registro{clientes.length !== 1 ? 's' : ''}</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/clientes/nuevo')}
        >
          + Nuevo Cliente
        </button>
      </div>

      {clientes.length === 0 ? (
        <div className="state-box">
          <p className="state-text">No hay clientes registrados aún.</p>
          <button className="btn btn-primary" onClick={() => navigate('/clientes/nuevo')}>
            Crear primer cliente
          </button>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Identificación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.idCliente}>
                  <td style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
                    #{cliente.idCliente}
                  </td>
                  <td style={{ fontWeight: 500 }}>{cliente.nombres}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{cliente.apellidos}</td>
                  <td>
                    <span style={{
                      background: 'var(--accent-dim)',
                      border: '1px solid var(--accent-border)',
                      color: 'var(--accent)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      fontVariantNumeric: 'tabular-nums'
                    }}>
                      {cliente.identificacion}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => navigate(`/clientes/editar/${cliente.idCliente}`)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleEliminar(cliente.idCliente)}
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

export default ListaClientes
