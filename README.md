# Static Site Generator

A simple static site generator that converts Markdown files to HTML with a clean, responsive design.

## Features

- **Markdown Support**: Write content in Markdown with front matter
- **Blog System**: Automatic blog post generation with index
- **Responsive Design**: Mobile-friendly layout
- **GitHub Pages**: Automatic deployment via GitHub Actions
- **Simple Build Process**: One command to build the entire site

## Quick Start

### Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Edit content** in the `content/` directory:
   - `content/index.md` - Home page
   - `content/about.md` - About page
   - `content/contact.md` - Contact page
   - `content/faq.md` - FAQ page
   - `content/blog/` - Blog posts

3. **Build the site**:
   ```bash
   npm run build
   ```

4. **Preview locally**:
   ```bash
   npm run serve
   ```
   Then visit `http://localhost:3000`

### Content Format

Each Markdown file can include front matter (metadata) at the top:

```markdown
---
title: Your Page Title
excerpt: Brief description (for blog posts)
date: 2024-01-15
---

# Your Content

Write your content in **Markdown** format.
```

## Deployment

### GitHub Pages (Automatic)

1. **Push to GitHub**: The site automatically deploys when you push to the `main` branch
2. **Enable GitHub Pages**: Go to your repository Settings → Pages → Source: "Deploy from a branch" → Branch: "gh-pages"
3. **Your site will be available at**: `https://yourusername.github.io/your-repo-name`

### Manual Deployment

1. Build the site: `npm run build`
2. Upload the contents of the `dist/` folder to your web server

## Project Structure

```
├── content/          # Source Markdown files
│   ├── index.md      # Home page
│   ├── about.md      # About page
│   ├── contact.md    # Contact page
│   ├── faq.md        # FAQ page
│   └── blog/         # Blog posts
├── dist/             # Built site (auto-generated)
├── assets/           # Static assets (CSS, JS, images)
├── build.js          # Build script
└── package.json      # Dependencies and scripts
```

## Customization

- **Styling**: Edit `dist/styles.css` (will be overwritten on build)
- **Template**: Modify the `createHTMLTemplate` function in `build.js`
- **Navigation**: Update the navigation links in `build.js`

## Scripts

- `npm run build` - Build the site
- `npm run serve` - Serve the built site locally
- `npm run dev` - Build and serve in one command

## Dependencies

- `marked` - Markdown to HTML conversion
- `front-matter` - Parse front matter from Markdown files
- `http-server` - Local development server
