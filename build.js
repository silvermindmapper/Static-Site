const fs = require('fs');
const path = require('path');
const marked = require('marked');
const frontMatter = require('front-matter');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// HTML template function
function createHTMLTemplate(title, content, currentPage = '') {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <header>
        <nav>
            <div class="nav-container">
                <a href="/" class="logo">My Site</a>
                <ul class="nav-links">
                    <li><a href="/" ${currentPage === 'home' ? 'class="active"' : ''}>Home</a></li>
                    <li><a href="/blog" ${currentPage === 'blog' ? 'class="active"' : ''}>Blog</a></li>
                    <li><a href="/about" ${currentPage === 'about' ? 'class="active"' : ''}>About</a></li>
                    <li><a href="/faq" ${currentPage === 'faq' ? 'class="active"' : ''}>FAQ</a></li>
                    <li><a href="/contact" ${currentPage === 'contact' ? 'class="active"' : ''}>Contact</a></li>
                </ul>
            </div>
        </nav>
    </header>
    
    <main>
        ${content}
    </main>
    
    <footer>
        <p>&copy; 2024 My Site. Built with simple tools.</p>
    </footer>
    
    <script src="/script.js"></script>
</body>
</html>`;
}

// Convert Markdown to HTML
function markdownToHTML(markdown) {
  return marked.parse(markdown);
}

// Build a single page
function buildPage(markdownPath, outputPath, title, currentPage) {
  try {
    const markdown = fs.readFileSync(markdownPath, 'utf8');
    const parsed = frontMatter(markdown);
    const htmlContent = markdownToHTML(parsed.body);
    const fullHTML = createHTMLTemplate(title, htmlContent, currentPage);
    
    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, fullHTML);
    console.log(`Built: ${outputPath}`);
  } catch (error) {
    console.error(`Error building ${markdownPath}:`, error);
  }
}

// Build blog posts
function buildBlog() {
  const blogDir = 'content/blog';
  const outputDir = 'dist/blog';
  
  if (!fs.existsSync(blogDir)) {
    console.log('No blog content found');
    return;
  }
  
  // Create blog index
  const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
  let blogIndexHTML = '<h1>Blog</h1><div class="blog-list">';
  
  blogFiles.forEach(file => {
    const markdownPath = path.join(blogDir, file);
    const markdown = fs.readFileSync(markdownPath, 'utf8');
    const parsed = frontMatter(markdown);
    const title = parsed.attributes.title || file.replace('.md', '');
    const slug = file.replace('.md', '');
    
    // Build individual blog post
    const postOutputPath = path.join(outputDir, `${slug}.html`);
    buildPage(markdownPath, postOutputPath, title, 'blog');
    
    // Add to blog index
    blogIndexHTML += `
      <article class="blog-preview">
        <h2><a href="/blog/${slug}">${title}</a></h2>
        ${parsed.attributes.excerpt ? `<p>${parsed.attributes.excerpt}</p>` : ''}
        <small>${parsed.attributes.date || 'No date'}</small>
      </article>
    `;
  });
  
  blogIndexHTML += '</div>';
  
  // Create blog index page
  const fullBlogIndexHTML = createHTMLTemplate('Blog', blogIndexHTML, 'blog');
  fs.writeFileSync('dist/blog/index.html', fullBlogIndexHTML);
  console.log('Built: dist/blog/index.html');
}

// Main build function
function build() {
  console.log('Building static site...');
  
  // Build main pages
  buildPage('content/index.md', 'dist/index.html', 'Welcome', 'home');
  buildPage('content/about.md', 'dist/about.html', 'About', 'about');
  buildPage('content/faq.md', 'dist/faq.html', 'FAQ', 'faq');
  buildPage('content/contact.md', 'dist/contact.html', 'Contact', 'contact');
  
  // Build blog
  buildBlog();
  
  // Copy assets
  if (fs.existsSync('assets')) {
    fs.cpSync('assets', 'dist/assets', { recursive: true });
    console.log('Copied assets');
  }
  
  console.log('Build complete!');
}

// Run build if this file is executed directly
if (require.main === module) {
  build();
}
