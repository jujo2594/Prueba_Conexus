import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductoById, createProducto, updateProducto } from '../../services/productoService'
import '../../App.css'

const FormProducto = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const [producto, setProducto] = useState({
    nombreProducto: '',
    precioBase: ''
  })

  useEffect(() => {
    if (isEditing) cargarProducto()
  }, [id])

  const cargarProducto = async () => {
    try {
      setLoading(true)
      const response = await getProductoById(id)
      const p = response.data
      setProducto({
        nombreProducto: p.nombreProducto,
        precioBase: p.precioBase
      })
    } catch {
      setError('Error al cargar el producto.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!producto.nombreProducto.trim()) {
      setError('El nombre del producto es obligatorio.')
      return
    }
    if (!producto.precioBase || parseFloat(producto.precioBase) <= 0) {
      setError('El precio base debe ser mayor a 0.')
      return
    }
    try {
      setSaving(true)
      setError(null)
      const productoData = {
        ...producto,
        precioBase: parseFloat(producto.precioBase)
      }
      if (isEditing) {
        await updateProducto(id, productoData)
      } else {
        await createProducto(productoData)
      }
      navigate('/productos')
    } catch {
      setError('Error al guardar el producto.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="page">
      <div className="state-box">
        <div className="spinner" />
        <p className="state-text">Cargando producto...</p>
      </div>
    </div>
  )

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h2 className="page-title">{isEditing ? 'Editar Producto' : 'Nuevo Producto'}</h2>
          <p className="page-subtitle">
            {isEditing ? `Modificando producto #${id}` : 'Complete los datos del nuevo producto'}
          </p>
        </div>
        <button className="btn btn-ghost" onClick={() => navigate('/productos')}>
          ← Volver
        </button>
      </div>

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
        </div>
      )}

      <div className="form-section">
        <p className="form-section-title">Información del Producto</p>
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label className="form-label">Nombre del Producto</label>
          <input
            type="text"
            name="nombreProducto"
            className="form-input"
            placeholder="Ej: Laptop Dell Inspiron"
            value={producto.nombreProducto}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Precio Base</label>
          <div style={{ position: 'relative', maxWidth: '280px' }}>
            <span style={{
              position: 'absolute',
              left: '0.9rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-secondary)',
              fontWeight: 600,
              pointerEvents: 'none'
            }}>
              $
            </span>
            <input
              type="number"
              name="precioBase"
              className="form-input"
              placeholder="0"
              min="0"
              step="0.01"
              value={producto.precioBase}
              onChange={handleChange}
              style={{ paddingLeft: '1.75rem' }}
            />
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>
            Ingresa el precio sin puntos ni comas. Ej: 1500000
          </p>
        </div>
      </div>

      {producto.precioBase > 0 && (
        <div style={{
          background: 'var(--accent-dim)',
          border: '1px solid var(--accent-border)',
          borderRadius: 'var(--radius-md)',
          padding: '0.9rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Vista previa del precio:</span>
          <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '1.1rem' }}>
            ${parseFloat(producto.precioBase).toLocaleString()}
          </span>
        </div>
      )}

      {/* Botones */}
      <div className="btn-group">
        <button
          className="btn btn-success btn-lg"
          onClick={handleSubmit}
          disabled={saving}
        >
          {saving ? 'Guardando...' : isEditing ? 'Actualizar Producto' : 'Crear Producto'}
        </button>
        <button className="btn btn-ghost" onClick={() => navigate('/productos')}>
          Cancelar
        </button>
      </div>
    </div>
  )
}

export default FormProducto
