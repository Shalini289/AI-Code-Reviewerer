import FeatureWorkspace from "@/components/FeatureWorkspace";

const tasks = [
  {
    id: "async",
    label: "Async/Await",
    summary: "Modernize callback or promise-heavy code.",
    prompt:
      "Refactor this code to modern async/await. Keep behavior the same and explain the changes.",
  },
  {
    id: "conditions",
    label: "Nested Conditions",
    summary: "Simplify complex branches.",
    prompt:
      "Optimize nested conditions. Use guard clauses, clearer branching, and lower cognitive complexity.",
  },
  {
    id: "split",
    label: "Split Functions",
    summary: "Break large functions into modules.",
    prompt:
      "Split huge functions into smaller functions/modules. Return a clean modular version and explain responsibilities.",
  },
  {
    id: "modernize",
    label: "Modernize Legacy Code",
    summary: "Upgrade old JS/C++ and callback patterns.",
    prompt:
      "Modernize this legacy code. Convert old JavaScript to ES6+ or old C++ to modern C++ where applicable.",
  },
];

export default function RefactorLabPage() {
  return <FeatureWorkspace title="Refactor Lab" tasks={tasks} />;
}
