import FeatureWorkspace from "@/components/FeatureWorkspace";

const tasks = [
  {
    id: "severity",
    label: "Severity Classification",
    summary: "Classify issues by severity and production impact.",
    prompt:
      "Classify every issue in this code as Critical, High, Medium, Low, or Informational. Explain which issues may break production and why.",
  },
  {
    id: "priority",
    label: "Priority Fix Plan",
    summary: "Create an ordered fix plan.",
    prompt:
      "Create a priority fix plan. Identify what to fix first, what can break production, and what affects scalability.",
  },
  {
    id: "root-cause",
    label: "Root Cause",
    summary: "Explain causes and prevention.",
    prompt:
      "Perform root cause analysis. Explain why each error happened, what caused it, and how to avoid it in future.",
  },
  {
    id: "architecture",
    label: "Architecture Review",
    summary: "Review folder, MVC, backend, and service boundaries.",
    prompt:
      "Review architecture. Check folder structure, MVC violations, backend layering, service communication, and dependency boundaries.",
  },
];

export default function IntelligencePage() {
  return <FeatureWorkspace title="Intelligent Review" tasks={tasks} />;
}
