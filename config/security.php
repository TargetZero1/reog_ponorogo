<?php

return [
    

    // Hide Laravel version in headers
    'hide_laravel_version' => true,

    // Enable security headers
    'security_headers' => [
        // Prevent clickjacking attacks
        'X-Frame-Options' => 'SAMEORIGIN',
        
        // Prevent MIME type sniffing
        'X-Content-Type-Options' => 'nosniff',
        
        // Enable XSS protection
        'X-XSS-Protection' => '1; mode=block',
        
        // Referrer Policy - don't leak referer info
        'Referrer-Policy' => 'strict-origin-when-cross-origin',
        
        // Permissions Policy (formerly Feature-Policy)
        'Permissions-Policy' => 'geolocation=(), microphone=(), camera=()',
        
        // Content Security Policy - prevent XSS
        'Content-Security-Policy' => "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'self';",
    ],

    // Sensitive fields to hide from responses
    'hidden_fields' => [
        'password',
        'password_confirmation',
        'remember_token',
        'api_token',
        'api_key',
        'secret_key',
        'private_key',
        'access_token',
        'refresh_token',
        'two_factor_secret',
    ],

    // IP whitelist for sensitive operations (optional)
    'ip_whitelist' => [
        // Add trusted IPs here
        // '192.168.1.1',
    ],

    // Rate limiting config
    'rate_limiting' => [
        'enabled' => true,
        'login_attempts' => '5,1', // 5 attempts per 1 minute
        'api_calls' => '60,1', // 60 calls per 1 minute
        'password_reset' => '3,60', // 3 attempts per 60 minutes
    ],

    // File upload security
    'upload' => [
        'allowed_mimes' => ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        'max_size' => 10240, // 10MB in KB
        'scan_for_viruses' => false, // Set to true if you have ClamAV installed
    ],

    // Database query logging (disable in production)
    'log_queries' => env('APP_DEBUG', false),

    // Encrypt sensitive cookies
    'encrypt_cookies' => true,

    // SameSite cookie policy
    'cookie_same_site' => 'lax',

    // Secure cookies (HTTPS only)
    'secure_cookies' => env('APP_ENV') === 'production',

    // Session security
    'session' => [
        'encrypt' => true,
        'http_only' => true,
        'secure' => env('APP_ENV') === 'production',
        'same_site' => 'lax',
    ],

    // Password requirements
    'password' => [
        'min_length' => 8,
        'require_uppercase' => true,
        'require_numbers' => true,
        'require_special_chars' => false,
    ],

    // Two-factor authentication
    'two_factor' => [
        'enabled' => false, // Enable if needed
        'max_attempts' => 3,
        'cooldown_minutes' => 15,
    ],

    // API security
    'api' => [
        'require_https' => env('APP_ENV') === 'production',
        'disable_http' => env('APP_ENV') === 'production',
        'api_rate_limit' => 100, // requests per minute
    ],
];
