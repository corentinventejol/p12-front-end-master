import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import './Header.css'

function Header() {
  const location = useLocation()
  const currentPath = location.pathname
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-links">
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
        </div>
        
        <button
          onClick={toggleTheme}
          className="nav-button theme-button"
        >
          Thème : {isDarkMode ? 'sombre' : 'clair'}
        </button>
      </nav>
    </header>
  )
}

export default Header
