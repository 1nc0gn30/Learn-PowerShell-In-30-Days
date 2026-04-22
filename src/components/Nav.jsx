import { Link, NavLink } from 'react-router-dom';
import useCourseProgress from '../hooks/useCourseProgress';

export default function Nav() {
  const { percent, completedDays } = useCourseProgress();

  return (
    <header className="site-header">
      <div className="top-strip" aria-hidden="true" />
      <nav className="nav" aria-label="Main navigation">
        <Link className="brand" to="/">
          <span className="brand-badge">PS</span>
          <span>
            <strong>Learn PowerShell in 30 Days</strong>
            <small>Build scripts that ship</small>
          </span>
        </Link>

        <div className="nav-links">
          <NavLink to="/" end>
            Curriculum
          </NavLink>
          <NavLink to="/projects">Capstone Tracks</NavLink>
        </div>

        <div className="nav-progress" aria-label="Course progress">
          <span>{completedDays.length}/30 complete</span>
          <div className="progress-rail" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
            <div className="progress-fill" style={{ width: `${percent}%` }} />
          </div>
        </div>
      </nav>
    </header>
  );
}
