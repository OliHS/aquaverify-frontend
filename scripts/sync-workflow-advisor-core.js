import { spawnSync } from 'node:child_process';
import path from 'node:path';

const ROOT = process.cwd();
const sourceRoot = path.resolve(process.env.WORKFLOW_ADVISOR_CORE_SOURCE || path.join(ROOT, '..', 'aquaverify-cloud'));
const exporter = path.join(sourceRoot, 'scripts', 'export_workflow_advisor_core.js');
const target = path.join(ROOT, 'vendor', 'workflow-advisor-core');

const result = spawnSync(process.execPath, [exporter, `--target=${target}`], {
  cwd: sourceRoot,
  stdio: 'inherit'
});

if (result.status !== 0) {
  throw new Error(`Workflow Advisor core sync failed from ${sourceRoot}`);
}
