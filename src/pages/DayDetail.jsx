import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CURRICULUM, REFERENCE_LIBRARY } from '../data/curriculum';
import { getDayEnhancement } from '../data/dayEnhancements';
import useCourseProgress from '../hooks/useCourseProgress';
import useDayScripts from '../hooks/useDayScripts';
import usePageMeta from '../hooks/usePageMeta';
import PowerShellGlyph from '../components/PowerShellGlyph';
import AnimatedGradientText from '../components/ui/AnimatedGradientText';
import MagicCard from '../components/ui/MagicCard';
import Marquee from '../components/ui/Marquee';
import TextAnimate from '../components/ui/TextAnimate';
import { HighlightChip, ItalicAccent, StrokeText } from '../components/ui/EmphasisText';
import { GradientStrong, MarkerEmphasis, UnderlineAccent } from '../components/ui/TextDecor';

function getReferenceUrls(labels) {
  return labels
    .map((label) => REFERENCE_LIBRARY.find((item) => item.label === label))
    .filter(Boolean);
}

function createStarterScript(day) {
  const functionName = `Invoke-Day${String(day.day).padStart(2, '0')}Lab`;
  return `function ${functionName} {
  [CmdletBinding()]
  param(
    [Parameter(Mandatory)]
    [string]$OutputPath,

    [switch]$WhatIf
  )

  Set-StrictMode -Version Latest
  $ErrorActionPreference = 'Stop'

  try {
    Write-Host "Running ${functionName} for: ${day.title}" -ForegroundColor Cyan

    # TODO: implement day logic
    $result = [pscustomobject]@{
      Day         = ${day.day}
      Title       = '${day.title}'
      Focus       = '${day.focus.replace(/'/g, "''")}'
      CompletedAt = (Get-Date)
    }

    if (-not $WhatIf) {
      $result | Export-Csv -Path $OutputPath -NoTypeInformation
    }

    return $result
  }
  catch {
    Write-Error "Day ${day.day} lab failed: $($_.Exception.Message)"
    throw
  }
}`;
}

function createExecutionSteps(day) {
  return [
    `Review objectives and scope for Day ${day.day}.`,
    'Set up a fresh script file and strict-mode safety defaults.',
    `Implement command flow around: ${day.commands.slice(0, 3).join(', ')}.`,
    'Run against test data and capture output artifacts.',
    `Finalize deliverable: ${day.deliverable}`,
  ];
}

function createExitCriteria(day) {
  return [
    'Script returns structured objects instead of formatted text.',
    'Error paths are handled and tested at least once.',
    `Lab output directly matches the expected deliverable for Day ${day.day}.`,
    'README notes explain how to run and validate the script.',
  ];
}

