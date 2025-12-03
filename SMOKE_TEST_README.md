# Smoke Test Script

A comprehensive HTTP smoke test script for the Reog Ponorogo application that tests all endpoints and reports status codes and response snippets.

## Usage

### Prerequisites

1. Make sure your Laravel development server is running:
   ```bash
   php artisan serve
   ```

2. The script uses `axios` which is already in your `package.json` dependencies.

### Running the Tests

```bash
# Run with default URL (http://127.0.0.1:8000)
npm run smoke-test

# Or run directly
node smoke-test.js

# Or with custom base URL
BASE_URL=http://localhost:8000 node smoke-test.js
```

## What It Tests

### Public Endpoints
- ✅ Home page (`/`)
- ✅ Budaya & Sejarah (`/budaya-dan-sejarah`)
- ✅ Tourist Attractions (`/tempat-wisata`)
- ✅ Events Index (`/events`)
- ✅ Event Show (`/events/{slug}`) - if events exist
- ✅ Register Page (`/pesan-ticket/register`)
- ✅ Login Page (`/pesan-ticket/login`)

### Protected Endpoints (Require Authentication)
- ✅ Checkout (`/pesan-ticket/checkout`)
- ✅ Payment History (`/payment-history`)
- ✅ Profile (`/profile`)

### Admin Endpoints (Require Admin Role)
- ✅ Admin Dashboard (`/admin/dashboard`)
- ✅ Admin Orders (`/admin/orders`)
- ✅ Admin Events (`/admin/events`)
- ✅ Admin Places (`/admin/places`)
- ✅ Admin Analytics (`/admin/analytics`)
- ✅ Admin Users (`/admin/users`)
- ✅ Admin Reports (`/admin/reports`)

## Test Credentials

The script uses these test credentials (from `PROJECT_STATUS.md`):

**Regular User:**
- Email: `test@example.com`
- Password: `password`

**Admin User:**
- Email: `admin@reog.test`
- Password: `password`

## Output

The script provides:

1. **Real-time Test Results**: Each test shows ✓ (pass) or ✗ (fail) with status code and duration
2. **Summary**: Total tests, passed, failed, and skipped counts
3. **Failed Tests Details**: List of all failed tests with error messages
4. **Response Snippets**: First 200 characters of each response for quick verification

## Example Output

```
╔═══════════════════════════════════════════════════════════╗
║           Browser Smoke Test - Reog Ponorogo            ║
╚═══════════════════════════════════════════════════════════╝

Base URL: http://127.0.0.1:8000

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Public Endpoints
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Home Page - 200 (45ms)
✓ Budaya & Sejarah - 200 (32ms)
✓ Tourist Attractions - 200 (38ms)
...

╔═══════════════════════════════════════════════════════════╗
║                        Test Summary                        ║
╚═══════════════════════════════════════════════════════════╝

Total Tests: 25
Passed: 23
Failed: 2
Skipped: 0
```

## Troubleshooting

### "Connection refused" or "ECONNREFUSED"
- Make sure Laravel server is running: `php artisan serve`
- Check that the server is running on the expected port (default: 8000)

### "Login failed" warnings
- Verify test credentials exist in the database
- Check that the database is properly seeded
- Run: `php artisan db:seed` if needed

### CSRF Token Errors
- The script attempts to extract CSRF tokens automatically
- If authentication tests fail, check Laravel's session configuration
- Ensure `APP_KEY` is set in `.env`

### Timeout Errors
- Increase timeout in the script if your server is slow
- Check server logs for errors
- Verify database connection

## Customization

You can modify the script to:
- Add more endpoints to test
- Change timeout values
- Add custom headers
- Test specific routes only
- Export results to JSON/CSV

## Exit Codes

- `0`: All tests passed
- `1`: One or more tests failed

This makes it suitable for CI/CD pipelines:

```bash
npm run smoke-test && echo "All tests passed!"
```

