import http from 'http';
import { URL } from 'url';
import querystring from 'querystring';

const baseURL = 'http://127.0.0.1:8000';
const locale = 'id';

let cookieJar = {};

// Helper function to make HTTP requests
function makeRequest(method, path, data = null, followRedirect = false) {
  return new Promise((resolve, reject) => {
    const url = new URL(path.startsWith('http') ? path : path, baseURL);
    
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'User-Agent': 'SmokeTest/1.0',
        'Cookie': Object.entries(cookieJar).map(([k, v]) => `${k}=${v}`).join('; '),
      },
    };

    if (data) {
      const postData = querystring.stringify(data);
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }

    const req = http.request(options, (res) => {
      // Store cookies
      if (res.headers['set-cookie']) {
        res.headers['set-cookie'].forEach((cookie) => {
          const parts = cookie.split(';')[0].split('=');
          if (parts.length === 2) {
            cookieJar[parts[0]] = parts[1];
          }
        });
      }

      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: responseData,
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (data) {
      req.write(querystring.stringify(data));
    }
    req.end();
  });
}

async function runTests() {
  console.log('\n========== FULL USER FLOW SMOKE TEST ==========\n');

  let testsPassed = 0;
  let testsFailed = 0;

  try {
    // Test 1: Check CSRF token availability on login page
    console.log('1. Testing login page (CSRF availability)...');
    let res = await makeRequest('GET', `/${locale}/pesan-ticket/login`);
    if (res.statusCode === 200 && res.body.includes('csrf')) {
      console.log('   ✓ Login page accessible with CSRF token');
      testsPassed++;
    } else {
      console.log('   ✗ Login page failed');
      testsFailed++;
    }

    // Test 2: Check register page
    console.log('\n2. Testing register page...');
    res = await makeRequest('GET', `/${locale}/pesan-ticket/register`);
    if (res.statusCode === 200 && res.body.includes('csrf')) {
      console.log('   ✓ Register page accessible with CSRF token');
      testsPassed++;
    } else {
      console.log('   ✗ Register page failed');
      testsFailed++;
    }

    // Test 3: Check events listing
    console.log('\n3. Testing events listing...');
    res = await makeRequest('GET', `/${locale}/events`);
    if (res.statusCode === 200) {
      console.log('   ✓ Events page loads successfully');
      testsPassed++;
    } else {
      console.log('   ✗ Events page failed');
      testsFailed++;
    }

    // Test 4: Check places/tempat wisata listing
    console.log('\n4. Testing places (Tempat Wisata) listing...');
    res = await makeRequest('GET', `/${locale}/tempat-wisata`);
    if (res.statusCode === 200) {
      console.log('   ✓ Places page loads successfully');
      testsPassed++;
    } else {
      console.log('   ✗ Places page failed');
      testsFailed++;
    }

    // Test 5: Check history/culture page
    console.log('\n5. Testing history & culture page...');
    res = await makeRequest('GET', `/${locale}/budaya-dan-sejarah`);
    if (res.statusCode === 200) {
      console.log('   ✓ History/Culture page loads successfully');
      testsPassed++;
    } else {
      console.log('   ✗ History/Culture page failed');
      testsFailed++;
    }

    // Test 6: Try accessing protected admin pages (should redirect)
    console.log('\n6. Testing protected admin routes (should redirect to login)...');
    res = await makeRequest('GET', `/${locale}/admin/dashboard`);
    if (res.statusCode === 302) {
      console.log('   ✓ Admin dashboard redirects to login (HTTP 302)');
      testsPassed++;
    } else {
      console.log(`   ✗ Admin dashboard returned HTTP ${res.statusCode} instead of 302`);
      testsFailed++;
    }

    // Test 7: Try accessing profile (should redirect)
    console.log('\n7. Testing profile route (should redirect if not authenticated)...');
    res = await makeRequest('GET', `/${locale}/profile`);
    if (res.statusCode === 302) {
      console.log('   ✓ Profile page redirects to login (HTTP 302)');
      testsPassed++;
    } else {
      console.log(`   ✗ Profile page returned HTTP ${res.statusCode}`);
      testsFailed++;
    }

    // Test 8: Try accessing payment history (should redirect)
    console.log('\n8. Testing payment history route (should redirect if not authenticated)...');
    res = await makeRequest('GET', `/${locale}/payment-history`);
    if (res.statusCode === 302) {
      console.log('   ✓ Payment history redirects to login (HTTP 302)');
      testsPassed++;
    } else {
      console.log(`   ✗ Payment history returned HTTP ${res.statusCode}`);
      testsFailed++;
    }

    // Test 9: Test locale switching (en)
    console.log('\n9. Testing English locale...');
    res = await makeRequest('GET', `/en`);
    if (res.statusCode === 200) {
      console.log('   ✓ Home page with English locale loads (HTTP 200)');
      testsPassed++;
    } else {
      console.log(`   ✗ English locale returned HTTP ${res.statusCode}`);
      testsFailed++;
    }

    // Test 10: Test logout endpoint exists
    console.log('\n10. Testing logout endpoint...');
    res = await makeRequest('GET', `/logout`);
    if (res.statusCode === 302 || res.statusCode === 405) {
      // 302 = redirect (success), 405 = method not allowed (route exists but requires POST)
      console.log(`   ✓ Logout endpoint exists (HTTP ${res.statusCode})`);
      testsPassed++;
    } else {
      console.log(`   ✗ Logout endpoint returned HTTP ${res.statusCode}`);
      testsFailed++;
    }

  } catch (error) {
    console.error('Test error:', error.message);
    testsFailed++;
  }

  console.log('\n========== USER FLOW TEST SUMMARY ==========');
  console.log(`Passed: ${testsPassed}`);
  console.log(`Failed: ${testsFailed}`);
  console.log(`Total:  ${testsPassed + testsFailed}`);
  console.log('==========================================\n');

  if (testsFailed === 0) {
    console.log('✓ All user flow tests passed!\n');
    process.exit(0);
  } else {
    console.log('✗ Some tests failed.\n');
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
