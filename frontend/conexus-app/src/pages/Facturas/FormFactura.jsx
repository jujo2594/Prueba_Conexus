import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getFacturaById, createFactura, updateFactura } from '../../services/facturaService'
import { getClientes } from '../../services/clienteService'
import { getEmisores } from '../../services/emisorService'
import { getProductos } from '../../services/productoService'
import '../../App.css'

/* Detectar si va a haber edicion o creacion */

const FormFactura = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

/* Definir los estados, hay estados externos que vienen de la API y estados del formulario relacionados a lo que se esta contruyendo o editando */

  const [clientes, setClientes] = useState([])
  const [emisores, setEmisores] = useState([])
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [factura, setFactura] = useState({
    idCliente: '',
    idEmisor: '',
    detalles: []
  })

  /* Solo existen en el formulario de creación, una vez se ha agregado a la factura, este se resetea */

  const [nuevoDetalle, setNuevoDetalle] = useState({
    idProducto: '',
    cantidad: 1,
    precioUnitario: 0,
    subtotal: 0,
    total: 0
  })

  useEffect(() => { cargarDatos() }, [])

  /* Cargar los datos necesarios para el formulario. El promise all, lanza 3 peticiones al tiempo */

  const cargarDatos = async () => {
    try {
      setLoading(true)
      const [clientesRes, emisoresRes, productosRes] = await Promise.all([
        getClientes(), getEmisores(), getProductos()
      ])
      setClientes(clientesRes.data)
      setEmisores(emisoresRes.data)
      setProductos(productosRes.data)

      if (isEditing) {
        const facturaRes = await getFacturaById(id)
        const f = facturaRes.data
        setFactura({ idFactura: f.idFactura, idCliente: f.idCliente, idEmisor: f.idEmisor, detalles: f.detalles || [] })
      }
    } catch {
      setError('Error al cargar los datos.')
    } finally {
      setLoading(false)
    }
  }

/* Permite calcular los precios automaticamente */

  const handleProductoChange = (idProducto) => {
    const producto = productos.find(p => p.idProducto === parseInt(idProducto))
    if (producto) {
      const subtotal = nuevoDetalle.cantidad * producto.precioBase
      setNuevoDetalle({ idProducto: producto.idProducto, cantidad: nuevoDetalle.cantidad, precioUnitario: producto.precioBase, subtotal, total: subtotal })
    }
  }

