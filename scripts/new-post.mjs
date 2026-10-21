import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stdin as input, stdout as output } from 'node:process';
import readline from 'node:readline/promises';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const postsDir = join(root, 'src', 'content', 'blog');

async function getTitle() {
  const fromArguments = process.argv.slice(2).join(' ').trim();
  if (fromArguments) return fromArguments;

  const rl = readline.createInterface({ input, output });
  const answer = await rl.question('Post title: ');
  rl.close();
  return answer.trim();
}

function slugify(text) {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
    .replace(/-+$/g, '');
}

function today() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

const title = await getTitle();
if (!title) {
  console.error('No title given. Nothing was created.');
  process.exit(1);
}

const date = today();
let slug = slugify(title);
if (!slug) {
  slug = `post-${date}`;
  console.log(`The title has no letters or numbers that can go in a file name, so the file is called ${slug}.md.`);
}

const file = join(postsDir, `${slug}.md`);
if (existsSync(file)) {
  console.error(`src/content/blog/${slug}.md already exists. Nothing was created.`);
  process.exit(1);
}

const content = `---
title: ${JSON.stringify(title)}
description: ""
date: ${date}
draft: true # delete this line when the post is ready to publish
---

`;

mkdirSync(postsDir, { recursive: true });
writeFileSync(file, content, 'utf8');

console.log('');
console.log(`Created src/content/blog/${slug}.md`);
console.log('Next: write a one-sentence description, write the post below the dashes,');
console.log('and delete the "draft: true" line when it is ready to publish.');
