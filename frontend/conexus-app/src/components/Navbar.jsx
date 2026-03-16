import { Link, useLocation } from 'react-router-dom'

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
        <NavLink to="/"          label="Facturas"   active={isActive('/')} />
        <NavLink to="/clientes"  label="Clientes"   active={isActive('/clientes')} />
        <NavLink to="/productos" label="Productos"  active={isActive('/productos')} />
        <NavLink to="/dashboard" label="Dashboard" active={isActive('/dashboard')} />
      </div>

    </nav>
  )
}

const NavLink = ({ to, label, active }) => (
  <Link to={to} style={active ? activeLinkStyle : linkStyle}>
    <span style={{ fontSize: '0.85rem', opacity: 0.7 }}></span>
    {label}
    {active && <span style={activeDotStyle} />}
  </Link>
)

const navStyle = {
  backgroundColor: 'rgba(13, 17, 23, 0.95)',
  backdropFilter: 'blur(12px)',
  borderBottom: '1px solid #1e2d40',
  padding: '0 2.5rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
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
  flexShrink: 0,
}

const logoDotStyle = {
  width: '8px',
  height: '8px',
  borderRadius: '50%',
  backgroundColor: '#00d4ff',
  boxShadow: '0 0 8px rgba(0, 212, 255, 0.6)',
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
  gap: '0.25rem',
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
  whiteSpace: 'nowrap',
}

const activeLinkStyle = {
  ...linkStyle,
  color: '#00d4ff',
  background: 'rgba(0, 212, 255, 0.08)',
}

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

const quickBtnStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0.35rem 0.9rem',
  background: '#00d4ff',
  color: '#000',
  fontWeight: '600',
  fontSize: '0.82rem',
  borderRadius: '6px',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
}

export default Navbar
