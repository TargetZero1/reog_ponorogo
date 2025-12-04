<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Validator;
use App\Services\SecurityService;

class ValidationServiceProvider extends ServiceProvider
{
    
    public function register(): void
    {
        //
    }

    
    public function boot(): void
    {
        // Custom validation rule: no SQL injection
        Validator::extend('no_sql_injection', function ($attribute, $value, $parameters, $validator) {
            return !SecurityService::hasSqlInjectionAttempt($value);
        });

        // Custom validation rule: no XSS
        Validator::extend('no_xss', function ($attribute, $value, $parameters, $validator) {
            return !SecurityService::hasXssAttempt($value);
        });

        // Custom validation rule: safe input
        Validator::extend('safe_input', function ($attribute, $value, $parameters, $validator) {
            return !SecurityService::hasSqlInjectionAttempt($value) && 
                   !SecurityService::hasXssAttempt($value);
        });

        // Custom validation rule: strong password
        Validator::extend('strong_password', function ($attribute, $value, $parameters, $validator) {
            $hasUppercase = preg_match('/[A-Z]/', $value);
            $hasLowercase = preg_match('/[a-z]/', $value);
            $hasNumber = preg_match('/[0-9]/', $value);
            $hasSpecialChar = preg_match('/[!@#$%^&*(),.?":{}|<>]/', $value);
            
            return $hasUppercase && $hasLowercase && $hasNumber && strlen($value) >= 8;
        });

        // Messages for custom rules
        Validator::replacer('no_sql_injection', function ($message, $attribute, $rule, $parameters) {
            return "The $attribute field contains invalid characters.";
        });

        Validator::replacer('no_xss', function ($message, $attribute, $rule, $parameters) {
            return "The $attribute field contains potentially dangerous content.";
        });

        Validator::replacer('safe_input', function ($message, $attribute, $rule, $parameters) {
            return "The $attribute field contains invalid content.";
        });

        Validator::replacer('strong_password', function ($message, $attribute, $rule, $parameters) {
            return "The $attribute must be at least 8 characters and contain uppercase, lowercase, numbers.";
        });
    }
}
