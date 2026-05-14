import FeatureWorkspace from "@/components/FeatureWorkspace";

const tasks = [
  {
    id: "team-review",
    label: "Team Review",
    summary: "Create reviewer assignments and discussion prompts.",
    prompt:
      "Create a team review workspace plan. Assign reviewer roles, add AI comments, human comment prompts, and resolvable discussions.",
  },
  {
    id: "pr-review",
    label: "Pull Request Review",
    summary: "Generate PR comments and risk analysis.",
    prompt:
      "Act as an AI pull request reviewer. Generate PR comments, risk analysis, security score, and merge recommendation.",
  },
  {
    id: "timeline",
    label: "Review Timeline",
    summary: "Track change history and trends.",
    prompt:
      "Create a review history timeline. Track who changed what, possible bug introduction history, and improvement trend.",
  },
  {
    id: "commit",
    label: "Commit Message",
    summary: "Write professional git messages.",
    prompt:
      "Generate a professional git commit message with a concise title and bullet body for this change.",
  },
];

export default function CollaborationPage() {
  return <FeatureWorkspace title="Collaboration" tasks={tasks} />;
}
