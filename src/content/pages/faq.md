---
title: FAQ
---

# Frequently Asked Questions

## General Questions

### What is this website?
This is a static website built with simple tools. It demonstrates how to create a fast, maintainable website without complex frameworks.

### Why use a static site?
Static sites are fast, secure, and easy to maintain. They load quickly and are perfect for content-focused websites.

### Is this really "no framework"?
Yes! We use vanilla HTML, CSS, and JavaScript. The only "framework" is a simple build script that converts Markdown to HTML.

## Technical Questions

### How do I add new content?
Simply create a new Markdown file in the `content` directory and run `npm run build`. The build script will automatically convert it to HTML.

### Can I customize the design?
Absolutely! The CSS is in `dist/styles.css` and can be easily modified. The build process preserves your customizations.

### How do I add a new page?
1. Create a Markdown file in the `content` directory
2. Add the page to the navigation in `build.js`
3. Run `npm run build`

### What about images and other assets?
Place them in the `assets` directory. They'll be automatically copied to `dist/assets` during the build process.

## Blog Questions

### How do I write a blog post?
1. Create a new Markdown file in `content/blog/`
2. Add front matter with title, date, and excerpt
3. Write your content in Markdown
4. Run `npm run build`

### Can I use HTML in blog posts?
Yes, Markdown supports inline HTML, so you can use HTML tags when needed.

## Support

### I found a bug!
Please report any issues through our contact form or create an issue in our repository.

### Can I contribute?
Absolutely! We welcome contributions. Feel free to submit pull requests or suggest improvements.
