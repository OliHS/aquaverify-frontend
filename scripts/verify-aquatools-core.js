import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const VENDOR_DIR = path.join(ROOT, 'vendor', 'aquatools-core');
const manifestPath = path.join(VENDOR_DIR, 'aquatools-core-manifest.json');

function sha256ForFiles(files) {
  const hash = crypto.createHash('sha256');
  for (const file of files) {
    hash.update(file);
    hash.update('\0');
    hash.update(fs.readFileSync(path.join(VENDOR_DIR, file)));
    hash.update('\0');
  }
  return hash.digest('hex');
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const actual = sha256ForFiles(manifest.files || []);

if (actual !== manifest.sha256) {
  throw new Error(`AquaTools core vendor hash mismatch: expected ${manifest.sha256}, got ${actual}`);
}

console.log(`OK AquaTools core vendor ${manifest.packageVersion} ${manifest.sha256}`);
