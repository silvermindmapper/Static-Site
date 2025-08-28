// Simple JavaScript for the static site

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active state to current navigation item
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath || 
            (currentPath === '/blog' && link.getAttribute('href') === '/blog') ||
            (currentPath === '/' && link.getAttribute('href') === '/')) {
            link.classList.add('active');
        }
    });

    // Add some basic animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe main content elements
    document.querySelectorAll('main > *').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add copy button to code blocks
    document.querySelectorAll('pre').forEach(pre => {
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy';
        copyButton.className = 'copy-button';
        copyButton.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: #475569;
            color: white;
            border: none;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.8rem;
        `;
        
        copyButton.addEventListener('click', async () => {
            const code = pre.querySelector('code') || pre;
            try {
                await navigator.clipboard.writeText(code.textContent);
                copyButton.textContent = 'Copied!';
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                }, 2000);
            } catch (err) {
                copyButton.textContent = 'Failed';
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                }, 2000);
            }
        });
        
        pre.style.position = 'relative';
        pre.appendChild(copyButton);
    });

    // Add search functionality to blog (if on blog page)
    if (currentPath === '/blog' || currentPath.startsWith('/blog/')) {
        addBlogSearch();
    }
});

function addBlogSearch() {
    // Check if search already exists to prevent duplicates
    if (document.querySelector('.search-container')) {
        return;
    }
    
    const main = document.querySelector('main');
    const searchHTML = `
        <div class="search-container" style="margin-bottom: 2rem; display: flex; justify-content: center;">
            <div style="position: relative; width: 100%; max-width: 800px;">
                <svg style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); width: 16px; height: 16px; color: #9ca3af;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input type="text" id="blog-search" placeholder="Search" 
                       style="width: 100%; padding: 12px 12px 12px 40px; border: 1px solid #e5e7eb; border-radius: 8px; font-size: 1rem; background: white; box-sizing: border-box;">
            </div>
        </div>
    `;
    
    main.insertAdjacentHTML('afterbegin', searchHTML);
    
    const searchInput = document.getElementById('blog-search');
    const blogPosts = document.querySelectorAll('.blog-card');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        blogPosts.forEach(post => {
            const title = post.querySelector('.blog-card-title').textContent.toLowerCase();
            const excerpt = post.querySelector('.blog-card-excerpt')?.textContent.toLowerCase() || '';
            
            if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    });
}

// Add some utility functions
window.utils = {
    // Format date
    formatDate: function(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    // Debounce function for search
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};
