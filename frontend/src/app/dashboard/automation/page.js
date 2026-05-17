import FeatureWorkspace from "@/components/FeatureWorkspace";

const tasks = [
  {
    id: "commit-message",
    label: "Commit Message",
    summary: "Generate a professional commit message.",
    whenToUse: "Use this after finishing a change and before committing it.",
    inputTitle: "Paste a diff summary or list of changed files",
    inputHint: "Include what changed, why it changed, and any tests you ran.",
    outputs: ["Commit title", "Commit body", "Testing footer"],
    example: `Changed files:
- backend/controllers/reviewController.js
- frontend/src/app/dashboard/review/page.js
Summary:
Fixed reviewer API response parsing and added clearer UI status messages.
Tests:
npm run lint, npm run build`,
    prompt:
      "Generate a professional git commit message for this change. Include a concise imperative title, bullet body, risk notes if needed, and a short testing line.",
  },
  {
    id: "changelog",
    label: "Changelog",
    summary: "Create release notes.",
    whenToUse: "Use this when preparing a release summary for users, teammates, or deployment records.",
    inputTitle: "Paste commits, PR notes, or completed work",
    inputHint: "Include feature additions, bug fixes, refactors, security changes, and breaking changes.",
    outputs: ["Grouped changelog", "Breaking changes", "Upgrade notes"],
    example: `Commits:
- fix: send password reset emails through backend env config
- feat: add guided labs for security and performance
- chore: update Docker compose backend env_file`,
    prompt:
      "Generate a changelog with grouped release notes, fixed bugs, improvements, security changes, breaking changes, migration notes, and known issues.",
  },
  {
    id: "whiteboard",
    label: "Whiteboard",
    summary: "Generate architecture diagrams.",
    whenToUse: "Use this when you want a diagram prompt or Mermaid flow from code/project notes.",
    inputTitle: "Paste architecture notes, code flow, or service list",
    inputHint: "Include services, databases, APIs, background jobs, auth flow, and deployment pieces.",
    outputs: ["Architecture summary", "Mermaid diagram", "Diagram labels"],
    example: `Project:
Next.js frontend -> Express API -> MongoDB
Express API calls Groq AI for code review.
Auth uses JWT and password reset email through Nodemailer.`,
    prompt:
      "Generate an AI whiteboard plan and Mermaid diagrams for this project. Include a high-level architecture flow, request lifecycle, data stores, external services, and concise labels suitable for a visual diagram.",
  },
  {
    id: "reverse",
    label: "Reverse Engineering",
    summary: "Reconstruct architecture and technologies.",
    whenToUse: "Use this when you inherit a project and need to understand what it is made of.",
    inputTitle: "Paste folder tree, package files, and entry points",
    inputHint: "Include package.json, routes, main server file, app layout, and config files.",
    outputs: ["Detected stack", "Entry points", "Architecture map"],
    example: `Files:
frontend/src/app/dashboard/review/page.js
backend/server.js
backend/routes/reviewRoutes.js
backend/controllers/reviewController.js
docker-compose.yaml`,
    prompt:
      "Reverse engineer this code or project. Reconstruct architecture, detect technologies, identify entry points, explain data flow, list limitations, and suggest what to inspect next.",
  },
];

export default function AutomationPage() {
  return (
    <FeatureWorkspace
      title="Automation"
      description="Generate commit messages, changelogs, architecture diagrams, and project understanding prompts from real development context."
      tasks={tasks}
    />
  );
}
