const { spawnSync } = require('node:child_process');
const path = require('node:path');
const command = process.argv[2];
if (!['build', 'dev'].includes(command)) {
  console.error('Use: node scripts/next.cjs build|dev [Next.js options]');
  process.exit(1);
}
const [major, minor] = process.versions.node.split('.').map(Number);
if (major < 22 || (major === 22 && minor < 6)) {
  console.error('This project requires Node.js 22.6 or later.');
  process.exit(1);
}
const env = { ...process.env };
// Node 22.6 needs this opt-in for Tailwind's ESM dependency; child workers inherit it.
if (major === 22 && minor < 12 && !env.NODE_OPTIONS?.includes('--experimental-require-module')) {
  env.NODE_OPTIONS = [env.NODE_OPTIONS, '--experimental-require-module'].filter(Boolean).join(' ');
}
const next = require.resolve('next/dist/bin/next');
const result = spawnSync(process.execPath, [next, command, ...process.argv.slice(3)], {
  cwd: path.resolve(__dirname, '..'), env, stdio: 'inherit', windowsHide: true,
});
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
