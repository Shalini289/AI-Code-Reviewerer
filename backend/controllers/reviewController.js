const Review =require("../models/Review");
const axios = require("axios");
const User = require("../models/User");
const fs = require("fs");
const path = require("path");

const readJsonFile = (filePath) => {
  try {
    return JSON.parse(
      fs.readFileSync(filePath, "utf8")
    );
  } catch {
    return null;
  }
};

exports.reviewCode = async (req, res) => {
  try {
    const {
      code,
      language,
      question,
      mode,
      screenshotName,
      screenshotDataUrl,
    } = req.body;

    if (!code?.trim() && !screenshotDataUrl) {
      return res.status(400).json({
        message: "Code or screenshot is required",
      });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        message: "AI service is not configured",
      });
    }

    const backendPackage =
      readJsonFile(
        path.join(__dirname, "../package.json")
      );
    const frontendPackage =
      readJsonFile(
        path.join(__dirname, "../../frontend/package.json")
      );
    const dependencyContext = {
      backend: {
        dependencies: backendPackage?.dependencies || {},
        devDependencies: backendPackage?.devDependencies || {},
      },
      frontend: {
        dependencies: frontendPackage?.dependencies || {},
        devDependencies: frontendPackage?.devDependencies || {},
      },
    };

    const systemPrompt = `You are a deterministic senior code review API.
Return ONLY one raw JSON object. Do not return markdown, prose, comments, code fences, or text outside JSON.
Use the exact keys and value types from the schema. Use [] for no findings, "" for unavailable text, false for unavailable booleans, and 0 for unavailable scores.
Base findings only on the submitted code, screenshot metadata, user question, and dependency manifest context. Do not invent files, frameworks, packages, routes, secrets, tests, PRs, metrics, or runtime behavior.
Be specific: mention concrete functions, variables, code patterns, or dependency names when possible.
Be concise: array items should be actionable and usually under 22 words.
Classify severity by production impact, exploitability, data loss risk, resource exhaustion risk, and user-visible breakage.
If the evidence is uncertain, phrase the item as a risk to verify instead of a confirmed bug.
Every finding string should follow this format when possible: "[Severity] Evidence -> Impact -> Fix".
Examples:
- "[Critical] setInterval without cleanup -> memory leak in long sessions -> clear timer on unmount"
- "[High] req.body merged into Mongo filter -> NoSQL injection risk -> whitelist allowed query fields"
- "[Low] variable x is vague -> slower maintenance -> rename to activeUserCount"

Always use exactly this structure:
{
  "summary": "one sentence describing what the code does",
  "bugs": ["bug description 1", "bug description 2"],
  "performance": "one sentence about performance",
  "readability": "one sentence about readability",
  "bestPractices": ["practice 1", "practice 2"],
  "security": "one sentence about security",
  "improvements": ["improvement 1", "improvement 2"],
  "bugDetection": {
    "nullPointerIssues": ["possible null or undefined dereference"],
    "infiniteLoops": ["loop that may never terminate"],
    "memoryLeaks": ["resource, listener, timer, or allocation leak"],
    "raceConditions": ["shared state or async ordering risk"],
    "logicMistakes": ["incorrect condition, edge case, or calculation"],
    "otherBugs": ["other runtime or correctness issue"]
  },
  "codeQuality": {
    "badPractices": ["bad practice or anti-pattern"],
    "cleanerCode": ["cleaner implementation suggestion"],
    "redundancy": ["duplicate or unnecessary code"],
    "readability": ["naming, formatting, or clarity issue"]
  },
  "complexity": {
    "timeComplexity": "Big-O time complexity with short reason",
    "spaceComplexity": "Big-O space complexity with short reason",
    "unnecessaryNestedLoops": ["nested loop or repeated work that can be reduced"]
  },
  "aiSuggestions": {
    "refactorFunctions": ["function-level refactor suggestion"],
    "optimizeAlgorithms": ["algorithm optimization suggestion"],
    "renameSuggestions": ["specific variable or function rename"],
    "modularization": ["way to split long code into modules/functions"]
  },
  "securityScan": {
    "sqlInjection": ["SQL injection risk"],
    "xss": ["XSS risk"],
    "hardcodedSecrets": ["hardcoded API key, token, password, or secret"],
    "unsafeAuth": ["unsafe authentication or authorization logic"],
    "bufferOverflow": ["buffer overflow or unsafe memory risk"],
    "otherVulnerabilities": ["other security vulnerability"]
  },
  "smartAI": {
    "simpleExplanation": "beginner-friendly explanation in simple English",
    "lineByLineExplanation": [
      {
        "line": "line number or range",
        "code": "short code excerpt",
        "explanation": "what this line does in simple English"
      }
    ],
    "documentation": {
      "functionDescriptions": ["function name and what it does"],
      "apiDocs": ["endpoint, input, output, and behavior if API code is present"],
      "readme": "README-ready usage and overview text for this code"
    },
    "testCases": {
      "unitTests": ["specific unit test case"],
      "edgeCases": ["specific edge case to test"],
      "stressTests": ["random or high-volume stress test idea"]
    },
    "debuggingAssistant": {
      "whyErrorsOccur": ["possible error and why it happens"],
      "suggestedFixes": ["specific fix for an error or failure"],
      "runtimeFailurePredictions": ["runtime failure that may happen with reason"]
    },
    "codeChat": {
      "functionPurpose": "answer to what the main function or code does",
      "optimizationAnswer": "answer to whether this can be optimized",
      "vulnerabilityAnswer": "answer to find vulnerabilities",
      "customQuestionAnswer": "answer to the user's question, or empty string"
    }
  },
  "advancedFeatures": {
    "multiLanguage": {
      "detectedLanguage": "detected language",
      "languageSpecificNotes": ["C++, Java, Python, JavaScript, Go, or Rust-specific note"]
    },
    "githubIntegration": {
      "pullRequestReview": ["PR review suggestion"],
      "commitComments": ["commit comment suggestion"],
      "qualityTrends": ["quality metric to track over time"]
    },
    "cicdIntegration": {
      "deploymentReview": ["auto-review checkpoint for deployment"],
      "pushBlockers": ["issue that should block insecure code pushes"],
      "pipelineSteps": ["CI/CD pipeline step suggestion"]
    },
    "voiceReview": {
      "script": "short verbal explanation script for text-to-speech"
    },
    "screenshotReview": {
      "status": "ready, needs_ocr, or unavailable",
      "uploadedFile": "uploaded screenshot file name or empty string",
      "ocrFindings": ["OCR/code-image analysis finding"],
      "nextSteps": ["next step to complete screenshot-to-code review"]
    }
  },
  "developerProductivity": {
    "codeSimilarity": {
      "similarityRisk": "low, medium, or high",
      "plagiarismSignals": ["pattern that may indicate copied code"],
      "duplicateCode": ["duplicated logic or repeated code block"]
    },
    "codingStandards": {
      "googleStyleGuide": ["Google Style Guide issue where applicable"],
      "pep8": ["PEP8 issue for Python code"],
      "airbnbEslint": ["Airbnb ESLint style issue for JavaScript code"],
      "generalStandards": ["general coding standard issue"]
    },
    "performanceProfiler": {
      "bottlenecks": ["likely runtime bottleneck"],
      "cachingSuggestions": ["specific caching opportunity"],
      "profilingTargets": ["function, loop, query, or operation to profile"]
    },
    "deadCode": {
      "unusedVariables": ["unused variable"],
      "unreachableCode": ["unreachable code path"],
      "unusedImports": ["unused import or dependency"],
      "otherDeadCode": ["other dead code finding"]
    }
  },
  "premiumFeatures": {
    "codeScore": {
      "overall": 0,
      "correctness": 0,
      "security": 0,
      "performance": 0,
      "readability": 0,
      "summary": "short scoring explanation"
    },
    "pairProgrammer": {
      "nextSteps": ["what the developer should do next"],
      "questionsToAsk": ["useful design or debugging question"],
      "implementationPlan": ["step-by-step implementation plan"]
    },
    "fixEntireFile": {
      "available": true,
      "fixedCode": "complete corrected file code",
      "changes": ["change made"]
    },
    "oneClickOptimization": {
      "available": true,
      "optimizedCode": "complete optimized file code",
      "changes": ["optimization made"]
    },
    "collaborativeReview": {
      "sessionSummary": "summary suitable for a shared review session",
      "discussionPrompts": ["prompt for collaborators"]
    },
    "liveExecutionSandbox": {
      "language": "language",
      "canRunInBrowser": false,
      "notes": ["execution sandbox note"]
    },
    "leaderboard": {
      "scoreLabel": "label for leaderboard entry",
      "improvementPoints": 0
    }
  },
  "intelligentReview": {
    "severityClassification": {
      "critical": ["issue that can cause production outage, data loss, major security exposure, memory leak, or crash"],
      "high": ["issue likely to break important functionality or security"],
      "medium": ["issue with moderate correctness, maintainability, or scalability impact"],
      "low": ["minor issue such as bad naming or small cleanup"],
      "informational": ["note, explanation, or non-blocking observation"]
    },
    "autoPriorityFixing": {
      "fixFirst": ["highest-priority bug or issue to fix first"],
      "productionBreakers": ["issue that may break production"],
      "scalabilityRisks": ["issue that affects scalability"],
      "recommendedOrder": ["ordered fix plan from most urgent to least urgent"]
    },
    "rootCauseAnalysis": {
      "causes": ["why the issue happened"],
      "triggeringCode": ["specific code or pattern that caused it"],
      "prevention": ["how to avoid it in the future"]
    },
    "architectureReview": {
      "folderStructure": ["folder or module structure issue"],
      "mvcViolations": ["MVC pattern violation"],
      "microserviceCommunication": ["microservice communication risk or improvement"],
      "backendArchitecture": ["bad backend architecture or layering issue"]
    },
    "dependencyAnalysis": {
      "vulnerablePackages": ["package with possible vulnerability or security concern"],
      "outdatedLibraries": ["package that may be outdated based on provided manifest"],
      "unusedDependencies": ["dependency that appears unused from the reviewed code or project context"],
      "heavyDependencies": ["dependency that may increase bundle size or runtime weight"],
      "recommendations": ["dependency cleanup or upgrade recommendation"]
    }
  },
  "advancedSecurity": {
    "secretLeakage": {
      "apiKeys": ["possible exposed API key"],
      "jwtSecrets": ["possible JWT secret exposure"],
      "firebaseConfigs": ["possible Firebase config exposure"],
      "awsCredentials": ["possible AWS credential exposure"],
      "otherSecrets": ["other leaked secret"]
    },
    "malwareDetection": {
      "suspiciousScripts": ["suspicious script behavior"],
      "cryptoMiners": ["crypto mining indicator"],
      "obfuscatedCode": ["obfuscated code indicator"],
      "backdoors": ["possible backdoor behavior"]
    },
    "secureCodingSuggestions": {
      "encryption": ["better encryption or hashing method"],
      "authentication": ["secure authentication improvement"],
      "databaseQueries": ["safer SQL, MongoDB, or Redis query suggestion"]
    }
  },
  "aiRefactoring": {
    "oneClickRefactoring": {
      "asyncAwait": "code converted to async/await, or empty string",
      "loopsToRecursion": "code converted from loops to recursion, or empty string",
      "nestedConditions": "code with optimized nested conditions, or empty string",
      "splitFunctions": ["suggested split for huge functions"]
    },
    "legacyModernization": {
      "modernJavaScript": "old JavaScript converted to modern ES6+, or empty string",
      "modernCpp": "old C++ converted to modern C++, or empty string",
      "callbacksToPromises": "callback code converted to promises, or empty string"
    },
    "multiVersionComparison": {
      "originalCode": "original code summary or excerpt",
      "optimizedCode": "optimized code version",
      "highlyOptimizedCode": "highly optimized code version",
      "tradeoffs": ["tradeoff between versions"]
    }
  },
  "smartLearning": {
    "developerWeaknessDetection": {
      "commonMistakes": ["repeated mistake pattern"],
      "weakDsaTopics": ["weak data structure or algorithm topic"],
      "weakSyntaxConcepts": ["weak syntax or language concept"],
      "practiceQuestions": ["practice question"],
      "learningResources": ["learning resource suggestion"],
      "projects": ["project idea to improve"]
    },
    "personalizedCodingCoach": {
      "mentorAdvice": ["mentor-style advice"],
      "interviewerQuestions": ["interview question"],
      "debuggerTips": ["debugger tip"],
      "teacherExplanation": ["teaching explanation"]
    },
    "difficultyEstimator": {
      "level": "Beginner, Intermediate, Advanced, or FAANG-level",
      "reason": "short reason for difficulty level"
    }
  },
  "collaborationFeatures": {
    "teamReviewWorkspace": {
      "multipleReviewers": ["reviewer role or assignment"],
      "aiComments": ["AI review comment"],
      "humanCommentPrompts": ["prompt for human reviewer"],
      "resolvableDiscussions": ["discussion that should be resolved"]
    },
    "aiPullRequestReviewer": {
      "autoPrComments": ["automatic PR comment"],
      "riskAnalysis": ["PR risk"],
      "securityScore": 0
    },
    "reviewHistoryTimeline": {
      "whoChangedWhat": ["change ownership or author note"],
      "bugIntroductionHistory": ["likely bug introduction point"],
      "improvementTrend": ["trend or improvement over time"]
    }
  },
  "aiDevOps": {
    "deploymentRiskPrediction": {
      "failureChance": "low, medium, high, or critical",
      "riskyFiles": ["risky file"],
      "highRiskModules": ["high-risk module"],
      "reasons": ["deployment risk reason"]
    },
    "cicdQualityGates": {
      "securityScoreThreshold": 0,
      "testCoverageGate": "coverage threshold or recommendation",
      "criticalBugGate": ["critical issue that should block deployment"],
      "deploymentDecision": "pass, warn, or block"
    },
    "dockerKubernetesReview": {
      "dockerfiles": ["Dockerfile issue or improvement"],
      "kubernetesYaml": ["Kubernetes YAML issue or improvement"],
      "infrastructureConfigs": ["infrastructure config issue or improvement"]
    }
  },
  "performanceEngineering": {
    "runtimeSimulation": {
      "cpuUsage": "predicted CPU usage",
      "memoryUsage": "predicted memory usage",
      "timeBottlenecks": ["time bottleneck"]
    },
    "scalabilityPrediction": {
      "oneThousandUsers": "can it handle 1k users and why",
      "tenThousandUsers": "can it handle 10k users and why",
      "oneMillionUsers": "can it handle 1M users and why",
      "scalingRecommendations": ["scaling recommendation"]
    },
    "queryOptimization": {
      "sqlQueries": ["SQL query improvement"],
      "mongoQueries": ["MongoDB query improvement"],
      "redisUsage": ["Redis usage improvement"]
    }
  },
  "competitiveFeatures": {
    "codingScoreSystem": {
      "maintainabilityScore": 0,
      "securityScore": 0,
      "readabilityScore": 0,
      "performanceScore": 0,
      "overallCompetitiveScore": 0,
      "scoreSummary": "short score summary"
    },
    "globalLeaderboard": {
      "cleanestCodeRank": "rank label or estimate",
      "fewestBugsRank": "rank label or estimate",
      "bestOptimizationRank": "rank label or estimate",
      "leaderboardSummary": "why this code would rank there"
    },
    "achievementBadges": ["Bug Hunter, Optimization Master, Security Expert, or other earned badge"]
  },
  "aiAutomation": {
    "commitMessage": {
      "title": "professional git commit title",
      "body": ["professional git commit bullet"]
    },
    "changelog": {
      "releaseNotes": ["release note"],
      "fixedBugs": ["fixed bug"],
      "breakingChanges": ["breaking change"]
    },
    "sprintReport": {
      "teamProgress": ["team progress summary"],
      "fixedBugs": ["bug fixed in this sprint"],
      "pendingIssues": ["pending issue"],
      "nextSteps": ["next sprint step"]
    }
  },
  "nextLevelFeatures": {
    "voiceControlledAssistant": {
      "supportedCommands": ["supported voice command"],
      "detectedIntent": "Explain this function, Optimize this code, or empty string",
      "response": "assistant response for the command"
    },
    "whiteboardSystem": {
      "architectureDiagram": "Mermaid architecture diagram text",
      "diagramNotes": ["architecture note"]
    },
    "codeToFlowchart": {
      "flowchart": "Mermaid flowchart text",
      "uml": "Mermaid UML-like class or component diagram text",
      "sequenceDiagram": "Mermaid sequence diagram text"
    },
    "reverseEngineering": {
      "architecture": ["reconstructed architecture point"],
      "technologies": ["detected technology"],
      "entryPoints": ["likely entry point"],
      "limitations": ["reverse engineering limitation"]
    }
  },
  "quantumInspiredAnalysis": {
    "optimizationScore": {
      "classicalScore": 0,
      "quantumInspiredEstimate": 0,
      "classicalComplexity": "classical Big-O such as O(N)",
      "quantumInspiredComplexity": "quantum-inspired estimate such as O(sqrt(N))",
      "summary": "short comparison summary"
    },
    "quantumSecureCodeChecker": {
      "weakCryptography": ["weak cryptography issue"],
      "quantumVulnerableEncryption": ["future quantum-vulnerable encryption issue"],
      "postQuantumRecommendations": ["post-quantum security recommendation"]
    },
    "quantumAlgorithmRecommendation": {
      "classicalAlgorithm": "recommended classical algorithm",
      "quantumAlgorithmPossibility": "possible quantum or quantum-inspired algorithm",
      "whenQuantumHelps": ["case where quantum-inspired approach may help"],
      "whenClassicalIsBetter": ["case where classical approach is better"]
    },
    "quantumComplexityAnalyzer": {
      "classical": "classical complexity analysis",
      "quantumInspired": "quantum-inspired complexity analysis",
      "practicality": "practicality of quantum-inspired optimization for this code"
    }
  }
}`;

