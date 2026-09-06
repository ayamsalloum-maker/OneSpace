const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const scriptMatch = html.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
const js = scriptMatch[1];

// Extract state initialization and all functions
// Let's create a minimal headless browser environment with JSDOM or simulated objects
const { Window } = require('happy-dom') || {};
console.log('Testing JS syntax and execution...');
