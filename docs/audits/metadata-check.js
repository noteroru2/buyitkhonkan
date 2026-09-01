import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AUDIT_FILE = path.join(__dirname, 'batch-4-metadata-audit.json');

function checkMetadata() {
  if (!fs.existsSync(AUDIT_FILE)) {
    console.error('Metadata audit JSON file does not exist.');
    process.exit(1);
  }

  const data = JSON.parse(fs.readFileSync(AUDIT_FILE, 'utf-8'));
  const issues = [];
  const titles = {};
  const descriptions = {};

  for (const page of data) {
    // Missing metadata checks
    if (!page.title) {
      issues.push({ url: page.url, type: 'Missing Title', info: '' });
    }
    if (!page.desc) {
      issues.push({ url: page.url, type: 'Missing Description', info: '' });
    }
    if (!page.h1) {
      issues.push({ url: page.url, type: 'Missing H1', info: '' });
    }
    if (!page.canonical) {
      issues.push({ url: page.url, type: 'Missing Canonical', info: '' });
    }

    // Title length checks (optimal: 50-60 chars for Thai, typically 60 max)
    if (page.title && page.title.length > 70) {
      issues.push({ url: page.url, type: 'Long Title', info: `Length: ${page.title.length} chars` });
    }

    // Description length checks (optimal: 120-160 chars)
    if (page.desc && (page.desc.length < 80 || page.desc.length > 200)) {
      issues.push({ url: page.url, type: 'Description Length', info: `Length: ${page.desc.length} chars` });
    }

    // Duplicate titles
    if (page.title) {
      if (titles[page.title]) {
        titles[page.title].push(page.url);
      } else {
        titles[page.title] = [page.url];
      }
    }

    // Duplicate descriptions
    if (page.desc) {
      if (descriptions[page.desc]) {
        descriptions[page.desc].push(page.url);
      } else {
        descriptions[page.desc] = [page.url];
      }
    }
  }

  // Add duplicate issues
  for (const [title, urls] of Object.entries(titles)) {
    if (urls.length > 1) {
      for (const url of urls) {
        issues.push({ url, type: 'Duplicate Title', info: `Duplicates: ${urls.filter(u => u !== url).join(', ')}` });
      }
    }
  }

  for (const [desc, urls] of Object.entries(descriptions)) {
    if (urls.length > 1) {
      for (const url of urls) {
        issues.push({ url, type: 'Duplicate Description', info: `Duplicates: ${urls.filter(u => u !== url).join(', ')}` });
      }
    }
  }

  console.log(`Found ${issues.length} metadata issues.\n`);
  for (const issue of issues) {
    console.log(`[${issue.type}] ${issue.url} - ${issue.info}`);
  }
}

checkMetadata();
