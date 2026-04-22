export default function MagicCard({ title, children, className = '' }) {
  return (
    <article className={`magic-card ${className}`.trim()}>
      {title ? <h2>{title}</h2> : null}
      {children}
    </article>
  );
}
