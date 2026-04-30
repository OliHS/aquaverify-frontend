import { spawnSync } from 'node:child_process';

const VERCEL_CLI_VERSION = process.env.VERCEL_CLI_VERSION || '51.6.1';
const skipSmoke = process.argv.includes('--no-smoke');
const skipBuild = process.argv.includes('--no-build');
const npmCache = process.env.npm_config_cache || '.npm-cache';

function run(command, args, options = {}) {
  const label = [command, ...args].join(' ');
  console.log(`\n> ${label}`);

  const result = spawnSync(command, args, {
    stdio: 'inherit',
    env: {
      ...process.env,
      npm_config_cache: npmCache,
      ...options.env
    }
  });

  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${label} failed with exit code ${result.status}`);
  }
}

try {
  run('npm', ['run', 'cms:links:audit']);
  if (!skipBuild) run('npm', ['run', 'build']);
  run('npx', ['-y', `vercel@${VERCEL_CLI_VERSION}`, '--prod', '--yes']);
  if (!skipSmoke) run('npm', ['run', 'smoke:prod']);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
