const axios = require("axios");
const Review = require("../models/Review");
const User = require("../models/User");

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

function defaultReviewResult(language = "") {
  return {
    summary: "",
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
        detectedLanguage: language,
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
        status: "unavailable",
        uploadedFile: "",
        ocrFindings: [],
        nextSteps: [],
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
        language,
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
        supportedCommands: ["Explain this function", "Optimize this code"],
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
    nextGenFeatures: {
      bugTimeMachine: {
        probableIntroductionPoints: [],
        removedSafeguards: [],
        suspiciousChangePatterns: [],
      },
      developerMistakeFingerprint: {
        repeatedPatterns: [],
        coachingTips: [],
        privatePracticeFocus: [],
      },
      productionFailureSimulator: {
        likelyCrashes: [],
        riskyInputs: [],
        timeoutRisks: [],
        overloadRisks: [],
        monitoringChecks: [],
      },
      reviewDebateMode: {
        securityReviewer: [],
        performanceReviewer: [],
        maintainabilityReviewer: [],
        finalJudgeDecision: "",
      },
      invisibleRiskDetector: {
        growthRisks: [],
        hiddenDataLeaks: [],
        orderingDependencies: [],
        environmentAssumptions: [],
      },
      fixConfidenceScore: {
        confidence: 0,
        behaviorChangeRisk: "",
        testsToRun: [],
        rollbackNotes: [],
      },
      reviewReplay: {
        timeline: [],
        issueToFixFlow: [],
        verificationSteps: [],
      },
      reviewerPersonalityMode: {
        selectedPersonality: "",
        responseStyle: "",
        personaNotes: [],
      },
      codeHealthForecast: {
        maintainabilityForecast: "",
        splitSoon: [],
        dependencyRisk: [],
        futureWarnings: [],
      },
      debuggingAt2AM: {
        whatBroke: "",
        whyItBroke: "",
        lineToCheck: "",
        fastestSafeFix: "",
      },
    },
  };
}

function mergeDefaults(defaults, value) {
  if (Array.isArray(defaults)) {
    return Array.isArray(value) ? value : defaults;
  }

  if (
    defaults &&
    typeof defaults === "object" &&
    !Array.isArray(defaults)
  ) {
    const merged = { ...defaults };

    for (const key of Object.keys(defaults)) {
      merged[key] = mergeDefaults(defaults[key], value?.[key]);
    }

    for (const key of Object.keys(value || {})) {
      if (!(key in merged)) merged[key] = value[key];
    }

    return merged;
  }

  return value === undefined || value === null ? defaults : value;
}

function extractJson(text) {
  const cleaned = String(text || "").replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("AI response did not contain JSON");
  }

  return JSON.parse(cleaned.slice(start, end + 1));
}

function getModeInstruction(mode = "analyze") {
  const instructions = {
    "bug-time-machine":
      "Focus on nextGenFeatures.bugTimeMachine and infer only from visible evidence.",
    "mistake-fingerprint":
      "Focus on nextGenFeatures.developerMistakeFingerprint with coaching that is private, practical, and non-shaming.",
    "production-simulator":
      "Focus on nextGenFeatures.productionFailureSimulator and predict realistic runtime failures.",
    debate:
      "Focus on nextGenFeatures.reviewDebateMode with separate reviewer opinions and one final decision.",
    "invisible-risk":
      "Focus on nextGenFeatures.invisibleRiskDetector and find hidden risks beyond syntax errors.",
    "fix-confidence":
      "Focus on nextGenFeatures.fixConfidenceScore and give concrete tests before accepting a fix.",
    "review-replay":
      "Focus on nextGenFeatures.reviewReplay and produce a concise issue-to-verification timeline.",
    personality:
      "Focus on nextGenFeatures.reviewerPersonalityMode and adapt tone to the selected personality.",
    "health-forecast":
      "Focus on nextGenFeatures.codeHealthForecast and predict maintainability pressure.",
    "debug-2am":
      "Focus on nextGenFeatures.debuggingAt2AM. Be extremely simple, direct, and action-oriented.",
  };

  return instructions[mode] || "Run the full code review.";
}

function hasContent(value) {
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "string") return value.trim().length > 0;
  if (typeof value === "number") return value > 0;
  if (value && typeof value === "object") {
    return Object.values(value).some(hasContent);
  }
  return false;
}

