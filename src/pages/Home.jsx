import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import useCourseProgress from '../hooks/useCourseProgress';
import usePageMeta from '../hooks/usePageMeta';
import { COURSE_SUBTITLE, COURSE_TITLE, CURRICULUM, REFERENCE_LIBRARY, WEEK_SUMMARIES } from '../data/curriculum';
import NumberTicker from '../components/ui/NumberTicker';
import PowerShellGlyph from '../components/PowerShellGlyph';
import TextAnimate from '../components/ui/TextAnimate';
import AnimatedGradientText from '../components/ui/AnimatedGradientText';
import { HighlightChip, ItalicAccent, StrokeText } from '../components/ui/EmphasisText';
import { BlockQuoteLead, GradientStrong, MarkerEmphasis, UnderlineAccent } from '../components/ui/TextDecor';

function weekCounts(days) {
  const counts = new Map();
  days.forEach((day) => counts.set(day.week, (counts.get(day.week) ?? 0) + 1));
  return counts;
}

export default function Home() {
  const [weekFilter, setWeekFilter] = useState('all');
  const [query, setQuery] = useState('');
  const { completedDays, toggleDay, resetProgress, percent } = useCourseProgress();

  const weekCountMap = useMemo(() => weekCounts(CURRICULUM), []);

  const visibleDays = useMemo(() => {
    return CURRICULUM.filter((entry) => {
      const matchesWeek = weekFilter === 'all' ? true : entry.week === Number(weekFilter);
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q.length === 0 ||
        entry.title.toLowerCase().includes(q) ||
        entry.focus.toLowerCase().includes(q) ||
        entry.goals.some((goal) => goal.toLowerCase().includes(q)) ||
        entry.commands.some((command) => command.toLowerCase().includes(q));
      return matchesWeek && matchesQuery;
    });
  }, [query, weekFilter]);

  usePageMeta({
    title: 'Learn PowerShell in 30 Days | Curriculum',
    description: 'Complete 30-day PowerShell roadmap with daily labs, commands, deliverables, and capstone tracks.',
    path: '/',
  });

  return (
    <section className="page page-home">
      <header className="hero hero-light">
        <div>
          <p className="eyebrow">Structured operator training • 30 sessions</p>
          <h1>
            <TextAnimate text={COURSE_TITLE} />
          </h1>
          <p className="hero-copy">{COURSE_SUBTITLE}</p>
          <BlockQuoteLead>
            <StrokeText>Learn by building.</StrokeText> <ItalicAccent>Ship by documenting.</ItalicAccent>{' '}
            <GradientStrong>Operate with confidence.</GradientStrong>
          </BlockQuoteLead>
          <div className="hero-links">
            <Link className="btn" to="/projects">
              View Capstone Tracks
            </Link>
            <a className="btn btn-ghost" href="#curriculum-table">
              Jump to Day Plan
            </a>
          </div>
        </div>
        <PowerShellGlyph />
      </header>

      <section className="status-strip" aria-label="Program metrics">
        <article>
          <strong>
            <NumberTicker value={completedDays.length} />
          </strong>
          <span>Days Completed</span>
        </article>
        <article>
          <strong>
            <NumberTicker value={percent} suffix="%" />
          </strong>
          <span>Progress</span>
        </article>
        <article>
          <strong>
            <NumberTicker value={visibleDays.length} />
          </strong>
          <span>Visible Days</span>
        </article>
      </section>

      <p className="emphasis-line">
        <AnimatedGradientText>PowerShell mastery is repetition + reflection + real deliverables.</AnimatedGradientText>
      </p>

      <section className="panel controls" aria-label="Curriculum filters">
        <div className="control-item">
          <label htmlFor="week-filter">Filter by week</label>
          <select id="week-filter" value={weekFilter} onChange={(event) => setWeekFilter(event.target.value)}>
            <option value="all">All weeks</option>
            {WEEK_SUMMARIES.map((week) => (
              <option key={week.week} value={week.week}>
                Week {week.week}: {week.title}
              </option>
            ))}
          </select>
        </div>

        <div className="control-item">
          <label htmlFor="search">Search goals, topics, or commands</label>
          <input
            id="search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="remoting, pester, convertto-json, module manifest"
          />
        </div>

        <button className="btn btn-muted" type="button" onClick={resetProgress}>
          Reset Progress
        </button>
      </section>

      <section className="week-list" aria-label="Weekly outcomes">
        {WEEK_SUMMARIES.map((week) => (
          <article key={week.week} className="week-row">
            <h2>Week {week.week}</h2>
            <p>
              <UnderlineAccent>{week.title}:</UnderlineAccent> {week.outcome}
            </p>
            <small>{weekCountMap.get(week.week)} sessions</small>
          </article>
        ))}
      </section>

      <section id="curriculum-table" className="panel curriculum-table" aria-label="Daily curriculum">
        <header>
          <h2>30-Day Learning Plan</h2>
          <p>
            <HighlightChip>Lecture</HighlightChip> <HighlightChip>How-To</HighlightChip>{' '}
            <HighlightChip>Examples</HighlightChip> <HighlightChip>Lab</HighlightChip> <HighlightChip>Resources</HighlightChip>{' '}
            in every single day.
          </p>
        </header>

        {visibleDays.map((entry) => {
          const completed = completedDays.includes(entry.day);
          return (
            <article key={entry.day} className={`lesson-row ${completed ? 'is-complete' : ''}`}>
              <div className="lesson-meta">
                <span>Day {entry.day}</span>
                <span>{entry.minutes} min</span>
                <span>Week {entry.week}</span>
              </div>

              <div className="lesson-main">
                <h3>{entry.title}</h3>
                <p className="lesson-kicker">Day {entry.day} Lecture + Lab Track</p>
                <p className="lesson-focus">{entry.focus}</p>

                <ul>
                  {entry.goals.map((goal) => (
                    <li key={goal}>
                      <span className="lesson-goal-text">{goal}</span>
                    </li>
                  ))}
                </ul>

                <p className="lesson-highlight-line">
                  <strong>Lab Mission:</strong> <em>{entry.lab}</em>
                </p>
                <p className="lesson-highlight-line">
                  <strong>Deliverable:</strong>{' '}
                  <span className="lesson-deliverable-text">
                    <MarkerEmphasis>{entry.deliverable}</MarkerEmphasis>
                  </span>
                </p>

                <div className="chip-row" aria-label="Command focus">
                  {entry.commands.map((command) => (
                    <code key={command}>{command}</code>
                  ))}
                </div>

                <div className="lesson-actions">
                  <Link className="btn" to={`/day/${entry.day}`}>
                    Open Day {entry.day}
                  </Link>
                  <button className="btn btn-ghost" type="button" onClick={() => toggleDay(entry.day)}>
                    {completed ? 'Mark Incomplete' : 'Mark Complete'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="panel references" aria-label="Research references">
        <h2>Primary Documentation Sources</h2>
        <ul>
          {REFERENCE_LIBRARY.map((item) => (
            <li key={item.url}>
              <a href={item.url} target="_blank" rel="noreferrer">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
