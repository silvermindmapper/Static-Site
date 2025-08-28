const fs = require('fs');
const path = require('path');
const marked = require('marked');
const frontMatter = require('front-matter');

// Create dist directory if it doesn't exist
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist');
}

// Function to process template includes
function processTemplateIncludes(html) {
  // Replace header placeholder
  const headerPath = 'src/templates/partials/header.html';
  if (fs.existsSync(headerPath)) {
    const headerContent = fs.readFileSync(headerPath, 'utf8');
    html = html.replace('{{header}}', headerContent);
  }
  
  // Replace footer placeholder
  const footerPath = 'src/templates/partials/footer.html';
  if (fs.existsSync(footerPath)) {
    const footerContent = fs.readFileSync(footerPath, 'utf8');
    html = html.replace('{{footer}}', footerContent);
  }
  
  // Replace convertkit placeholder
  const convertkitPath = 'src/templates/partials/convertkit.html';
  if (fs.existsSync(convertkitPath)) {
    const convertkitContent = fs.readFileSync(convertkitPath, 'utf8');
    html = html.replace('{{convertkit}}', convertkitContent);
  }
  
  return html;
}

// Function to process template placeholders
function processTemplatePlaceholders(html, placeholders) {
  Object.keys(placeholders).forEach(key => {
    const placeholder = `{{${key}}}`;
    html = html.replace(placeholder, placeholders[key] || '');
  });
  return html;
}