function firstRiskLine(code = "") {
  const lines = String(code).split(/\r?\n/);
  const patterns = [
    { regex: /<=\s*[\w.]+\.length/, reason: "loop can read one item past the end" },
    { regex: /if\s*\([^)]*=\s*[^=]/, reason: "assignment inside condition can change logic" },
    { regex: /\+\s*req\.|req\.[\w.]+\s*\+/, reason: "request data appears to be concatenated directly" },
    { regex: /\.(price|id|name|value|length)\b/, reason: "property access can fail when the object is missing" },
    { regex: /(secret|api[_-]?key|token|password)\s*[:=]\s*["'][^"']{6,}/i, reason: "sensitive value appears hardcoded" },
  ];

  for (let index = 0; index < lines.length; index += 1) {
    const match = patterns.find((item) => item.regex.test(lines[index]));
    if (match) {
      return {
        line: index + 1,
        code: lines[index].trim(),
        reason: match.reason,
      };
    }
  }

  return {
    line: 1,
    code: lines[0]?.trim() || "No specific line detected",
    reason: "review the first risky branch or data access path",
  };
}

function enrichNextGenFeatures(result, { code, mode, personality }) {
  const next = result.nextGenFeatures || {};
  result.nextGenFeatures = next;

  const risk = firstRiskLine(code);
  const riskText =
    `Line ${risk.line}: ${risk.code} -> ${risk.reason}.`;
  const hasCode = String(code || "").trim().length > 0;

  next.bugTimeMachine ||= {};
  if (!hasContent(next.bugTimeMachine)) {
    next.bugTimeMachine = {
      probableIntroductionPoints: [
        hasCode
          ? `${riskText} This is the most likely place the bug entered based on the submitted snippet.`
          : "Paste code or a diff to infer where the bug entered.",
      ],
      removedSafeguards: [
        "Look for a missing bounds check, null check, validation branch, or test that used to cover this path.",
      ],
      suspiciousChangePatterns: [
        "Risk pattern: logic that assumes input shape is always valid.",
      ],
    };
  }

  next.developerMistakeFingerprint ||= {};
  if (!hasContent(next.developerMistakeFingerprint)) {
    next.developerMistakeFingerprint = {
      repeatedPatterns: [
        "Trusting input shape before validating it.",
        "Using loop or branch logic without edge-case tests.",
      ],
      coachingTips: [
        "Before returning a fix, ask: what happens with empty, null, missing, or oversized input?",
      ],
      privatePracticeFocus: [
        "Practice defensive iteration, guard clauses, and one edge-case unit test per function.",
      ],
    };
  }

  next.productionFailureSimulator ||= {};
  if (!hasContent(next.productionFailureSimulator)) {
    next.productionFailureSimulator = {
      likelyCrashes: [
        hasCode
          ? `${riskText} This path can crash or return incorrect data in production.`
          : "Need code to predict concrete crashes.",
      ],
      riskyInputs: [
        "Empty arrays, missing object fields, null values, duplicate records, and unexpected user input.",
      ],
      timeoutRisks: [
        "Nested loops or unbounded database calls can timeout as data grows.",
      ],
      overloadRisks: [
        "Repeated work per request can overload CPU or database connections under traffic spikes.",
      ],
      monitoringChecks: [
        "Track error rate, slow requests, failed validation, and top failing input shapes.",
      ],
    };
  }

  next.reviewDebateMode ||= {};
  if (!hasContent(next.reviewDebateMode)) {
    next.reviewDebateMode = {
      securityReviewer: [
        "Do not trust input until it is validated and sanitized.",
      ],
      performanceReviewer: [
        "Check whether loops, queries, or repeated work scale with user data size.",
      ],
      maintainabilityReviewer: [
        "Make the risky condition explicit and add a small regression test.",
      ],
      finalJudgeDecision:
        "Fix correctness and validation first, then measure performance before broader refactoring.",
    };
  }

  next.invisibleRiskDetector ||= {};
  if (!hasContent(next.invisibleRiskDetector)) {
    next.invisibleRiskDetector = {
      growthRisks: [
        "Works on small input but may fail or slow down as data size grows.",
      ],
      hiddenDataLeaks: [
        "Errors or logs may expose raw input if exception handling is not controlled.",
      ],
      orderingDependencies: [
        "Code may depend on input order or complete object shape without saying so.",
      ],
      environmentAssumptions: [
        "Assumes runtime data always matches local test data.",
      ],
    };
  }

  next.fixConfidenceScore ||= {};
  if (!hasContent(next.fixConfidenceScore)) {
    next.fixConfidenceScore = {
      confidence: hasCode ? 78 : 35,
      behaviorChangeRisk:
        "Medium: the safest fix may change how invalid input is handled.",
      testsToRun: [
        "Happy path",
        "Empty input",
        "Null or missing fields",
        "Large input",
        "Regression test for the risky line",
      ],
      rollbackNotes: [
        "Keep the old behavior documented and revert only if valid inputs start failing.",
      ],
    };
  }

  next.reviewReplay ||= {};
  if (!hasContent(next.reviewReplay)) {
    next.reviewReplay = {
      timeline: [
        "Issue found in the risky data path.",
        "Fix should add validation or safer iteration.",
        "Tests should prove valid and invalid inputs behave correctly.",
      ],
      issueToFixFlow: [
        `${riskText} Add a guard or corrected condition before this path runs.`,
      ],
      verificationSteps: [
        "Run unit tests, then test the smallest and largest expected inputs.",
      ],
    };
  }

  next.reviewerPersonalityMode ||= {};
  if (!hasContent(next.reviewerPersonalityMode)) {
    next.reviewerPersonalityMode = {
      selectedPersonality:
        personality || "Strict Senior Engineer",
      responseStyle:
        mode === "debug-2am"
          ? "Short, calm, and focused on the fastest safe fix."
          : "Direct, practical, and evidence-based.",
      personaNotes: [
        "Tone changes, but severity and technical judgment stay factual.",
      ],
    };
  }

  next.codeHealthForecast ||= {};
  if (!hasContent(next.codeHealthForecast)) {
    next.codeHealthForecast = {
      maintainabilityForecast:
        "This code will become harder to maintain if risky input assumptions remain implicit.",
      splitSoon: [
        "Separate validation, calculation, database access, and response formatting when they appear in one function.",
      ],
      dependencyRisk: [
        "Review dependencies only when package files are included.",
      ],
      futureWarnings: [
        "Add tests now before more features depend on this behavior.",
      ],
    };
  }

  next.debuggingAt2AM ||= {};
  if (!hasContent(next.debuggingAt2AM)) {
    next.debuggingAt2AM = {
      whatBroke:
        risk.reason,
      whyItBroke:
        `The code reaches ${risk.code || "a risky path"} without proving the data is safe first.`,
      lineToCheck:
        `Line ${risk.line}`,
      fastestSafeFix:
        "Add the smallest guard or condition correction, then run one regression test for the failing input.",
    };
  }

  if (!String(next.debuggingAt2AM.whatBroke || "").trim()) {
    next.debuggingAt2AM.whatBroke = risk.reason;
  }

  if (!String(next.debuggingAt2AM.whyItBroke || "").trim()) {
    next.debuggingAt2AM.whyItBroke =
      `The code reaches ${risk.code || "a risky path"} without proving the data is safe first.`;
  }

  if (!String(next.debuggingAt2AM.lineToCheck || "").trim()) {
    next.debuggingAt2AM.lineToCheck = `Line ${risk.line}`;
  }

  if (!String(next.debuggingAt2AM.fastestSafeFix || "").trim()) {
    next.debuggingAt2AM.fastestSafeFix =
      "Add the smallest guard or condition correction, then run one regression test for the failing input.";
  }

  if (!Number(next.fixConfidenceScore.confidence)) {
    next.fixConfidenceScore.confidence = hasCode ? 78 : 35;
  }

  if (!hasContent(next.fixConfidenceScore.testsToRun)) {
    next.fixConfidenceScore.testsToRun = [
      "Happy path",
      "Empty input",
      "Null or missing fields",
      "Large input",
      "Regression test for the risky line",
    ];
  }

  return result;
}

function buildReviewPrompt({
  code,
  language,
  mode,
  personality,
  question,
  screenshotName,
  screenshotDataUrl,
}) {
  return `Review this ${language || "unknown"} code.

Return JSON only. Use these top-level keys:
summary, bugs, performance, readability, bestPractices, security, improvements,
bugDetection, codeQuality, complexity, aiSuggestions, securityScan, smartAI,
developerProductivity, premiumFeatures, intelligentReview, advancedSecurity,
nextGenFeatures.

Required finding format: "[Severity] Evidence -> Impact -> Fix".
Severity values: Critical, High, Medium, Low, Informational.

Check only what is visible in the submitted code:
- correctness bugs, null/undefined risks, infinite loops, memory/resource leaks, race conditions, logic mistakes
- SQL/NoSQL injection, XSS, hardcoded secrets, unsafe auth, unsafe file/network operations
- time and space complexity with Big-O only when inferable
- duplicate code, bad naming, readability, dead code, unused imports, bad practices
- concrete refactors, test cases, beginner explanation, and direct answer to the user question
- next-gen review features:
  - Bug Time Machine: infer probable introduction points only from visible code or supplied notes.
  - Developer Mistake Fingerprint: identify repeated mistake patterns and private coaching tips.
  - Production Failure Simulator: predict likely crashes, risky inputs, timeouts, overloads, and monitoring checks.
  - Code Review Debate Mode: provide security, performance, maintainability opinions and one final judge decision.
  - Invisible Risk Detector: find risks that pass syntax checks but fail with growth, data, ordering, or environment changes.
  - Fix Confidence Score: estimate confidence from 0 to 100, behavior-change risk, tests to run, and rollback notes.
  - Review Replay: show issue -> fix -> verify flow as a concise timeline.
  - Reviewer Personality Mode: adapt tone to the selected personality while keeping findings factual.
  - Code Health Forecast: predict maintainability pressure and modules likely to need splitting soon.
  - Explain Like Debugging at 2 AM: simplest possible explanation of what broke, why, line to check, and fastest safe fix.

Rules:
- Do not invent missing files, routes, dependencies, screenshots, tests, or runtime behavior.
- Leave unrelated categories empty.
- Scores must be integers from 0 to 100.
- If mode is "fix", return complete corrected code in premiumFeatures.fixEntireFile.fixedCode.
- If mode is "optimize", return complete optimized code in premiumFeatures.oneClickOptimization.optimizedCode.
- If screenshot data is present but code text is missing, set advancedFeatures.screenshotReview.status to "needs_ocr".

Context:
mode=${mode || "analyze"}
personality=${personality || "Strict Senior Engineer"}
modeInstruction=${getModeInstruction(mode)}
question=${question || "none"}
screenshotName=${screenshotName || "none"}
screenshotDataPresent=${screenshotDataUrl ? "yes" : "no"}

Submitted code:
<<<CODE
${code || ""}
CODE`;
}

exports.reviewCode = async (req, res) => {
  try {
    const {
      code,
      language = "javascript",
      question = "",
      mode = "analyze",
      personality = "Strict Senior Engineer",
      screenshotName = "",
      screenshotDataUrl = "",
    } = req.body;

    if (!code?.trim() && !screenshotDataUrl) {
      return res.status(400).json({
        message: "Please enter code or upload a code screenshot",
      });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({
        message: "AI service is not configured. Missing GROQ_API_KEY.",
      });
    }

    const systemPrompt = [
      "You are a deterministic senior code review API.",
      "Return only valid raw JSON.",
      "No markdown, no code fences, no explanations outside JSON.",
      "Use empty arrays or empty strings when there is no evidence.",
      "Base findings only on the submitted code.",
    ].join(" ");

    const aiRes = await axios.post(
      GROQ_URL,
      {
        model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
        temperature: 0.1,
        max_tokens: 4096,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: buildReviewPrompt({
              code,
              language,
              mode,
              personality,
              question,
              screenshotName,
              screenshotDataUrl,
            }),
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        timeout: 60000,
      }
    );

    const rawText =
      aiRes.data?.choices?.[0]?.message?.content || "";
    const parsed = mergeDefaults(
      defaultReviewResult(language),
      extractJson(rawText)
    );

    enrichNextGenFeatures(parsed, {
      code,
      mode,
      personality,
    });

    if (screenshotDataUrl) {
      parsed.advancedFeatures.screenshotReview.uploadedFile =
        screenshotName || "";
      if (!code?.trim()) {
        parsed.advancedFeatures.screenshotReview.status = "needs_ocr";
      }
    }

    await Review.create({
      user: req.user.id,
      code:
        code?.trim() ||
        `[Screenshot upload: ${screenshotName || "code image"}]`,
      language,
      result: parsed,
    });

    await User.findByIdAndUpdate(req.user.id, {
      $inc: { totalReviews: 1 },
    });

    return res.json(parsed);
  } catch (err) {
    const upstreamMessage =
      err.response?.data?.error?.message ||
      err.response?.data?.message;

    console.log(
      "Review failed:",
      err.response?.status || "",
      upstreamMessage || err.message
    );

    return res.status(err.response?.status === 401 ? 502 : 500).json({
      message:
        upstreamMessage ||
        "Review failed. Please try a smaller snippet or check AI service configuration.",
    });
  }
};

exports.getReviewHistory = async (req, res) => {
  try {
    const reviews = await Review.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json(reviews);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);

    return res.json({
      message: "Deleted Successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
