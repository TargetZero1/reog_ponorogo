import http from 'http';
import { URL } from 'url';

const baseURL = 'http://127.0.0.1:8000';

let cookies = {};

function extractCookies(setCookieHeaders) {
  if (!setCookieHeaders) return;
  const headerArray = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders];
  headerArray.forEach((cookie) => {
    const parts = cookie.split(';')[0];
    const [name, value] = parts.split('=');
    if (name && value) {
      cookies[name] = value;
    }
  });
}

function makeCookieHeader() {
  return Object.entries(cookies)
    .map(([k, v]) => `${k}=${v}`)
    .join('; ');
}

function request(method, path, headers = {}, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseURL);
    
    const opts = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'User-Agent': 'Test',
        'Cookie': makeCookieHeader(),
        ...headers,
      },
    };

    const req = http.request(opts, (res) => {
      extractCookies(res.headers['set-cookie']);
      
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data,
          location: res.headers.location,
        });
      });
    });

    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

async function testLogout() {
  console.log('\n========== LOGOUT DEBUG TEST ==========\n');

  try {
    // Step 1: Get CSRF token from login page
    console.log('1. Fetching login page to get CSRF token...');
    let res = await request('GET', '/id/pesan-ticket/login');
    console.log(`   Status: ${res.status}`);
    console.log(`   Cookies received:`, Object.keys(cookies));
    
    const csrfMatch = res.body.match(/name="_token"\s+value="([^"]+)"/);
    const csrf = csrfMatch ? csrfMatch[1] : null;
    console.log(`   CSRF token: ${csrf ? csrf.substring(0, 20) + '...' : 'NOT FOUND'}`);
    
    if (!csrf) {
      console.log('   ✗ Could not extract CSRF token');
      process.exit(1);
    }

    // Step 2: Test logout endpoint with GET first
    console.log('\n2. Testing GET /logout (should redirect)...');
    res = await request('GET', '/logout');
    console.log(`   Status: ${res.status}`);
    console.log(`   Location: ${res.location || 'none'}`);
    console.log(`   Cookies after GET logout:`, Object.keys(cookies));

    // Step 3: Make a POST logout request
    console.log('\n3. Testing POST /logout with CSRF token...');
    const postData = `_token=${encodeURIComponent(csrf)}`;
    res = await request('POST', '/logout', {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length,
    }, postData);
    
    console.log(`   Status: ${res.status}`);
    console.log(`   Location: ${res.location || 'none'}`);
    console.log(`   Cookies after POST logout:`, Object.keys(cookies));
    console.log(`   Response body length: ${res.body.length}`);
    
    // Step 4: Check if auth is still active
    console.log('\n4. Testing profile page (should redirect to login if logged out)...');
    res = await request('GET', '/id/profile');
    console.log(`   Status: ${res.status}`);
    console.log(`   Location: ${res.location || 'none'}`);
    
    if (res.status === 302 && res.location.includes('login')) {
      console.log('   ✓ Correctly redirected to login - logout successful!');
    } else if (res.status === 200) {
      console.log('   ✗ Profile page still accessible - logout failed!');
    } else {
      console.log(`   ? Unexpected status: ${res.status}`);
    }

    console.log('\n========== DEBUG TEST COMPLETE ==========\n');

  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

testLogout();
