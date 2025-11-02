# Rohola Zandie - Personal Website & Blog

A bilingual (English/Persian) personal website and blog showcasing AI research, computational biology work, and academic insights.

## 🌐 Live Website

Visit the live website at: [rohola-zandie.com](https://rohola-zandie.com)

## 📋 Features

- **Bilingual Content**: Full support for English and Persian (RTL) content
- **Responsive Design**: Mobile-first approach with Bootstrap 5
- **Dark/Light Theme**: Automatic theme switching with persistence
- **Academic Blog**: In-depth articles on AI, neuroscience, and mathematics
- **MathJax Integration**: Full mathematical notation support
- **SEO Optimized**: Comprehensive meta tags and structured data
- **Performance Optimized**: Fast loading with optimized assets

## 🛠 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Bootstrap 5.3.0, Custom CSS with CSS Variables
- **Icons**: Lucide Icons
- **Math Rendering**: MathJax 3
- **Deployment**: Vercel
- **Version Control**: Git

## 📁 Project Structure

```
├── index.html              # Homepage
├── blog.html              # English blog listing
├── persian-blog.html      # Persian blog listing
├── posts/                 # English blog posts
│   └── logarithm-perception-information/
├── posts_fa/              # Persian blog posts
│   └── logarithm-perception-information/
├── assets/
│   ├── styles/           # CSS files
│   ├── scripts/          # JavaScript files
│   └── images/           # Images and media
├── vercel.json           # Vercel deployment config
└── package.json          # Project metadata
```

## 🚀 Development

### Prerequisites

- Python 3.x (for local development server)
- Modern web browser
- Git

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/roholazandie/mywebsite.git
cd mywebsite
```

2. Start the development server:
```bash
npm run dev
# or
python3 -m http.server 8080
```

3. Open your browser and navigate to `http://localhost:8080`

### Deployment

The site is configured for automatic deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure the build settings (uses `@vercel/static`)
3. Deploy automatically on push to main branch

## 📝 Content Management

### Adding Blog Posts

#### English Posts
1. Create a new directory in `posts/[post-slug]/`
2. Add `index.html` with the post content
3. Add images to `assets/images/posts/[post-slug]/`
4. Update `blog.html` with the new post card

#### Persian Posts
1. Create a new directory in `posts_fa/[post-slug]/`
2. Add `index.html` with RTL content
3. Add images to `assets/images/posts/[post-slug]/`
4. Update `persian-blog.html` with the new post card

### Styling Guidelines

- Use CSS custom properties for theming
- Follow mobile-first responsive design
- Maintain accessibility standards
- Use semantic HTML elements

## 🎨 Customization

### Theme Colors
Update CSS custom properties in `assets/styles/portfolio.css`:

```css
:root {
  --primary-color: #your-color;
  --text-primary: #your-text-color;
  /* ... other variables */
}
```

### Adding Languages
1. Create new HTML files with appropriate `lang` and `dir` attributes
2. Add navigation links in existing pages
3. Create corresponding JavaScript files for functionality
4. Update CSS for RTL support if needed

## 📊 Analytics & SEO

- Structured data markup for better search visibility
- Open Graph and Twitter Card meta tags
- Sitemap generation recommended for production
- Consider adding Google Analytics or similar

## 🤝 Contributing

This is a personal website, but suggestions and bug reports are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this as a template for your own website.

## 📧 Contact

- **Email**: rohola@absentia.bio
- **LinkedIn**: [rohola-zandie](https://linkedin.com/in/rohola-zandie)
- **Google Scholar**: [Research Profile](https://scholar.google.com/citations?user=xv0jIe0AAAAJ&hl=en)

---
