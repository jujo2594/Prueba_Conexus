import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: '#1a1a2e',
      padding: '1rem 2rem',
      display: 'flex',
      gap: '2rem',
      alignItems: 'center'
    }}>
      <span style={{ color: '#00d4ff', fontWeight: 'bold', fontSize: '1.2rem' }}>
        Conexus-IT
      </span>
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
        Facturas
      </Link>
      <Link to="/facturas/nueva" style={{ color: 'white', textDecoration: 'none' }}>
        Nueva Factura
      </Link>
      <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>
        Dashboard
      </Link>
    </nav>
  )
}

export default Navbar