const { execSync } = require("child_process");

function run(cmd) {
  console.log(`> ${cmd}`);
  try {
    const out = execSync(cmd, { encoding: "utf-8", stdio: ["inherit", "pipe", "pipe"] });
    if (out.trim()) console.log(out.trim());
    return out;
  } catch (err) {
    console.error(`ERROR on "${cmd}":`, err.stderr || err.message);
    throw err;
  }
}

const chunks = [
  {
    msg: "chore(init): configure project dependencies, next.js 15, and tailwind css",
    files: ["package.json", "package-lock.json", "tsconfig.json", "next.config.mjs", "tailwind.config.ts", "postcss.config.mjs", ".gitignore"],
  },
  {
    msg: "feat(types): domain schemas for workforce, shifts, attendance, safety, and UN SDG 8",
    files: ["src/types/index.ts"],
  },
  {
    msg: "feat(utils): utility helpers for class merging and date formatting",
    files: ["src/lib/utils.ts"],
  },
  {
    msg: "feat(calculations): decimal-safe payroll calculator and 1.5x overtime multiplier",
    files: ["src/lib/calculations.ts"],
  },
  {
    msg: "feat(i18n): multilingual dictionary supporting Hindi, Tamil, Telugu, and English",
    files: ["src/lib/i18n.ts"],
  },
  {
    msg: "feat(mockData): cross-industry synthetic seed data across construction, healthcare, and education",
    files: ["src/lib/mockData.ts"],
  },
  {
    msg: "feat(ui): design tokens, atomic components, and Apple-inspired status chips",
    files: ["src/components/ui/StatusChip.tsx", "src/components/ui/MetricCard.tsx", "src/components/ui/Modal.tsx", "src/components/ui/BottomSheet.tsx"],
  },
  {
    msg: "feat(ui): voice assistance and audio narration components",
    files: ["src/components/ui/AudioPlaybackControl.tsx", "src/components/ui/VoiceInputModal.tsx"],
  },
  {
    msg: "feat(layout): responsive AppShell, mobile bottom nav, and admin sidebar",
    files: ["src/components/layout/AppShell.tsx", "src/components/layout/MobileBottomNav.tsx", "src/components/layout/AdminSidebar.tsx"],
  },
  {
    msg: "feat(context): application state provider, offline queuing, and speech synthesis",
    files: ["src/context/AppContext.tsx"],
  },
  {
    msg: "feat(assets): SVG signage and high-visibility safety illustrations",
    files: ["public/images/scaffold-notice.svg"],
  },
  {
    msg: "feat(app): root layout, viewport configuration, and global stylesheet",
    files: ["src/app/layout.tsx", "src/app/globals.css"],
  },
  {
    msg: "feat(app): public landing page and UN SDG 8 Decent Work mission",
    files: ["src/app/page.tsx"],
  },
  {
    msg: "feat(auth): role selection and demo persona login interface",
    files: ["src/app/login/page.tsx"],
  },
  {
    msg: "feat(onboarding): 4-step multilingual worker and contractor profile onboarding",
    files: ["src/app/onboarding/page.tsx"],
  },
  {
    msg: "feat(worker): mobile shift dashboard with duty status and audio guidance",
    files: ["src/app/worker/dashboard/page.tsx"],
  },
  {
    msg: "feat(worker): cryptographic QR check-in, checkout, and meal break tracking",
    files: ["src/app/worker/shift/page.tsx"],
  },
  {
    msg: "feat(worker): transparent wage wallet, itemized payslip breakdown, and dispute queries",
    files: ["src/app/worker/pay/page.tsx"],
  },
  {
    msg: "feat(worker): safety hazard reporting wizard and worker ground verification",
    files: ["src/app/worker/safety/page.tsx"],
  },
  {
    msg: "feat(worker): anonymous workplace pulse survey with k-anonymity guarantee",
    files: ["src/app/worker/feedback/page.tsx"],
  },
  {
    msg: "feat(worker): digital skill passport with portable verified trade credentials",
    files: ["src/app/worker/skills/page.tsx"],
  },
  {
    msg: "feat(worker): worker profile, trade specialization, and language preferences",
    files: ["src/app/worker/profile/page.tsx"],
  },
  {
    msg: "feat(admin): operations command center with real-time shift telemetry",
    files: ["src/app/admin/layout.tsx", "src/app/admin/dashboard/page.tsx"],
  },
  {
    msg: "feat(admin): workers directory with health risk indicators and trade rosters",
    files: ["src/app/admin/workers/page.tsx"],
  },
  {
    msg: "feat(admin): safety command center with 5-stage Kanban incident triage",
    files: ["src/app/admin/safety/page.tsx"],
  },
  {
    msg: "feat(admin): pay queries reconciliation console and wage adjustment resolution",
    files: ["src/app/admin/pay-queries/page.tsx"],
  },
  {
    msg: "feat(admin): fair work insights with non-punitive fatigue diagnostics",
    files: ["src/app/admin/insights/page.tsx"],
  },
  {
    msg: "feat(admin): workplace policy settings and overtime threshold configuration",
    files: ["src/app/admin/settings/page.tsx"],
  },
  {
    msg: "feat(info): platform mission, UN SDG 8 alignment, and privacy policy pages",
    files: ["src/app/about/page.tsx", "src/app/privacy/page.tsx"],
  },
  {
    msg: "feat(server): thread-safe persistent file store and cryptographic QR token utilities",
    files: ["src/lib/server/db.ts", "src/lib/server/auth.ts"],
  },
  {
    msg: "feat(api): attendance check-in, checkout, and cryptographic HMAC token endpoints",
    files: [
      "src/app/api/attendance/route.ts",
      "src/app/api/attendance/qr-token/route.ts",
      "src/app/api/attendance/corrections/route.ts",
    ],
  },
  {
    msg: "feat(api): auth session, shifts, payroll, safety, and feedback REST APIs",
    files: [
      "src/app/api/auth/me/route.ts",
      "src/app/api/auth/logout/route.ts",
      "src/app/api/shifts/route.ts",
      "src/app/api/payroll/route.ts",
      "src/app/api/payroll/queries/route.ts",
      "src/app/api/safety/route.ts",
      "src/app/api/feedback/route.ts",
      "src/app/api/skills/route.ts",
      "src/app/api/fatigue/route.ts",
      "src/app/api/settings/route.ts",
      "src/app/api/audit/route.ts",
    ],
  },
  {
    msg: "test: comprehensive unit and integration test suite with Vitest and Playwright",
    files: [
      "tests/calculations.test.ts",
      "tests/privacy.test.ts",
      "tests/server_features.test.ts",
      "tests/e2e/smoke.spec.ts",
      "vitest.config.ts",
      "playwright.config.ts",
    ],
  },
  {
    msg: "deploy: production multi-stage Dockerfile, container configs, and deployment specs",
    files: ["Dockerfile", ".dockerignore", ".env.example"],
  },
  {
    msg: "docs: comprehensive system documentation, architecture diagrams, and submission checklist",
    files: ["README.md", "SUBMISSION_CHECKLIST.md", "LINKEDIN_POST_DRAFT.md"],
  },
];

console.log("=== STEP 1: Creating orphan branch 'rebuild-main' ===");
run("git checkout --orphan rebuild-main");
run("git reset");

console.log("=== STEP 2: Creating 35 granular commits ===");
chunks.forEach((chunk, i) => {
  const commitNum = String(i + 1).padStart(2, "0");
  console.log(`[${commitNum}/35] ${chunk.msg}`);
  const quotedFiles = chunk.files.map((f) => `"${f}"`).join(" ");
  run(`git add ${quotedFiles}`);
  run(`git commit -m "${chunk.msg}"`);
});

console.log("=== STEP 3: Verifying working tree is clean ===");
const status = run("git status --porcelain");
if (status.trim()) {
  console.warn("Leftover uncommitted files:", status);
  run('git add .');
  run('git commit -m "chore: remaining repository assets"');
}

console.log("=== STEP 4: Replacing main branch with rebuild-main ===");
run("git branch -D main");
run("git branch -m main");

console.log("=== STEP 5: Pushing chunks to origin main ===");
run("git push -f origin main");

console.log("=== SUCCESS: Pushed 35 commits cleanly to https://github.com/Ars6ad/PROMPT-WARS-EXE-1 ===");