export default function DayDetail() {
  const { dayNumber } = useParams();
  const day = CURRICULUM.find((entry) => entry.day === Number(dayNumber));
  const { completedDays, toggleDay } = useCourseProgress();
  const { getDayScript, setDayScript, resetDayScript, hasSavedScript } = useDayScripts();
  const [draftScript, setDraftScript] = useState('');
  const [saveNotice, setSaveNotice] = useState('');

  const title = day
    ? `Day ${day.day}: ${day.title} | Learn PowerShell in 30 Days`
    : 'PowerShell Day Not Found';
  const description = day
    ? day.focus
    : 'The requested day does not exist in the 30-day PowerShell curriculum.';
  const path = day ? `/day/${day.day}` : '/day/not-found';

  usePageMeta({ title, description, path });

  if (!day) {
    return (
      <section className="page">
        <div className="panel">
          <h1>Day Not Found</h1>
          <p>The day you requested is outside the 30-day program.</p>
          <Link className="btn" to="/">
            Back to Curriculum
          </Link>
        </div>
      </section>
    );
  }

  const completed = completedDays.includes(day.day);
  const references = getReferenceUrls(day.references);
  const starterScript = createStarterScript(day);
  const steps = createExecutionSteps(day);
  const exitCriteria = createExitCriteria(day);
  const enhancement = getDayEnhancement(day, day.focus, day.commands);
  const savedForDay = hasSavedScript(day.day);

  useEffect(() => {
    setDraftScript(getDayScript(day.day, starterScript));
    setSaveNotice(savedForDay ? 'Loaded your saved local draft for this day.' : 'Using the starter template for this day.');
  }, [day.day, starterScript]);

  useEffect(() => {
    if (!draftScript) return;
    setDayScript(day.day, draftScript);
    setSaveNotice(`Auto-saved locally for Day ${day.day}.`);
  }, [day.day, draftScript]);

  const handleResetLocal = () => {
    resetDayScript(day.day);
    setDraftScript(starterScript);
    setSaveNotice('Local draft reset to the starter template.');
  };

  const handleCopyScript = async () => {
    try {
      await navigator.clipboard.writeText(draftScript);
      setSaveNotice('Script copied to clipboard.');
    } catch {
      setSaveNotice('Clipboard copy failed in this browser context.');
    }
  };

  return (
    <section className="page page-detail">
      <article className="hero hero-light detail-hero">
        <div>
          <p className="eyebrow">Week {day.week} • Day {day.day}</p>
          <h1>
            <TextAnimate text={day.title} />
          </h1>
          <p className="hero-copy">{day.focus}</p>
          <p className="hero-copy">
            <StrokeText>Outcome:</StrokeText> build a production-capable script artifact by end of session.
          </p>
          <div className="detail-actions">
            <button className="btn" type="button" onClick={() => toggleDay(day.day)}>
              {completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <Link className="btn btn-ghost" to="/">
              Back to Curriculum
            </Link>
          </div>
        </div>
        <PowerShellGlyph compact />
      </article>

      <Marquee items={[`Day ${day.day}`, day.title, ...day.commands.slice(0, 4)]} />

      <MagicCard title="Lecture Block" className="detail-section">
        <p className="eyebrow">
          <AnimatedGradientText>{enhancement.lecture.title}</AnimatedGradientText>
        </p>
        <p>
          <strong>{enhancement.lecture.body}</strong>
        </p>
        <p>
          <ItalicAccent>Instructor note:</ItalicAccent> <UnderlineAccent>{enhancement.lecture.coaching}</UnderlineAccent>
        </p>
      </MagicCard>

      <MagicCard title="How-To Walkthrough" className="detail-section">
        <ol>
          {enhancement.howTo.map((step) => (
            <li key={step}>
              <span className="lesson-step-text">{step}</span>
            </li>
          ))}
        </ol>
      </MagicCard>

      <MagicCard title="Learning Objectives" className="detail-section">
        <ul>
          {day.goals.map((goal) => (
            <li key={goal}>
              <span className="lesson-goal-text">{goal}</span>
            </li>
          ))}
        </ul>
      </MagicCard>

      <MagicCard title="Execution Blueprint" className="detail-section">
        <ol>
          {steps.map((step) => (
            <li key={step}>
              <span className="lesson-step-text">{step}</span>
            </li>
          ))}
        </ol>
      </MagicCard>

      <MagicCard title="Command Focus" className="detail-section">
        <div className="chip-row">
          {day.commands.map((command) => (
            <code key={command}>{command}</code>
          ))}
        </div>
      </MagicCard>

      <MagicCard title="Worked Examples" className="detail-section">
        {enhancement.examples.map((example) => (
          <div key={example.title} className="example-block">
            <h3>{example.title}</h3>
            <pre className="script-block">
              <code>{example.code}</code>
            </pre>
            <p className="lesson-example-takeaway">{example.takeaway}</p>
          </div>
        ))}
      </MagicCard>

      <MagicCard title="Deliverable and Stretch Challenge" className="detail-section">
        <p>
          <HighlightChip>Core deliverable</HighlightChip> <GradientStrong>{day.deliverable}</GradientStrong>
        </p>
        <p>
          <HighlightChip>Stretch challenge</HighlightChip>{' '}
          <ItalicAccent>
            <MarkerEmphasis>{enhancement.funMission}</MarkerEmphasis>
          </ItalicAccent>
        </p>
      </MagicCard>

      <MagicCard title="Daily Script Workspace (Saved Locally)" className="detail-section">
        <p>
          Your draft for <strong>Day {day.day}</strong> is saved in local storage and restored automatically when you return.
        </p>
        <div className="lesson-actions">
          <button className="btn btn-ghost" type="button" onClick={handleCopyScript}>
            Copy Script
          </button>
          <button className="btn btn-muted" type="button" onClick={handleResetLocal}>
            Reset to Template
          </button>
        </div>
        <p className="save-notice">{saveNotice}</p>
        <textarea
          className="script-editor"
          value={draftScript}
          onChange={(event) => setDraftScript(event.target.value)}
          spellCheck={false}
          aria-label={`Editable PowerShell script for day ${day.day}`}
        />
      </MagicCard>

      <MagicCard title="Exit Criteria" className="detail-section">
        <ul>
          {exitCriteria.map((criterion) => (
            <li key={criterion}>
              <span className="lesson-check-text">{criterion}</span>
            </li>
          ))}
        </ul>
      </MagicCard>

      <MagicCard title="Resources" className="detail-section">
        <ul>
          {enhancement.resources.map((resource) => (
            <li key={resource.url}>
              <a href={resource.url} target="_blank" rel="noreferrer">
                {resource.label}
              </a>
            </li>
          ))}
          {references.map((reference) => (
            <li key={reference.url}>
              <a href={reference.url} target="_blank" rel="noreferrer">
                {reference.label}
              </a>
            </li>
          ))}
        </ul>
      </MagicCard>
    </section>
  );
}
