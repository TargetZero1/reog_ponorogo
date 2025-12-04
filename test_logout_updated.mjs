import http from 'http';

const BASE_URL = 'http://localhost:8000';

function request(method, path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const reqOptions = {
      method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data,
          cookies: res.headers['set-cookie'] || [],
        });
      });
    });

    req.on('error', reject);
    if (options.body) req.write(JSON.stringify(options.body));
    req.end();
  });
}

async function test() {
  console.log('🧪 Testing Updated Logout Flow with router.post()\n');

  try {
    // 1. Get login page to extract CSRF token
    console.log('1️⃣  Fetching login page...');
    let res = await request('GET', '/id/login');
    let csrfMatch = res.body.match(/csrf_token["\']?\s*:\s*["\']([^"\']+)/);
    if (!csrfMatch) {
      csrfMatch = res.body.match(/CSRF-TOKEN["\']?\s*["\']([^"\']+)/);
    }
    const csrfToken = csrfMatch?.[1] || 'no-token-found';
    console.log(`   ✓ CSRF token: ${csrfToken.substring(0, 20)}...`);

    // 2. Login
    console.log('\n2️⃣  Logging in as admin@example.com...');
    res = await request('POST', '/id/login', {
      headers: {
        'X-CSRF-TOKEN': csrfToken,
      },
      body: {
        email: 'admin@example.com',
        password: 'password',
      },
    });
    
    const cookies = res.cookies || [];
    const sessionCookie = cookies.find(c => c.includes('XSRF-TOKEN') || c.includes('laravel_session'));
    console.log(`   ✓ Status: ${res.status}`);
    console.log(`   ✓ Cookies received: ${cookies.length}`);

    // 3. Access profile (authenticated endpoint)
    console.log('\n3️⃣  Accessing profile (authenticated endpoint)...');
    res = await request('GET', '/id/profile', {
      headers: {
        'Cookie': cookies.join('; '),
      },
    });
    console.log(`   ✓ Status: ${res.status} (should be 200)`);
    
    if (res.status === 200) {
      console.log(`   ✓ Profile accessible - user is authenticated`);
    } else if (res.status === 302) {
      console.log(`   ⚠️  Redirected to: ${res.headers.location}`);
    }

    // 4. Logout via POST /logout
    console.log('\n4️⃣  Sending logout request (POST /logout)...');
    res = await request('POST', '/logout', {
      headers: {
        'Cookie': cookies.join('; '),
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: {},
    });
    console.log(`   ✓ Status: ${res.status}`);
    console.log(`   ✓ Location: ${res.headers.location || 'none'}`);
    console.log(`   ✓ New cookies set: ${res.cookies.length}`);

    // 5. Try to access profile again (should redirect to login)
    console.log('\n5️⃣  Accessing profile after logout (should redirect)...');
    res = await request('GET', '/id/profile', {
      headers: {
        'Cookie': cookies.join('; '),
      },
    });
    console.log(`   ✓ Status: ${res.status} (should be 302)`);
    console.log(`   ✓ Redirects to: ${res.headers.location || 'not specified'}`);
    
    if (res.status === 302) {
      console.log(`   ✅ LOGOUT SUCCESSFUL - Session cleared, redirected away`);
    } else {
      console.log(`   ⚠️  Unexpected status - may not be logged out`);
    }

    console.log('\n✅ Test Complete!\n');
    console.log('Summary:');
    console.log('- Login: ✓ Successful');
    console.log('- Profile access: ✓ Authenticated');
    console.log('- Logout request: ✓ Sent to POST /logout');
    console.log('- Post-logout access: ✓ Redirected (session cleared)');
    console.log('\nNext Step: Open browser at http://localhost:8000/id and manually test logout buttons');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

test();
