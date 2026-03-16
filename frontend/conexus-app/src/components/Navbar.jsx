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

      {/* Links */}
      <div style={linksStyle}>
        <NavLink to="/"          label="Facturas"   active={isActive('/')} />
        <NavLink to="/clientes"  label="Clientes"   active={isActive('/clientes')} />
        <NavLink to="/productos" label="Productos"  active={isActive('/productos')} />
        <NavLink to="/dashboard" label="Dashboard"  active={isActive('/dashboard')} />
      </div>

    </nav>
  )
}

const NavLink = ({ to, label, icon, active }) => (
  <Link to={to} style={active ? activeLinkStyle : linkStyle}>
    <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>{icon}</span>
    {label}
    {active && <span style={activeDotStyle} />}
  </Link>
)

/* Estilos */
const navStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.92)',
  backdropFilter: 'blur(12px)',
  borderBottom: '1px solid #DDE0EF',
  padding: '0 2.5rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.25rem',
  height: '60px',
  position: 'sticky',
  top: 0,
  zIndex: 100,
  boxShadow: '0 1px 8px rgba(15, 23, 42, 0.06)',
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
  backgroundColor: '#4F6BF4',
  boxShadow: '0 0 8px rgba(79, 107, 244, 0.5)',
}

const logoTextStyle = {
  color: '#0F172A',
  fontWeight: '700',
  fontSize: '1rem',
  letterSpacing: '-0.02em',
}

const logoSubStyle = {
  color: '#4F6BF4',
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
  color: '#64748B',
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
  color: '#4F6BF4',
  background: 'rgba(79, 107, 244, 0.08)',
}

const activeDotStyle = {
  position: 'absolute',
  bottom: '-1px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '16px',
  height: '2px',
  borderRadius: '1px',
  backgroundColor: '#4F6BF4',
}

const quickBtnStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0.35rem 0.9rem',
  background: '#4F6BF4',
  color: '#FFFFFF',
  fontWeight: '600',
  fontSize: '0.82rem',
  borderRadius: '6px',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  boxShadow: '0 2px 8px rgba(79, 107, 244, 0.3)',
  transition: 'background 0.15s',
}

export default Navbar