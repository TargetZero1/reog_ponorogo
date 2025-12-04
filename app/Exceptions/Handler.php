<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Throwable;

class Handler extends ExceptionHandler
{
    
    protected $dontFlash = [
        'password',
        'password_confirmation',
        'api_key',
        'secret',
        'token',
        'remember_me',
    ];

    
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    
    public function render($request, Throwable $exception)
    {
        // Hide detailed error messages in production
        if (!config('app.debug') && !$this->isHttpException($exception)) {
            return response()->view('errors.500', [], 500);
        }

        // Sanitize exception messages to prevent information disclosure
        if (!config('app.debug')) {
            $exception = $this->sanitizeException($exception);
        }

        return parent::render($request, $exception);
    }

    
    protected function sanitizeException(Throwable $exception): Throwable
    {
        // Hide database connection details
        if (strpos($exception->getMessage(), 'SQLSTATE') !== false) {
            return new Exception('Database error occurred', 500);
        }

        // Hide file paths in production
        if (strpos($exception->getMessage(), '/') !== false || strpos($exception->getMessage(), '\\') !== false) {
            return new Exception('An error occurred', 500);
        }

        return $exception;
    }
}
