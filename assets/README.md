# Assets Directory

This directory contains static assets for your website:

- **Images**: Place your images here (JPG, PNG, SVG, etc.)
- **Documents**: PDFs, documents, or other files
- **Favicon**: Your site's favicon files
- **Other media**: Any other static files you want to serve

## Usage

1. Place your files in this directory
2. Run `npm run build` to copy them to the `dist/assets` folder
3. Reference them in your Markdown files like: `![Alt text](assets/filename.jpg)`

## Example

```markdown
![A beautiful sunset](assets/sunset.jpg)
[Download PDF](assets/document.pdf)
```

The build process will automatically copy all files from this directory to `dist/assets` when you run the build command.