const userPrompt = `Task: Review the submitted ${language || "unknown"} code and return the JSON object matching the schema exactly.

Review priorities:
1. Correctness and runtime failures.
2. Security vulnerabilities and secret exposure.
3. Production-breaking, scalability, and deployment risks.
4. Performance and complexity.
5. Maintainability, readability, standards, and learning guidance.
6. Optional/premium outputs requested by mode.

Precision rules:
- Do not list a category unless there is direct code evidence or a clear dependency-context risk.
- Every critical/high issue must include the concrete cause in rootCauseAnalysis and autoPriorityFixing.
- Use Big-O notation only when it can be inferred from the code.
- Scores must be integers from 0 to 100.
- Score correctness, security, performance, and readability independently before setting overall.
- Overall score must be the rounded average adjusted down for any Critical or High issue.
- Difficulty level must be one of Beginner, Intermediate, Advanced, or FAANG-level.
- For screenshot-only input, do not pretend OCR happened; set screenshotReview.status to needs_ocr.
- For fixedCode or optimizedCode, return complete corrected code, not a diff or explanation.
- For Mermaid diagrams, return only Mermaid syntax in the diagram field.
- lineByLineExplanation should explain important lines or blocks only, not every blank/comment line.
- testCases.unitTests must include named test intent plus input and expected output when inferable.
- aiSuggestions.renameSuggestions must include old name -> new name -> reason.
- dependencyAnalysis must reference package names from the manifest context only.
- dockerKubernetesReview must stay empty unless Docker/Kubernetes/config code is submitted.
- queryOptimization must stay empty unless SQL, MongoDB, Redis, ORM, or query code is submitted.
- quantumInspiredAnalysis must be practical: if quantum is not useful, explain why classical is better.
- Do not fill premium fixedCode/optimizedCode with the original code unless no change is needed; then explain in changes.

Severity rubric:
- Critical: production crash, data loss, credential exposure, auth bypass, exploitable injection, unbounded resource leak.
- High: likely functional breakage, serious security flaw, race condition, unsafe deploy blocker, major scalability limit.
- Medium: edge-case bug, inefficient algorithm, incomplete validation, maintainability risk with moderate impact.
- Low: naming, formatting, minor duplication, small readability or convention issue.
- Informational: explanation, learning note, optional idea, or observation with no required fix.

Check for:
- Bug detection: null pointer issues, infinite loops, memory leaks, race conditions, logic mistakes.
- Code quality: bad practices, cleaner code, redundancy, readability.
- Complexity: time complexity, space complexity, unnecessary nested loops.
- AI-generated suggestions: refactor functions, optimize algorithms, meaningful renames, modularization.
- Security scanning: SQL injection, XSS, hardcoded API keys/secrets, unsafe authentication logic, buffer overflow risks.
- Smart AI features: explain code in simple English, beginner-friendly explanations, line-by-line explanation mode, automatic documentation, function descriptions, API docs, README generation, unit tests, edge cases, random stress tests, debugging help, why errors occur, fixes, runtime failure predictions, and code chat answers.
- Advanced features: multi-language analysis for C++, Java, Python, JavaScript, Go, and Rust; GitHub pull request review suggestions; commit comment suggestions; code quality trend tracking; CI/CD auto-review steps; insecure push blockers; voice review script; screenshot-to-code review readiness.
- Developer productivity features: code similarity risk, plagiarism signals, duplicate code detection, coding standard checks for Google Style Guide, PEP8, and Airbnb ESLint rules, performance bottlenecks, caching suggestions, profiling targets, dead code, unused variables, unreachable code, and unused imports.
- Premium features: real-time collaborative review summary, AI pair programmer guidance, fix-entire-file output, one-click optimized output, dark/light IDE theme support, live execution sandbox notes, AI code scoring, and leaderboard score metadata.
- Intelligent review features: classify every important issue by severity (Critical, High, Medium, Low, Informational), decide what to fix first, identify production breakers, identify scalability risks, provide root cause analysis, review architecture, folder structure, MVC violations, microservice communication, backend architecture, and analyze dependencies.
- Advanced security functions: secret leakage detection for API keys, JWT secrets, Firebase configs, AWS credentials; malware detection for suspicious scripts, crypto miners, obfuscated code, and backdoors; secure coding suggestions for encryption, authentication, and database queries.
- AI refactoring features: one-click refactoring ideas for async/await, loops to recursion, nested conditions, huge functions; legacy modernization for old JavaScript, old C++, callbacks to promises; multi-version comparison with original, optimized, and highly optimized code.
- Smart learning features: developer weakness detection, common mistakes, weak DSA topics, weak syntax concepts, practice questions, resources, projects, personalized coding coach, mentor/interviewer/debugger/teacher modes, and difficulty estimation.
- Collaboration features: team review workspace, multiple reviewers, AI comments, human comment prompts, resolvable discussions, AI pull request reviewer, PR risk analysis, security score, review history timeline.
- AI DevOps features: deployment risk prediction, risky files, high-risk modules, CI/CD quality gates, security threshold, test coverage gate, critical bug gate, Dockerfile/Kubernetes/infrastructure config review.
- AI performance engineering: runtime simulation for CPU, memory, time bottlenecks; scalability prediction for 1k, 10k, and 1M users; SQL, MongoDB, and Redis query optimization.
- Competitive and leaderboard features: maintainability, security, readability, performance, and competitive scores; global leaderboard ranking estimates for cleanest code, fewest bugs, and best optimization; achievement badges like Bug Hunter, Optimization Master, and Security Expert.
- AI automation features: professional git commit message, changelog/release notes, sprint report with team progress, fixed bugs, pending issues, and next steps.
- Next-level features: voice controlled coding assistant commands, whiteboard architecture diagram, code-to-flowchart, UML, sequence diagram, and reverse-engineering architecture/technology detection.
- Quantum-inspired analysis: classical optimization score, quantum-inspired optimization estimate, classical vs quantum-inspired complexity such as O(N) vs O(sqrt(N)), weak cryptography, future quantum-vulnerable encryption, post-quantum security suggestions, classical algorithm recommendation, quantum algorithm possibility, and quantum complexity analysis.

Use empty arrays for categories with no findings. Do not invent issues if the risk is not present.
Severity guidance examples: memory leak is Critical when it can exhaust resources; bad naming is Low; explanatory notes are Informational.
Requested action mode: ${mode || "analyze"}.
If mode is "fix", prioritize premiumFeatures.fixEntireFile.fixedCode.
If mode is "optimize", prioritize premiumFeatures.oneClickOptimization.optimizedCode.
When returning fixedCode or optimizedCode, include the complete file/code snippet, not a diff.
Answer this optional code question if provided: ${question || "No custom question provided."}
Screenshot upload: ${screenshotName || "No screenshot uploaded."}
Screenshot data present: ${screenshotDataUrl ? "Yes. If the code text is not included below, set screenshotReview.status to needs_ocr and ask for OCR text or a vision/OCR integration." : "No."}
Project dependency manifest context:
${JSON.stringify(dependencyContext, null, 2)}

Submitted code:
<<<CODE
${code || ""}
CODE`;

