const fs = require('fs');
const results = JSON.parse(fs.readFileSync('results.json', 'utf8'));

const payload = {
    repository: process.env.GITHUB_REPOSITORY,
    branch: process.env.GITHUB_REF_NAME,
    commit_sha: process.env.GITHUB_SHA,
    run_identifier: process.env.GITHUB_RUN_ID,
    execution_timestamp: new Date().toISOString(),
    tests: results.testResults[0].assertionResults.map(t => ({
        name: t.title, result: t.status, failure_message: t.failureMessages.join(', ') || "None"
    })),
    summary: { total: results.numTotalTests, passed: results.numPassedTests, failed: results.numFailedTests, overall_status: results.success ? "PASSED" : "FAILED" }
};

fetch(process.env.WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
}).then(() => console.log("Sent!")).catch(console.error);