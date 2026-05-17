import FeatureWorkspace from "@/components/FeatureWorkspace";

const tasks = [
  {
    id: "team-review",
    label: "Team Review",
    summary: "Create reviewer assignments and discussion prompts.",
    whenToUse: "Use this when several people need to review the same change from different angles.",
    inputTitle: "Paste PR summary, changed files, and team roles",
    inputHint: "Include changed modules, risk areas, reviewers, deadlines, and what needs approval.",
    outputs: ["Reviewer assignments", "Discussion prompts", "Resolution checklist"],
    example: `PR summary:
Adds password reset email flow and improves AI review prompt handling.
Changed areas:
- auth controller
- email config
- review controller
Team:
- Backend reviewer
- Frontend reviewer
- Security reviewer`,
    prompt:
      "Create a team review workspace plan. Assign reviewer roles, define what each reviewer should inspect, add AI comments, human discussion prompts, required approvals, and resolvable discussion items.",
  },
  {
    id: "pr-review",
    label: "Pull Request Review",
    summary: "Generate PR comments and risk analysis.",
    whenToUse: "Use this before merging a branch, especially when you want professional review comments.",
    inputTitle: "Paste PR description, diff summary, or changed code",
    inputHint: "Include tests run, files touched, known risks, and screenshots if relevant.",
    outputs: ["PR comments", "Risk analysis", "Merge recommendation"],
    example: `PR:
Feature: guided labs UI
Files:
- FeatureWorkspace.js
- dashboard.css
Tests:
- npm run lint passed
Concern:
Need mobile layout to stay readable.`,
    prompt:
      "Act as an AI pull request reviewer. Generate actionable PR comments, risk analysis, security score, test gaps, merge recommendation, and any blocking issues.",
  },
  {
    id: "timeline",
    label: "Review Timeline",
    summary: "Track change history and trends.",
    whenToUse: "Use this when reconstructing how a bug appeared or summarizing progress across reviews.",
    inputTitle: "Paste commits, timeline notes, or review history",
    inputHint: "Include dates if available, who changed what, and when the bug started.",
    outputs: ["Timeline", "Possible bug introduction point", "Improvement trend"],
    example: `Timeline:
May 1: Added review controller.
May 3: Added JSON parsing fallback.
May 5: Docker compose backend env changed.
May 6: Users reported "Review failed" message.`,
    prompt:
      "Create a review history timeline. Track who changed what, likely bug introduction points, improvement trends, unresolved risks, and recommended next checks.",
  },
  {
    id: "commit",
    label: "Commit Message",
    summary: "Write professional git messages.",
    whenToUse: "Use this when your change is ready and you need a clean commit summary.",
    inputTitle: "Paste changed files and test results",
    inputHint: "Include the reason for the change and anything reviewers should know.",
    outputs: ["Commit title", "Commit body", "Testing note"],
    example: `Changed:
- Improved lab descriptions and examples.
- Added clearer task guidance.
- Updated responsive lab layout.
Tests:
- npm run lint`,
    prompt:
      "Generate a professional git commit message with a concise imperative title, bullet body, reviewer context, and testing note for this change.",
  },
];

export default function CollaborationPage() {
  return (
    <FeatureWorkspace
      title="Collaboration"
      description="Prepare team reviews, PR feedback, review timelines, and commit messages from one easy-to-follow workspace."
      tasks={tasks}
    />
  );
}
