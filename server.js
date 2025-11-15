import express from 'express';
import compression from 'compression';
import path from 'path';

const app = express();
const PORT = 3010;

// Enable gzip/brotli compression for all responses
app.use(compression());

// Serve static files with optimized caching
app.use(express.static('.', {
  // Set custom headers for different file types
  setHeaders: (res, filePath, stat) => {
    const extname = path.extname(filePath);
    
    // Apply long cache for CSS, JS, and images (1 year)
    if (['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.avif', '.webp', '.ico'].includes(extname)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    } else {
      // HTML files should not be cached long-term
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

// Root route - serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve('./index.html'));
});

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});