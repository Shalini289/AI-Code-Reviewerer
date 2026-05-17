import FeatureWorkspace from "@/components/FeatureWorkspace";

const tasks = [
  {
    id: "severity",
    label: "Severity Classification",
    summary: "Classify issues by severity and production impact.",
    whenToUse: "Use this after a review finds many issues and you need to know what matters first.",
    inputTitle: "Paste code, errors, or review findings",
    inputHint: "Example: paste a function, stack trace, or existing review report that needs severity labels.",
    outputs: ["Critical to informational labels", "Production impact", "Fix order"],
    example: `function checkout(cart, user) {
  let total = 0;
  for (let i = 0; i <= cart.items.length; i++) {
    total += cart.items[i].price;
  }
  if (user.role = "admin") total = 0;
  return db.query("UPDATE users SET balance=" + total + " WHERE id=" + user.id);
}`,
    prompt:
      "Classify every issue as Critical, High, Medium, Low, or Informational. For each issue, include evidence from the code, production impact, likelihood, and the first fix to apply.",
  },
  {
    id: "priority",
    label: "Priority Fix Plan",
    summary: "Create an ordered fix plan.",
    whenToUse: "Use this when you have limited time and need a practical bug-fix sequence.",
    inputTitle: "Paste the code or list of known issues",
    inputHint: "Paste the most risky file, bug list, or release-blocking notes.",
    outputs: ["Fix-now list", "Can-wait list", "Regression risks"],
    example: `Known issues:
- Login sometimes accepts expired tokens.
- Dashboard loads all reviews at once.
- Password reset email fails silently.
- API key is stored in a client component.`,
    prompt:
      "Create a priority fix plan. Rank fixes from highest to lowest priority, explain which may break production, which affect scalability or security, and what should be verified after each fix.",
  },
  {
    id: "root-cause",
    label: "Root Cause",
    summary: "Explain causes and prevention.",
    whenToUse: "Use this when an error message is confusing or a bug keeps coming back.",
    inputTitle: "Paste an error, log, stack trace, and related code",
    inputHint: "Include what you expected, what happened, and the code around the failure.",
    outputs: ["Why it happened", "What caused it", "How to prevent it"],
    example: `Error: Cannot read properties of undefined (reading 'price')
at checkout (cart.js:4)

for (let i = 0; i <= cart.items.length; i++) {
  total += cart.items[i].price;
}`,
    prompt:
      "Perform root cause analysis. Explain the immediate failure, the underlying code mistake, missing guardrails or tests, and how to avoid the same problem in future work.",
  },
  {
    id: "architecture",
    label: "Architecture Review",
    summary: "Review folder, MVC, backend, and service boundaries.",
    whenToUse: "Use this before scaling a project, adding new modules, or preparing a production release.",
    inputTitle: "Paste folder structure, service notes, or architecture summary",
    inputHint: "Paste routes, controllers, models, service names, and how they communicate.",
    outputs: ["Architecture risks", "Boundary violations", "Cleaner structure"],
    example: `backend/
  server.js
  routes/auth.js
  controllers/authController.js
  models/User.js
frontend/
  src/app/dashboard/review/page.js

Auth controller sends email, validates input, writes DB records, and builds HTML templates.`,
    prompt:
      "Review the architecture. Check folder structure, MVC separation, controller/service responsibilities, backend layering, service communication, dependency boundaries, and maintainability risks. Recommend a cleaner structure with specific file-level changes.",
  },
];

export default function IntelligencePage() {
  return (
    <FeatureWorkspace
      title="Intelligent Review"
      description="Turn raw code, bugs, logs, and architecture notes into severity labels, root causes, and practical fix plans."
      tasks={tasks}
    />
  );
}
