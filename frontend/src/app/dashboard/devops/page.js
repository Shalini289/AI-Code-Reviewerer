import FeatureWorkspace from "@/components/FeatureWorkspace";

const tasks = [
  {
    id: "deployment-risk",
    label: "Deployment Risk",
    summary: "Predict release failure risk.",
    whenToUse: "Use this before deploying a risky change or reviewing a release candidate.",
    inputTitle: "Paste changed files, logs, config, or release notes",
    inputHint: "Include touched modules, migrations, config changes, Docker changes, and known failing tests.",
    outputs: ["Failure risks", "Risky modules", "Mitigation checklist"],
    example: `Release notes:
- Changed password reset email provider.
- Added Docker env_file for backend.
- Review API now calls Groq with JSON mode.
- No migration needed.
- Frontend build passed locally.`,
    prompt:
      "Predict deployment risk. Identify risky files, high-risk modules, reasons deployment may fail, rollback triggers, monitoring needs, and mitigation steps.",
  },
  {
    id: "quality-gates",
    label: "Quality Gates",
    summary: "Create CI/CD block rules.",
    whenToUse: "Use this to design pipeline rules that stop unsafe code before release.",
    inputTitle: "Paste CI config, testing policy, or quality goals",
    inputHint: "Include coverage goals, security thresholds, lint rules, build steps, and deploy environments.",
    outputs: ["Gate rules", "Block conditions", "Recommended thresholds"],
    example: `Pipeline:
- npm run lint
- npm run build
- backend node --check
- docker compose build
Goal: block deploys with critical bugs, known secrets, or failing tests.`,
    prompt:
      "Design CI/CD quality gates. Define pass/fail rules for critical bugs, weak security score, low tests, unsafe config, dependency risk, build failures, and deployment approval.",
  },
  {
    id: "docker-k8s",
    label: "Docker & Kubernetes",
    summary: "Review infrastructure config.",
    whenToUse: "Use this when container config works locally but may be unsafe or fragile in production.",
    inputTitle: "Paste Dockerfile, compose file, Kubernetes YAML, or infra config",
    inputHint: "Include ports, env vars, volumes, health checks, restart policy, resources, and secrets handling.",
    outputs: ["Security concerns", "Reliability fixes", "Production readiness checklist"],
    example: `services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      JWT_SECRET: secret
  mongo:
    image: mongo:7
    ports:
      - "27017:27017"`,
    prompt:
      "Review Dockerfiles, docker-compose files, Kubernetes YAML, and infrastructure configs for security, reliability, resource limits, health checks, secrets handling, networking, and production readiness.",
  },
  {
    id: "release",
    label: "Release Notes",
    summary: "Generate changelog and sprint report.",
    whenToUse: "Use this after finishing a batch of changes and preparing a handoff or deployment summary.",
    inputTitle: "Paste commits, completed tasks, or PR notes",
    inputHint: "Include fixed bugs, new features, changed files, known issues, and test results.",
    outputs: ["Release notes", "Changelog", "Deployment checklist"],
    example: `Changes:
- Fixed reviewer API JSON parsing.
- Improved dashboard responsive layout.
- Added sample code loader.
Tests:
- Frontend lint passed.
- Frontend build passed.`,
    prompt:
      "Generate release notes, changelog, sprint report, fixed bugs, pending issues, test summary, deployment checklist, and rollback notes from the provided change context.",
  },
];

export default function DevOpsPage() {
  return (
    <FeatureWorkspace
      title="AI DevOps"
      description="Review deployment risk, CI/CD gates, infrastructure config, and release notes in one guided workspace."
      tasks={tasks}
    />
  );
}
