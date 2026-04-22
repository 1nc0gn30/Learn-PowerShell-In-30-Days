import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';

export default function NotFound() {
  usePageMeta({
    title: '404 | Learn PowerShell in 30 Days',
    description: 'The requested route does not exist in this PowerShell learning site.',
    path: '/404',
  });

  return (
    <section className="page">
      <article className="panel">
        <h1>404</h1>
        <p>The page you requested does not exist in this learning portal.</p>
        <Link className="btn" to="/">
          Return Home
        </Link>
      </article>
    </section>
  );
}
