const RESOURCE_MAP = {
  objects: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_objects?view=powershell-7.6',
  pipeline: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_pipelines?view=powershell-7.5',
  advancedFunctions: 'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_functions_advanced?view=powershell-7.6',
  advancedParams:
    'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_functions_advanced_parameters?view=powershell-7.6',
  remoting:
    'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_remote_requirements?view=powershell-7.5',
  secretManagement:
    'https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.secretmanagement/?view=ps-modules',
  pester: 'https://pester.dev/docs/quick-start',
};

const DAY_NOTES = {
  1: 'Treat your shell like a workstation project: reliable profile, aliases, and discoverability.',
  2: 'Most PowerShell mistakes come from assuming text output. Stay object-native end to end.',
  3: 'Good data modeling makes your week-4 tooling dramatically easier.',
  4: 'Parameter design is API design for operators. Optimize for clarity and safety.',
  5: 'Error handling is where scripts become production scripts.',
  6: 'Filesystem tasks become risky at scale without dry-run and safe guards.',
  7: 'Data conversion quality determines reporting quality.',
  8: 'Calculated properties let you turn raw telemetry into decisions.',
  9: 'Modules are how teams reuse your best ideas without copy-paste drift.',
  10: 'API wrappers are your bridge between cloud systems and automation.',
  11: 'Reporting is a product. Treat output formatting as a first-class concern.',
  12: 'Cross-platform automation is now baseline for modern operations.',
  13: 'Remote sessions need structure, not ad-hoc fan-out commands.',
  14: 'Scheduling is where unattended reliability is proven.',
  15: 'Identity data is sensitive; clarity and traceability matter.',
  16: 'Compliance work wins when your pipeline is repeatable and auditable.',
  17: 'Artifacts are evidence. Evidence must be reproducible.',
  18: 'Secret handling discipline prevents accidental credential leaks.',
  19: 'Input validation is your first security boundary.',
  20: 'Drift detection helps teams act before incidents happen.',
  21: 'Stakeholder trust grows when reports are consistent and actionable.',
  22: 'A CLI blueprint prevents architecture debt later.',
  23: 'Interactive workflows should still support automation mode.',
  24: 'Parsing quality controls downstream analytics quality.',
  25: 'Orchestration is mostly dependency management and failure handling.',
  26: 'Retry and checkpoint logic is critical for long-running jobs.',
  27: 'Tests are your release confidence multiplier.',
  28: 'Release hygiene is what makes tools adoptable across teams.',
  29: 'CI makes quality non-optional and repeatable.',
  30: 'A good handoff turns your project into an operational asset.',
};

const FUN_MISSIONS = {
  1: 'Theme your profile with a custom prompt that shows git branch + time.',
  2: 'Race yourself: produce the same report in 3 different pipeline styles and compare readability.',
  3: 'Build a tiny “object zoo” file with 5 different PSCustomObject schemas.',
  4: 'Create two parameter sets and challenge a teammate to break them.',
  5: 'Inject three controlled failures and verify your catch logic stays clean.',
  6: 'Create a dry-run mode that outputs exactly what would change before changes happen.',
  7: 'Merge JSON + CSV + XML into one export with a unified key naming convention.',
  8: 'Add one calculated property that gives a score, not just raw data.',
  9: 'Publish your module locally and import it from a fresh shell session.',
  10: 'Add pagination support to your API script and log rate-limit headers.',
  11: 'Generate a color-coded “traffic light” status column for your report.',
  12: 'Collect and compare uptime from three Linux hosts in one run.',
  13: 'Run a remoting command fan-out and return one structured result object per host.',
  14: 'Simulate a scheduled failure and confirm your notification pipeline catches it.',
  15: 'Build a privileged-user “new since yesterday” report.',
  16: 'Attach control IDs to each evidence row and export a control coverage summary.',
  17: 'Create a signed manifest for every output artifact.',
  18: 'Rotate an API token in vault and re-run without touching source code.',
  19: 'Fuzz one input parameter with bad values and capture behavior.',
  20: 'Highlight drift severity levels: info, warning, critical.',
  21: 'Generate an executive summary with only 5 bullet points from full data.',
  22: 'Design your CLI help output as if a new hire must use it tomorrow.',
  23: 'Support both “interactive wizard” and “silent mode” in one command.',
  24: 'Extract key fields from noisy logs and benchmark parse time.',
  25: 'Tag every cross-system transaction with one correlation ID.',
  26: 'Resume a failed run from checkpoint without rerunning completed steps.',
  27: 'Write one failing test first, then fix code until it passes.',
  28: 'Draft release notes that explain value, not just changed files.',
  29: 'Add a CI badge and enforce failing tests block merges.',
  30: 'Record a 5-minute demo walkthrough and publish a runbook.',
};

function makeHowTo(day, commands) {
  return [
    `Read the day objective and define a concrete output artifact before coding.`,
    `Create a script scaffold with strict mode, cmdlet binding, and logging defaults.`,
    `Implement the workflow around key commands: ${commands.slice(0, 3).join(', ')}.`,
    `Run against controlled test data, then run against a realistic scenario and compare output.`,
    `Document run instructions, known edge cases, and a rollback/safety plan.`,
  ];
}

function makeExamples(day, commands) {
  const primary = commands[0] ?? 'Get-Item';
  const secondary = commands[1] ?? 'Select-Object';

  return [
    {
      title: 'Example A: Fast Validation Pass',
      code: `${primary} | ${secondary}`,
      takeaway: 'Start with a narrow command chain to validate object shape before adding complexity.',
    },
    {
      title: 'Example B: Production-Ready Pattern',
      code: `try {\n  $data = ${primary}\n  $data | ${secondary}\n} catch {\n  Write-Error $_\n  throw\n}`,
      takeaway: 'Use structured error handling from the first iteration so scale-up is safer.',
    },
  ];
}

function makeResources(day) {
  const common = [
    { label: 'PowerShell Objects', url: RESOURCE_MAP.objects },
    { label: 'PowerShell Pipeline', url: RESOURCE_MAP.pipeline },
  ];

  if (day >= 4 && day <= 9) common.push({ label: 'Advanced Functions', url: RESOURCE_MAP.advancedFunctions });
  if (day >= 4 && day <= 6) common.push({ label: 'Advanced Parameters', url: RESOURCE_MAP.advancedParams });
  if (day >= 13 && day <= 14) common.push({ label: 'Remoting Requirements', url: RESOURCE_MAP.remoting });
  if (day === 10 || day === 18) common.push({ label: 'Secret Management', url: RESOURCE_MAP.secretManagement });
  if (day >= 27) common.push({ label: 'Pester Quick Start', url: RESOURCE_MAP.pester });

  return common;
}

export function getDayEnhancement(day, focus, commands) {
  return {
    lecture: {
      title: `Lecture: Day ${day.day} Strategy`,
      body: `${focus} ${DAY_NOTES[day.day]}`,
      coaching:
        'Think in outcomes first: what object should this script return, who consumes it, and what failure conditions must be visible?',
    },
    howTo: makeHowTo(day.day, commands),
    examples: makeExamples(day.day, commands),
    resources: makeResources(day.day),
    funMission: FUN_MISSIONS[day.day],
  };
}
