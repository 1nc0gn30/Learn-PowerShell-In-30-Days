import Nav from './Nav'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <Nav />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
