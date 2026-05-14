import FeatureWorkspace from "@/components/FeatureWorkspace";

const tasks = [
  {
    id: "deployment-risk",
    label: "Deployment Risk",
    summary: "Predict release failure risk.",
    prompt:
      "Predict deployment risk. Identify risky files, high-risk modules, reasons deployment may fail, and mitigation steps.",
  },
  {
    id: "quality-gates",
    label: "Quality Gates",
    summary: "Create CI/CD block rules.",
    prompt:
      "Design CI/CD quality gates. Block deployment for critical bugs, weak security score, low tests, unsafe config, or dependency risk.",
  },
  {
    id: "docker-k8s",
    label: "Docker & Kubernetes",
    summary: "Review infrastructure config.",
    prompt:
      "Review Dockerfiles, docker-compose files, Kubernetes YAML, and infrastructure configs for security, reliability, and production readiness.",
  },
  {
    id: "release",
    label: "Release Notes",
    summary: "Generate changelog and sprint report.",
    prompt:
      "Generate release notes, changelog, sprint report, fixed bugs, pending issues, and next deployment checklist.",
  },
];

export default function DevOpsPage() {
  return <FeatureWorkspace title="AI DevOps" tasks={tasks} />;
}
