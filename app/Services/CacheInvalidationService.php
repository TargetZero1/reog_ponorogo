<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;

class CacheInvalidationService
{
    /**
     * Invalidate all dashboard caches
     */
    public static function invalidateDashboard()
    {
        Cache::forget('admin_dashboard_metrics');
        Cache::forget('dashboard_orders_by_month');
        Cache::forget('dashboard_revenue_by_attraction');
        Cache::forget('dashboard_payment_breakdown');
    }

    /**
     * Invalidate all analytics caches
     */
    public static function invalidateAnalytics()
    {
        Cache::forget('admin_analytics');
        Cache::forget('analytics_orders_by_month');
    }

    /**
     * Invalidate all reports caches
     */
    public static function invalidateReports()
    {
        Cache::forget('reports_total_orders');
        Cache::forget('reports_total_revenue');
        Cache::forget('reports_total_users');
        Cache::forget('reports_avg_order');
        Cache::forget('reports_top_attractions');
        Cache::forget('reports_top_customers');
    }

    /**
     * Invalidate public page caches
     */
    public static function invalidatePublic()
    {
        Cache::forget('published_places');
        Cache::forget('published_upcoming_events');
    }

    /**
     * Invalidate all caches
     */
    public static function invalidateAll()
    {
        self::invalidateDashboard();
        self::invalidateAnalytics();
        self::invalidateReports();
        self::invalidatePublic();
    }

    /**
     * Invalidate when ticket is created
     */
    public static function onTicketCreated()
    {
        self::invalidateDashboard();
        self::invalidateAnalytics();
        self::invalidateReports();
    }

    /**
     * Invalidate when event is modified
     */
    public static function onEventModified()
    {
        self::invalidateDashboard();
        self::invalidatePublic();
        self::invalidateAnalytics();
    }

    /**
     * Invalidate when place is modified
     */
    public static function onPlaceModified()
    {
        self::invalidatePublic();
        self::invalidateAnalytics();
    }
}
