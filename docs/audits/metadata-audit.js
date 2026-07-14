import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.join(__dirname, '..', '..', 'dist');

function getFiles(dir, files_ = []) {
  const files = fs.readdirSync(dir);
  for (const i in files) {
    const name = path.join(dir, files[i]);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      if (name.endsWith('.html')) {
        files_.push(name);
      }
    }
  }
  return files_;
}

function auditMetadata() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error('dist/ directory does not exist. Please run npm run build first.');
    process.exit(1);
  }

  const files = getFiles(DIST_DIR);
  const results = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf-8');
    const relativePath = path.relative(DIST_DIR, file).replace(/\\/g, '/');
    const url = '/' + relativePath.replace(/index\.html$/, '').replace(/\/$/, '');

    // Simple regex parsing of HTML
    const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
    const descMatch = content.match(/<meta\s+name="description"\s+content="([\s\S]*?)"/i) || 
                      content.match(/<meta\s+content="([\s\S]*?)"\s+name="description"/i);
    const h1Match = content.match(/<h1[\s\S]*?>([\s\S]*?)<\/h1>/i);
    const canonicalMatch = content.match(/<link\s+rel="canonical"\s+href="([\s\S]*?)"/i) ||
                           content.match(/<link\s+href="([\s\S]*?)"\s+rel="canonical"/i);
    const robotsMatch = content.match(/<meta\s+name="robots"\s+content="([\s\S]*?)"/i) ||
                        content.match(/<meta\s+content="([\s\S]*?)"\s+name="robots"/i);

    const title = titleMatch ? titleMatch[1].trim() : '';
    const desc = descMatch ? descMatch[1].trim() : '';
    const h1 = h1Match ? h1Match[1].replace(/<[^>]*>/g, '').trim() : '';
    const canonical = canonicalMatch ? canonicalMatch[1].trim() : '';
    const robots = robotsMatch ? robotsMatch[1].trim() : '';

    results.push({
      url,
      title,
      desc,
      h1,
      canonical,
      robots
    });
  }

  // Output as JSON for processing
  const auditPath = path.join(__dirname, 'batch-4-metadata-audit.json');
  fs.writeFileSync(auditPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`Audited ${results.length} HTML files. Saved results to: ${auditPath}`);
}

auditMetadata();
