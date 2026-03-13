import * as acorn from "acorn";

export function estimateComplexity(code) {
  if (!code) return "O(1)";

  try {
    const ast = acorn.parse(code, {
      ecmaVersion: "latest",
      sourceType: "module",
    });

    let maxDepth = 0;
    let currentDepth = 0;
    let hasRecursion = false;
    let functionName = null;

    function walk(node) {
      if (!node) return;

      // detect function name
      if (node.type === "FunctionDeclaration" && node.id) {
        functionName = node.id.name;
      }

      // detect loops
      if (
        node.type === "ForStatement" ||
        node.type === "WhileStatement" ||
        node.type === "DoWhileStatement"
      ) {
        currentDepth++;
        maxDepth = Math.max(maxDepth, currentDepth);
      }

      // detect recursion
      if (
        node.type === "CallExpression" &&
        node.callee?.name === functionName
      ) {
        hasRecursion = true;
      }

      // traverse children
      for (const key in node) {
        const child = node[key];

        if (Array.isArray(child)) {
          child.forEach(walk);
        } else if (child && typeof child.type === "string") {
          walk(child);
        }
      }

      // decrease depth after leaving loop
      if (
        node.type === "ForStatement" ||
        node.type === "WhileStatement" ||
        node.type === "DoWhileStatement"
      ) {
        currentDepth--;
      }
    }

    walk(ast);

    // ⭐ final decision
    if (hasRecursion && maxDepth > 0) return "O(2^n) (possible recursion)";
    if (maxDepth >= 3) return "O(n^3)";
    if (maxDepth === 2) return "O(n^2)";
    if (maxDepth === 1) return "O(n)";
    return "O(1)";
  } catch (err) {
    console.warn("AST parse failed, fallback used");
    return "O(?)";
  }
}