const compactSystemPrompt = `You are a deterministic senior code review API.
Return ONLY a valid raw JSON object. No markdown, no code fences, no prose outside JSON.
Use evidence from the submitted code only. Do not invent files, libraries, routes, tests, secrets, metrics, or vulnerabilities.
Use [] for no findings, "" for unavailable text, false for unavailable booleans, and 0 for unavailable scores.
Every important issue should use this format: "[Severity] Evidence -> Impact -> Fix".
Severity labels: Critical, High, Medium, Low, Informational.
Scores must be integers from 0 to 100.
If a category is not relevant to the submitted code, leave it empty.`;

const compactUserPrompt = `Review this ${language || "unknown"} code.

Requested mode: ${mode || "analyze"}
User question: ${question || "None"}
Screenshot file: ${screenshotName || "None"}
Screenshot data present: ${screenshotDataUrl ? "yes, but no OCR is available unless code text is also provided" : "no"}

Return JSON with this structure. You may omit deeply nested fields only when not relevant, but keep these top-level keys:
{
  "summary": "one sentence",
  "bugs": ["[Severity] Evidence -> Impact -> Fix"],
  "performance": "specific performance summary",
  "readability": "specific readability summary",
  "bestPractices": ["[Severity] Evidence -> Impact -> Fix"],
  "security": "specific security summary",
  "improvements": ["[Severity] Evidence -> Impact -> Fix"],
  "bugDetection": {
    "nullPointerIssues": [],
    "infiniteLoops": [],
    "memoryLeaks": [],
    "raceConditions": [],
    "logicMistakes": [],
    "otherBugs": []
  },
  "codeQuality": {
    "badPractices": [],
    "cleanerCode": [],
    "redundancy": [],
    "readability": []
  },
  "complexity": {
    "timeComplexity": "Big-O with reason if inferable",
    "spaceComplexity": "Big-O with reason if inferable",
    "unnecessaryNestedLoops": []
  },
  "aiSuggestions": {
    "refactorFunctions": [],
    "optimizeAlgorithms": [],
    "renameSuggestions": ["old name -> new name -> reason"],
    "modularization": []
  },
  "securityScan": {
    "sqlInjection": [],
    "xss": [],
    "hardcodedSecrets": [],
    "unsafeAuth": [],
    "bufferOverflow": [],
    "otherVulnerabilities": []
  },
  "smartAI": {
    "simpleExplanation": "beginner-friendly explanation",
    "lineByLineExplanation": [{ "line": "line or range", "code": "excerpt", "explanation": "meaning" }],
    "testCases": {
      "unitTests": ["test name -> input -> expected output"],
      "edgeCases": [],
      "stressTests": []
    },
    "codeChat": {
      "functionPurpose": "",
      "optimizationAnswer": "",
      "vulnerabilityAnswer": "",
      "customQuestionAnswer": ""
    }
  },
  "premiumFeatures": {
    "codeScore": {
      "overall": 0,
      "correctness": 0,
      "security": 0,
      "performance": 0,
      "readability": 0,
      "summary": ""
    },
    "fixEntireFile": {
      "available": false,
      "fixedCode": "",
      "changes": []
    },
    "oneClickOptimization": {
      "available": false,
      "optimizedCode": "",
      "changes": []
    },
    "leaderboard": {
      "scoreLabel": "",
      "improvementPoints": 0
    }
  },
  "intelligentReview": {
    "severityClassification": {
      "critical": [],
      "high": [],
      "medium": [],
      "low": [],
      "informational": []
    },
    "autoPriorityFixing": {
      "fixFirst": [],
      "productionBreakers": [],
      "scalabilityRisks": [],
      "recommendedOrder": []
    },
    "rootCauseAnalysis": {
      "causes": [],
      "triggeringCode": [],
      "prevention": []
    }
  },
  "advancedSecurity": {
    "secretLeakage": {
      "apiKeys": [],
      "jwtSecrets": [],
      "firebaseConfigs": [],
      "awsCredentials": [],
      "otherSecrets": []
    },
    "malwareDetection": {
      "suspiciousScripts": [],
      "cryptoMiners": [],
      "obfuscatedCode": [],
      "backdoors": []
    },
    "secureCodingSuggestions": {
      "encryption": [],
      "authentication": [],
      "databaseQueries": []
    }
  }
}

Mode-specific rules:
- analyze: prioritize findings and explanations.
- fix: put complete corrected code in premiumFeatures.fixEntireFile.fixedCode.
- optimize: put complete optimized code in premiumFeatures.oneClickOptimization.optimizedCode.

Dependency context:
${JSON.stringify(dependencyContext, null, 2)}

Submitted code:
<<<CODE
${code || ""}
CODE`;

   const aiRes = await axios.post(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    model: "llama-3.1-8b-instant",
    temperature: 0.1,
    messages: [
      { role: "system", content: compactSystemPrompt },
      { role: "user",   content: compactUserPrompt },
    ],
  },
  {
    headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
    timeout: 45000,
  }
);

    let aiText =
      aiRes.data?.choices?.[0]?.message?.content || "";

    // 🔥 CLEAN RESPONSE (IMPORTANT)
  aiText = aiText.replace(/```json|```/g, "").trim();

  const start = aiText.indexOf("{");
