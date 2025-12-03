import { Link, useLocation } from 'react-router-dom'
import './Header.css'

function Header() {
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <header className="header">
      <nav className="nav">
        <Link 
          to="/" 
          className={`nav-button ${currentPath === '/' ? 'active' : ''}`}
        >
          Home
        </Link>
        <Link 
          to="/employee-list" 
          className={`nav-button ${currentPath === '/employee-list' ? 'active' : ''}`}
        >
          Employee-List
        </Link>
      </nav>
    </header>
  )
}

export default Header
