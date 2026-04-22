export default function BlurFade({ children, delay = 0, className = '' }) {
  return (
    <div className={`blur-fade ${className}`.trim()} style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
