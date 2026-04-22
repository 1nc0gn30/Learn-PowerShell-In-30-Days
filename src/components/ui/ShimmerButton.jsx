import { Link } from 'react-router-dom';

export default function ShimmerButton({ to, children }) {
  return (
    <Link className="btn btn-shimmer" to={to}>
      <span>{children}</span>
    </Link>
  );
}
