#!/usr/bin/env node

import http from 'http';
import querystring from 'querystring';

const BASE_URL = 'http://localhost:8000';

let sessionCookie = '';
let csrfToken = '';

function makeRequest(method, path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const isHttps = url.protocol === 'https:';
    const client = isHttps ? require('https') : http;

    const reqOptions = {
      method,
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname + url.search,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
    };

    if (sessionCookie) {
      reqOptions.headers['Cookie'] = sessionCookie;
    }

    console.log(`\n📤 ${method} ${path}`);
    if (options.body) {
      console.log(`   Body: ${JSON.stringify(options.body).substring(0, 100)}...`);
    }

    const req = client.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log(`📥 Status: ${res.statusCode}`);
        
        // Update session cookie
        const setCookie = res.headers['set-cookie'];
        if (setCookie) {
          sessionCookie = setCookie[0].split(';')[0];
          console.log(`   🍪 Cookie updated`);
        }

        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    });

    req.on('error', reject);
    if (options.body) req.write(JSON.stringify(options.body));
    req.end();
  });
}

async function test() {
  console.log('🧪 Complete Logout System Test\n');
  console.log('=' .repeat(60));

  try {
    // Step 1: Get login page
    console.log('\n\n✅ STEP 1: Fetch login page');
    let res = await makeRequest('GET', '/id/pesan-ticket/login');
    let csrfMatch = res.body.match(/csrf[_-]?token["\']?\s*:\s*["\']([^"\']+)/i);
    if (!csrfMatch) {
      csrfMatch = res.body.match(/name=[\'"](csrf_token|_token)[\'"]\s+value=[\'"]([\w\d]+)["\']/i);
    }
    if (csrfMatch) {
      csrfToken = csrfMatch[1] || csrfMatch[2];
      console.log(`✓ CSRF token: ${csrfToken.substring(0, 20)}...`);
    } else {
      console.log('⚠️  No CSRF token found in HTML');
    }

    // Step 2: Login
    console.log('\n\n✅ STEP 2: Login with admin@example.com');
    res = await makeRequest('POST', '/id/pesan-ticket/login', {
      headers: {
        'X-CSRF-TOKEN': csrfToken,
        'Referer': `${BASE_URL}/id/pesan-ticket/login`,
      },
      body: {
        email: 'admin@example.com',
        password: 'password',
      },
    });
    
    if (res.status === 302 || res.status === 200) {
      console.log(`✓ Login successful (status: ${res.status})`);
    } else {
      console.log(`✗ Login failed (status: ${res.status})`);
    }

    // Step 3: Verify logged in - access profile
    console.log('\n\n✅ STEP 3: Verify authentication - access profile');
    res = await makeRequest('GET', '/id/profile');
    if (res.status === 200) {
      console.log(`✓ Profile accessible (authenticated)`);
    } else if (res.status === 302) {
      console.log(`✗ Redirected - NOT authenticated`);
      console.log(`   Redirect to: ${res.headers.location}`);
    } else {
      console.log(`? Unexpected status: ${res.status}`);
    }

    // Step 4: Logout
    console.log('\n\n✅ STEP 4: Send logout request');
    res = await makeRequest('POST', '/logout', {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Referer': `${BASE_URL}/id/profile`,
      },
      body: {},
    });
    
    console.log(`✓ Logout request status: ${res.status}`);
    console.log(`   Redirect: ${res.headers.location || 'none'}`);

    // Step 5: Try to access profile again
    console.log('\n\n✅ STEP 5: Verify logout - try to access profile');
    res = await makeRequest('GET', '/id/profile');
    if (res.status === 302) {
      console.log(`✓ Profile redirects (logged out successfully)`);
      console.log(`   Redirect to: ${res.headers.location}`);
    } else if (res.status === 200) {
      console.log(`✗ Profile still accessible (NOT logged out!)`);
    } else {
      console.log(`? Unexpected status: ${res.status}`);
    }

    console.log('\n\n' + '='.repeat(60));
    console.log('\n✅ Test Complete!\n');
    console.log('📋 Summary:');
    console.log('- If Step 3 shows "authenticated" and Step 5 shows "logged out", logout is WORKING');
    console.log('- If Step 5 shows "still accessible", logout is BROKEN');
    console.log('\n');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

test();
