const fs = require('fs');
const path = require('path');

function generateSummary() {
  const resultsPath = path.join(process.cwd(), 'test-results', 'results.json');
  if (!fs.existsSync(resultsPath)) {
    console.error('results.json not found at:', resultsPath);
    return;
  }

  const report = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
  const stats = report.stats || {};
  const durationSec = ((stats.duration || 0) / 1000).toFixed(1);
  const total = (stats.expected || 0) + (stats.unexpected || 0) + (stats.flaky || 0) + (stats.skipped || 0);
  const passed = stats.expected || 0;
  const failed = stats.unexpected || 0;
  const flaky = stats.flaky || 0;
  const skipped = stats.skipped || 0;

  const isSuccess = failed === 0;
  const overallBadge = isSuccess ? '🟢 **ALL PASSED**' : '🔴 **FAILED**';

  let markdown = [];
  markdown.push('## 🧪 Test Results & Quality Gates');
  markdown.push('');
  markdown.push('| Status | Total | Passed | Failed | Flaky | Skipped | Duration |');
  markdown.push('| :---: | :---: | :---: | :---: | :---: | :---: | :---: |');
  markdown.push(`| ${overallBadge} | **${total}** | **${passed}** ✅ | **${failed}** ❌ | **${flaky}** ⚠️ | **${skipped}** ⏭️ | **${durationSec}s** ⏱️ |`);
  markdown.push('');

  const suitesData = [];

  function collectSpecs(suite, suiteName) {
    if (suite.suites && suite.suites.length > 0) {
      for (const subSuite of suite.suites) {
        collectSpecs(subSuite, subSuite.title || suiteName);
      }
    }
    if (suite.specs && suite.specs.length > 0) {
      for (const spec of suite.specs) {
        const testObj = spec.tests?.[0];
        const result = testObj?.results?.[0];
        const status = result?.status || (spec.ok ? 'passed' : 'failed');
        const duration = result?.duration ? (result.duration / 1000).toFixed(1) + 's' : '-';
        const errors = (result?.errors || []).map(e => e.message || e.value).join('\n');

        suitesData.push({
          suite: suiteName || suite.title || spec.file,
          file: spec.file,
          title: spec.title,
          status,
          duration,
          errors
        });
      }
    }
  }

  for (const s of report.suites || []) {
    collectSpecs(s, s.title);
  }

  // Group by file / suite
  const grouped = {};
  for (const item of suitesData) {
    const key = item.suite || item.file;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(item);
  }

  markdown.push('### 📋 Detailed Test Breakdown');
  markdown.push('');

  for (const [suiteTitle, items] of Object.entries(grouped)) {
    const suitePassed = items.every(i => i.status === 'passed');
    const suiteIcon = suitePassed ? '✅' : '❌';
    markdown.push(`<details ${isSuccess ? '' : (suitePassed ? '' : 'open')}>`);
    markdown.push(`<summary><b>${suiteIcon} ${suiteTitle} (${items.length} tests)</b></summary>`);
    markdown.push('');
    markdown.push('| Status | Test Title | Duration |');
    markdown.push('| :---: | :--- | :---: |');

    for (const item of items) {
      const icon = item.status === 'passed' ? '✅' : (item.status === 'skipped' ? '⏭️' : '❌');
      markdown.push(`| ${icon} | ${item.title} | ${item.duration} |`);
    }

    markdown.push('');
    markdown.push('</details>');
    markdown.push('');
  }

  // If there are failures, add detailed error traces
  const failedItems = suitesData.filter(i => i.status !== 'passed' && i.status !== 'skipped');
  if (failedItems.length > 0) {
    markdown.push('### ⚠️ Failure Diagnostics');
    markdown.push('');
    for (const item of failedItems) {
      markdown.push(`<details open>`);
      markdown.push(`<summary><b>❌ ${item.suite} › ${item.title}</b></summary>`);
      markdown.push('');
      markdown.push('```text');
      markdown.push(item.errors || 'No error details recorded.');
      markdown.push('```');
      markdown.push('</details>');
      markdown.push('');
    }
  }

  const outputContent = markdown.join('\n');

  // Output to GITHUB_STEP_SUMMARY if available
  const summaryFile = process.env.GITHUB_STEP_SUMMARY;
  if (summaryFile) {
    fs.appendFileSync(summaryFile, outputContent + '\n', 'utf8');
    console.log('Appended test summary to GITHUB_STEP_SUMMARY');
  } else {
    console.log('GITHUB_STEP_SUMMARY not defined. Local output preview:');
    console.log(outputContent);
  }
}

generateSummary();
