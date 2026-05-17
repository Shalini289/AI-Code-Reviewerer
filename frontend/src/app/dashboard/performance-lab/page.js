import FeatureWorkspace from "@/components/FeatureWorkspace";

const tasks = [
  {
    id: "runtime",
    label: "Runtime Simulation",
    summary: "Estimate CPU, memory, and bottlenecks.",
    whenToUse: "Use this before optimizing, when you need to know where time and memory are likely being spent.",
    inputTitle: "Paste code plus expected data size",
    inputHint: "Include loops, queries, input size, and any slow logs or timing notes.",
    outputs: ["Time and space estimate", "Likely bottlenecks", "Optimization targets"],
    example: `function findMatches(users, orders) {
  const matches = [];
  for (const user of users) {
    for (const order of orders) {
      if (order.userId === user.id) matches.push({ user, order });
    }
  }
  return matches;
}
// users: 50,000, orders: 1,000,000`,
    prompt:
      "Simulate runtime behavior. Estimate time complexity, space complexity, CPU pressure, memory pressure, likely bottlenecks, and performance risks for the provided input size.",
  },
  {
    id: "scalability",
    label: "Scalability",
    summary: "Estimate 1k, 10k, and 1M user readiness.",
    whenToUse: "Use this when planning growth, launch readiness, or architecture changes.",
    inputTitle: "Paste architecture notes, route code, or workload assumptions",
    inputHint: "Include request volume, database usage, caching, background jobs, and third-party APIs.",
    outputs: ["1k/10k/1M readiness", "Scaling blockers", "Recommended architecture moves"],
    example: `API design:
- GET /reviews loads all reviews for a user with no pagination.
- Each review document stores the full code snippet and AI response.
- MongoDB has indexes on userId only.
- Dashboard refreshes every 5 seconds.`,
    prompt:
      "Predict whether this design can handle 1k, 10k, and 1M users. Explain bottlenecks, database and network risks, scaling recommendations, and what must be measured before production.",
  },
  {
    id: "queries",
    label: "Query Optimization",
    summary: "Improve SQL, Mongo, and Redis usage.",
    whenToUse: "Use this when database calls are slow or a route does too much data loading.",
    inputTitle: "Paste SQL, Mongo, Redis, or ORM query code",
    inputHint: "Include indexes, filters, projections, sorting, pagination, and sample document/table shape.",
    outputs: ["Index suggestions", "Query rewrite", "Caching ideas"],
    example: `const reviews = await Review.find({ user: userId })
  .sort({ createdAt: -1 });

const users = await User.find({});
const matches = users.filter((user) => reviews.some((review) => review.user === user.id));`,
    prompt:
      "Review SQL queries, MongoDB queries, Redis usage, and ORM patterns. Suggest indexes, projections, pagination, query rewrites, caching, batching, and data-model improvements.",
  },
  {
    id: "quantum",
    label: "Quantum-inspired",
    summary: "Compare classical and quantum-inspired complexity.",
    whenToUse: "Use this for learning or research-style comparison, not as a guarantee of real quantum speedup.",
    inputTitle: "Paste an algorithm and input assumptions",
    inputHint: "Include current complexity, data size, and the search or optimization problem being solved.",
    outputs: ["Classical complexity", "Quantum-inspired estimate", "Practical recommendation"],
    example: `Problem:
Find whether any two numbers in a list sum to target.
Current approach checks every pair.
Input size can reach 2,000,000 numbers.`,
    prompt:
      "Analyze classical and quantum-inspired optimization. Compare the current complexity with realistic classical improvements and any theoretical quantum-inspired possibility. Clearly mark speculative claims and recommend the practical approach.",
  },
];

export default function PerformanceLabPage() {
  return (
    <FeatureWorkspace
      title="Performance Lab"
      description="Estimate bottlenecks, query risks, scalability limits, and algorithmic complexity before performance issues reach users."
      tasks={tasks}
    />
  );
}
