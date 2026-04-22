export default function FloatingUiControls({ theme, emphasis, onToggleTheme, onToggleEmphasis }) {
  return (
    <aside className="floating-ui-controls" aria-label="Display controls">
      <button
        className="floating-btn icon-btn"
        type="button"
        onClick={onToggleTheme}
        aria-label={`Toggle theme (current: ${theme})`}
        data-tooltip={`Theme: ${theme === 'light' ? 'Light' : 'Dark'}`}
      >
        <span aria-hidden="true">{theme === 'light' ? '☀️' : '🌙'}</span>
      </button>
      <button
        className="floating-btn icon-btn"
        type="button"
        onClick={onToggleEmphasis}
        aria-label={`Toggle emphasis intensity (current: ${emphasis})`}
        data-tooltip={`Emphasis: ${emphasis === 'high' ? 'High' : 'Standard'}`}
      >
        <span aria-hidden="true">{emphasis === 'high' ? '✦' : 'A'}</span>
      </button>
    </aside>
  );
}
