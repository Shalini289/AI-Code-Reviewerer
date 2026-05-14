import FeatureWorkspace from "@/components/FeatureWorkspace";

const tasks = [
  {
    id: "runtime",
    label: "Runtime Simulation",
    summary: "Estimate CPU, memory, and bottlenecks.",
    prompt:
      "Simulate runtime behavior. Estimate CPU usage, memory usage, time bottlenecks, and performance risks.",
  },
  {
    id: "scalability",
    label: "Scalability",
    summary: "Estimate 1k, 10k, and 1M user readiness.",
    prompt:
      "Predict whether this code can handle 1k, 10k, and 1M users. Explain bottlenecks and scaling recommendations.",
  },
  {
    id: "queries",
    label: "Query Optimization",
    summary: "Improve SQL, Mongo, and Redis usage.",
    prompt:
      "Review SQL queries, MongoDB queries, and Redis usage. Suggest indexes, query rewrites, caching, and data-model improvements.",
  },
  {
    id: "quantum",
    label: "Quantum-inspired",
    summary: "Compare classical and quantum-inspired complexity.",
    prompt:
      "Analyze classical and quantum-inspired optimization. Compare O(N) style complexity with possible O(sqrt(N)) or other quantum-inspired estimates.",
  },
];

export default function PerformanceLabPage() {
  return <FeatureWorkspace title="Performance Lab" tasks={tasks} />;
}
