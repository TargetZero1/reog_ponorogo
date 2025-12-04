import http from 'http';
import { URL } from 'url';

const baseURL = 'http://127.0.0.1:8000';
const locale = 'id';

const tests = [
  { name: 'Home page (id)', path: `/${locale}` },
  { name: 'Events', path: `/${locale}/events` },
  { name: 'Places (Tempat Wisata)', path: `/${locale}/tempat-wisata` },
  { name: 'History/Culture (Budaya)', path: `/${locale}/budaya-dan-sejarah` },
  { name: 'Register page', path: `/${locale}/pesan-ticket/register` },
  { name: 'Login page', path: `/${locale}/pesan-ticket/login` },
  { name: 'Admin Dashboard (should redirect)', path: `/${locale}/admin/dashboard` },
  { name: 'Admin Events', path: `/${locale}/admin/events` },
  { name: 'Admin Places', path: `/${locale}/admin/places` },
  { name: 'Profile (should redirect)', path: `/${locale}/profile` },
  { name: 'Payment History (should redirect)', path: `/${locale}/payment-history` },
];

console.log('\n========== COMPREHENSIVE SMOKE TEST ==========\n');

let passed = 0;
let failed = 0;
let completed = 0;

tests.forEach((test) => {
  const url = new URL(test.path, baseURL);
  
  http.get(url, (res) => {
    const status = res.statusCode;
    const success = status >= 200 && status < 500;
    
    if (success) {
      console.log(`✓ PASS: ${test.name} (HTTP ${status})`);
      passed++;
    } else {
      console.log(`✗ FAIL: ${test.name} (HTTP ${status})`);
      failed++;
    }
    
    completed++;
    if (completed === tests.length) {
      printSummary();
    }
  }).on('error', (err) => {
    console.log(`✗ ERROR: ${test.name} - ${err.message}`);
    failed++;
    completed++;
    if (completed === tests.length) {
      printSummary();
    }
  });
});

function printSummary() {
  console.log('\n========== TEST SUMMARY ==========');
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total:  ${tests.length}`);
  console.log('==================================\n');
  
  if (failed === 0) {
    console.log('✓ All tests passed!\n');
    process.exit(0);
  } else {
    console.log('✗ Some tests failed.\n');
    process.exit(1);
  }
}