/* Recalcular al cambiar la cantidad, Cada que el usuario modifica la cantidad recalcula el subtotal */

  const handleCantidadChange = (cantidad) => {
    const cantidadNum = parseInt(cantidad) || 1
    const subtotal = cantidadNum * nuevoDetalle.precioUnitario
    setNuevoDetalle({ ...nuevoDetalle, cantidad: cantidadNum, subtotal, total: subtotal })
  }

  /* Agregar producto a la factura, Validamos primero si el producto ya esta agregado, sino agrega ese nuevo producto al array */ 

  const agregarDetalle = () => {
    if (!nuevoDetalle.idProducto) { alert('Seleccione un producto'); return }
    const yaExiste = factura.detalles.some(d => d.idProducto === nuevoDetalle.idProducto)
    if (yaExiste) { alert('Este producto ya está agregado. Modifica la cantidad en su lugar.'); return }
    const producto = productos.find(p => p.idProducto === nuevoDetalle.idProducto)
    setFactura({
      ...factura,
      detalles: [...factura.detalles, {
        ...nuevoDetalle,
        idFactura: id ? parseInt(id) : 0,
        nombreProducto: producto?.nombreProducto || ''
      }]
    })
    setNuevoDetalle({ idProducto: '', cantidad: 1, precioUnitario: 0, subtotal: 0, total: 0 })
  }

  const eliminarDetalle = (index) => {
    setFactura({ ...factura, detalles: factura.detalles.filter((_, i) => i !== index) })
  }

  /* Permite recorrer el array de detalles y calcular el total */

  const calcularTotal = () => factura.detalles.reduce((acc, d) => acc + d.total, 0)

  const handleSubmit = async () => {
    if (!factura.idCliente || !factura.idEmisor) { alert('Seleccione cliente y emisor'); return }
    if (factura.detalles.length === 0) { alert('Agregue al menos un producto'); return }
    try {
      const facturaData = {
        ...factura,
        idCliente: parseInt(factura.idCliente),
        idEmisor: parseInt(factura.idEmisor),
        totalFactura: calcularTotal()
      }
      if (isEditing) { await updateFactura(id, facturaData) }
      else { await createFactura(facturaData) }
      navigate('/')
    } catch {
      setError('Error al guardar la factura.')
    }
  }

  if (loading) return (
    <div className="page">
      <div className="state-box">
        <div className="spinner" />
        <p className="state-text">Cargando...</p>
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

  return (
    <div className="page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h2 className="page-title">{isEditing ? 'Editar Factura' : 'Nueva Factura'}</h2>
          <p className="page-subtitle">{isEditing ? `Modificando factura #${id}` : 'Complete los datos para crear una nueva factura'}</p>
        </div>
        <button className="btn btn-ghost" onClick={() => navigate('/')}>
          ← Volver
        </button>
      </div>

      {/* Cliente + Emisor */}

      <div className="form-section">
        <p className="form-section-title">Información General</p>
        <div className="form-grid-2">
          <div className="form-group">
            <label className="form-label">Cliente</label>
            <select
              className="form-select"
              value={factura.idCliente}
              onChange={(e) => setFactura({ ...factura, idCliente: e.target.value })}
            >
              <option value="">— Seleccione un cliente —</option>
              {clientes.map(c => (
                <option key={c.idCliente} value={c.idCliente}>
                  {c.nombres} {c.apellidos} · {c.identificacion}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Emisor</label>
            <select
              className="form-select"
              value={factura.idEmisor}
              onChange={(e) => setFactura({ ...factura, idEmisor: e.target.value })}
            >
              <option value="">— Seleccione un emisor —</option>
              {emisores.map(e => (
                <option key={e.idEmisor} value={e.idEmisor}>
                  {e.razonSocial} · {e.identificacion}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Agregar producto */}

      <div className="form-section">
        <p className="form-section-title">Agregar Producto</p>
        <div className="form-grid-4">
          <div className="form-group">
            <label className="form-label">Producto</label>
            <select
              className="form-select"
              value={nuevoDetalle.idProducto}
              onChange={(e) => handleProductoChange(e.target.value)}
            >
              <option value="">— Seleccione un producto —</option>
              {productos.map(p => (
                <option key={p.idProducto} value={p.idProducto}>
                  {p.nombreProducto} · ${p.precioBase.toLocaleString()}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Cantidad</label>
            <input
              type="number"
              min="1"
              className="form-input"
              value={nuevoDetalle.cantidad}
              onChange={(e) => handleCantidadChange(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Subtotal</label>
            <input
              type="text"
              className="form-input"
              value={nuevoDetalle.subtotal > 0 ? `$${nuevoDetalle.subtotal.toLocaleString()}` : '—'}
              disabled
            />
          </div>
          <button className="btn btn-primary" onClick={agregarDetalle}>
            + Agregar
          </button>
        </div>
      </div>

      {/* Tabla de detalles */}

      {factura.detalles.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <p className="section-heading">Productos agregados</p>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unit.</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {factura.detalles.map((detalle, index) => (
                  <tr key={index}>
                    <td style={{ fontWeight: 500 }}>{detalle.nombreProducto}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{detalle.cantidad}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>${detalle.precioUnitario.toLocaleString()}</td>
                    <td style={{ color: 'var(--accent)', fontWeight: 700 }}>${detalle.total.toLocaleString()}</td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={() => eliminarDetalle(index)}>
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="total-highlight">
            <span className="total-highlight-label">Total Factura</span>
            <span className="total-highlight-value">${calcularTotal().toLocaleString()}</span>
          </div>
        </div>
      )}

      {/* Guardar */}

      <button className="btn btn-success btn-lg" onClick={handleSubmit}>
        {isEditing ? ' Actualizar Factura' : ' Crear Factura'}
      </button>
    </div>
  )
}

export default FormFactura
