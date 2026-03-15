import { useState, useEffect } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { getDashboard } from '../../services/facturaService'

const COLORS = ['#00d4ff', '#ffa500', '#00c853', '#ff4444', '#9c27b0', '#ff9800']

const Dashboard = () => {
  const [datos, setDatos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setLoading(true)
      const response = await getDashboard()
      setDatos(response.data)
    } catch (err) {
      setError('Error al cargar el dashboard')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <p style={{ padding: '2rem' }}>Cargando dashboard...</p>
  if (error) return <p style={{ padding: '2rem', color: 'red' }}>{error}</p>

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '2rem' }}>Dashboard — Ventas por Producto</h2>

      {datos.length === 0 ? (
        <p>No hay datos de ventas disponibles.</p>
      ) : (
        <>
          {/* Gráfica de torta */}
          <div style={{ backgroundColor: '#1a1a2e', borderRadius: '8px', padding: '2rem', marginBottom: '2rem' }}>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={datos}
                  dataKey="totalVentas"
                  nameKey="nombreProducto"
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  label={({ nombreProducto, porcentaje }) =>
                    `${nombreProducto}: ${porcentaje}%`
                  }
                >
                  {datos.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Total Ventas']}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Tabla de resumen */}
          <h3 style={{ marginBottom: '1rem' }}>Resumen de Ventas</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#1a1a2e', color: 'white' }}>
                <th style={thStyle}>Producto</th>
                <th style={thStyle}>Total Ventas</th>
                <th style={thStyle}>Porcentaje</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #333' }}>
                  <td style={tdStyle}>
                    <span style={{
                      display: 'inline-block',
                      width: '12px',
                      height: '12px',
                      backgroundColor: COLORS[index % COLORS.length],
                      borderRadius: '50%',
                      marginRight: '0.5rem'
                    }} />
                    {item.nombreProducto}
                  </td>
                  <td style={tdStyle}>${item.totalVentas.toLocaleString()}</td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{
                        height: '8px',
                        width: `${item.porcentaje}%`,
                        backgroundColor: COLORS[index % COLORS.length],
                        borderRadius: '4px',
                        maxWidth: '200px'
                      }} />
                      {item.porcentaje}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}

const thStyle = { padding: '0.75rem 1rem', textAlign: 'left' }
const tdStyle = { padding: '0.75rem 1rem', color: 'white' }

export default Dashboard