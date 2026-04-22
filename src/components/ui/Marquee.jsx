export default function Marquee({ items = [] }) {
  const row = [...items, ...items];
  return (
    <div className="marquee" aria-label="Concept marquee">
      <div className="marquee-track">
        {row.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
