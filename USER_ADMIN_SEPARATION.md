# User vs Admin Access & Events Synchronization

## Overview

This document explains how user and admin access is differentiated, and how events synchronize between the admin panel and public website.

---

## Access Control Summary

### **Public Users (Unauthenticated & Regular Users)**

**Can Access:**
- ✅ Home page (`/`)
- ✅ Budaya & Sejarah (`/budaya-dan-sejarah`)
- ✅ Tourist Attractions (`/tempat-wisata`)
- ✅ **Public Events Page** (`/events`) - **Only published events**
- ✅ **Event Detail Page** (`/events/{slug}`) - **Only published events**
- ✅ Register page (`/pesan-ticket/register`)
- ✅ Login page (`/pesan-ticket/login`)
- ✅ Checkout (if authenticated)
- ✅ Payment History (if authenticated)
- ✅ Profile (if authenticated)

**Cannot Access:**
- ❌ Admin panel (`/admin/*`)
- ❌ Unpublished/draft events
- ❌ Event management (create, edit, delete)

---

### **Admin Users**

**Can Access:**
- ✅ Everything public users can access
- ✅ **Admin Events Management** (`/admin/events`) - **All events (published + draft)**
- ✅ **Admin Places Management** (`/admin/places`)
- ✅ Admin Dashboard (`/admin/dashboard`)
- ✅ Admin Orders (`/admin/orders`)
- ✅ Admin Analytics (`/admin/analytics`)
- ✅ Admin Users (`/admin/users`)
- ✅ Admin Reports (`/admin/reports`)
- ✅ Create, Edit, Delete events
- ✅ Toggle publish/unpublish status
- ✅ View both published and draft events

**Special Features:**
- Can see all events regardless of published status
- Can publish/unpublish events with toggle button
- Can view events on public site via "Lihat di Situs Publik" link
- Can access "Lihat Situs Publik" button to see public events page

---

## Events Synchronization

### How It Works

1. **Admin Creates Event**
   - Admin goes to `/admin/events/create`
   - Fills out event form
   - Can check "Publikasikan event ini sekarang" checkbox
   - Event is created in database

2. **Publishing Status**
   - **Published = true**: Event appears on public `/events` page
   - **Published = false**: Event is draft, only visible in admin panel

3. **Public Events Page** (`/events`)
   - **Only shows events where `published = true`**
   - Query: `Event::where('published', true)->orderBy('date', 'asc')->paginate(12)`
   - Users see only published events

4. **Public Event Detail** (`/events/{slug}`)
   - **Only accessible if event is published**
   - Query: `Event::where('slug', $slug)->where('published', true)->firstOrFail()`
   - Returns 404 if event is unpublished

5. **Admin Events Page** (`/admin/events`)
   - **Shows ALL events** (published + draft)
   - Query: `Event::orderBy('date', 'desc')->paginate(10)`
   - Shows "Published" or "Draft" badge
   - Admin can toggle publish status with button

---

## Key Routes

### Public Routes (No Auth Required)
```php
GET  /events                    → Shows only published events
GET  /events/{slug}             → Shows event only if published
```

### Admin Routes (Requires Admin Role)
```php
GET    /admin/events            → Shows ALL events (published + draft)
GET    /admin/events/create     → Create new event
POST   /admin/events            → Store new event
GET    /admin/events/{id}       → View event (any status)
GET    /admin/events/{id}/edit  → Edit event
PUT    /admin/events/{id}       → Update event
DELETE /admin/events/{id}       → Delete event
PATCH  /admin/events/{id}/toggle-publish → Toggle publish status
```

---

## Synchronization Flow

```
┌─────────────────────────────────────────────────────────┐
│ Admin Creates/Edits Event                               │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
        ┌──────────────────────┐
        │ Event Saved to DB    │
        │ published: true/false │
        └──────────┬───────────┘
                   │
        ┌──────────┴───────────┐
        │                      │
        ▼                      ▼
┌───────────────┐    ┌──────────────────┐
│ published=true│    │ published=false   │
└───────┬───────┘    └─────────┬─────────┘
        │                      │
        │                      │
        ▼                      ▼
┌──────────────────┐  ┌──────────────────┐
│ Public /events   │  │ Admin Panel Only │
│ Shows Event      │  │ Draft Status     │
└──────────────────┘  └──────────────────┘
```

---

## Features

### Admin Panel Features

1. **View All Events**
   - See both published and draft events
   - Color-coded badges (Green = Published, Gray = Draft)

2. **Publish/Unpublish Toggle**
   - One-click button to publish or hide events
   - Immediately syncs with public page

3. **View on Public Site**
   - "Lihat di Situs Publik" link for published events
   - Opens in new tab to verify public appearance

4. **View Public Events Page**
   - "Lihat Situs Publik" button in header
   - Opens `/events` in new tab to see what users see

5. **Info Banner**
   - Blue info box explaining synchronization
   - Clarifies that only published events appear publicly

### Public Page Features

1. **Only Published Events**
   - Automatically filters to show only published events
   - No draft events visible to users

2. **Event Detail Protection**
   - Unpublished events return 404
   - Prevents direct URL access to drafts

---

## Testing Synchronization

### Test Scenario 1: Create Published Event
1. Login as admin
2. Go to `/admin/events/create`
3. Fill form, check "Publikasikan event ini sekarang"
4. Submit
5. Go to `/events` (public page)
6. ✅ Event should appear

### Test Scenario 2: Create Draft Event
1. Login as admin
2. Go to `/admin/events/create`
3. Fill form, **uncheck** "Publikasikan event ini sekarang"
4. Submit
5. Go to `/events` (public page)
6. ✅ Event should **NOT** appear
7. Go to `/admin/events`
8. ✅ Event should appear with "Draft" badge

### Test Scenario 3: Publish Draft Event
1. In admin panel, find draft event
2. Click "🔓 Publikasikan" button
3. Go to `/events` (public page)
4. ✅ Event should now appear

### Test Scenario 4: Unpublish Event
1. In admin panel, find published event
2. Click "🔓 Sembunyikan" button
3. Go to `/events` (public page)
4. ✅ Event should disappear
5. Try direct URL `/events/{slug}`
6. ✅ Should return 404

---

## Database Schema

```php
events table:
- id
- title
- slug
- description
- date
- location
- capacity
- price
- published (boolean) ← Key field for synchronization
- created_at
- updated_at
```

---

## Security

- ✅ Public routes only show published events
- ✅ Admin routes protected by `admin` middleware
- ✅ Unpublished events return 404 on public routes
- ✅ Admin can see all events regardless of status
- ✅ Regular users cannot access admin panel

---

## Summary

**The synchronization is automatic and real-time:**
- When admin publishes an event → It immediately appears on `/events`
- When admin unpublishes an event → It immediately disappears from `/events`
- Draft events are only visible in admin panel
- Published events are visible to everyone on public site

**No manual sync needed - it's all database-driven!**

