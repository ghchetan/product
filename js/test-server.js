#!/usr/bin/env node

/**
 * Simple HTTP Server for Testing card.html
 * 
 * Usage:
 *   node test-server.js
 *   
 * Then open: http://localhost:8080/card.html
 * Run Lighthouse in Chrome DevTools
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

// MIME types for different file extensions
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ttf': 'font/ttf',
    '.otf': 'font/otf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
    // Security: prevent directory traversal
    const sanitizedUrl = req.url.split('?')[0].replace(/\.\./g, '');
    const filePath = path.join(__dirname, sanitizedUrl === '/' ? 'card.html' : sanitizedUrl);
    const ext = path.extname(filePath).toLowerCase();
    const mimeType = MIME_TYPES[ext] || 'application/octet-stream';

    // Read and serve file
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1><p>The requested file was not found.</p>');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 Internal Server Error</h1>');
            }
            console.error(`❌ Error serving ${filePath}: ${err.message}`);
        } else {
            // Serve file with appropriate headers
            res.writeHead(200, {
                'Content-Type': mimeType,
                'Cache-Control': 'no-cache', // For testing purposes
            });
            res.end(data);
            console.log(`✅ Served: ${sanitizedUrl} (${(data.length / 1024).toFixed(2)} KB)`);
        }
    });
});

server.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║  🚀 Test Server Running                                        ║
║                                                                ║
║  URL:    http://localhost:${PORT}/card.html                     ║
║                                                                ║
║  📊 To run Lighthouse:                                         ║
║     1. Open the URL above in Google Chrome                     ║
║     2. Press F12 to open DevTools                              ║
║     3. Click the "Lighthouse" tab                              ║
║     4. Select all categories                                   ║
║     5. Click "Analyze page load"                               ║
║                                                                ║
║  ⏹  Press Ctrl+C to stop the server                           ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
    `);
    console.log('Server logs:');
    console.log('─────────────────────────────────────────────────────────────────\n');
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n🛑 Server stopped');
    process.exit(0);
});

// Error handling
server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`\n❌ Port ${PORT} is already in use. Please try a different port.`);
        console.error(`   You can modify the PORT variable in this script.\n`);
    } else {
        console.error(`\n❌ Server error: ${err.message}\n`);
    }
    process.exit(1);
});

