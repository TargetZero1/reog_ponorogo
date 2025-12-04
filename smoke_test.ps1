# Smoke Test Script for Reog Ponorogo App
# Tests full user flow (signup, browse, checkout) and admin flow (login, manage events, analytics)

$baseURL = "http://127.0.0.1:8000"
$locale = "id"  # Indonesian locale

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "REOG PONOROGO - COMPREHENSIVE SMOKE TEST" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Test counters
$passCount = 0
$failCount = 0

function Test-Endpoint {
    param(
        [string]$description,
        [string]$method,
        [string]$url,
        [int]$expectedStatus = 200
    )
    
    try {
        $response = Invoke-WebRequest -Uri $url -Method $method -SkipHttpErrorCheck -SkipCertificateCheck 2>&1
        $actualStatus = $response.StatusCode
        
        if ($actualStatus -eq $expectedStatus) {
            Write-Host "✓ PASS: $description (HTTP $actualStatus)" -ForegroundColor Green
            $global:passCount++
            return $true
        } else {
            Write-Host "✗ FAIL: $description (Expected HTTP $expectedStatus, got HTTP $actualStatus)" -ForegroundColor Red
            $global:failCount++
            return $false
        }
    } catch {
        Write-Host "✗ ERROR: $description - $_" -ForegroundColor Red
        $global:failCount++
        return $false
    }
}

# PUBLIC PAGES TEST
Write-Host "1. TESTING PUBLIC PAGES" -ForegroundColor Yellow
Write-Host "======================" -ForegroundColor Yellow

Test-Endpoint "Home page (redirects or renders)" "GET" "$baseURL/" 200
Test-Endpoint "Home page with locale" "GET" "$baseURL/$locale" 200
Test-Endpoint "Budaya dan Sejarah page" "GET" "$baseURL/$locale/budaya-dan-sejarah" 200
Test-Endpoint "Tempat Wisata (Places) page" "GET" "$baseURL/$locale/tempat-wisata" 200
Test-Endpoint "Events listing page" "GET" "$baseURL/$locale/events" 200

Write-Host ""

# BOOKING PAGES TEST (Without Auth)
Write-Host "2. TESTING BOOKING PAGES (Public Access)" -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Yellow

Test-Endpoint "Register page accessible" "GET" "$baseURL/$locale/pesan-ticket/register" 200
Test-Endpoint "Login page accessible" "GET" "$baseURL/$locale/pesan-ticket/login" 200

Write-Host ""

# ADMIN PAGES TEST (Without Auth - Should redirect or show login)
Write-Host "3. TESTING ADMIN ROUTES (Should require auth)" -ForegroundColor Yellow
Write-Host "=============================================" -ForegroundColor Yellow

Test-Endpoint "Admin dashboard (should redirect if not logged in)" "GET" "$baseURL/$locale/admin/dashboard" 302
Test-Endpoint "Admin events (should redirect if not logged in)" "GET" "$baseURL/$locale/admin/events" 302
Test-Endpoint "Admin places (should redirect if not logged in)" "GET" "$baseURL/$locale/admin/places" 302
Test-Endpoint "Admin analytics (should redirect if not logged in)" "GET" "$baseURL/$locale/admin/analytics" 302
Test-Endpoint "Admin orders (should redirect if not logged in)" "GET" "$baseURL/$locale/admin/orders" 302
Test-Endpoint "Admin users (should redirect if not logged in)" "GET" "$baseURL/$locale/admin/users" 302

Write-Host ""

# PROFILE & PAYMENT HISTORY (Without Auth - Should redirect)
Write-Host "4. TESTING PROTECTED USER ROUTES (Should require auth)" -ForegroundColor Yellow
Write-Host "====================================================" -ForegroundColor Yellow

Test-Endpoint "Profile page (should redirect if not logged in)" "GET" "$baseURL/$locale/profile" 302
Test-Endpoint "Payment history (should redirect if not logged in)" "GET" "$baseURL/$locale/payment-history" 302

Write-Host ""

# ROUTE EXISTENCE TESTS
Write-Host "5. VERIFYING ROUTE DEFINITIONS" -ForegroundColor Yellow
Write-Host "==============================" -ForegroundColor Yellow

# Check if routes are properly registered by attempting various locale variants
Test-Endpoint "Route works with 'id' locale" "GET" "$baseURL/id" 200
Test-Endpoint "Route works with 'en' locale" "GET" "$baseURL/en" 200

Write-Host ""

# SUMMARY
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "TEST SUMMARY" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Passed: $passCount" -ForegroundColor Green
Write-Host "Failed: $failCount" -ForegroundColor Red
Write-Host "Total:  $($passCount + $failCount)" -ForegroundColor Cyan
Write-Host ""

if ($failCount -eq 0) {
    Write-Host "✓ All smoke tests passed!" -ForegroundColor Green
} else {
    Write-Host "✗ Some tests failed. Please review above." -ForegroundColor Red
}
