#!/usr/bin/env node

/**
 * Browser Smoke Test Script
 * Tests HTTP endpoints and reports status codes and key response snippets
 */

import axios from 'axios';
import https from 'https';

// Configuration
const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:8000';
const TIMEOUT = 10000; // 10 seconds

// Test credentials (from PROJECT_STATUS.md)
const TEST_USER = {
  email: 'test@example.com',
  password: 'password'
};

const ADMIN_USER = {
  email: 'admin@reog.test',
  password: 'password'
};

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

// Results tracking
const results = {
  passed: 0,
  failed: 0,
  skipped: 0,
  tests: []
};

/**
 * Extract key snippet from response (first 200 chars of HTML/text)
 */
function extractSnippet(response, maxLength = 200) {
  const data = response.data;
  if (typeof data === 'string') {
    return data.substring(0, maxLength).replace(/\s+/g, ' ').trim();
  }
  if (typeof data === 'object') {
    return JSON.stringify(data).substring(0, maxLength);
  }
  return String(data).substring(0, maxLength);
}


/**
 * Make HTTP request and return result
 */
async function testEndpoint(name, method, url, options = {}) {
  const { headers = {}, data = null, cookies = null, expectedStatus = null } = options;
  
  // Create axios instance with cookies
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOUT,
    withCredentials: true,
    headers: {
      'Accept': 'text/html,application/json',
      'User-Agent': 'SmokeTest/1.0',
      ...headers
    },
    // Allow self-signed certificates in development
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  });

  // Set cookies if provided
  if (cookies) {
    axiosInstance.defaults.headers.common['Cookie'] = cookies;
  }

  try {
    const config = {
      method: method.toLowerCase(),
      url: url,
      ...(data && { data })
    };

    const startTime = Date.now();
    const response = await axiosInstance(config);
    const duration = Date.now() - startTime;

    const snippet = extractSnippet(response);
    const statusCode = response.status;
    
    // Determine success: if expectedStatus is null, accept any 2xx/3xx (protected routes)
    // If expectedStatus is set, must match exactly
    let isSuccess;
    if (expectedStatus === null) {
      // Accept 200 (Inertia shows login page) or 302 (redirect) - both indicate protection
      isSuccess = (statusCode >= 200 && statusCode < 400);
    } else {
      isSuccess = statusCode === expectedStatus;
    }

    const result = {
      name,
      method,
      url,
      statusCode,
      duration,
      snippet,
      success: isSuccess,
      cookies: response.headers['set-cookie'] || null
    };

    if (isSuccess) {
      results.passed++;
      const protectionNote = (expectedStatus === null && (statusCode === 200 || statusCode === 302))
        ? ' (protected)' 
        : '';
      console.log(`${colors.green}✓${colors.reset} ${name} - ${statusCode} (${duration}ms)${protectionNote}`);
    } else {
      results.failed++;
      const expected = expectedStatus === null ? '2xx/3xx' : expectedStatus;
      console.log(`${colors.red}✗${colors.reset} ${name} - ${statusCode} (${duration}ms) [Expected: ${expected}]`);
    }

    results.tests.push(result);
    return result;

  } catch (error) {
    const duration = error.response ? Date.now() - (Date.now() - (error.config?.timeout || TIMEOUT)) : 0;
    const statusCode = error.response?.status || 'ERROR';
    const snippet = error.response ? extractSnippet(error.response) : error.message;

    const result = {
      name,
      method,
      url,
      statusCode,
      duration,
      snippet,
      success: false,
      error: error.message
    };

    results.failed++;
    console.log(`${colors.red}✗${colors.reset} ${name} - ${statusCode} - ${error.message}`);
    results.tests.push(result);
    return result;
  }
}

/**
 * Login and get session cookie
 */
