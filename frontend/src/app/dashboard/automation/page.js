import FeatureWorkspace from "@/components/FeatureWorkspace";

const tasks = [
  {
    id: "commit-message",
    label: "Commit Message",
    summary: "Generate a professional commit message.",
    prompt:
      "Generate a professional git commit message for this code/change. Include a title and bullet body.",
  },
  {
    id: "changelog",
    label: "Changelog",
    summary: "Create release notes.",
    prompt:
      "Generate a changelog with release notes, fixed bugs, improvements, and breaking changes.",
  },
  {
    id: "whiteboard",
    label: "Whiteboard",
    summary: "Generate architecture diagrams.",
    prompt:
      "Generate an AI whiteboard architecture diagram and code-to-flowchart Mermaid diagrams for this code or project.",
  },
  {
    id: "reverse",
    label: "Reverse Engineering",
    summary: "Reconstruct architecture and technologies.",
    prompt:
      "Reverse engineer this code/project. Reconstruct architecture, detect technologies, entry points, and limitations.",
  },
];

export default function AutomationPage() {
  return <FeatureWorkspace title="Automation" tasks={tasks} />;
}
