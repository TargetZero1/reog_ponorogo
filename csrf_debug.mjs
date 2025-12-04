import http from 'http';
import { URL } from 'url';

const baseURL = 'http://127.0.0.1:8000';

function request(method, path) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseURL);
    
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', reject);
  });
}

async function test() {
  try {
    const loginPage = await request('GET', '/id/pesan-ticket/login');
    
    // Look for CSRF token patterns
    const csrfMatches = loginPage.match(/name=["']_token["'][^>]*value=["']([^"']+)["']/g);
    const tokenMatches = loginPage.match(/_token["\']?\s*[:=]\s*["']([^"']+)["']/g);
    const inputMatches = loginPage.match(/<input[^>]*name=["']_token[^>]*>/g);
    
    console.log('CSRF Token Patterns Found:');
    console.log('---');
    if (csrfMatches) console.log('Pattern 1:', csrfMatches[0]);
    if (tokenMatches) console.log('Pattern 2:', tokenMatches[0]);
    if (inputMatches) console.log('Input HTML:', inputMatches[0]);
    
    // Look for form structure
    const formMatches = loginPage.match(/<form[^>]*action=["']([^"']+)["'][^>]*method=["']([^"']+)["']/g);
    if (formMatches) {
      console.log('\n\nForm Details:');
      formMatches.forEach((match, i) => console.log(`Form ${i}:`, match));
    }
    
    // Check if response is HTML or JSON
    console.log('\n\nResponse Type Check:');
    console.log('- Starts with <!DOCTYPE:', loginPage.includes('<!DOCTYPE'));
    console.log('- Starts with <html:', loginPage.includes('<html'));
    console.log('- Contains "csrf":', loginPage.includes('csrf'));
    console.log('- Response length:', loginPage.length);
    
    // Show first 500 chars
    console.log('\n\nFirst 500 characters:');
    console.log(loginPage.substring(0, 500));
    
  } catch (err) {
    console.error('Error:', err.message);
  }
}

test();
