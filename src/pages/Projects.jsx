import { useMemo, useState } from 'react';
import usePageMeta from '../hooks/usePageMeta';
import { CAPSTONE_BLUEPRINTS, CAPSTONE_DELIVERY_CHECKLIST, CAPSTONE_RUBRIC } from '../data/capstoneBlueprints';
import AnimatedGradientText from '../components/ui/AnimatedGradientText';
import MagicCard from '../components/ui/MagicCard';
import Marquee from '../components/ui/Marquee';
import TextAnimate from '../components/ui/TextAnimate';
import { HighlightChip, ItalicAccent, StrokeText } from '../components/ui/EmphasisText';

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'operations', label: 'Operations' },
  { value: 'security', label: 'Security/GRC' },
  { value: 'platform', label: 'Platform/API' },
  { value: 'infrastructure', label: 'Infrastructure' },
];

const complexityOptions = [
  { value: 'all', label: 'All Levels' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

export default function Projects() {
  usePageMeta({
    title: 'PowerShell Capstone Tracks | Learn PowerShell in 30 Days',
    description: 'Capstone project tracks for turning your PowerShell learning into production-ready tools.',
    path: '/projects',
  });

  const [category, setCategory] = useState('all');
  const [complexity, setComplexity] = useState('all');

  const filteredTracks = useMemo(() => {
    return CAPSTONE_BLUEPRINTS.filter((track) => {
      const categoryMatch = category === 'all' ? true : track.category === category;
      const complexityMatch = complexity === 'all' ? true : track.complexity === complexity;
      return categoryMatch && complexityMatch;
    });
  }, [category, complexity]);

  const marqueeItems = useMemo(
    () => CAPSTONE_BLUEPRINTS.flatMap((track) => [track.title, ...track.wowFeatures.slice(0, 2)]),
    []
  );

  return (
    <section className="page page-projects">
      <header className="hero hero-light">
        <div>
          <p className="eyebrow">Capstone Execution Hub</p>
          <h1>
            <AnimatedGradientText>
              <TextAnimate text="Build a PowerShell Tool You Can Actually Ship" />
            </AnimatedGradientText>
          </h1>
          <p className="hero-copy">
            This page is your production plan for Days 22-30. Pick a track, follow phased milestones, and submit a
            project that is testable, documented, and deployment-ready.
          </p>
          <p className="hero-copy">
            <StrokeText>Think portfolio-grade.</StrokeText> <ItalicAccent>Design for operators, not demos.</ItalicAccent>
          </p>
        </div>
      </header>

      <Marquee items={marqueeItems} />

      <section className="panel controls" aria-label="Capstone filters">
        <div className="control-item">
          <label htmlFor="category-filter">Filter by category</label>
          <select id="category-filter" value={category} onChange={(event) => setCategory(event.target.value)}>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="control-item">
          <label htmlFor="complexity-filter">Filter by complexity</label>
          <select id="complexity-filter" value={complexity} onChange={(event) => setComplexity(event.target.value)}>
            {complexityOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="capstone-count">Showing {filteredTracks.length} tracks</div>
      </section>

      <section className="project-grid">
        {filteredTracks.map((track) => (
          <MagicCard key={track.id} className="project-card-advanced">
            <div className="project-header-row">
              <h2>{track.title}</h2>
              <span className={`pill pill-${track.complexity}`}>{track.complexity}</span>
            </div>

            <p className="project-value">{track.valueProposition}</p>
            <p>
              <HighlightChip>Audience</HighlightChip> <strong>{track.audience.join(', ')}</strong>
            </p>
            <p>
              <HighlightChip>Duration</HighlightChip> <strong>{track.duration}</strong>
            </p>

            <div className="chip-row" aria-label="Recommended stack">
              {track.stack.map((item) => (
                <code key={item}>{item}</code>
              ))}
            </div>

            <h3>Core Deliverables</h3>
            <ul>
              {track.coreDeliverables.map((deliverable) => (
                <li key={deliverable}>{deliverable}</li>
              ))}
            </ul>

            <h3>9-Day Phase Plan</h3>
            <div className="phase-list">
              {track.phases.map((phase) => (
                <article key={phase.name} className="phase-item">
                  <h4>
                    {phase.name} <span>{phase.days}</span>
                  </h4>
                  <ul>
                    {phase.tasks.map((task) => (
                      <li key={task}>{task}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            <h3>Wow Features</h3>
            <ul>
              {track.wowFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </MagicCard>
        ))}
      </section>

      <section className="project-grid project-grid-secondary">
        <MagicCard title="Submission Checklist" className="detail-section">
          <ul>
            {CAPSTONE_DELIVERY_CHECKLIST.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </MagicCard>

        <MagicCard title="Scoring Rubric" className="detail-section">
          <table className="rubric-table">
            <thead>
              <tr>
                <th>Area</th>
                <th>Weight</th>
                <th>Pass Standard</th>
              </tr>
            </thead>
            <tbody>
              {CAPSTONE_RUBRIC.map((row) => (
                <tr key={row.area}>
                  <td>{row.area}</td>
                  <td>{row.weight}%</td>
                  <td>{row.standard}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </MagicCard>
      </section>

      <MagicCard title="Demo Day Template" className="detail-section">
        <ol>
          <li>Problem and objective (90 seconds)</li>
          <li>Architecture and command flow walkthrough (3 minutes)</li>
          <li>Live run with one failure + recovery scenario (3 minutes)</li>
          <li>Testing and CI proof (90 seconds)</li>
          <li>Handoff docs + next release plan (90 seconds)</li>
        </ol>
      </MagicCard>
    </section>
  );
}
