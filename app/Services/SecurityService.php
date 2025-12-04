<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;

class SecurityService
{
    
    public static function sanitize(string $input): string
    {
        // Remove any potential script tags and dangerous content
        $input = strip_tags($input, '<b><i><u><p><br><a><strong><em>');
        
        // Encode special characters
        $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
        
        return trim($input);
    }

    
    public static function sanitizeArray(array $inputs): array
    {
        $sanitized = [];
        
        foreach ($inputs as $key => $value) {
            if (is_string($value)) {
                $sanitized[$key] = self::sanitize($value);
            } elseif (is_array($value)) {
                $sanitized[$key] = self::sanitizeArray($value);
            } else {
                $sanitized[$key] = $value;
            }
        }
        
        return $sanitized;
    }

    
    public static function validateEmail(string $email): bool
    {
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }

    
    public static function validateUrl(string $url): bool
    {
        return filter_var($url, FILTER_VALIDATE_URL) !== false;
    }

    
    public static function hasSqlInjectionAttempt(string $input): bool
    {
        $sqlKeywords = ['UNION', 'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'CREATE', 'ALTER', 'EXEC', 'EXECUTE', '--', '', 'xp_', 'sp_'];
        $upperInput = strtoupper($input);
        
        foreach ($sqlKeywords as $keyword) {
            if (strpos($upperInput, $keyword) !== false) {
                Log::warning('Potential SQL injection attempt detected', ['input' => substr($input, 0, 50)]);
                return true;
            }
        }
        
        return false;
    }

    
    public static function hasXssAttempt(string $input): bool
    {
        $xssPatterns = [
            '/<script[^>]*>.*?<\/script>/i',
            '/javascript:/i',
            '/on\w+\s*=/i',
            '/<iframe/i',
            '/<object/i',
            '/<embed/i',
        ];
        
        foreach ($xssPatterns as $pattern) {
            if (preg_match($pattern, $input)) {
                Log::warning('Potential XSS attack detected', ['input' => substr($input, 0, 50)]);
                return true;
            }
        }
        
        return false;
    }

    
    public static function logSuspiciousActivity(string $message, array $context = []): void
    {
        Log::warning('SECURITY_ALERT: ' . $message, $context);
    }

    
    public static function verifyCsrfToken(string $token): bool
    {
        return hash_equals(session('_token'), $token);
    }

    
    public static function generateToken(int $length = 32): string
    {
        return bin2hex(random_bytes($length / 2));
    }

    
    public static function hash(string $data): string
    {
        return hash('sha256', $data);
    }

    
    public static function encrypt(string $data): string
    {
        return encrypt($data);
    }

    
    public static function decrypt(string $data): string
    {
        try {
            return decrypt($data);
        } catch (\Exception $e) {
            Log::error('Decryption failed', ['error' => $e->getMessage()]);
            return '';
        }
    }

    
    public static function checkRateLimit(string $action, string $identifier, int $maxAttempts = 5, int $decayMinutes = 1): bool
    {
        $key = "rate_limit:{$action}:{$identifier}";
        $attempts = cache($key, 0);
        
        if ($attempts >= $maxAttempts) {
            Log::warning('Rate limit exceeded', ['action' => $action, 'identifier' => $identifier]);
            return false;
        }
        
        cache([$key => $attempts + 1], now()->addMinutes($decayMinutes));
        
        return true;
    }

    
    public static function validateFileUpload($file, array $allowedMimes = [], int $maxSizeKb = 10240): bool
    {
        if (!$file->isValid()) {
            return false;
        }

        // Check file size
        if ($file->getSize() > ($maxSizeKb * 1024)) {
            return false;
        }

        // Check MIME type
        if (!empty($allowedMimes) && !in_array($file->getMimeType(), $allowedMimes)) {
            return false;
        }

        return true;
    }
}