const end = aiText.lastIndexOf("}");

  if (start !== -1 && end !== -1) {
  aiText = aiText.substring(start, end + 1);
}

    let parsed;

    try {
      parsed = JSON.parse(aiText);
    } catch (err) {
      console.log("PARSE ERROR:", aiText);

      // ✅ SAFE FALLBACK (NOT prompt)
      parsed = {
        summary: "AI response formatting issue",
        bugs: [],
        performance: "",
        readability: "",
        bestPractices: [],
        security: "",
        improvements: [],
        bugDetection: {
          nullPointerIssues: [],
          infiniteLoops: [],
          memoryLeaks: [],
          raceConditions: [],
          logicMistakes: [],
          otherBugs: [],
        },
        codeQuality: {
          badPractices: [],
          cleanerCode: [],
          redundancy: [],
          readability: [],
        },
        complexity: {
          timeComplexity: "",
          spaceComplexity: "",
          unnecessaryNestedLoops: [],
        },
        aiSuggestions: {
          refactorFunctions: [],
          optimizeAlgorithms: [],
          renameSuggestions: [],
          modularization: [],
        },
        securityScan: {
          sqlInjection: [],
          xss: [],
          hardcodedSecrets: [],
          unsafeAuth: [],
          bufferOverflow: [],
          otherVulnerabilities: [],
        },
        smartAI: {
          simpleExplanation: "",
          lineByLineExplanation: [],
          documentation: {
            functionDescriptions: [],
            apiDocs: [],
            readme: "",
          },
          testCases: {
            unitTests: [],
            edgeCases: [],
            stressTests: [],
          },
          debuggingAssistant: {
            whyErrorsOccur: [],
            suggestedFixes: [],
            runtimeFailurePredictions: [],
          },
          codeChat: {
            functionPurpose: "",
            optimizationAnswer: "",
            vulnerabilityAnswer: "",
            customQuestionAnswer: "",
          },
        },
        advancedFeatures: {
          multiLanguage: {
            detectedLanguage: language || "",
            languageSpecificNotes: [],
          },
          githubIntegration: {
            pullRequestReview: [],
            commitComments: [],
            qualityTrends: [],
          },
          cicdIntegration: {
            deploymentReview: [],
            pushBlockers: [],
            pipelineSteps: [],
          },
          voiceReview: {
            script: "",
          },
          screenshotReview: {
            status: screenshotDataUrl ? "needs_ocr" : "unavailable",
            uploadedFile: screenshotName || "",
            ocrFindings: [],
            nextSteps: screenshotDataUrl
              ? ["Install OCR or vision support, then rerun the review with extracted code text."]
              : [],
          },
        },
        developerProductivity: {
          codeSimilarity: {
            similarityRisk: "low",
            plagiarismSignals: [],
            duplicateCode: [],
          },
          codingStandards: {
            googleStyleGuide: [],
            pep8: [],
            airbnbEslint: [],
            generalStandards: [],
          },
          performanceProfiler: {
            bottlenecks: [],
            cachingSuggestions: [],
            profilingTargets: [],
          },
          deadCode: {
            unusedVariables: [],
            unreachableCode: [],
            unusedImports: [],
            otherDeadCode: [],
          },
        },
        premiumFeatures: {
          codeScore: {
            overall: 0,
            correctness: 0,
            security: 0,
            performance: 0,
            readability: 0,
            summary: "",
          },
          pairProgrammer: {
            nextSteps: [],
            questionsToAsk: [],
            implementationPlan: [],
          },
          fixEntireFile: {
            available: false,
            fixedCode: "",
            changes: [],
          },
          oneClickOptimization: {
            available: false,
            optimizedCode: "",
            changes: [],
          },
          collaborativeReview: {
            sessionSummary: "",
            discussionPrompts: [],
          },
          liveExecutionSandbox: {
            language: language || "",
            canRunInBrowser: language === "javascript",
            notes: [],
          },
          leaderboard: {
            scoreLabel: "",
            improvementPoints: 0,
          },
        },
        intelligentReview: {
          severityClassification: {
            critical: [],
            high: [],
            medium: [],
            low: [],
            informational: [],
          },
          autoPriorityFixing: {
            fixFirst: [],
            productionBreakers: [],
            scalabilityRisks: [],
            recommendedOrder: [],
          },
          rootCauseAnalysis: {
            causes: [],
            triggeringCode: [],
            prevention: [],
          },
          architectureReview: {
            folderStructure: [],
            mvcViolations: [],
            microserviceCommunication: [],
            backendArchitecture: [],
          },
          dependencyAnalysis: {
            vulnerablePackages: [],
            outdatedLibraries: [],
            unusedDependencies: [],
            heavyDependencies: [],
            recommendations: [],
          },
        },
        advancedSecurity: {
          secretLeakage: {
            apiKeys: [],
            jwtSecrets: [],
            firebaseConfigs: [],
            awsCredentials: [],
            otherSecrets: [],
          },
          malwareDetection: {
            suspiciousScripts: [],
            cryptoMiners: [],
            obfuscatedCode: [],
            backdoors: [],
          },
          secureCodingSuggestions: {
            encryption: [],
            authentication: [],
            databaseQueries: [],
          },
        },
        aiRefactoring: {
          oneClickRefactoring: {
            asyncAwait: "",
            loopsToRecursion: "",
            nestedConditions: "",
            splitFunctions: [],
          },
          legacyModernization: {
            modernJavaScript: "",
            modernCpp: "",
            callbacksToPromises: "",
          },
          multiVersionComparison: {
            originalCode: "",
            optimizedCode: "",
            highlyOptimizedCode: "",
            tradeoffs: [],
          },
        },
        smartLearning: {
          developerWeaknessDetection: {
            commonMistakes: [],
            weakDsaTopics: [],
            weakSyntaxConcepts: [],
            practiceQuestions: [],
            learningResources: [],
            projects: [],
          },
          personalizedCodingCoach: {
            mentorAdvice: [],
            interviewerQuestions: [],
            debuggerTips: [],
            teacherExplanation: [],
          },
          difficultyEstimator: {
            level: "",
            reason: "",
          },
        },
        collaborationFeatures: {
          teamReviewWorkspace: {
            multipleReviewers: [],
            aiComments: [],
            humanCommentPrompts: [],
            resolvableDiscussions: [],
          },
          aiPullRequestReviewer: {
            autoPrComments: [],
            riskAnalysis: [],
            securityScore: 0,
          },
          reviewHistoryTimeline: {
            whoChangedWhat: [],
            bugIntroductionHistory: [],
            improvementTrend: [],
          },
        },
        aiDevOps: {
          deploymentRiskPrediction: {
            failureChance: "",
            riskyFiles: [],
            highRiskModules: [],
            reasons: [],
          },
          cicdQualityGates: {
            securityScoreThreshold: 0,
            testCoverageGate: "",
            criticalBugGate: [],
            deploymentDecision: "",
          },
          dockerKubernetesReview: {
            dockerfiles: [],
            kubernetesYaml: [],
            infrastructureConfigs: [],
          },
        },
        performanceEngineering: {
          runtimeSimulation: {
            cpuUsage: "",
            memoryUsage: "",
            timeBottlenecks: [],
          },
          scalabilityPrediction: {
            oneThousandUsers: "",
            tenThousandUsers: "",
            oneMillionUsers: "",
            scalingRecommendations: [],
          },
          queryOptimization: {
            sqlQueries: [],
            mongoQueries: [],
            redisUsage: [],
          },
        },
        competitiveFeatures: {
          codingScoreSystem: {
            maintainabilityScore: 0,
            securityScore: 0,
            readabilityScore: 0,
            performanceScore: 0,
            overallCompetitiveScore: 0,
            scoreSummary: "",
          },
          globalLeaderboard: {
            cleanestCodeRank: "",
            fewestBugsRank: "",
            bestOptimizationRank: "",
            leaderboardSummary: "",
          },
          achievementBadges: [],
        },
        aiAutomation: {
          commitMessage: {
            title: "",
            body: [],
          },
          changelog: {
            releaseNotes: [],
            fixedBugs: [],
            breakingChanges: [],
          },
          sprintReport: {
            teamProgress: [],
            fixedBugs: [],
            pendingIssues: [],
            nextSteps: [],
          },
        },
        nextLevelFeatures: {
          voiceControlledAssistant: {
            supportedCommands: [
              "Explain this function",
              "Optimize this code",
            ],
            detectedIntent: "",
            response: "",
          },
          whiteboardSystem: {
            architectureDiagram: "",
            diagramNotes: [],
          },
          codeToFlowchart: {
            flowchart: "",
            uml: "",
            sequenceDiagram: "",
          },
          reverseEngineering: {
            architecture: [],
            technologies: [],
            entryPoints: [],
            limitations: [],
          },
        },
        quantumInspiredAnalysis: {
          optimizationScore: {
            classicalScore: 0,
            quantumInspiredEstimate: 0,
            classicalComplexity: "",
            quantumInspiredComplexity: "",
            summary: "",
          },
          quantumSecureCodeChecker: {
            weakCryptography: [],
            quantumVulnerableEncryption: [],
            postQuantumRecommendations: [],
          },
          quantumAlgorithmRecommendation: {
            classicalAlgorithm: "",
            quantumAlgorithmPossibility: "",
            whenQuantumHelps: [],
            whenClassicalIsBetter: [],
          },
          quantumComplexityAnalyzer: {
            classical: "",
            quantumInspired: "",
            practicality: "",
          },
        },
      };
    }

    await Review.create({
      user: req.user.id,
      code:
        code?.trim() ||
        `[Screenshot upload: ${screenshotName || "code image"}]`,
      language,
      result: parsed,
    });

    await User.findByIdAndUpdate(
      req.user.id,
      {
        $inc: {
          totalReviews: 1,
        },
      }
    );

    res.json(parsed);

  } catch (err) {
    console.log(
      "Review failed:",
      err.response?.status || "",
      err.response?.data || err.message
    );

    res.status(500).json({
      message:
        err.response?.data?.error?.message ||
        err.response?.data?.message ||
        "Review failed",
    });
  }
};

exports.getReviewHistory =
  async (req, res) => {
    try {
      const reviews =
        await Review.find({
          user: req.user.id,
        }).sort({
          createdAt: -1,
        });

      res.status(200).json(
        reviews
      );

    } catch (err) {
      res.status(500).json({
        message:
          err.message,
      });
    }
  };
  exports.deleteReview =
  async (req, res) => {
    try {
      await Review.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Deleted Successfully",
      });

    } catch (err) {
      res.status(500).json({
        message:
          err.message,
      });
    }
  };
