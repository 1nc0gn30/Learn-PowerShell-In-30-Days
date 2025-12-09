import { Link } from 'react-router-dom'
import useTheme from '../hooks/useTheme'
import { themes } from '../app/theme'

export default function Nav() {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="nav">
      <span className="logo">⚡ ViteApp</span>
      <div className="nav-actions">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <button className="theme-toggle" type="button" onClick={toggleTheme}>
          {theme === themes.dark ? 'Light mode' : 'Dark mode'}
        </button>
      </div>
    </nav>
  )
}
