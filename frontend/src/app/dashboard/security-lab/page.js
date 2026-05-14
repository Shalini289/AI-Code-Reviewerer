import FeatureWorkspace from "@/components/FeatureWorkspace";

const tasks = [
  {
    id: "secrets",
    label: "Secret Leakage",
    summary: "Find exposed credentials and sensitive configs.",
    prompt:
      "Scan for secret leakage. Detect API keys, JWT secrets, Firebase configs, AWS credentials, database URLs, tokens, and passwords.",
  },
  {
    id: "malware",
    label: "Malware Signals",
    summary: "Look for suspicious code behavior.",
    prompt:
      "Scan for malware indicators. Check suspicious scripts, obfuscated code, crypto miners, backdoors, unsafe downloads, and remote execution.",
  },
  {
    id: "secure-code",
    label: "Secure Coding",
    summary: "Improve authentication, encryption, and queries.",
    prompt:
      "Suggest secure coding improvements for encryption, password storage, authentication, authorization, SQL queries, Mongo queries, and input validation.",
  },
  {
    id: "quantum-security",
    label: "Quantum Security",
    summary: "Assess post-quantum cryptography risk.",
    prompt:
      "Check for weak cryptography and future quantum-vulnerable encryption. Suggest practical post-quantum security improvements.",
  },
];

export default function SecurityLabPage() {
  return <FeatureWorkspace title="Security Lab" tasks={tasks} />;
}
