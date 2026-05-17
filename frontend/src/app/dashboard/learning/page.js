import FeatureWorkspace from "@/components/FeatureWorkspace";

const tasks = [
  {
    id: "weaknesses",
    label: "Weakness Detection",
    summary: "Find repeated developer weak spots.",
    whenToUse: "Use this when reviewing your own code and looking for learning patterns, not just one-off bugs.",
    inputTitle: "Paste code, review feedback, or repeated mistakes",
    inputHint: "Paste several snippets or a review report that shows recurring issues.",
    outputs: ["Common mistakes", "Weak concepts", "Recommended practice areas"],
    example: `Recent feedback:
- Forgot null checks in three functions.
- Used nested loops where a map would work.
- Mixed async/await with .then.
- Variable names like a, b, data2 made reviews difficult.`,
    prompt:
      "Identify developer weaknesses from this code or feedback. Detect common mistakes, weak DSA topics, weak syntax concepts, code quality patterns, and the most useful next learning focus.",
  },
  {
    id: "coach",
    label: "Coding Coach",
    summary: "Mentor, interviewer, debugger, teacher.",
    whenToUse: "Use this when you want an explanation and coaching, not just a fixed answer.",
    inputTitle: "Paste code plus what confuses you",
    inputHint: "Ask a direct question like what does this do, can it be optimized, or why is it failing.",
    outputs: ["Simple explanation", "Debugging advice", "Interview-style questions"],
    example: `function twoSum(nums, target) {
  const seen = {};
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen[need] !== undefined) return [seen[need], i];
    seen[nums[i]] = i;
  }
}
Question: Explain this like I am new to hash maps.`,
    prompt:
      "Act as a personalized coding coach. Explain the code in simple English, give debugger tips, suggest improvements, ask useful interviewer-style questions, and recommend one small practice task.",
  },
  {
    id: "practice",
    label: "Practice Plan",
    summary: "Generate learning tasks.",
    whenToUse: "Use this after weakness detection or code review feedback to create a study plan.",
    inputTitle: "Paste weak areas, review findings, or goals",
    inputHint: "Include your target language, skill level, and what you want to improve.",
    outputs: ["Practice questions", "Mini projects", "Learning sequence"],
    example: `Goal: improve JavaScript backend skills.
Weak areas:
- Async error handling
- Mongo query performance
- Writing tests for edge cases`,
    prompt:
      "Create a practice plan with targeted questions, edge-case exercises, mini projects, and a step-by-step learning sequence based on the weaknesses in this code or feedback.",
  },
  {
    id: "difficulty",
    label: "Difficulty Estimate",
    summary: "Rate code complexity level.",
    whenToUse: "Use this to understand whether a task is beginner, intermediate, advanced, or interview-level.",
    inputTitle: "Paste code, algorithm, or problem statement",
    inputHint: "Include constraints and what the function is supposed to do.",
    outputs: ["Difficulty level", "Why it is hard", "Skills required"],
    example: `Problem:
Given a list of intervals, merge overlapping intervals and return the minimum number of meeting rooms required.
Constraints: up to 200,000 intervals.`,
    prompt:
      "Estimate code difficulty as Beginner, Intermediate, Advanced, or FAANG-level. Explain the required concepts, hidden edge cases, time and space complexity, and what a learner should know first.",
  },
];

export default function LearningPage() {
  return (
    <FeatureWorkspace
      title="Learning Coach"
      description="Turn code review feedback into beginner-friendly explanations, practice plans, coaching, and difficulty estimates."
      tasks={tasks}
    />
  );
}
