import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getDashboard } from '../../services/facturaService'
import '../../App.css'

const COLORS = ['#00d4ff', '#10b981', '#f59e0b', '#ef4444', '#a855f7', '#f97316']

/* Tooltip personalizado */

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  return (
    <div style={{
      background: '#111827',
      border: '1px solid #1e2d40',
      borderRadius: 8,
      padding: '0.75rem 1rem',
      fontSize: '0.875rem'
    }}>
      <p style={{ color: '#e2e8f0', fontWeight: 600, marginBottom: 4 }}>{name}</p>
      <p style={{ color: '#00d4ff', fontWeight: 700 }}>${value.toLocaleString()}</p>
    </div>
  )
}

/* leyenda del grafico */

const CustomLegend = ({ payload }) => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem 1.25rem', justifyContent: 'center', marginTop: '1rem' }}>
    {payload.map((entry, i) => (
      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#64748b' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: entry.color, display: 'inline-block' }} />
        {entry.value}
      </div>
    ))}
  </div>
)

const Dashboard = () => {
  const [datos, setDatos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => { cargarDatos() }, [])

  const cargarDatos = async () => {
    try {
      setLoading(true)
      const response = await getDashboard()
      setDatos(response.data)
    } catch {
      setError('Error al cargar el dashboard.')
    } finally {
      setLoading(false)
    }
  }

  /* Suma todos lo totales de ventas  */

  const totalGeneral = datos.reduce((acc, d) => acc + d.totalVentas, 0)

  if (loading) return (
    <div className="page">
      <div className="state-box">
        <div className="spinner" />
        <p className="state-text">Cargando dashboard...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="page">
      <div className="state-box state-error">
        <span className="state-icon">⚠️</span>
        <p className="state-text">{error}</p>
      </div>
    </div>
  )

  return (
    <div className="page">

      {/* Header */}

      <div className="page-header">
        <div>
          <h2 className="page-title">Dashboard</h2>
          <p className="page-subtitle">Ventas por producto</p>
        </div>
        {totalGeneral > 0 && (
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Total General
            </p>
            <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)' }}>
              ${totalGeneral.toLocaleString()}
            </p>
          </div>
        )}
      </div>

      {datos.length === 0 ? (
        <div className="state-box">
          <span className="state-icon">📊</span>
          <p className="state-text">No hay datos de ventas disponibles.</p>
        </div>
      ) : (
        <>

          {/* Gráfica */}

          <div className="card" style={{ marginBottom: '1.5rem', padding: '2rem' }}>
            <ResponsiveContainer width="100%" height={360}>
              <PieChart>
                <Pie
                  data={datos}
                  dataKey="totalVentas"
                  nameKey="nombreProducto"
                  cx="50%"
                  cy="48%"
                  outerRadius={140}
                  innerRadius={55}
                  paddingAngle={2}
                  label={({ porcentaje }) => `${porcentaje}%`}
                  labelLine={{ stroke: '#1e2d40' }}
                >
                  {datos.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="transparent"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend content={<CustomLegend />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Tabla resumen */}
          
          <p className="section-heading">Resumen de Ventas</p>
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Total Ventas</th>
                  <th>Participación</th>
                </tr>
              </thead>
              <tbody>
                {datos.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span className="dot" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                        <span style={{ fontWeight: 500 }}>{item.nombreProducto}</span>
                      </div>
                    </td>
                    <td style={{ color: 'var(--accent)', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
                      ${item.totalVentas.toLocaleString()}
                    </td>
                    <td>
                      <div className="progress-row">
                        <div className="progress-track">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${item.porcentaje}%`,
                              backgroundColor: COLORS[index % COLORS.length]
                            }}
                          />
                        </div>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', minWidth: '38px' }}>
                          {item.porcentaje}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}

export default Dashboard
