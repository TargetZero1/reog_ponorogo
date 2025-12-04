import http from 'http';
import { URL } from 'url';

const baseURL = 'http://127.0.0.1:8000';
const locale = 'id';

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
        'User-Agent': 'Test/1.0',
        'Cookie': makeCookieHeader(),
        'Accept': 'text/html,application/json',
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
  console.log('\n========== FULL LOGOUT FLOW TEST ==========\n');

  try {
    // Step 1: Access login page and get CSRF token
    console.log('Step 1: GET /id/pesan-ticket/login - Fetch login page');
    let res = await request('GET', `/${locale}/pesan-ticket/login`);
    console.log(`  Status: ${res.status}`);
    console.log(`  Cookies: ${Object.keys(cookies).join(', ')}`);
    
    if (res.status !== 200) {
      console.log('  ✗ Failed to get login page');
      process.exit(1);
    }

    // Extract CSRF token from meta tag
    const csrfMatch = res.body.match(/name="csrf-token"\s+content="([^"]+)"/);
    const csrf = csrfMatch ? csrfMatch[1] : null;
    if (!csrf) {
      console.log('  ✗ Could not extract CSRF token');
      process.exit(1);
    }
    console.log(`  ✓ CSRF token extracted: ${csrf.substring(0, 20)}...`);

    // Step 2: Login with test admin credentials
    console.log('\nStep 2: POST /id/pesan-ticket/login - Login as admin');
    const loginBody = new URLSearchParams({
      email: 'admin@example.com',
      password: 'password',
    }).toString();

    res = await request('POST', `/${locale}/pesan-ticket/login`, 
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': loginBody.length,
      },
      loginBody
    );
    console.log(`  Status: ${res.status}`);
    console.log(`  Redirect: ${res.location || 'none'}`);
    console.log(`  Cookies: ${Object.keys(cookies).join(', ')}`);

    if (res.status === 302 && res.location) {
      console.log(`  ✓ Login redirected to: ${res.location}`);
    } else {
      console.log('  ! Unexpected response - checking if already logged in...');
    }

    // Step 3: Verify user is logged in by accessing profile
    console.log('\nStep 3: GET /id/profile - Verify authenticated');
    res = await request('GET', `/${locale}/profile`);
    console.log(`  Status: ${res.status}`);
    console.log(`  Cookies: ${Object.keys(cookies).join(', ')}`);

    if (res.status === 200) {
      console.log('  ✓ Profile page accessible - User is logged in');
    } else if (res.status === 302) {
      console.log('  ! Redirected (not logged in)');
    }

    // Step 4: Get CSRF token for logout
    console.log('\nStep 4: GET /id/profile - Get CSRF token for logout');
    res = await request('GET', `/${locale}/profile`);
    const csrfLogoutMatch = res.body.match(/name="csrf-token"\s+content="([^"]+)"/);
    const csrfLogout = csrfLogoutMatch ? csrfLogoutMatch[1] : csrf;
    console.log(`  ✓ CSRF token: ${csrfLogout.substring(0, 20)}...`);

    // Step 5: POST logout request
    console.log('\nStep 5: POST /logout - Submit logout request');
    const logoutBody = new URLSearchParams({
      _token: csrfLogout,
    }).toString();

    console.log(`  URL: POST /logout`);
    console.log(`  Body: _token=${csrfLogout.substring(0, 20)}...`);
    console.log(`  Cookies sent: ${Object.keys(cookies).join(', ')}`);

    res = await request('POST', '/logout',
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': logoutBody.length,
      },
      logoutBody
    );

    console.log(`  Status: ${res.status}`);
    console.log(`  Location: ${res.location || 'none'}`);
    console.log(`  Headers sent:`, res.headers['set-cookie'] ? 'Cookie cleared!' : 'No cookie clear');
    console.log(`  Cookies now: ${Object.keys(cookies).join(', ')}`);

    if (res.status === 303 || res.status === 302) {
      console.log(`  ✓ Logout redirected to: ${res.location}`);
    } else {
      console.log(`  ✗ Unexpected status: ${res.status}`);
    }

    // Step 6: Verify user is logged out
    console.log('\nStep 6: GET /id/profile - Verify logged out');
    res = await request('GET', `/${locale}/profile`);
    console.log(`  Status: ${res.status}`);
    console.log(`  Location: ${res.location || 'none'}`);
    console.log(`  Cookies: ${Object.keys(cookies).join(', ')}`);

    if (res.status === 302 && res.location && res.location.includes('login')) {
      console.log('  ✓ LOGOUT SUCCESSFUL - Redirected to login');
      return true;
    } else if (res.status === 200) {
      console.log('  ✗ LOGOUT FAILED - Profile still accessible!');
      return false;
    } else {
      console.log(`  ? Unexpected status: ${res.status}`);
      return false;
    }

  } catch (err) {
    console.error('Error:', err.message);
    return false;
  }
}

(async () => {
  const success = await testLogout();
  console.log('\n========== TEST RESULT ==========');
  if (success) {
    console.log('✓ Logout is working correctly\n');
    process.exit(0);
  } else {
    console.log('✗ Logout is NOT working\n');
    process.exit(1);
  }
})();