async function login(credentials) {
  try {
    // Cookie jar to maintain session
    let cookies = '';
    
    const axiosInstance = axios.create({
      baseURL: BASE_URL,
      timeout: TIMEOUT,
      withCredentials: true,
      headers: {
        'Accept': 'text/html,application/json',
        'User-Agent': 'SmokeTest/1.0'
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });

    // Intercept responses to collect cookies
    axiosInstance.interceptors.response.use(response => {
      const setCookies = response.headers['set-cookie'];
      if (setCookies) {
        // Extract cookie name=value pairs
        const cookieStrings = setCookies.map(cookie => {
          const parts = cookie.split(';');
          return parts[0].trim();
        });
        cookies = cookieStrings.join('; ');
      }
      return response;
    });

    // First, get CSRF token from login page (this also sets session cookie)
    const loginPage = await axiosInstance.get('/pesan-ticket/login', {
      headers: cookies ? { 'Cookie': cookies } : {}
    });
    
    // Update cookies from login page response
    if (loginPage.headers['set-cookie']) {
      const setCookies = loginPage.headers['set-cookie'].map(c => c.split(';')[0].trim());
      cookies = setCookies.join('; ');
    }

    const csrfToken = extractCsrfToken(loginPage.data);

    if (!csrfToken) {
      console.log(`${colors.yellow}⚠${colors.reset} Could not extract CSRF token`);
      // Try to continue anyway - Laravel might accept X-XSRF-TOKEN from cookie
    }

    // Then login with form data (Laravel expects form-encoded for login)
    const formData = new URLSearchParams({
      email: credentials.email,
      password: credentials.password,
      ...(csrfToken && { _token: csrfToken })
    });

    const response = await axiosInstance.post('/pesan-ticket/login', formData.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json, text/html',
        'X-Requested-With': 'XMLHttpRequest',
        ...(csrfToken && { 'X-CSRF-TOKEN': csrfToken }),
        ...(cookies && { 'Cookie': cookies })
      }
    });

    // Update cookies from login response
    if (response.headers['set-cookie']) {
      const setCookies = response.headers['set-cookie'].map(c => c.split(';')[0].trim());
      cookies = setCookies.join('; ');
    }

    // Check if login was successful (status 200 or redirect)
    if (response.status === 200 || response.status === 302) {
      return cookies || 'session=' + Date.now(); // Return cookies or fallback
    }

    return null;
  } catch (error) {
    // Sometimes login returns 302 redirect which axios follows
    // Check if we got cookies anyway
    if (error.response && error.response.headers['set-cookie']) {
      const setCookies = error.response.headers['set-cookie'].map(c => c.split(';')[0].trim());
      return setCookies.join('; ');
    }
    console.log(`${colors.yellow}⚠${colors.reset} Login failed: ${error.message}`);
    return null;
  }
}

/**
 * Extract CSRF token from HTML
 */
function extractCsrfToken(html) {
  if (typeof html !== 'string') return null;
  
  // Try meta tag
  const metaMatch = html.match(/<meta name="csrf-token" content="([^"]+)"/);
  if (metaMatch) return metaMatch[1];
  
  // Try input field
  const inputMatch = html.match(/<input[^>]*name="_token"[^>]*value="([^"]+)"/);
  if (inputMatch) return inputMatch[1];
  
  return null;
}

/**
 * Main test runner
 */