// BASB HTML template function
function createBASBHTMLTemplate(title, content, currentPage = '') {
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
                <div class="logo-section">
                    <a href="/" class="logo">BASB</a>
                    <span class="tagline">building a second brain.</span>
                </div>
                <ul class="nav-links">
                    <li><a href="/app">APP</a></li>
                    <li class="dropdown">
                        <a href="/books">BOOKS <span class="dropdown-arrow">▼</span></a>
                    </li>
                    <li class="dropdown">
                        <a href="/courses">COURSES <span class="dropdown-arrow">▼</span></a>
                    </li>
                    <li><a href="/membership">MEMBERSHIP</a></li>
                    <li><a href="/blog/">BLOG</a></li>
                    <li class="dropdown">
                        <a href="/events">EVENTS <span class="dropdown-arrow">▼</span></a>
                    </li>
                    <li class="dropdown">
                        <a href="/resources">RESOURCES <span class="dropdown-arrow">▼</span></a>
                    </li>
                    <li><a href="/wall-of-love">WALL OF LOVE</a></li>
                </ul>
            </div>
        </nav>
    </header>
    
    <main>
        ${content}
    </main>
    
    <div class="chat-widget">
        <div class="chat-bubble">
            <span class="chat-close">×</span>
            <span class="chat-text">Hi. Need any help?</span>
        </div>
    </div>
    
    <footer>
        <p>&copy; 2024 BASB. Building a Second Brain.</p>
    </footer>
    
    <script src="/script.js"></script>
</body>
</html>`;
}

// Blog HTML template function
function createBlogHTMLTemplate(title, content, meta = {}) {
  const date = meta.date || 'No date';
  const excerpt = meta.excerpt || '';
  const author = meta.author || 'BASB Team';
  
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} - BASB Blog</title>
    <meta name="description" content="${excerpt}">
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <header>
        <nav>
            <div class="nav-container">
                <div class="logo-section">
                    <a href="/" class="logo">BASB</a>
                    <span class="tagline">building a second brain.</span>
                </div>
                <ul class="nav-links">
                    <li><a href="/app">APP</a></li>
                    <li class="dropdown">
                        <a href="/books">BOOKS <span class="dropdown-arrow">▼</span></a>
                    </li>
                    <li class="dropdown">
                        <a href="/courses">COURSES <span class="dropdown-arrow">▼</span></a>
                    </li>
                    <li><a href="/membership">MEMBERSHIP</a></li>
                    <li><a href="/blog/">BLOG</a></li>
                    <li class="dropdown">
                        <a href="/events">EVENTS <span class="dropdown-arrow">▼</span></a>
                    </li>
                    <li class="dropdown">
                        <a href="/resources">RESOURCES <span class="dropdown-arrow">▼</span></a>
                    </li>
                    <li><a href="/wall-of-love">WALL OF LOVE</a></li>
                </ul>
            </div>
        </nav>
    </header>
    
    <main class="blog-post">
        <div class="blog-container">
            <nav class="blog-breadcrumb">
                <a href="/">Home</a> &gt; 
                <a href="/blog/">Blog</a> &gt; 
                <span>${title}</span>
            </nav>
            
            <article class="blog-content">
                <header class="blog-header">
                    <h1 class="blog-title">${title}</h1>
                    <div class="blog-meta">
                        <span class="blog-date">${date}</span>
                        <span class="blog-author">by ${author}</span>
                    </div>
                    ${excerpt ? `<p class="blog-excerpt">${excerpt}</p>` : ''}
                </header>
                
                <div class="blog-body">
                    ${content}
                </div>
                
                <footer class="blog-footer">
                    <div class="blog-tags">
                        ${meta.tags ? meta.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('') : ''}
                    </div>
                    <div class="blog-navigation">
                        <a href="/blog/" class="back-to-blog">← Back to Blog</a>
                    </div>
                </footer>
            </article>
        </div>
    </main>
    
    <div class="chat-widget">
        <div class="chat-bubble">
            <span class="chat-close">×</span>
            <span class="chat-text">Hi. Need any help?</span>
        </div>
    </div>
    
    <footer>
        <p>&copy; 2024 BASB. Building a Second Brain.</p>
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
function buildPage(markdownPath, outputPath, title, currentPage = '') {
  try {
    if (!fs.existsSync(markdownPath)) {
      console.log(`Markdown file not found: ${markdownPath}`);
      return;
    }

    const markdown = fs.readFileSync(markdownPath, 'utf8');
    const parsed = frontMatter(markdown);
    const pageTitle = parsed.attributes.title || title;
    const pageDescription = parsed.attributes.description || '';
    const pageSubtitle = parsed.attributes.subtitle || '';
    
    // Read the page template
    const templatePath = 'src/templates/base.html';
    if (!fs.existsSync(templatePath)) {
      console.log('Page template not found, using default generation');
      const htmlContent = markdownToHTML(parsed.body);
      const fullHTML = createBASBHTMLTemplate(pageTitle, htmlContent, currentPage);
      fs.writeFileSync(outputPath, fullHTML);
      console.log(`Built: ${outputPath}`);
      return;
    }
    
    let templateHTML = fs.readFileSync(templatePath, 'utf8');
    
    // Process template placeholders
    const placeholders = {
      title: pageTitle,
      description: pageDescription,
      subtitle: pageSubtitle ? `<p class="page-subtitle">${pageSubtitle}</p>` : '',
      content: markdownToHTML(parsed.body)
    };
    
    templateHTML = processTemplatePlaceholders(templateHTML, placeholders);
    templateHTML = processTemplateIncludes(templateHTML);
    
    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, templateHTML);
    console.log(`Built: ${outputPath}`);
  } catch (error) {
    console.error(`Error building ${markdownPath}:`, error);
  }
}

// Build blog posts
function buildBlog() {
  const blogDir = 'src/content/blog';
  const outputDir = 'dist/blog';
  
  if (!fs.existsSync(blogDir)) {
    console.log('No blog content found');
    return;
  }
  
  // Read the blog template
  const templatePath = 'src/templates/blog.html';
  if (!fs.existsSync(templatePath)) {
    console.log('Blog template not found, using default generation');
    return buildBlogDefault();
  }
  
  let templateHTML = fs.readFileSync(templatePath, 'utf8');
  
  // Create blog index
  const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
  
  // Sort blog files by date (newest first)
  const blogPosts = blogFiles.map(file => {
    const markdownPath = path.join(blogDir, file);
    const markdown = fs.readFileSync(markdownPath, 'utf8');
    const parsed = frontMatter(markdown);
    const title = parsed.attributes.title || file.replace('.md', '');
    const slug = file.replace('.md', '');
    const date = parsed.attributes.date || new Date().toISOString();
    const excerpt = parsed.attributes.excerpt || '';
    const author = parsed.attributes.author || 'Sheng';
    
    return {
      file,
      title,
      slug,
      date,
      excerpt,
      author,
      parsed
    };
  }).sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Define some placeholder images for the blog posts
  const placeholderImages = [
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop'
  ];
  
  let blogPostsHTML = '';
  
  blogPosts.forEach((post, index) => {
    const isFeatured = index === 0; // First post is featured
    const imageUrl = placeholderImages[index % placeholderImages.length];
    
    // Format date for display
    const displayDate = new Date(post.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    }).toUpperCase();
    
    // Build individual blog post using blog post template
    const postOutputPath = path.join(outputDir, `${post.slug}.html`);
    buildBlogPost(post, postOutputPath);
    
    // Add to blog index with new card layout
    blogPostsHTML += `
      <article class="blog-card${isFeatured ? ' featured' : ''}">
        <div class="blog-card-image">
          <img src="${imageUrl}" alt="${post.title}">
        </div>
        <div class="blog-card-content">
          <h2 class="blog-card-title">
            <a href="/blog/${post.slug}.html">${post.title}</a>
          </h2>
          ${post.excerpt ? `<p class="blog-card-excerpt">${post.excerpt}</p>` : ''}
          <div class="blog-card-meta">
            <span class="blog-card-date">${displayDate} • ${post.author.toUpperCase()}</span>
          </div>
        </div>
      </article>
    `;
  });
  
  // Replace the placeholder with actual blog posts
  templateHTML = templateHTML.replace('{{blogPosts}}', blogPostsHTML);
  
  // Process template includes (header and footer)
  templateHTML = processTemplateIncludes(templateHTML);
  
  // Add title
  templateHTML = templateHTML.replace('{{title}}', 'Blog - BASB');
  
  // Create blog index page
  fs.writeFileSync('dist/blog/index.html', templateHTML);
  console.log('Built: dist/blog/index.html');
}

// Build individual blog post
function buildBlogPost(post, outputPath) {
  // Read the blog post template
  const templatePath = 'src/templates/blog-post.html';
  if (!fs.existsSync(templatePath)) {
    console.log('Blog post template not found, using default generation');
    const htmlContent = markdownToHTML(post.parsed.body);
    const fullBlogHTML = createBlogHTMLTemplate(post.title, htmlContent, post.parsed.attributes);
    fs.writeFileSync(outputPath, fullBlogHTML);
    console.log(`Built blog post: ${outputPath}`);
    return;
  }
  
  let templateHTML = fs.readFileSync(templatePath, 'utf8');
  
  // Format date for display
  const displayDate = new Date(post.date).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  // Process template placeholders
  const placeholders = {
    title: post.title,
    date: displayDate,
    author: post.author,
    excerpt: post.excerpt ? `<p class="blog-excerpt">${post.excerpt}</p>` : '',
    content: markdownToHTML(post.parsed.body),
    tags: post.parsed.attributes.tags ? 
      post.parsed.attributes.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('') : ''
  };
  
  templateHTML = processTemplatePlaceholders(templateHTML, placeholders);
  templateHTML = processTemplateIncludes(templateHTML);
  
  // Ensure output directory exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, templateHTML);
  console.log(`Built blog post: ${outputPath}`);
}

// Fallback function for when template doesn't exist
function buildBlogDefault() {
  const blogDir = 'src/content/blog';
  const outputDir = 'dist/blog';
  
  // Create blog index
  const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));
  let blogIndexHTML = '<h1>Blog</h1><div class="blog-list">';
  
  blogFiles.forEach(file => {
    const markdownPath = path.join(blogDir, file);
    const markdown = fs.readFileSync(markdownPath, 'utf8');
    const parsed = frontMatter(markdown);
    const title = parsed.attributes.title || file.replace('.md', '');
    const slug = file.replace('.md', '');
    
    // Build individual blog post using blog template
    const postOutputPath = path.join(outputDir, `${slug}.html`);
    const htmlContent = markdownToHTML(parsed.body);
    const fullBlogHTML = createBlogHTMLTemplate(title, htmlContent, parsed.attributes);
    
    // Ensure output directory exists
    const postOutputDir = path.dirname(postOutputPath);
    if (!fs.existsSync(postOutputDir)) {
      fs.mkdirSync(postOutputDir, { recursive: true });
    }
    
    fs.writeFileSync(postOutputPath, fullBlogHTML);
    console.log(`Built blog post: ${postOutputPath}`);
    
    // Add to blog index
    blogIndexHTML += `
      <article class="blog-preview">
        <h2><a href="/blog/${slug}.html">${title}</a></h2>
        ${parsed.attributes.excerpt ? `<p>${parsed.attributes.excerpt}</p>` : ''}
        <small>${parsed.attributes.date || 'No date'}</small>
      </article>
    `;
  });
  
  blogIndexHTML += '</div>';
  
  // Create blog index page
  const fullBlogIndexHTML = createBASBHTMLTemplate('Blog', blogIndexHTML, 'blog');
  fs.writeFileSync('dist/blog/index.html', fullBlogIndexHTML);
  console.log('Built: dist/blog/index.html');
}

// Main build function
function build() {
  console.log('Building static site...');
  
  // Build homepage with template processing
  if (fs.existsSync('src/index.html')) {
    const indexHTML = fs.readFileSync('src/index.html', 'utf8');
    const processedHTML = processTemplateIncludes(indexHTML);
    fs.writeFileSync('dist/index.html', processedHTML);
    console.log('Built: dist/index.html');
  }
  
  // Copy CSS and JS files from src
  if (fs.existsSync('src/css/styles.css')) {
    fs.copyFileSync('src/css/styles.css', 'dist/styles.css');
    console.log('Copied: dist/styles.css');
  }
  
  if (fs.existsSync('src/js/script.js')) {
    fs.copyFileSync('src/js/script.js', 'dist/script.js');
    console.log('Copied: dist/script.js');
  }
  
  // Build main pages from src/content/pages
  buildPage('src/content/pages/about.md', 'dist/about.html', 'About', 'about');
  buildPage('src/content/pages/faq.md', 'dist/faq.html', 'FAQ', 'faq');
  buildPage('src/content/pages/contact.md', 'dist/contact.html', 'Contact', 'contact');
  
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
