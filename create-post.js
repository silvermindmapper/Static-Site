#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function createBlogPost() {
  console.log('🎉 Create a New Blog Post\n');
  
  const title = await question('Post title: ');
  const excerpt = await question('Excerpt (optional): ');
  const author = await question('Author (default: BASB Team): ') || 'BASB Team';
  const tagsInput = await question('Tags (comma-separated, optional): ');
  
  // Generate slug from title
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  // Parse tags
  const tags = tagsInput
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);
  
  // Create front matter
  const frontMatter = `---
title: ${title}
date: ${new Date().toISOString().split('T')[0]}
excerpt: ${excerpt || ''}
author: ${author}
${tags.length > 0 ? `tags: [${tags.join(', ')}]` : ''}
---

# ${title}

${excerpt ? `\n${excerpt}\n` : ''}

## Introduction

Start your blog post here...

## Main Content

Add your main content here...

## Conclusion

Wrap up your thoughts here...

---

*Published on ${new Date().toLocaleDateString('en-US', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}*
`;
  
  // Create the file
  const blogDir = 'src/content/blog';
  const filePath = path.join(blogDir, `${slug}.md`);
  
  // Ensure blog directory exists
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }
  
  fs.writeFileSync(filePath, frontMatter);
  
  console.log(`\n✅ Blog post created: ${filePath}`);
  console.log(`📝 Edit the file to add your content`);
  console.log(`🚀 Run 'node build.js' to build your site`);
  
  rl.close();
}

createBlogPost().catch(console.error);
