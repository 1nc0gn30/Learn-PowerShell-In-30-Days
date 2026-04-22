export default function TextAnimate({ text, className = '' }) {
  const words = text.split(' ');

  return (
    <span className={`text-animate ${className}`.trim()} aria-label={text}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} style={{ animationDelay: `${index * 45}ms` }}>
          {word}
        </span>
      ))}
    </span>
  );
}
