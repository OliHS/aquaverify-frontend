import { spawnSync } from 'node:child_process';
import path from 'node:path';

const ROOT = process.cwd();
const sourceRoot = path.resolve(process.env.AQUATOOLS_CORE_SOURCE || path.join(ROOT, '..', 'aquaverify-cloud'));
const exporter = path.join(sourceRoot, 'scripts', 'export_aquatools_core.js');
const target = path.join(ROOT, 'vendor', 'aquatools-core');

const result = spawnSync(process.execPath, [exporter, `--target=${target}`], {
  cwd: sourceRoot,
  stdio: 'inherit'
});

if (result.status !== 0) {
  throw new Error(`AquaTools core sync failed from ${sourceRoot}`);
}
