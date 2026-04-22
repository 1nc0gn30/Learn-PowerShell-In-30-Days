import Footer from './Footer';
import FloatingUiControls from './FloatingUiControls';
import Nav from './Nav';
import useUiPreferences from '../hooks/useUiPreferences';

export default function Layout({ children }) {
  const { theme, emphasis, toggleTheme, toggleEmphasis } = useUiPreferences();

  return (
    <>
      <div className="app-shell">
        <Nav />
        <main className="content">{children}</main>
        <Footer />
      </div>
      <FloatingUiControls
        theme={theme}
        emphasis={emphasis}
        onToggleTheme={toggleTheme}
        onToggleEmphasis={toggleEmphasis}
      />
    </>
  );
}
