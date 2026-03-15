import { Link, useLocation } from 'react-router-dom'

/* useLocation funciona para obtener la ruta actual, de manera que con el pathname podemos ir actualizando la URL*/ 

const Navbar = () => {
  const { pathname } = useLocation()
  const isActive = (path) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname.startsWith(path)) return true
    return false
  }

  return (
    <nav style={navStyle}>

      <div style={logoContainerStyle}>
        <span style={logoTextStyle}>Conexus</span>
        <span style={logoSubStyle}>IT</span>
      </div>

      <div style={linksStyle}>
        <NavLink to="/" label="Facturas" active={isActive('/')} />
        <NavLink to="/facturas/nueva" label="Nueva Factura" active={isActive('/facturas/nueva')} />
        <NavLink to="/dashboard" label="Dashboard"  active={isActive('/dashboard')} />
      </div>
    </nav>
  )
}


/* Componente NavLink: Permite añadir campos a mi Navbar de manera escalable */
const NavLink = ({ to, label, active }) => (
  <Link to={to} style={active ? activeLinkStyle : linkStyle}>
    <span style={{ fontSize: '0.85rem', opacity: 0.7 }}></span>
    {label}
    {active && <span style={activeDotStyle} />}
  </Link>
)

/* Estilos de la barra de navegacion */
const navStyle = {
  backgroundColor: 'rgba(13, 17, 23, 0.95)',
  backdropFilter: 'blur(12px)',
  borderBottom: '1px solid #1e2d40',
  padding: '0 2.5rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  height: '60px',
  position: 'sticky',
  top: 0,
  zIndex: 100,
}

const logoContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginRight: '1.5rem',
}


const logoTextStyle = {
  color: '#e2e8f0',
  fontWeight: '700',
  fontSize: '1rem',
  letterSpacing: '-0.02em',
}

const logoSubStyle = {
  color: '#00d4ff',
  fontWeight: '700',
  fontSize: '1rem',
}

const linksStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
}

const linkStyle = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
  color: '#64748b',
  textDecoration: 'none',
  fontSize: '0.875rem',
  fontWeight: '500',
  padding: '0.35rem 0.75rem',
  borderRadius: '6px',
  transition: 'color 0.15s, background 0.15s',
}

const activeLinkStyle = {
  ...linkStyle,
  color: '#00d4ff',
  background: 'rgba(0, 212, 255, 0.08)',
}

/* Esta clase es para la animacion de la linea activa cuando selecciono un item de mi barra de navegacion */

const activeDotStyle = {
  position: 'absolute',
  bottom: '-1px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '16px',
  height: '2px',
  borderRadius: '1px',
  backgroundColor: '#00d4ff',
}

export default Navbar
