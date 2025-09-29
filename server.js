import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Disable caching for development to ensure updates are visible
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  
  // Enable search engine indexing by setting proper X-Robots-Tag header
  res.set('X-Robots-Tag', 'index, follow, all');
  
  next();
});

// Serve static files from the current directory
app.use(express.static(__dirname, {
  // Ensure proper MIME types for CSS and JS files
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.set('Content-Type', 'text/css');
    }
    if (path.endsWith('.js')) {
      res.set('Content-Type', 'application/javascript');
    }
  }
}));

// Handle SPA routing - serve index.html for all routes that don't match static files
app.get('*', (req, res) => {
  // Check if the request is for a static file (has an extension)
  if (path.extname(req.path)) {
    // Let express static handler deal with it
    return res.status(404).send('File not found');
  }
  
  // For routes without extensions, try to serve the corresponding HTML file
  const htmlFile = req.path === '/' ? 'index.html' : req.path.replace('/', '') + '.html';
  const filePath = path.join(__dirname, htmlFile);
  
  res.sendFile(filePath, (err) => {
    if (err) {
      // If the specific HTML file doesn't exist, serve index.html
      res.sendFile(path.join(__dirname, 'index.html'));
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🏗️ Pak Builders website is running!`);
  console.log(`🌐 Server: http://0.0.0.0:${PORT}`);
  console.log(`📁 Serving static files from: ${__dirname}`);
});