import FeatureWorkspace from "@/components/FeatureWorkspace";

const tasks = [
  {
    id: "async",
    label: "Async/Await",
    summary: "Modernize callback or promise-heavy code.",
    whenToUse: "Use this when nested callbacks or mixed promise chains make the flow hard to read.",
    inputTitle: "Paste callback, promise, or async code",
    inputHint: "Paste a function that uses callbacks, .then chains, or inconsistent error handling.",
    outputs: ["Modern async version", "Error handling notes", "Behavior-preserving explanation"],
    example: `function loadUser(id, done) {
  db.findUser(id, function (err, user) {
    if (err) return done(err);
    db.findOrders(user.id, function (err, orders) {
      if (err) return done(err);
      done(null, { user, orders });
    });
  });
}`,
    prompt:
      "Refactor this code to modern async/await. Preserve behavior, improve error handling, avoid hidden control-flow changes, and explain the important changes.",
  },
  {
    id: "conditions",
    label: "Nested Conditions",
    summary: "Simplify complex branches.",
    whenToUse: "Use this when code is correct but difficult to scan because conditions are deeply nested.",
    inputTitle: "Paste a complex function with many branches",
    inputHint: "Paste validation, permission, checkout, or decision logic with several nested if blocks.",
    outputs: ["Simpler branching", "Lower complexity", "Readable guard clauses"],
    example: `function canDelete(user, item) {
  if (user) {
    if (item) {
      if (user.role === "admin") return true;
      if (item.ownerId === user.id) {
        if (!item.locked) return true;
      }
    }
  }
  return false;
}`,
    prompt:
      "Optimize nested conditions. Use guard clauses, clear boolean names, simpler branching, and lower cognitive complexity while keeping the same behavior.",
  },
  {
    id: "split",
    label: "Split Functions",
    summary: "Break large functions into modules.",
    whenToUse: "Use this when one function handles validation, database work, formatting, and side effects together.",
    inputTitle: "Paste a large function or module",
    inputHint: "Paste the whole function, including helper calls and side effects.",
    outputs: ["Smaller functions", "Responsibility map", "Suggested filenames"],
    example: `async function handleOrder(req, res) {
  const cart = req.body.cart;
  if (!cart || !cart.items.length) return res.status(400).send("Empty");
  let total = cart.items.reduce((sum, item) => sum + item.price, 0);
  await db.orders.insert({ userId: req.user.id, total, cart });
  await email.send(req.user.email, "Order placed", "Thanks");
  res.json({ total });
}`,
    prompt:
      "Split huge functions into smaller functions or modules. Return a clean modular version, explain each responsibility, and suggest file names when the split crosses module boundaries.",
  },
  {
    id: "modernize",
    label: "Modernize Legacy Code",
    summary: "Upgrade old JS/C++ and callback patterns.",
    whenToUse: "Use this when older code works but uses outdated syntax, APIs, or unsafe patterns.",
    inputTitle: "Paste legacy JavaScript, C++, or callback-heavy code",
    inputHint: "Include the surrounding function so modernization keeps the same behavior.",
    outputs: ["Modern version", "Compatibility notes", "Risky changes to avoid"],
    example: `var users = [];
for (var i = 0; i < rows.length; i++) {
  if (rows[i].active == true) {
    users.push({
      id: rows[i].id,
      name: rows[i].first_name + " " + rows[i].last_name
    });
  }
}`,
    prompt:
      "Modernize this legacy code. Convert old JavaScript to ES6+ or old C++ to modern C++ where applicable, preserve behavior, note compatibility concerns, and avoid unnecessary rewrites.",
  },
];

export default function RefactorLabPage() {
  return (
    <FeatureWorkspace
      title="Refactor Lab"
      description="Clean up hard-to-read code with behavior-preserving refactors, modular splits, and modernization suggestions."
      tasks={tasks}
    />
  );
}
