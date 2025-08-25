# Static Site with HTML, CSS, JavaScript and Simple Node Libraries

A simple, fast static website generator that converts Markdown to HTML without complex frameworks. Perfect for blogs, documentation sites, and simple websites.

## Features

- ✅ **Simple Landing Page** - Clean, responsive homepage
- ✅ **Blog System** - Markdown-based blog with automatic generation
- ✅ **Template System** - Consistent HTML structure across all pages
- ✅ **Markdown Support** - Write content in simple Markdown
- ✅ **Responsive Design** - Works on all devices
- ✅ **Fast Performance** - Static files load quickly
- ✅ **Easy Maintenance** - Simple file structure and build process

## Project Structure

```
Static-Site/
├── content/                 # Markdown content files
│   ├── index.md            # Landing page
│   ├── about.md            # About page
│   ├── faq.md              # FAQ page
│   └── blog/               # Blog posts
│       ├── first-post.md
│       └── markdown-tips.md
├── dist/                   # Generated HTML files (created by build)
│   ├── styles.css          # CSS styles
│   ├── script.js           # JavaScript functionality
│   └── assets/             # Static assets
├── assets/                  # Source assets (images, documents, etc.)
├── build.js                # Build script
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Build the Site

```bash
npm run build
```

This will:
- Convert all Markdown files to HTML
- Generate the blog index
- Copy assets to the dist folder
- Create a complete static site in the `dist/` directory

### 3. View Your Site

```bash
npm run serve
```

This starts a local server at `http://localhost:3000`

### 4. Development Workflow

```bash
npm run dev
```

This builds the site and opens it in your browser automatically.

## Adding Content

### New Pages

1. Create a new Markdown file in the `content/` directory
2. Add front matter with a title:
   ```markdown
   ---
   title: Page Title
   ---
   
   # Your Content Here
   ```
3. Add the page to the navigation in `build.js`
4. Run `npm run build`

### Blog Posts

1. Create a new Markdown file in `content/blog/`
2. Add front matter:
   ```markdown
   ---
   title: Post Title
   date: 2024-01-15
   excerpt: Brief description of the post
   ---
   
   # Your Blog Post Content
   ```
3. Run `npm run build`

### Images and Assets

1. Place files in the `assets/` directory
2. Reference them in Markdown: `![Alt text](assets/filename.jpg)`
3. Run `npm run build` to copy them to the dist folder

## Customization

### Styling

Edit `dist/styles.css` to customize the appearance. The build process preserves your changes.

### Layout

Modify the `createHTMLTemplate` function in `build.js` to change the HTML structure.

### Navigation

Update the navigation links in the `createHTMLTemplate` function in `build.js`.

## Available Scripts

- `npm run build` - Build the static site
- `npm run serve` - Start a local development server
- `npm run dev` - Build and serve the site

## Dependencies

- **marked** - Markdown to HTML converter
- **front-matter** - Parse YAML front matter from Markdown
- **http-server** - Simple local development server

## Why This Approach?

- **No Framework Lock-in** - Pure HTML, CSS, and JavaScript
- **Fast Performance** - Static files load quickly
- **Easy to Deploy** - Just upload the `dist/` folder to any web server
- **Simple Maintenance** - Easy to understand and modify
- **Version Control Friendly** - Markdown files are easy to track and merge
- **Cost Effective** - Can be hosted on free services like GitHub Pages, Netlify, etc.

## Deployment

Simply upload the contents of the `dist/` directory to any web server or static hosting service:

- **GitHub Pages** - Push to a GitHub repository and enable Pages
- **Netlify** - Drag and drop the dist folder
- **Vercel** - Connect your repository for automatic deployments
- **Traditional Hosting** - Upload via FTP/SFTP

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `npm run build && npm run serve`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ and simplicity in mind.
