# Admin Panel Features Added

## Overview
Enhanced admin functionality with comprehensive dashboard, analytics, order management, user management, and reporting features.

## Features Added

### 1. **ProfileDropdown Component Enhancement**
- Added admin-specific menu items when user has `role === 'admin'`
- Increased dropdown width from `w-48` to `w-56` for better spacing
- Added section header styling for admin features
- Admin items include:
  - Dashboard (Home icon)
  - Analytics (Chart icon)
  - Orders Management (Cart icon)
  - Users Management (Users icon)
  - Reports (Document icon)
  - Manage Events link

### 2. **Admin Routes** (`routes/web.php`)
```
GET  /admin/dashboard   → adminDashboard()
GET  /admin/analytics   → adminAnalytics()
GET  /admin/orders      → adminOrders()
GET  /admin/users       → adminUsers()
GET  /admin/reports     → adminReports()
```
All routes protected with `admin` middleware (only accessible to admin users)

### 3. **Admin Dashboard** (`Pages/Admin/Dashboard.tsx`)
**Key Statistics Cards:**
- Total Orders (count)
- Total Revenue (Rp formatted)
- Total Users
- Total Events

**Recent Orders Table:**
- Shows 5 most recent orders
- Displays: Order ID, Customer name, Attraction, Amount, Date
- Uses Inertia pagination

### 4. **Admin Analytics** (`Pages/Admin/Analytics.tsx`)
**Key Metrics:**
- Average Order Value (Rp formatted)
- Total Tickets Sold (count)

**Sales Analysis:**
- Sales by Attraction (with progress bars)
- Orders by Month (with revenue breakdown)
- Trend analysis with visual representations

### 5. **Admin Orders Management** (`Pages/Admin/Orders.tsx`)
**Order Management Table:**
- Order ID, Customer, Email, Attraction, Quantity
- Amount (Rp formatted), Date, Payment Status
- Paginated (15 per page)
- Hover effects for better UX
- Color-coded status badges

### 6. **Admin Users Management** (`Pages/Admin/Users.tsx`)
**User Management Table:**
- User ID, Name (with avatar), Email
- Order count badge (clickable format)
- Joined date
- Paginated (15 per page)
- Avatar with initials

### 7. **Admin Reports** (`Pages/Admin/Reports.tsx`)
**Summary Cards:**
- Total Orders
- Total Revenue
- Total Users
- Average Order Value

**Detailed Reports:**
- **Top Attractions:** Shows revenue and order count with progress bars
- **Top Customers:** Displays top 10 customers by order count

## Model Updates

### Ticket Model (`app/Models/Ticket.php`)
Added relationship:
```php
public function user()
{
    return $this->belongsTo(User::class);
}
```

### User Model (`app/Models/User.php`)
Added relationship:
```php
public function tickets()
{
    return $this->hasMany(Ticket::class);
}
```

## Controller Methods (BookingController)

### adminDashboard()
- Calculates: total orders, revenue, users, events
- Retrieves 5 most recent orders with user info
- Returns Dashboard component with stats and recent orders

### adminAnalytics()
- Groups tickets by attraction (count + revenue)
- Groups orders by month (for trend analysis)
- Calculates average order value
- Calculates total tickets sold

### adminOrders()
- Retrieves all orders paginated (15 per page)
- Includes user relationship
- Orders by created_at DESC

### adminUsers()
- Retrieves all users (role = 'user')
- Includes ticket count
- Paginated (15 per page)
- Orders by created_at DESC

### adminReports()
- Summary statistics (orders, revenue, users, avg value)
- Top 10 attractions by revenue
- Top 10 customers by order count
- Used for comprehensive reporting

## UI/UX Features

✅ **Responsive Design** - Mobile and desktop friendly
✅ **Color-coded Sections** - Admin items highlighted in blue
✅ **Progress Bars** - Visual representation of metrics
✅ **Avatar Badges** - User initials in colored circles
✅ **Status Badges** - Color-coded status indicators
✅ **Hover Effects** - Interactive table rows
✅ **Gradient Headers** - Professional appearance
✅ **Pagination Info** - Shows range of items displayed
✅ **Formatted Currency** - All prices in Indonesian Rupiah

## Security
- All admin routes protected with `admin` middleware
- Only users with `role === 'admin'` can access
- Admin check in ProfileDropdown based on user role

## Database Queries
- Uses eager loading (`with()`) to prevent N+1 queries
- Uses `selectRaw()` and `groupBy()` for aggregations
- Uses `withCount()` for relationship counts
- Paginated for performance

## Testing
✅ All 11 existing tests passing
✅ Admin routes registered correctly
✅ Build successful (313.74 kB gzipped)

## Access
**Admin users can access:**
1. Profile page (edit name, email, password)
2. Admin Dashboard (overview of business)
3. Analytics (detailed insights)
4. Orders (manage all customer orders)
5. Users (manage registered users)
6. Reports (comprehensive business reports)
7. Events (manage performances/attractions)

**Regular users can access:**
1. Profile page (edit personal info)
2. Payment History (view their orders)

