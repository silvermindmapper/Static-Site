# Blog System Documentation

This static site now includes a powerful blog system that allows you to create beautiful blog posts using Markdown.

## Features

- ✍️ **Markdown Support**: Write posts in Markdown with full formatting
- 🎨 **Beautiful Templates**: Professional blog post layout with responsive design
- 📱 **Mobile Optimized**: Responsive design that works on all devices
- 🏷️ **Tags & Metadata**: Support for tags, authors, dates, and excerpts
- 🔍 **SEO Friendly**: Proper meta tags and structured content
- ⚡ **Fast Build**: Quick build process with no complex dependencies

## How to Add a New Blog Post

### Option 1: Use the Helper Script (Recommended)

1. Run the helper script:
   ```bash
   node create-post.js
   ```

2. Follow the prompts to enter:
   - Post title
   - Excerpt (optional)
   - Author (defaults to "BASB Team")
   - Tags (comma-separated, optional)

3. The script will create a new Markdown file with proper front matter

4. Edit the file to add your content

5. Build your site:
   ```bash
   node build.js
   ```

### Option 2: Create Manually

1. Create a new `.md` file in `src/content/blog/`
2. Add front matter at the top:

```markdown
---
title: Your Post Title
date: 2025-08-27
excerpt: A brief description of your post
author: Your Name
tags: [tag1, tag2, tag3]
---
```

3. Write your content in Markdown below the front matter
4. Run `node build.js` to build

## Front Matter Options

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | The title of your blog post |
| `date` | No | Publication date (YYYY-MM-DD format) |
| `excerpt` | No | Brief description shown in previews |
| `author` | No | Author name (defaults to "BASB Team") |
| `tags` | No | Array of tags for categorization |

## Markdown Features

Your blog posts support all standard Markdown features:

- **Headers**: `# H1`, `## H2`, `### H3`
- **Text Formatting**: **bold**, *italic*, `code`
- **Lists**: Bullet points and numbered lists
- **Links**: `[text](url)`
- **Images**: `![alt](image-url)`
- **Code Blocks**: Triple backticks for syntax highlighting
- **Blockquotes**: `> quoted text`
- **Tables**: Full table support

## File Structure

```
src/
├── content/
│   └── blog/
│       ├── first-post.md
│       ├── markdown-tips.md
│       └── your-new-post.md
├── css/
│   └── styles.css
└── index.html

dist/
├── blog/
│   ├── index.html          # Blog listing page
│   ├── first-post.html     # Individual blog post
│   ├── markdown-tips.html  # Individual blog post
│   └── your-new-post.html  # Your new post
└── styles.css
```

## Building Your Site

After creating or editing blog posts:

1. Run the build script:
   ```bash
   node build.js
   ```

2. The script will:
   - Convert Markdown to HTML
   - Apply the blog template
   - Generate the blog index page
   - Copy all assets to the `dist/` folder

3. Your site is ready to deploy!

## Customization

### Styling
- Edit `src/css/styles.css` to customize blog appearance
- Blog-specific styles are in the "Blog Styles" section
- Responsive design is included for mobile devices

### Templates
- Blog template: `createBlogHTMLTemplate()` in `build.js`
- Main site template: `createBASBHTMLTemplate()` in `build.js`

### Adding New Features
- Extend the front matter to include new metadata
- Add new CSS classes for additional styling
- Modify the build script to handle new features

## Example Blog Post

Here's a complete example of a blog post:

```markdown
---
title: Getting Started with Markdown
date: 2025-08-27
excerpt: Learn the basics of Markdown for better content creation
author: BASB Team
tags: [markdown, tutorial, writing]
---

# Getting Started with Markdown

Markdown is a simple way to write formatted content...

## Why Markdown?

- Easy to learn
- Portable across platforms
- Converts to HTML easily

## Basic Syntax

Use **bold** and *italic* text to emphasize important points.

### Lists

1. First item
2. Second item
3. Third item

---

*Happy writing!*
```

## Tips for Great Blog Posts

1. **Use Clear Headers**: Create a logical hierarchy with H1, H2, H3
2. **Write Good Excerpts**: Keep them under 160 characters for SEO
3. **Add Relevant Tags**: Help readers find related content
4. **Include Images**: Visual content makes posts more engaging
5. **Use Code Examples**: Show, don't just tell
6. **Keep it Scannable**: Use lists, headers, and short paragraphs

## Troubleshooting

### Build Errors
- Check that all Markdown files have valid front matter
- Ensure file names don't contain special characters
- Verify the `dist/` folder is writable

### Styling Issues
- Check browser console for CSS errors
- Verify CSS file is being copied to `dist/`
- Test responsive design on different screen sizes

### Content Not Appearing
- Run `node build.js` after making changes
- Check that Markdown syntax is correct
- Verify file is saved in the correct directory

## Next Steps

Now that you have a blog system:

1. Create your first post using `node create-post.js`
2. Customize the styling to match your brand
3. Add more features like categories or search
4. Consider adding a comment system
5. Set up analytics to track readership

Happy blogging! 🎉
