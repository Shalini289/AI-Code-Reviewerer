function toList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string" && value.trim()) return [value];
  if (typeof value === "number" || typeof value === "boolean") return [String(value)];
  return [];
}

function asText(value, fallback = "N/A") {
  if (value === undefined || value === null || value === "") return fallback;

  if (typeof value === "string" || typeof value === "number") {
    return value;
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (Array.isArray(value)) {
    const text = value.map((item) => asText(item, "")).filter(Boolean).join(", ");
    return text || fallback;
  }

  if (typeof value === "object") {
    return Object.entries(value)
      .filter(([, item]) => item !== undefined && item !== null && item !== "")
      .map(([key, item]) => `${key}: ${asText(item, "")}`)
      .join(" | ") || fallback;
  }

  return String(value);
}

function renderFinding(item) {
  if (typeof item !== "object" || item === null) return asText(item, "");

  return asText(item, "");
}

function ListSection({ items }) {
  const list = toList(items);

  if (!list.length) {
    return <p>No issues found.</p>;
  }

  return (
    <ul>
      {list.map((item, index) => (
        <li key={`${JSON.stringify(item)}-${index}`}>
          {renderFinding(item)}
        </li>
      ))}
    </ul>
  );
}

function ReviewCard({ title, children, fullWidth = false }) {
  return (
    <div className={`review-card ${fullWidth ? "full-width" : ""}`}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

function GroupedFindings({ groups }) {
  return (
    <div className="finding-groups">
      {groups.map(({ title, items }) => (
        <div className="finding-group" key={title}>
          <h4>{title}</h4>
          <ListSection items={items} />
        </div>
      ))}
    </div>
  );
}

function LineExplanation({ lines }) {
  const list = Array.isArray(lines) ? lines.filter(Boolean) : [];

  if (!list.length) {
    return <p>No line-by-line explanation available.</p>;
  }

  return (
    <div className="line-explanations">
      {list.map((item, index) => (
        <div className="line-explanation" key={`${item.line}-${index}`}>
          <span>{asText(item.line, `Line ${index + 1}`)}</span>
          {item.code && <code>{asText(item.code, "")}</code>}
          <p>{asText(item.explanation, "No explanation provided.")}</p>
        </div>
      ))}
    </div>
  );
}

export default function ReviewResult({ result }) {
  if (!result) return null;

  const bugDetection = result.bugDetection || {};
  const codeQuality = result.codeQuality || {};
  const complexity = result.complexity || {};
  const aiSuggestions = result.aiSuggestions || {};
  const securityScan = result.securityScan || {};
  const smartAI = result.smartAI || {};
  const documentation = smartAI.documentation || {};
  const testCases = smartAI.testCases || {};
  const debuggingAssistant = smartAI.debuggingAssistant || {};
  const codeChat = smartAI.codeChat || {};
  const advancedFeatures = result.advancedFeatures || {};
  const multiLanguage = advancedFeatures.multiLanguage || {};
  const githubIntegration = advancedFeatures.githubIntegration || {};
  const cicdIntegration = advancedFeatures.cicdIntegration || {};
  const voiceReview = advancedFeatures.voiceReview || {};
  const screenshotReview = advancedFeatures.screenshotReview || {};
  const developerProductivity = result.developerProductivity || {};
  const codeSimilarity = developerProductivity.codeSimilarity || {};
  const codingStandards = developerProductivity.codingStandards || {};
  const performanceProfiler = developerProductivity.performanceProfiler || {};
  const deadCode = developerProductivity.deadCode || {};
  const premiumFeatures = result.premiumFeatures || {};
  const codeScore = premiumFeatures.codeScore || {};
  const pairProgrammer = premiumFeatures.pairProgrammer || {};
  const fixEntireFile = premiumFeatures.fixEntireFile || {};
  const oneClickOptimization = premiumFeatures.oneClickOptimization || {};
  const collaborativeReview = premiumFeatures.collaborativeReview || {};
  const liveExecutionSandbox = premiumFeatures.liveExecutionSandbox || {};
  const intelligentReview = result.intelligentReview || {};
  const severityClassification =
    intelligentReview.severityClassification || {};
  const autoPriorityFixing =
    intelligentReview.autoPriorityFixing || {};
  const rootCauseAnalysis =
    intelligentReview.rootCauseAnalysis || {};
  const architectureReview =
    intelligentReview.architectureReview || {};
  const dependencyAnalysis =
    intelligentReview.dependencyAnalysis || {};
  const advancedSecurity = result.advancedSecurity || {};
  const secretLeakage = advancedSecurity.secretLeakage || {};
  const malwareDetection = advancedSecurity.malwareDetection || {};
  const secureCodingSuggestions =
    advancedSecurity.secureCodingSuggestions || {};
  const aiRefactoring = result.aiRefactoring || {};
  const oneClickRefactoring =
    aiRefactoring.oneClickRefactoring || {};
  const legacyModernization =
    aiRefactoring.legacyModernization || {};
  const multiVersionComparison =
    aiRefactoring.multiVersionComparison || {};
  const smartLearning = result.smartLearning || {};
  const developerWeaknessDetection =
    smartLearning.developerWeaknessDetection || {};
  const personalizedCodingCoach =
    smartLearning.personalizedCodingCoach || {};
  const difficultyEstimator =
    smartLearning.difficultyEstimator || {};
  const collaborationFeatures =
    result.collaborationFeatures || {};
  const teamReviewWorkspace =
    collaborationFeatures.teamReviewWorkspace || {};
  const aiPullRequestReviewer =
    collaborationFeatures.aiPullRequestReviewer || {};
  const reviewHistoryTimeline =
    collaborationFeatures.reviewHistoryTimeline || {};
  const aiDevOps = result.aiDevOps || {};
  const deploymentRiskPrediction =
    aiDevOps.deploymentRiskPrediction || {};
  const cicdQualityGates =
    aiDevOps.cicdQualityGates || {};
  const dockerKubernetesReview =
    aiDevOps.dockerKubernetesReview || {};
  const performanceEngineering =
    result.performanceEngineering || {};
  const runtimeSimulation =
    performanceEngineering.runtimeSimulation || {};
  const scalabilityPrediction =
    performanceEngineering.scalabilityPrediction || {};
  const queryOptimization =
    performanceEngineering.queryOptimization || {};
  const competitiveFeatures =
    result.competitiveFeatures || {};
  const codingScoreSystem =
    competitiveFeatures.codingScoreSystem || {};
  const globalLeaderboard =
    competitiveFeatures.globalLeaderboard || {};
  const aiAutomation = result.aiAutomation || {};
  const commitMessage = aiAutomation.commitMessage || {};
  const changelog = aiAutomation.changelog || {};
  const sprintReport = aiAutomation.sprintReport || {};
  const nextLevelFeatures = result.nextLevelFeatures || {};
  const voiceControlledAssistant =
    nextLevelFeatures.voiceControlledAssistant || {};
  const whiteboardSystem =
    nextLevelFeatures.whiteboardSystem || {};
  const codeToFlowchart =
    nextLevelFeatures.codeToFlowchart || {};
  const reverseEngineering =
    nextLevelFeatures.reverseEngineering || {};
  const quantumInspiredAnalysis =
    result.quantumInspiredAnalysis || {};
  const quantumOptimization =
    quantumInspiredAnalysis.optimizationScore || {};
  const quantumSecureCodeChecker =
    quantumInspiredAnalysis.quantumSecureCodeChecker || {};
  const quantumAlgorithmRecommendation =
    quantumInspiredAnalysis.quantumAlgorithmRecommendation || {};
  const quantumComplexityAnalyzer =
    quantumInspiredAnalysis.quantumComplexityAnalyzer || {};
  const nextGenFeatures = result.nextGenFeatures || {};
  const bugTimeMachine = nextGenFeatures.bugTimeMachine || {};
  const developerMistakeFingerprint =
    nextGenFeatures.developerMistakeFingerprint || {};
  const productionFailureSimulator =
    nextGenFeatures.productionFailureSimulator || {};
  const reviewDebateMode =
    nextGenFeatures.reviewDebateMode || {};
  const invisibleRiskDetector =
    nextGenFeatures.invisibleRiskDetector || {};
  const fixConfidenceScore =
    nextGenFeatures.fixConfidenceScore || {};
  const reviewReplay =
    nextGenFeatures.reviewReplay || {};
  const reviewerPersonalityMode =
    nextGenFeatures.reviewerPersonalityMode || {};
  const codeHealthForecast =
    nextGenFeatures.codeHealthForecast || {};
  const debuggingAt2AM =
    nextGenFeatures.debuggingAt2AM || {};

  const speakReview = () => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;

    const script =
      voiceReview.script ||
      smartAI.simpleExplanation ||
      result.summary ||
      "No voice review is available.";

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(script));
  };

  return (
    <div className="review-grid">
      <ReviewCard title="Summary">
        <p>{asText(result.summary, "No summary")}</p>
      </ReviewCard>

      <ReviewCard title="Bug Time Machine">
        <GroupedFindings
          groups={[
            { title: "Likely introduction points", items: bugTimeMachine.probableIntroductionPoints },
            { title: "Removed safeguards", items: bugTimeMachine.removedSafeguards },
            { title: "Suspicious change patterns", items: bugTimeMachine.suspiciousChangePatterns },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Developer Mistake Fingerprint">
        <GroupedFindings
          groups={[
            { title: "Repeated patterns", items: developerMistakeFingerprint.repeatedPatterns },
            { title: "Private coaching tips", items: developerMistakeFingerprint.coachingTips },
            { title: "Practice focus", items: developerMistakeFingerprint.privatePracticeFocus },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Production Failure Simulator">
        <GroupedFindings
          groups={[
            { title: "Likely crashes", items: productionFailureSimulator.likelyCrashes },
            { title: "Risky inputs", items: productionFailureSimulator.riskyInputs },
            { title: "Timeout risks", items: productionFailureSimulator.timeoutRisks },
            { title: "Overload risks", items: productionFailureSimulator.overloadRisks },
            { title: "Monitoring checks", items: productionFailureSimulator.monitoringChecks },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Code Review Debate Mode" fullWidth>
        <GroupedFindings
          groups={[
            { title: "Security reviewer", items: reviewDebateMode.securityReviewer },
            { title: "Performance reviewer", items: reviewDebateMode.performanceReviewer },
            { title: "Maintainability reviewer", items: reviewDebateMode.maintainabilityReviewer },
            { title: "Final judge decision", items: reviewDebateMode.finalJudgeDecision },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Invisible Risk Detector">
        <GroupedFindings
          groups={[
            { title: "Growth risks", items: invisibleRiskDetector.growthRisks },
            { title: "Hidden data leaks", items: invisibleRiskDetector.hiddenDataLeaks },
            { title: "Ordering dependencies", items: invisibleRiskDetector.orderingDependencies },
            { title: "Environment assumptions", items: invisibleRiskDetector.environmentAssumptions },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Fix Confidence Score">
        <div className="score-display">{asText(fixConfidenceScore.confidence, 0)}%</div>
        <div className="metric-row">
          <span>Behavior risk</span>
          <strong>{asText(fixConfidenceScore.behaviorChangeRisk)}</strong>
        </div>
        <GroupedFindings
          groups={[
            { title: "Tests to run", items: fixConfidenceScore.testsToRun },
            { title: "Rollback notes", items: fixConfidenceScore.rollbackNotes },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Review Replay">
        <GroupedFindings
          groups={[
            { title: "Timeline", items: reviewReplay.timeline },
            { title: "Issue to fix flow", items: reviewReplay.issueToFixFlow },
            { title: "Verification steps", items: reviewReplay.verificationSteps },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="AI Reviewer Personality Mode">
        <div className="metric-row">
          <span>Selected</span>
          <strong>{asText(reviewerPersonalityMode.selectedPersonality)}</strong>
        </div>
        <p>{asText(reviewerPersonalityMode.responseStyle, "No personality style returned.")}</p>
        <GroupedFindings
          groups={[{ title: "Persona notes", items: reviewerPersonalityMode.personaNotes }]}
        />
      </ReviewCard>

      <ReviewCard title="Code Health Forecast">
        <p>{asText(codeHealthForecast.maintainabilityForecast, "No forecast available.")}</p>
        <GroupedFindings
          groups={[
            { title: "Should split soon", items: codeHealthForecast.splitSoon },
            { title: "Dependency risk", items: codeHealthForecast.dependencyRisk },
            { title: "Future warnings", items: codeHealthForecast.futureWarnings },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Explain Like Debugging at 2 AM" fullWidth>
        <div className="metric-row">
          <span>What broke</span>
          <strong>{asText(debuggingAt2AM.whatBroke)}</strong>
        </div>
        <div className="metric-row">
          <span>Why</span>
          <strong>{asText(debuggingAt2AM.whyItBroke)}</strong>
        </div>
        <div className="metric-row">
          <span>Line to check</span>
          <strong>{asText(debuggingAt2AM.lineToCheck)}</strong>
        </div>
        <div className="metric-row">
          <span>Fastest safe fix</span>
          <strong>{asText(debuggingAt2AM.fastestSafeFix)}</strong>
        </div>
      </ReviewCard>

      <ReviewCard title="Bug Detection">
        <GroupedFindings
          groups={[
            { title: "Null pointer issues", items: bugDetection.nullPointerIssues },
            { title: "Infinite loops", items: bugDetection.infiniteLoops },
            { title: "Memory leaks", items: bugDetection.memoryLeaks },
            { title: "Race conditions", items: bugDetection.raceConditions },
            { title: "Logic mistakes", items: bugDetection.logicMistakes },
            { title: "Other bugs", items: bugDetection.otherBugs || result.bugs },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Code Quality Analysis">
        <GroupedFindings
          groups={[
            { title: "Bad practices", items: codeQuality.badPractices || result.bestPractices },
            { title: "Cleaner code", items: codeQuality.cleanerCode },
            { title: "Redundancy", items: codeQuality.redundancy },
            { title: "Readability", items: codeQuality.readability || result.readability },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Complexity Analysis">
        <div className="metric-row">
          <span>Time</span>
          <strong>{asText(complexity.timeComplexity || result.performance)}</strong>
        </div>
        <div className="metric-row">
          <span>Space</span>
          <strong>{asText(complexity.spaceComplexity)}</strong>
        </div>
        <div className="finding-group">
          <h4>Unnecessary nested loops</h4>
          <ListSection items={complexity.unnecessaryNestedLoops} />
        </div>
      </ReviewCard>

      <ReviewCard title="AI Suggestions">
        <GroupedFindings
          groups={[
            { title: "Refactor functions", items: aiSuggestions.refactorFunctions },
            { title: "Optimize algorithms", items: aiSuggestions.optimizeAlgorithms },
            { title: "Meaningful renames", items: aiSuggestions.renameSuggestions },
            { title: "Modularization", items: aiSuggestions.modularization || result.improvements },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Security Vulnerability Scan" fullWidth>
        <GroupedFindings
          groups={[
            { title: "SQL injection", items: securityScan.sqlInjection },
            { title: "XSS", items: securityScan.xss },
            { title: "Hardcoded API keys", items: securityScan.hardcodedSecrets },
            { title: "Unsafe authentication logic", items: securityScan.unsafeAuth },
            { title: "Buffer overflow risks", items: securityScan.bufferOverflow },
            { title: "Other vulnerabilities", items: securityScan.otherVulnerabilities || result.security },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Simple English Explanation" fullWidth>
        <p>{asText(smartAI.simpleExplanation, "No explanation available.")}</p>
      </ReviewCard>

      <ReviewCard title="Line-by-line Explanation" fullWidth>
        <LineExplanation lines={smartAI.lineByLineExplanation} />
      </ReviewCard>

      <ReviewCard title="Automatic Documentation">
        <GroupedFindings
          groups={[
            { title: "Function descriptions", items: documentation.functionDescriptions },
            { title: "API docs", items: documentation.apiDocs },
            { title: "README generation", items: documentation.readme },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Generated Test Cases">
        <GroupedFindings
          groups={[
            { title: "Unit tests", items: testCases.unitTests },
            { title: "Edge cases", items: testCases.edgeCases },
            { title: "Random stress tests", items: testCases.stressTests },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="AI Debugging Assistant">
        <GroupedFindings
          groups={[
            { title: "Why errors occur", items: debuggingAssistant.whyErrorsOccur },
            { title: "Suggested fixes", items: debuggingAssistant.suggestedFixes },
            { title: "Predicted runtime failures", items: debuggingAssistant.runtimeFailurePredictions },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Chat With Code">
        <GroupedFindings
          groups={[
            { title: "What does this function do?", items: codeChat.functionPurpose },
            { title: "Can this be optimized?", items: codeChat.optimizationAnswer },
            { title: "Find vulnerabilities", items: codeChat.vulnerabilityAnswer },
            { title: "Custom question", items: codeChat.customQuestionAnswer },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Multi-language Support">
        <div className="metric-row">
          <span>Language</span>
          <strong>{asText(multiLanguage.detectedLanguage)}</strong>
        </div>
        <div className="finding-group">
          <h4>Language-specific notes</h4>
          <ListSection items={multiLanguage.languageSpecificNotes} />
        </div>
      </ReviewCard>

      <ReviewCard title="GitHub Integration">
        <GroupedFindings
          groups={[
            { title: "Review pull requests automatically", items: githubIntegration.pullRequestReview },
            { title: "Comment on commits", items: githubIntegration.commitComments },
            { title: "Track code quality trends", items: githubIntegration.qualityTrends },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="CI/CD Integration">
        <GroupedFindings
          groups={[
            { title: "Auto-review during deployment", items: cicdIntegration.deploymentReview },
            { title: "Block insecure code pushes", items: cicdIntegration.pushBlockers },
            { title: "Pipeline steps", items: cicdIntegration.pipelineSteps },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Voice Review Mode">
        <p>{asText(voiceReview.script, "No voice script available.")}</p>
        <button className="secondary-action" onClick={speakReview}>
          Play voice review
        </button>
      </ReviewCard>

      <ReviewCard title="Screenshot-to-code Review" fullWidth>
        <div className="metric-row">
          <span>Status</span>
          <strong>{asText(screenshotReview.status)}</strong>
        </div>
        <div className="metric-row">
          <span>File</span>
          <strong>{asText(screenshotReview.uploadedFile, "No screenshot uploaded")}</strong>
        </div>
        <GroupedFindings
          groups={[
            { title: "OCR + AI findings", items: screenshotReview.ocrFindings },
            { title: "Next steps", items: screenshotReview.nextSteps },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Code Similarity Checker">
        <div className="metric-row">
          <span>Risk</span>
          <strong>{asText(codeSimilarity.similarityRisk)}</strong>
        </div>
        <GroupedFindings
          groups={[
            { title: "Plagiarism signals", items: codeSimilarity.plagiarismSignals },
            { title: "Duplicate code", items: codeSimilarity.duplicateCode },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Coding Standard Checker">
        <GroupedFindings
          groups={[
            { title: "Google Style Guide", items: codingStandards.googleStyleGuide },
            { title: "PEP8", items: codingStandards.pep8 },
            { title: "Airbnb ESLint rules", items: codingStandards.airbnbEslint },
            { title: "General standards", items: codingStandards.generalStandards },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Performance Profiler">
        <GroupedFindings
          groups={[
            { title: "Bottlenecks", items: performanceProfiler.bottlenecks },
            { title: "Caching suggestions", items: performanceProfiler.cachingSuggestions },
            { title: "Profiling targets", items: performanceProfiler.profilingTargets },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Dead Code Detection">
        <GroupedFindings
          groups={[
            { title: "Unused variables", items: deadCode.unusedVariables },
            { title: "Unreachable code", items: deadCode.unreachableCode },
            { title: "Unused imports", items: deadCode.unusedImports },
            { title: "Other dead code", items: deadCode.otherDeadCode },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="AI Code Scoring System">
        <div className="score-display">{asText(codeScore.overall, 0)}/100</div>
        <div className="metric-row">
          <span>Correctness</span>
          <strong>{asText(codeScore.correctness, 0)}/100</strong>
        </div>
        <div className="metric-row">
          <span>Security</span>
          <strong>{asText(codeScore.security, 0)}/100</strong>
        </div>
        <div className="metric-row">
          <span>Performance</span>
          <strong>{asText(codeScore.performance, 0)}/100</strong>
        </div>
        <div className="metric-row">
          <span>Readability</span>
          <strong>{asText(codeScore.readability, 0)}/100</strong>
        </div>
        <p>{asText(codeScore.summary, "No scoring summary available.")}</p>
      </ReviewCard>

      <ReviewCard title="AI Pair Programmer">
        <GroupedFindings
          groups={[
            { title: "Next steps", items: pairProgrammer.nextSteps },
            { title: "Questions to ask", items: pairProgrammer.questionsToAsk },
            { title: "Implementation plan", items: pairProgrammer.implementationPlan },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Fix Entire File" fullWidth>
        <GroupedFindings
          groups={[{ title: "Changes", items: fixEntireFile.changes }]}
        />
        <pre className="code-output">
          {fixEntireFile.fixedCode || "No fixed code returned."}
        </pre>
      </ReviewCard>

      <ReviewCard title="One-click Optimization" fullWidth>
        <GroupedFindings
          groups={[{ title: "Changes", items: oneClickOptimization.changes }]}
        />
        <pre className="code-output">
          {oneClickOptimization.optimizedCode || "No optimized code returned."}
        </pre>
      </ReviewCard>

      <ReviewCard title="Real-time Collaborative Review">
        <p>
          {collaborativeReview.sessionSummary ||
            "No collaborative review summary available."}
        </p>
        <GroupedFindings
          groups={[
            { title: "Discussion prompts", items: collaborativeReview.discussionPrompts },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Live Execution Sandbox">
        <div className="metric-row">
          <span>Language</span>
          <strong>{asText(liveExecutionSandbox.language)}</strong>
        </div>
        <div className="metric-row">
          <span>Browser run</span>
          <strong>{liveExecutionSandbox.canRunInBrowser ? "Available" : "Unavailable"}</strong>
        </div>
        <GroupedFindings
          groups={[{ title: "Notes", items: liveExecutionSandbox.notes }]}
        />
      </ReviewCard>

      <ReviewCard title="AI Severity Classification" fullWidth>
        <div className="severity-grid">
          <div className="severity-group critical">
            <h4>Critical</h4>
            <ListSection items={severityClassification.critical} />
          </div>
          <div className="severity-group high">
            <h4>High</h4>
            <ListSection items={severityClassification.high} />
          </div>
          <div className="severity-group medium">
            <h4>Medium</h4>
            <ListSection items={severityClassification.medium} />
          </div>
          <div className="severity-group low">
            <h4>Low</h4>
            <ListSection items={severityClassification.low} />
          </div>
          <div className="severity-group info">
            <h4>Informational</h4>
            <ListSection items={severityClassification.informational} />
          </div>
        </div>
      </ReviewCard>

      <ReviewCard title="Auto Priority Fixing">
        <GroupedFindings
          groups={[
            { title: "Fix first", items: autoPriorityFixing.fixFirst },
            { title: "May break production", items: autoPriorityFixing.productionBreakers },
            { title: "Scalability impact", items: autoPriorityFixing.scalabilityRisks },
            { title: "Recommended order", items: autoPriorityFixing.recommendedOrder },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Root Cause Analysis">
        <GroupedFindings
          groups={[
            { title: "Why it happened", items: rootCauseAnalysis.causes },
            { title: "What caused it", items: rootCauseAnalysis.triggeringCode },
            { title: "How to avoid it", items: rootCauseAnalysis.prevention },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="AI Architecture Reviewer">
        <GroupedFindings
          groups={[
            { title: "Folder structure", items: architectureReview.folderStructure },
            { title: "MVC violations", items: architectureReview.mvcViolations },
            { title: "Microservice communication", items: architectureReview.microserviceCommunication },
            { title: "Backend architecture", items: architectureReview.backendArchitecture },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Dependency Analysis">
        <GroupedFindings
          groups={[
            { title: "Vulnerable packages", items: dependencyAnalysis.vulnerablePackages },
            { title: "Outdated libraries", items: dependencyAnalysis.outdatedLibraries },
            { title: "Unused dependencies", items: dependencyAnalysis.unusedDependencies },
            { title: "Heavy dependencies", items: dependencyAnalysis.heavyDependencies },
            { title: "Recommendations", items: dependencyAnalysis.recommendations },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Secret Leakage Detection">
        <GroupedFindings
          groups={[
            { title: "API keys", items: secretLeakage.apiKeys },
            { title: "JWT secrets", items: secretLeakage.jwtSecrets },
            { title: "Firebase configs", items: secretLeakage.firebaseConfigs },
            { title: "AWS credentials", items: secretLeakage.awsCredentials },
            { title: "Other secrets", items: secretLeakage.otherSecrets },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Malware Detection">
        <GroupedFindings
          groups={[
            { title: "Suspicious scripts", items: malwareDetection.suspiciousScripts },
            { title: "Crypto miners", items: malwareDetection.cryptoMiners },
            { title: "Obfuscated code", items: malwareDetection.obfuscatedCode },
            { title: "Backdoors", items: malwareDetection.backdoors },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Secure Coding Suggestions">
        <GroupedFindings
          groups={[
            { title: "Better encryption", items: secureCodingSuggestions.encryption },
            { title: "Secure authentication", items: secureCodingSuggestions.authentication },
            { title: "Safer database queries", items: secureCodingSuggestions.databaseQueries },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="One-click Refactoring" fullWidth>
        <GroupedFindings
          groups={[
            { title: "Split huge functions", items: oneClickRefactoring.splitFunctions },
          ]}
        />
        <div className="code-compare-grid">
          <pre className="code-output">{asText(oneClickRefactoring.asyncAwait, "No async/await refactor returned.")}</pre>
          <pre className="code-output">{asText(oneClickRefactoring.loopsToRecursion, "No recursion refactor returned.")}</pre>
          <pre className="code-output">{asText(oneClickRefactoring.nestedConditions, "No nested-condition refactor returned.")}</pre>
        </div>
      </ReviewCard>

      <ReviewCard title="Legacy Code Modernization" fullWidth>
        <div className="code-compare-grid">
          <pre className="code-output">{asText(legacyModernization.modernJavaScript, "No modern JavaScript version returned.")}</pre>
          <pre className="code-output">{asText(legacyModernization.modernCpp, "No modern C++ version returned.")}</pre>
          <pre className="code-output">{asText(legacyModernization.callbacksToPromises, "No promise-based version returned.")}</pre>
        </div>
      </ReviewCard>

      <ReviewCard title="Multi-version Refactor Comparison" fullWidth>
        <div className="code-compare-grid">
          <pre className="code-output">{asText(multiVersionComparison.originalCode, "No original excerpt returned.")}</pre>
          <pre className="code-output">{asText(multiVersionComparison.optimizedCode, "No optimized version returned.")}</pre>
          <pre className="code-output">{asText(multiVersionComparison.highlyOptimizedCode, "No highly optimized version returned.")}</pre>
        </div>
        <GroupedFindings
          groups={[{ title: "Tradeoffs", items: multiVersionComparison.tradeoffs }]}
        />
      </ReviewCard>

      <ReviewCard title="Developer Weakness Detection">
        <GroupedFindings
          groups={[
            { title: "Common mistakes", items: developerWeaknessDetection.commonMistakes },
            { title: "Weak DSA topics", items: developerWeaknessDetection.weakDsaTopics },
            { title: "Weak syntax concepts", items: developerWeaknessDetection.weakSyntaxConcepts },
            { title: "Practice questions", items: developerWeaknessDetection.practiceQuestions },
            { title: "Learning resources", items: developerWeaknessDetection.learningResources },
            { title: "Projects", items: developerWeaknessDetection.projects },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Personalized Coding Coach">
        <GroupedFindings
          groups={[
            { title: "Mentor", items: personalizedCodingCoach.mentorAdvice },
            { title: "Interviewer", items: personalizedCodingCoach.interviewerQuestions },
            { title: "Debugger", items: personalizedCodingCoach.debuggerTips },
            { title: "Teacher", items: personalizedCodingCoach.teacherExplanation },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Code Difficulty Estimator">
        <div className="metric-row">
          <span>Level</span>
          <strong>{asText(difficultyEstimator.level)}</strong>
        </div>
        <p>{asText(difficultyEstimator.reason, "No difficulty reason available.")}</p>
      </ReviewCard>

      <ReviewCard title="Team Review Workspace">
        <GroupedFindings
          groups={[
            { title: "Multiple reviewers", items: teamReviewWorkspace.multipleReviewers },
            { title: "AI comments", items: teamReviewWorkspace.aiComments },
            { title: "Human comments", items: teamReviewWorkspace.humanCommentPrompts },
            { title: "Resolve discussions", items: teamReviewWorkspace.resolvableDiscussions },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="AI Pull Request Reviewer">
        <div className="metric-row">
          <span>Security score</span>
          <strong>{asText(aiPullRequestReviewer.securityScore, 0)}/100</strong>
        </div>
        <GroupedFindings
          groups={[
            { title: "Auto comments on PRs", items: aiPullRequestReviewer.autoPrComments },
            { title: "Risk analysis", items: aiPullRequestReviewer.riskAnalysis },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Review History Timeline">
        <GroupedFindings
          groups={[
            { title: "Who changed what", items: reviewHistoryTimeline.whoChangedWhat },
            { title: "Bug introduction history", items: reviewHistoryTimeline.bugIntroductionHistory },
            { title: "Improvement trend", items: reviewHistoryTimeline.improvementTrend },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Deployment Risk Prediction">
        <div className="metric-row">
          <span>Failure chance</span>
          <strong>{asText(deploymentRiskPrediction.failureChance)}</strong>
        </div>
        <GroupedFindings
          groups={[
            { title: "Risky files", items: deploymentRiskPrediction.riskyFiles },
            { title: "High-risk modules", items: deploymentRiskPrediction.highRiskModules },
            { title: "Reasons", items: deploymentRiskPrediction.reasons },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="CI/CD Quality Gates">
        <div className="metric-row">
          <span>Decision</span>
          <strong>{asText(cicdQualityGates.deploymentDecision)}</strong>
        </div>
        <div className="metric-row">
          <span>Security gate</span>
          <strong>{asText(cicdQualityGates.securityScoreThreshold, 0)}/100</strong>
        </div>
        <GroupedFindings
          groups={[
            { title: "Test coverage gate", items: cicdQualityGates.testCoverageGate },
            { title: "Critical bug gate", items: cicdQualityGates.criticalBugGate },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Docker & Kubernetes Review">
        <GroupedFindings
          groups={[
            { title: "Dockerfiles", items: dockerKubernetesReview.dockerfiles },
            { title: "Kubernetes YAML", items: dockerKubernetesReview.kubernetesYaml },
            { title: "Infrastructure configs", items: dockerKubernetesReview.infrastructureConfigs },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Runtime Simulation">
        <div className="metric-row">
          <span>CPU</span>
          <strong>{asText(runtimeSimulation.cpuUsage)}</strong>
        </div>
        <div className="metric-row">
          <span>Memory</span>
          <strong>{asText(runtimeSimulation.memoryUsage)}</strong>
        </div>
        <GroupedFindings
          groups={[{ title: "Time bottlenecks", items: runtimeSimulation.timeBottlenecks }]}
        />
      </ReviewCard>

      <ReviewCard title="Scalability Prediction">
        <div className="metric-row">
          <span>1k users</span>
          <strong>{asText(scalabilityPrediction.oneThousandUsers)}</strong>
        </div>
        <div className="metric-row">
          <span>10k users</span>
          <strong>{asText(scalabilityPrediction.tenThousandUsers)}</strong>
        </div>
        <div className="metric-row">
          <span>1M users</span>
          <strong>{asText(scalabilityPrediction.oneMillionUsers)}</strong>
        </div>
        <GroupedFindings
          groups={[{ title: "Scaling recommendations", items: scalabilityPrediction.scalingRecommendations }]}
        />
      </ReviewCard>

      <ReviewCard title="Query Optimization">
        <GroupedFindings
          groups={[
            { title: "SQL queries", items: queryOptimization.sqlQueries },
            { title: "Mongo queries", items: queryOptimization.mongoQueries },
            { title: "Redis usage", items: queryOptimization.redisUsage },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Competitive Coding Score System">
        <div className="score-display">
          {asText(codingScoreSystem.overallCompetitiveScore, 0)}/100
        </div>
        <div className="metric-row">
          <span>Maintainability</span>
          <strong>{asText(codingScoreSystem.maintainabilityScore, 0)}/100</strong>
        </div>
        <div className="metric-row">
          <span>Security</span>
          <strong>{asText(codingScoreSystem.securityScore, 0)}/100</strong>
        </div>
        <div className="metric-row">
          <span>Readability</span>
          <strong>{asText(codingScoreSystem.readabilityScore, 0)}/100</strong>
        </div>
        <div className="metric-row">
          <span>Performance</span>
          <strong>{asText(codingScoreSystem.performanceScore, 0)}/100</strong>
        </div>
        <p>{asText(codingScoreSystem.scoreSummary, "No competitive score summary available.")}</p>
      </ReviewCard>

      <ReviewCard title="Global Leaderboard">
        <div className="metric-row">
          <span>Cleanest code</span>
          <strong>{asText(globalLeaderboard.cleanestCodeRank)}</strong>
        </div>
        <div className="metric-row">
          <span>Fewest bugs</span>
          <strong>{asText(globalLeaderboard.fewestBugsRank)}</strong>
        </div>
        <div className="metric-row">
          <span>Best optimization</span>
          <strong>{asText(globalLeaderboard.bestOptimizationRank)}</strong>
        </div>
        <p>{asText(globalLeaderboard.leaderboardSummary, "No leaderboard summary available.")}</p>
      </ReviewCard>

      <ReviewCard title="Achievement Badges">
        <div className="badge-list">
          {toList(competitiveFeatures.achievementBadges).length ? (
            toList(competitiveFeatures.achievementBadges).map((badge, index) => (
              <span key={`${asText(badge, "badge")}-${index}`}>{asText(badge, "Badge")}</span>
            ))
          ) : (
            <p>No badges earned yet.</p>
          )}
        </div>
      </ReviewCard>

      <ReviewCard title="Auto Commit Message Generator" fullWidth>
        <pre className="code-output">
          {[commitMessage.title, ...toList(commitMessage.body)]
            .filter(Boolean)
            .join("\n")}
        </pre>
      </ReviewCard>

      <ReviewCard title="Auto Changelog Generator">
        <GroupedFindings
          groups={[
            { title: "Release notes", items: changelog.releaseNotes },
            { title: "Fixed bugs", items: changelog.fixedBugs },
            { title: "Breaking changes", items: changelog.breakingChanges },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="AI Sprint Report">
        <GroupedFindings
          groups={[
            { title: "Team progress", items: sprintReport.teamProgress },
            { title: "Fixed bugs", items: sprintReport.fixedBugs },
            { title: "Pending issues", items: sprintReport.pendingIssues },
            { title: "Next steps", items: sprintReport.nextSteps },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Voice Controlled Coding Assistant">
        <div className="metric-row">
          <span>Intent</span>
          <strong>{asText(voiceControlledAssistant.detectedIntent)}</strong>
        </div>
        <p>{asText(voiceControlledAssistant.response, "No voice command response available.")}</p>
        <GroupedFindings
          groups={[
            { title: "Supported commands", items: voiceControlledAssistant.supportedCommands },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="AI Whiteboard System" fullWidth>
        <pre className="code-output">
          {whiteboardSystem.architectureDiagram || "No architecture diagram returned."}
        </pre>
        <GroupedFindings
          groups={[{ title: "Diagram notes", items: whiteboardSystem.diagramNotes }]}
        />
      </ReviewCard>

      <ReviewCard title="Code-to-Flowchart Generator" fullWidth>
        <div className="code-compare-grid">
          <pre className="code-output">{asText(codeToFlowchart.flowchart, "No flowchart returned.")}</pre>
          <pre className="code-output">{asText(codeToFlowchart.uml, "No UML diagram returned.")}</pre>
          <pre className="code-output">{asText(codeToFlowchart.sequenceDiagram, "No sequence diagram returned.")}</pre>
        </div>
      </ReviewCard>

      <ReviewCard title="Reverse Engineering">
        <GroupedFindings
          groups={[
            { title: "Reconstructed architecture", items: reverseEngineering.architecture },
            { title: "Technologies used", items: reverseEngineering.technologies },
            { title: "Entry points", items: reverseEngineering.entryPoints },
            { title: "Limitations", items: reverseEngineering.limitations },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Quantum-inspired Optimization Score">
        <div className="metric-row">
          <span>Classical</span>
          <strong>{asText(quantumOptimization.classicalScore, 0)}/100</strong>
        </div>
        <div className="metric-row">
          <span>Quantum estimate</span>
          <strong>{asText(quantumOptimization.quantumInspiredEstimate, 0)}/100</strong>
        </div>
        <div className="metric-row">
          <span>Classical O</span>
          <strong>{asText(quantumOptimization.classicalComplexity)}</strong>
        </div>
        <div className="metric-row">
          <span>Quantum O</span>
          <strong>{asText(quantumOptimization.quantumInspiredComplexity)}</strong>
        </div>
        <p>{asText(quantumOptimization.summary, "No quantum-inspired score summary available.")}</p>
      </ReviewCard>

      <ReviewCard title="Quantum Secure Code Checker">
        <GroupedFindings
          groups={[
            { title: "Weak cryptography", items: quantumSecureCodeChecker.weakCryptography },
            { title: "Future quantum-vulnerable encryption", items: quantumSecureCodeChecker.quantumVulnerableEncryption },
            { title: "Post-quantum recommendations", items: quantumSecureCodeChecker.postQuantumRecommendations },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Quantum Algorithm Recommendation">
        <div className="metric-row">
          <span>Classical</span>
          <strong>{asText(quantumAlgorithmRecommendation.classicalAlgorithm)}</strong>
        </div>
        <div className="metric-row">
          <span>Quantum</span>
          <strong>{asText(quantumAlgorithmRecommendation.quantumAlgorithmPossibility)}</strong>
        </div>
        <GroupedFindings
          groups={[
            { title: "When quantum-inspired helps", items: quantumAlgorithmRecommendation.whenQuantumHelps },
            { title: "When classical is better", items: quantumAlgorithmRecommendation.whenClassicalIsBetter },
          ]}
        />
      </ReviewCard>

      <ReviewCard title="Quantum Complexity Analyzer">
        <div className="metric-row">
          <span>Classical</span>
          <strong>{asText(quantumComplexityAnalyzer.classical)}</strong>
        </div>
        <div className="metric-row">
          <span>Quantum-inspired</span>
          <strong>{asText(quantumComplexityAnalyzer.quantumInspired)}</strong>
        </div>
        <p>{asText(quantumComplexityAnalyzer.practicality, "No practicality analysis available.")}</p>
      </ReviewCard>
    </div>
  );
}
