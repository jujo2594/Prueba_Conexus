import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getFacturaById, createFactura, updateFactura } from '../../services/facturaService'
import { getClientes } from '../../services/clienteService'
import { getEmisores } from '../../services/emisorService'
import { getProductos } from '../../services/productoService'

const FormFactura = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id

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

  const [nuevoDetalle, setNuevoDetalle] = useState({
    idProducto: '',
    cantidad: 1,
    precioUnitario: 0,
    subtotal: 0,
    total: 0
  })

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setLoading(true)
      const [clientesRes, emisoresRes, productosRes] = await Promise.all([
        getClientes(),
        getEmisores(),
        getProductos()
      ])
      setClientes(clientesRes.data)
      setEmisores(emisoresRes.data)
      setProductos(productosRes.data)

      if (isEditing) {
        const facturaRes = await getFacturaById(id)
        const f = facturaRes.data
        setFactura({
          idFactura: f.idFactura,
          idCliente: f.idCliente,
          idEmisor: f.idEmisor,
          detalles: f.detalles || []
        })
      }
    } catch (err) {
      setError('Error al cargar los datos')
    } finally {
      setLoading(false)
    }
  }

  const handleProductoChange = (idProducto) => {
    const producto = productos.find(p => p.idProducto === parseInt(idProducto))
    if (producto) {
      const subtotal = nuevoDetalle.cantidad * producto.precioBase
      setNuevoDetalle({
        idProducto: producto.idProducto,
        cantidad: nuevoDetalle.cantidad,
        precioUnitario: producto.precioBase,
        subtotal: subtotal,
        total: subtotal
      })
    }
  }

  const handleCantidadChange = (cantidad) => {
    const cantidadNum = parseInt(cantidad) || 1
    const subtotal = cantidadNum * nuevoDetalle.precioUnitario
    setNuevoDetalle({
      ...nuevoDetalle,
      cantidad: cantidadNum,
      subtotal: subtotal,
      total: subtotal
    })
  }

  const agregarDetalle = () => {
    if (!nuevoDetalle.idProducto) {
        alert('Seleccione un producto')
        return
    }

    // ✅ Verificar si el producto ya está en la lista
    const yaExiste = factura.detalles.some(
        d => d.idProducto === nuevoDetalle.idProducto
    )
    if (yaExiste) {
        alert('Este producto ya está agregado. Modifica la cantidad en su lugar.')
        return
    }

    const producto = productos.find(p => p.idProducto === nuevoDetalle.idProducto)
    const detalleConNombre = {
        ...nuevoDetalle,
        idFactura: id ? parseInt(id) : 0,
        nombreProducto: producto?.nombreProducto || ''
    }
    setFactura({
        ...factura,
        detalles: [...factura.detalles, detalleConNombre]
    })
    setNuevoDetalle({
        idProducto: '',
        cantidad: 1,
        precioUnitario: 0,
        subtotal: 0,
        total: 0
    })
}

  const eliminarDetalle = (index) => {
    const nuevosDetalles = factura.detalles.filter((_, i) => i !== index)
    setFactura({ ...factura, detalles: nuevosDetalles })
  }

  const calcularTotal = () => {
    return factura.detalles.reduce((acc, d) => acc + d.total, 0)
  }

  const handleSubmit = async () => {
    if (!factura.idCliente || !factura.idEmisor) {
      alert('Seleccione cliente y emisor')
      return
    }
    if (factura.detalles.length === 0) {
      alert('Agregue al menos un producto')
      return
    }
    try {
      const facturaData = {
        ...factura,
        idCliente: parseInt(factura.idCliente),
        idEmisor: parseInt(factura.idEmisor),
        totalFactura: calcularTotal()
      }
      if (isEditing) {
        await updateFactura(id, facturaData)
      } else {
        await createFactura(facturaData)
      }
      navigate('/')
    } catch (err) {
      setError('Error al guardar la factura')
    }
  }

  if (loading) return <p style={{ padding: '2rem' }}>Cargando...</p>
  if (error) return <p style={{ padding: '2rem', color: 'red' }}>{error}</p>

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>{isEditing ? 'Editar Factura' : 'Nueva Factura'}</h2>
        <button
          onClick={() => navigate('/')}
          style={btnGrisStyle}
        >
          ← Volver
        </button>
      </div>

      {/* Dropdowns Cliente y Emisor */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <label style={labelStyle}>Cliente</label>
          <select
            value={factura.idCliente}
            onChange={(e) => setFactura({ ...factura, idCliente: e.target.value })}
            style={selectStyle}
          >
            <option value="">Seleccione un cliente</option>
            {clientes.map(c => (
              <option key={c.idCliente} value={c.idCliente}>
                {c.nombres} {c.apellidos} - {c.identificacion}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Emisor</label>
          <select
            value={factura.idEmisor}
            onChange={(e) => setFactura({ ...factura, idEmisor: e.target.value })}
            style={selectStyle}
          >
            <option value="">Seleccione un emisor</option>
            {emisores.map(e => (
              <option key={e.idEmisor} value={e.idEmisor}>
                {e.razonSocial} - {e.identificacion}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Agregar producto */}
      <h3 style={{ marginBottom: '1rem' }}>Agregar Producto</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '1rem', marginBottom: '1rem', alignItems: 'end' }}>
        <div>
          <label style={labelStyle}>Producto</label>
          <select
            value={nuevoDetalle.idProducto}
            onChange={(e) => handleProductoChange(e.target.value)}
            style={selectStyle}
          >
            <option value="">Seleccione un producto</option>
            {productos.map(p => (
              <option key={p.idProducto} value={p.idProducto}>
                {p.nombreProducto} - ${p.precioBase.toLocaleString()}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Cantidad</label>
          <input
            type="number"
            min="1"
            value={nuevoDetalle.cantidad}
            onChange={(e) => handleCantidadChange(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>Subtotal</label>
          <input
            type="text"
            value={`$${nuevoDetalle.subtotal.toLocaleString()}`}
            disabled
            style={{ ...inputStyle, backgroundColor: '#333' }}
          />
        </div>
        <button
          onClick={agregarDetalle}
          style={btnAzulStyle}
        >
          + Agregar
        </button>
      </div>

      {/* Tabla de detalles */}
      {factura.detalles.length > 0 && (
        <>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#1a1a2e', color: 'white' }}>
                <th style={thStyle}>Producto</th>
                <th style={thStyle}>Cantidad</th>
                <th style={thStyle}>Precio Unit.</th>
                <th style={thStyle}>Total</th>
                <th style={thStyle}>Acción</th>
              </tr>
            </thead>
            <tbody>
              {factura.detalles.map((detalle, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={tdStyle}>{detalle.nombreProducto}</td>
                  <td style={tdStyle}>{detalle.cantidad}</td>
                  <td style={tdStyle}>${detalle.precioUnitario.toLocaleString()}</td>
                  <td style={tdStyle}>${detalle.total.toLocaleString()}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => eliminarDetalle(index)}
                      style={btnRojoStyle}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ backgroundColor: '#1a1a2e', color: 'white' }}>
                <td colSpan="3" style={{ ...tdStyle, textAlign: 'right', fontWeight: 'bold' }}>Total:</td>
                <td colSpan="2" style={{ ...tdStyle, fontWeight: 'bold' }}>${calcularTotal().toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </>
      )}

      {/* Botón guardar */}
      <button
        onClick={handleSubmit}
        style={btnVerdeStyle}
      >
        {isEditing ? 'Actualizar Factura' : 'Crear Factura'}
      </button>
    </div>
  )
}

const labelStyle = { display: 'block', marginBottom: '0.3rem', color: '#aaa', fontSize: '0.9rem' }
const selectStyle = { width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#222', color: 'white' }
const inputStyle = { width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#222', color: 'white' }
const thStyle = { padding: '0.75rem 1rem', textAlign: 'left' }
const tdStyle = { padding: '0.75rem 1rem' }
const btnAzulStyle = { backgroundColor: '#00d4ff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', height: '36px' }
const btnRojoStyle = { backgroundColor: '#ff4444', border: 'none', padding: '0.3rem 0.7rem', borderRadius: '4px', cursor: 'pointer', color: 'white' }
const btnVerdeStyle = { backgroundColor: '#00c853', border: 'none', padding: '0.7rem 2rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', marginTop: '1rem' }
const btnGrisStyle = { backgroundColor: '#555', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', color: 'white' }

export default FormFactura