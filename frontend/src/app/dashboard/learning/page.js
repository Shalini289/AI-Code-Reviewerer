import FeatureWorkspace from "@/components/FeatureWorkspace";

const tasks = [
  {
    id: "weaknesses",
    label: "Weakness Detection",
    summary: "Find repeated developer weak spots.",
    prompt:
      "Identify developer weaknesses from this code. Detect common mistakes, weak DSA topics, and weak syntax concepts.",
  },
  {
    id: "coach",
    label: "Coding Coach",
    summary: "Mentor, interviewer, debugger, teacher.",
    prompt:
      "Act as a personalized coding coach. Give mentor advice, interviewer questions, debugger tips, and teacher-style explanations.",
  },
  {
    id: "practice",
    label: "Practice Plan",
    summary: "Generate learning tasks.",
    prompt:
      "Create a practice plan with questions, learning resources, and project ideas based on the weaknesses in this code.",
  },
  {
    id: "difficulty",
    label: "Difficulty Estimate",
    summary: "Rate code complexity level.",
    prompt:
      "Estimate code difficulty as Beginner, Intermediate, Advanced, or FAANG-level. Explain the reason.",
  },
];

export default function LearningPage() {
  return <FeatureWorkspace title="Learning Coach" tasks={tasks} />;
}
