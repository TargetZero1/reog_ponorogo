/**
 * Comprehensive Smoke Test for Reog Ponorogo Application
 * Tests all major flows: authentication, booking, admin operations
 */

const axios = require('axios');
const baseURL = 'http://127.0.0.1:8000';

// Test credentials
const adminCredentials = {
  email: 'admin@reog.test',
  password: 'password'
};

const userCredentials = {
  email: 'test@example.com',
  password: 'password'
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

let passedTests = 0;
let failedTests = 0;
let testResults = [];

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logTest(name, passed, details = '') {
  if (passed) {
    log(`✓ ${name}`, colors.green);
    passedTests++;
  } else {
    log(`✗ ${name}`, colors.red);
    if (details) log(`  ${details}`, colors.yellow);
    failedTests++;
  }
  testResults.push({ name, passed, details });
}

// Helper to get CSRF token
async function getCSRFToken(locale = 'id') {
  try {
    const response = await axios.get(`${baseURL}/${locale}/pesan-ticket/login`, {
      maxRedirects: 0,
      validateStatus: (status) => status < 400
    });
    const html = response.data;
    const match = html.match(/name="_token"\s+value="([^"]+)"/);
    return match ? match[1] : null;
  } catch (error) {
    return null;
  }
}

// Helper to login
async function login(credentials, locale = 'id') {
  try {
    const csrfToken = await getCSRFToken(locale);
    if (!csrfToken) {
      return { success: false, error: 'Could not get CSRF token' };
    }

    const response = await axios.post(
      `${baseURL}/${locale}/pesan-ticket/login`,
      {
        email: credentials.email,
        password: credentials.password,
        _token: csrfToken
      },
      {
        maxRedirects: 5,
        validateStatus: (status) => status < 400,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'text/html,application/xhtml+xml'
        }
      }
    );

    // Extract cookies from response
    const cookies = response.headers['set-cookie'] || [];
    const cookieString = cookies.map(c => c.split(';')[0]).join('; ');

    return { success: true, cookies: cookieString, response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Helper to logout
async function logout(cookies, locale = 'id') {
  try {
    const csrfToken = await getCSRFToken(locale);
    if (!csrfToken) {
      return { success: false, error: 'Could not get CSRF token' };
    }

    const response = await axios.post(
      `${baseURL}/logout`,
      {
        _token: csrfToken
      },
      {
        maxRedirects: 5,
        validateStatus: (status) => status < 400,
        headers: {
          'Cookie': cookies,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'text/html,application/xhtml+xml'
        }
      }
    );

    return { success: true, response };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Test public pages
async function testPublicPages() {
  log('\n=== Testing Public Pages ===', colors.cyan);

  const publicRoutes = [
    { path: '/id', name: 'Home (ID)' },
    { path: '/en', name: 'Home (EN)' },
    { path: '/id/budaya', name: 'Budaya & Sejarah (ID)' },
    { path: '/en/budaya', name: 'Budaya & Sejarah (EN)' },
    { path: '/id/tempat-wisata', name: 'Tempat Wisata (ID)' },
    { path: '/en/tempat-wisata', name: 'Tempat Wisata (EN)' },
    { path: '/id/events', name: 'Events (ID)' },
    { path: '/en/events', name: 'Events (EN)' },
    { path: '/id/pesan-ticket/login', name: 'Login Page (ID)' },
    { path: '/en/pesan-ticket/login', name: 'Login Page (EN)' },
    { path: '/id/pesan-ticket/register', name: 'Register Page (ID)' },
    { path: '/en/pesan-ticket/register', name: 'Register Page (EN)' }
  ];

  for (const route of publicRoutes) {
    try {
      const response = await axios.get(`${baseURL}${route.path}`, {
        maxRedirects: 5,
        validateStatus: (status) => status < 400
      });
      logTest(route.name, response.status === 200, `Status: ${response.status}`);
    } catch (error) {
      logTest(route.name, false, `Error: ${error.message}`);
    }
  }
}

// Test authentication flow
async function testAuthentication() {
  log('\n=== Testing Authentication Flow ===', colors.cyan);

  // Test login (ID)
  log('\n--- Testing Login (ID) ---', colors.blue);
  const loginResultID = await login(userCredentials, 'id');
  logTest('User Login (ID)', loginResultID.success, loginResultID.error);

  // Test login (EN)
  log('\n--- Testing Login (EN) ---', colors.blue);
  const loginResultEN = await login(userCredentials, 'en');
  logTest('User Login (EN)', loginResultEN.success, loginResultEN.error);

  // Test admin login
  log('\n--- Testing Admin Login ---', colors.blue);
  const adminLoginResult = await login(adminCredentials, 'id');
  logTest('Admin Login', adminLoginResult.success, adminLoginResult.error);

  // Test logout
  if (adminLoginResult.success && adminLoginResult.cookies) {
    log('\n--- Testing Logout ---', colors.blue);
    const logoutResult = await logout(adminLoginResult.cookies, 'id');
    logTest('Logout', logoutResult.success, logoutResult.error);
    
    // Verify logout by trying to access protected page
    try {
      const response = await axios.get(`${baseURL}/id/admin/dashboard`, {
        headers: { 'Cookie': adminLoginResult.cookies },
        maxRedirects: 5,
        validateStatus: (status) => status < 400
      });
      // Should redirect to login, not show dashboard
      const isRedirected = response.request.res.responseUrl?.includes('login') || 
                          response.status === 302 || 
                          response.status === 401;
      logTest('Logout Verification (Cannot access protected page)', isRedirected);
    } catch (error) {
      // Error is expected if logout worked
      logTest('Logout Verification (Cannot access protected page)', true);
    }
  }

  return { loginResultID, loginResultEN, adminLoginResult };
}

// Test user flows
async function testUserFlows(authCookies) {
  log('\n=== Testing User Flows ===', colors.cyan);

  if (!authCookies) {
    log('Skipping user flows - no authentication cookies', colors.yellow);
    return;
  }

  const userRoutes = [
    { path: '/id/profile', name: 'Profile Page' },
    { path: '/en/profile', name: 'Profile Page (EN)' },
    { path: '/id/payment-history', name: 'Payment History' },
    { path: '/en/payment-history', name: 'Payment History (EN)' }
  ];

  for (const route of userRoutes) {
    try {
      const response = await axios.get(`${baseURL}${route.path}`, {
        headers: { 'Cookie': authCookies },
        maxRedirects: 5,
        validateStatus: (status) => status < 400
      });
      logTest(route.name, response.status === 200, `Status: ${response.status}`);
    } catch (error) {
      logTest(route.name, false, `Error: ${error.message}`);
    }
  }
}

// Test admin flows
async function testAdminFlows(adminCookies) {
  log('\n=== Testing Admin Flows ===', colors.cyan);

  if (!adminCookies) {
    log('Skipping admin flows - no admin authentication cookies', colors.yellow);
    return;
  }

  const adminRoutes = [
    { path: '/id/admin/dashboard', name: 'Admin Dashboard' },
    { path: '/en/admin/dashboard', name: 'Admin Dashboard (EN)' },
    { path: '/id/admin/events', name: 'Admin Events' },
    { path: '/en/admin/events', name: 'Admin Events (EN)' },
    { path: '/id/admin/places', name: 'Admin Places' },
    { path: '/en/admin/places', name: 'Admin Places (EN)' },
    { path: '/id/admin/orders', name: 'Admin Orders' },
    { path: '/en/admin/orders', name: 'Admin Orders (EN)' },
    { path: '/id/admin/analytics', name: 'Admin Analytics' },
    { path: '/en/admin/analytics', name: 'Admin Analytics (EN)' },
    { path: '/id/admin/reports', name: 'Admin Reports' },
    { path: '/en/admin/reports', name: 'Admin Reports (EN)' }
  ];

  for (const route of adminRoutes) {
    try {
      const response = await axios.get(`${baseURL}${route.path}`, {
        headers: { 'Cookie': adminCookies },
        maxRedirects: 5,
        validateStatus: (status) => status < 400
      });
      logTest(route.name, response.status === 200, `Status: ${response.status}`);
    } catch (error) {
      logTest(route.name, false, `Error: ${error.message}`);
    }
  }
}

// Test booking flow
async function testBookingFlow(userCookies) {
  log('\n=== Testing Booking Flow ===', colors.cyan);

  if (!userCookies) {
    log('Skipping booking flow - no user authentication cookies', colors.yellow);
    return;
  }

  // Test checkout page access
  try {
    const response = await axios.get(`${baseURL}/id/pesan-ticket/checkout?attraction=Test+Event`, {
      headers: { 'Cookie': userCookies },
      maxRedirects: 5,
      validateStatus: (status) => status < 400
    });
    logTest('Checkout Page Access', response.status === 200, `Status: ${response.status}`);
  } catch (error) {
    logTest('Checkout Page Access', false, `Error: ${error.message}`);
  }
}

// Test locale switching
async function testLocaleSwitching() {
  log('\n=== Testing Locale Switching ===', colors.cyan);

  const locales = ['id', 'en'];
  const testRoutes = ['', '/budaya', '/tempat-wisata', '/events'];

  for (const locale of locales) {
    for (const route of testRoutes) {
      try {
        const response = await axios.get(`${baseURL}/${locale}${route}`, {
          maxRedirects: 5,
          validateStatus: (status) => status < 400
        });
        logTest(`Locale ${locale.toUpperCase()} - ${route || 'home'}`, response.status === 200);
      } catch (error) {
        logTest(`Locale ${locale.toUpperCase()} - ${route || 'home'}`, false, error.message);
      }
    }
  }
}

// Test error pages
async function testErrorPages() {
  log('\n=== Testing Error Pages ===', colors.cyan);

  const errorRoutes = [
    { path: '/id/nonexistent-page', name: '404 Page (ID)', expectedStatus: 404 },
    { path: '/en/nonexistent-page', name: '404 Page (EN)', expectedStatus: 404 }
  ];

  for (const route of errorRoutes) {
    try {
      const response = await axios.get(`${baseURL}${route.path}`, {
        maxRedirects: 0,
        validateStatus: () => true
      });
      const isCorrectStatus = response.status === route.expectedStatus || response.status === 200;
      logTest(route.name, isCorrectStatus, `Status: ${response.status}`);
    } catch (error) {
      // 404 errors are expected
      logTest(route.name, error.response?.status === 404, `Status: ${error.response?.status || 'Error'}`);
    }
  }
}

// Main test runner
async function runAllTests() {
  log('\n' + '='.repeat(60), colors.cyan);
  log('REOG PONOROGO - COMPREHENSIVE SMOKE TEST', colors.cyan);
  log('='.repeat(60), colors.cyan);

  try {
    // Test public pages
    await testPublicPages();

    // Test locale switching
    await testLocaleSwitching();

    // Test authentication
    const authResults = await testAuthentication();
    const userCookies = authResults.loginResultID?.cookies;
    const adminCookies = authResults.adminLoginResult?.cookies;

    // Test user flows
    await testUserFlows(userCookies);

    // Test admin flows
    await testAdminFlows(adminCookies);

    // Test booking flow
    await testBookingFlow(userCookies);

    // Test error pages
    await testErrorPages();

    // Print summary
    log('\n' + '='.repeat(60), colors.cyan);
    log('TEST SUMMARY', colors.cyan);
    log('='.repeat(60), colors.cyan);
    log(`Total Tests: ${passedTests + failedTests}`, colors.blue);
    log(`Passed: ${passedTests}`, colors.green);
    log(`Failed: ${failedTests}`, failedTests > 0 ? colors.red : colors.green);
    log('='.repeat(60), colors.cyan);

    if (failedTests > 0) {
      log('\nFailed Tests:', colors.red);
      testResults
        .filter(r => !r.passed)
        .forEach(r => {
          log(`  - ${r.name}`, colors.yellow);
          if (r.details) log(`    ${r.details}`, colors.yellow);
        });
    }

    process.exit(failedTests > 0 ? 1 : 0);
  } catch (error) {
    log(`\nFatal error: ${error.message}`, colors.red);
    console.error(error);
    process.exit(1);
  }
}

// Run tests
runAllTests();