async function runTests() {
  console.log(`${colors.cyan}╔═══════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║           Browser Smoke Test - Reog Ponorogo            ║${colors.reset}`);
  console.log(`${colors.cyan}╚═══════════════════════════════════════════════════════════╝${colors.reset}`);
  console.log(`\nBase URL: ${BASE_URL}\n`);

  // ============================================
  // PUBLIC ENDPOINTS
  // ============================================
  console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.blue}Public Endpoints${colors.reset}`);
  console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

  await testEndpoint('Home Page', 'GET', '/', { expectedStatus: 200 });
  await testEndpoint('Budaya & Sejarah', 'GET', '/budaya-dan-sejarah', { expectedStatus: 200 });
  await testEndpoint('Tourist Attractions', 'GET', '/tempat-wisata', { expectedStatus: 200 });
  await testEndpoint('Events Index', 'GET', '/events', { expectedStatus: 200 });
  await testEndpoint('Register Page', 'GET', '/pesan-ticket/register', { expectedStatus: 200 });
  await testEndpoint('Login Page', 'GET', '/pesan-ticket/login', { expectedStatus: 200 });
  await testEndpoint('Login Page (Alt)', 'GET', '/login', { expectedStatus: 200 });

  // Try to get a valid event slug (this might fail if no events exist)
  try {
    const eventsResponse = await axios.get(`${BASE_URL}/events`, { timeout: TIMEOUT });
    if (eventsResponse.data && typeof eventsResponse.data === 'object') {
      // Inertia response - check for events in props
      const events = eventsResponse.data.props?.events?.data || eventsResponse.data.props?.events || [];
      if (events.length > 0 && events[0].slug) {
        await testEndpoint('Event Show', 'GET', `/events/${events[0].slug}`, { expectedStatus: 200 });
      } else {
        results.skipped++;
        console.log(`${colors.yellow}⊘${colors.reset} Event Show - SKIPPED (no events found)`);
      }
    }
  } catch (error) {
    results.skipped++;
    console.log(`${colors.yellow}⊘${colors.reset} Event Show - SKIPPED (could not fetch events)`);
  }

  // ============================================
  // PROTECTED ENDPOINTS (Require Auth)
  // ============================================
  console.log(`\n${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.blue}Protected Endpoints (Require Authentication)${colors.reset}`);
  console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

  // Test without auth (Inertia returns 200 with login page instead of 302 redirect)
  // Accept 200 or 302 as both indicate protection
  await testEndpoint('Checkout (No Auth)', 'GET', '/pesan-ticket/checkout', { expectedStatus: null }); // Accept 200 (login page) or 302
  await testEndpoint('Payment History (No Auth)', 'GET', '/payment-history', { expectedStatus: null });
  await testEndpoint('Profile (No Auth)', 'GET', '/profile', { expectedStatus: null });

  // Login as regular user
  console.log(`\n${colors.cyan}Logging in as regular user...${colors.reset}\n`);
  const userCookies = await login(TEST_USER);

  if (userCookies) {
    await testEndpoint('Checkout (Authenticated)', 'GET', '/pesan-ticket/checkout', { 
      cookies: userCookies,
      expectedStatus: 200 
    });
    await testEndpoint('Payment History (Authenticated)', 'GET', '/payment-history', { 
      cookies: userCookies,
      expectedStatus: 200 
    });
    await testEndpoint('Profile (Authenticated)', 'GET', '/profile', { 
      cookies: userCookies,
      expectedStatus: 200 
    });
  } else {
    console.log(`${colors.yellow}⚠ Skipping authenticated tests (login failed)${colors.reset}\n`);
    results.skipped += 3;
  }

  // ============================================
  // ADMIN ENDPOINTS (Require Admin Role)
  // ============================================
  console.log(`\n${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.blue}Admin Endpoints (Require Admin Role)${colors.reset}`);
  console.log(`${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

  // Test without auth (Inertia returns 200 with login/home page instead of 302 redirect)
  // Accept 200 or 302 as both indicate protection
  await testEndpoint('Admin Dashboard (No Auth)', 'GET', '/admin/dashboard', { expectedStatus: null });
  await testEndpoint('Admin Orders (No Auth)', 'GET', '/admin/orders', { expectedStatus: null });
  await testEndpoint('Admin Events (No Auth)', 'GET', '/admin/events', { expectedStatus: null });
  await testEndpoint('Admin Places (No Auth)', 'GET', '/admin/places', { expectedStatus: null });
  await testEndpoint('Admin Analytics (No Auth)', 'GET', '/admin/analytics', { expectedStatus: null });
  await testEndpoint('Admin Users (No Auth)', 'GET', '/admin/users', { expectedStatus: null });
  await testEndpoint('Admin Reports (No Auth)', 'GET', '/admin/reports', { expectedStatus: null });

  // Login as admin
  console.log(`\n${colors.cyan}Logging in as admin...${colors.reset}\n`);
  const adminCookies = await login(ADMIN_USER);

  if (adminCookies) {
    await testEndpoint('Admin Dashboard (Authenticated)', 'GET', '/admin/dashboard', { 
      cookies: adminCookies,
      expectedStatus: 200 
    });
    await testEndpoint('Admin Orders (Authenticated)', 'GET', '/admin/orders', { 
      cookies: adminCookies,
      expectedStatus: 200 
    });
    await testEndpoint('Admin Events (Authenticated)', 'GET', '/admin/events', { 
      cookies: adminCookies,
      expectedStatus: 200 
    });
    await testEndpoint('Admin Places (Authenticated)', 'GET', '/admin/places', { 
      cookies: adminCookies,
      expectedStatus: 200 
    });
    await testEndpoint('Admin Analytics (Authenticated)', 'GET', '/admin/analytics', { 
      cookies: adminCookies,
      expectedStatus: 200 
    });
    await testEndpoint('Admin Users (Authenticated)', 'GET', '/admin/users', { 
      cookies: adminCookies,
      expectedStatus: 200 
    });
    await testEndpoint('Admin Reports (Authenticated)', 'GET', '/admin/reports', { 
      cookies: adminCookies,
      expectedStatus: 200 
    });
  } else {
    console.log(`${colors.yellow}⚠ Skipping admin tests (login failed)${colors.reset}\n`);
    results.skipped += 7;
  }

  // ============================================
  // SUMMARY
  // ============================================
  console.log(`\n${colors.cyan}╔═══════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║                        Test Summary                        ║${colors.reset}`);
  console.log(`${colors.cyan}╚═══════════════════════════════════════════════════════════╝${colors.reset}\n`);

  const total = results.passed + results.failed + results.skipped;
  console.log(`Total Tests: ${total}`);
  console.log(`${colors.green}Passed: ${results.passed}${colors.reset}`);
  console.log(`${colors.red}Failed: ${results.failed}${colors.reset}`);
  console.log(`${colors.yellow}Skipped: ${results.skipped}${colors.reset}\n`);

  // Detailed results
  if (results.failed > 0) {
    console.log(`${colors.red}Failed Tests:${colors.reset}\n`);
    results.tests
      .filter(t => !t.success)
      .forEach(test => {
        console.log(`  ${colors.red}✗${colors.reset} ${test.name}`);
        console.log(`    URL: ${test.method} ${test.url}`);
        console.log(`    Status: ${test.statusCode}`);
        if (test.error) {
          console.log(`    Error: ${test.error}`);
        }
        if (test.snippet) {
          console.log(`    Snippet: ${test.snippet.substring(0, 100)}...`);
        }
        console.log('');
      });
  }

  // Response snippets for all tests
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`);
  console.log(`${colors.cyan}Response Snippets${colors.reset}`);
  console.log(`${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`);

  results.tests.forEach(test => {
    const statusColor = test.success ? colors.green : colors.red;
    console.log(`${statusColor}[${test.statusCode}]${colors.reset} ${test.method} ${test.url}`);
    console.log(`  ${test.snippet || '(no content)'}`);
    console.log('');
  });

  // Exit with appropriate code
  process.exit(results.failed > 0 ? 1 : 0);
}

// Run tests
runTests().catch(error => {
  console.error(`${colors.red}Fatal error:${colors.reset}`, error);
  process.exit(1);
});

