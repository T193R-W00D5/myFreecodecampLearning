import express from 'express';
import compression from 'compression';
import path from 'path';

const app = express();
const PORT = 3010;

// Enable gzip/brotli compression for all responses
app.use(compression());

// Security headers
app.use((req, res, next) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // XSS Protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Serve static assets with optimized caching and headers
app.use('/assets', express.static('assets', {
  // maxAge: '1y', // Cache assets for 1 year
  maxAge: 0,
  immutable: true, // Assets are immutable (use versioning for updates)
  setHeaders: (res, filePath) => {
    const extname = path.extname(filePath).toLowerCase();
    
    // Set proper MIME types and headers for different file types
    switch (extname) {
      case '.svg':
        res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
        break;
      case '.avif':
        res.setHeader('Content-Type', 'image/avif');
        break;
      case '.webp':
        res.setHeader('Content-Type', 'image/webp');
        break;
      case '.png':
        res.setHeader('Content-Type', 'image/png');
        break;
      case '.jpg':
      case '.jpeg':
        res.setHeader('Content-Type', 'image/jpeg');
        break;
      case '.gif':
        res.setHeader('Content-Type', 'image/gif');
        break;
      case '.ico':
        res.setHeader('Content-Type', 'image/x-icon');
        break;
      case '.woff2':
        res.setHeader('Content-Type', 'font/woff2');
        break;
      case '.woff':
        res.setHeader('Content-Type', 'font/woff');
        break;
      case '.ttf':
        res.setHeader('Content-Type', 'font/ttf');
        break;
      case '.otf':
        res.setHeader('Content-Type', 'font/otf');
        break;
      case '.js':
      case '.mjs':
        res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
        break;
      case '.css':
        res.setHeader('Content-Type', 'text/css; charset=utf-8');
        break;
      case '.html':
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        break;
      case '.json':
        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        break;
      case '.xml':
        res.setHeader('Content-Type', 'application/xml; charset=utf-8');
        break;
      case '.txt':
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        break;
      case '.mp4':
        res.setHeader('Content-Type', 'video/mp4');
        break;
      case '.webm':
        res.setHeader('Content-Type', 'video/webm');
        break;
      case '.mp3':
        res.setHeader('Content-Type', 'audio/mpeg');
        break;
      case '.wav':
        res.setHeader('Content-Type', 'audio/wav');
        break;
      case '.ogg':
        res.setHeader('Content-Type', 'audio/ogg');
        break;
    }
  }
}));

// Serve CSS files with cache busting support
app.use('/css', express.static('css', {
  // maxAge: '1d', // Cache CSS for 1 day (allows quicker updates)
  maxAge: 0,
  etag: true,  // Set to false to Disable ETag generation
  setHeaders: (res, filePath) => {
    res.setHeader('Content-Type', 'text/css; charset=utf-8');
    // res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); // Commented out to enable caching
  }
}));

// Serve JavaScript files
app.use('/src', express.static('src', {
  // maxAge: '1d', // Cache JS for 1 day
  maxAge: 0,
  setHeaders: (res, filePath) => {
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  }
}));

// Serve pages with no cache (they change frequently)
app.use('/pages', express.static('pages', {
  maxAge: 0,
  setHeaders: (res, filePath) => {
    if (path.extname(filePath) === '.html') {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  }
}));

// Fallback: serve other static files from root (with shorter cache)
app.use(express.static('.', {
  // maxAge: '1h', // Short cache for miscellaneous files
  maxAge: 0,
  setHeaders: (res, filePath, stat) => {
    const extname = path.extname(filePath).toLowerCase();
    
    // Set charset for SVG files not in /assets
    if (extname === '.svg') {
      res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    }
    
    // Don't cache HTML files from root
    if (extname === '.html') {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    }
  }
}));

// Root route - serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve('./index.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler for unmatched routes
app.use((req, res) => {
  console.log(`404: ${req.method} ${req.url}`);
  res.status(404).send('Page not found');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

