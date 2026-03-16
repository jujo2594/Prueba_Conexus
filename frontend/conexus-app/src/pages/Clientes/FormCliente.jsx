import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getClienteById, createCliente, updateCliente } from '../../services/clienteService'
import '../../App.css'

const FormCliente = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const [cliente, setCliente] = useState({
    nombres: '',
    apellidos: '',
    identificacion: ''
  })

  useEffect(() => {
    if (isEditing) cargarCliente()
  }, [id])

  const cargarCliente = async () => {
    try {
      setLoading(true)
      const response = await getClienteById(id)
      const c = response.data
      setCliente({
        nombres: c.nombres,
        apellidos: c.apellidos,
        identificacion: c.identificacion
      })
    } catch {
      setError('Error al cargar el cliente.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!cliente.nombres.trim() || !cliente.apellidos.trim() || !cliente.identificacion.trim()) {
      setError('Todos los campos son obligatorios.')
      return
    }
    try {
      setSaving(true)
      setError(null)
      if (isEditing) {
        await updateCliente(id, cliente)
      } else {
        await createCliente(cliente)
      }
      navigate('/clientes')
    } catch {
      setError('Error al guardar el cliente.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="page">
      <div className="state-box">
        <div className="spinner" />
        <p className="state-text">Cargando cliente...</p>
      </div>
    </div>
  )

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">{isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
          <p className="page-subtitle">
            {isEditing ? `Modificando cliente #${id}` : 'Complete los datos del nuevo cliente'}
          </p>
        </div>
        <button className="btn btn-ghost" onClick={() => navigate('/clientes')}>
          ← Volver
        </button>
      </div>

      {/* Error */}
      {error && (
        <div style={{
          background: 'var(--red-dim)',
          border: '1px solid rgba(239,68,68,0.2)',
          borderRadius: 'var(--radius-md)',
          padding: '0.75rem 1rem',
          color: 'var(--red)',
          marginBottom: '1.5rem',
          fontSize: '0.9rem'
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Formulario */}
      <div className="form-section">
        <p className="form-section-title">Información del Cliente</p>
        <div className="form-grid-2" style={{ marginBottom: '1rem' }}>
          <div className="form-group">
            <label className="form-label">Nombres</label>
            <input
              type="text"
              name="nombres"
              className="form-input"
              placeholder="Ej: Juan José"
              value={cliente.nombres}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Apellidos</label>
            <input
              type="text"
              name="apellidos"
              className="form-input"
              placeholder="Ej: Galan Pérez"
              value={cliente.apellidos}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Identificación</label>
          <input
            type="text"
            name="identificacion"
            className="form-input"
            placeholder="Ej: 1098765432"
            value={cliente.identificacion}
            onChange={handleChange}
            style={{ maxWidth: '320px' }}
          />
        </div>
      </div>

      {/* Botones */}
      <div className="btn-group">
        <button
          className="btn btn-success btn-lg"
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving ? 'Guardando...' : isEditing ? '✓ Actualizar Cliente' : '✓ Crear Cliente'}
        </button>
        <button className="btn btn-ghost" onClick={() => navigate('/clientes')}>
          Cancelar
        </button>
      </div>
    </div>
  )
}

export default FormCliente
