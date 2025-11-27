# Authentication Flow - Reog Ponorogo

## User Registration Flow

```
┌─────────────────────────────────────────────────────────────┐
│ User visits: /pesan-ticket/register?attraction=EventName     │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
        ┌────────────────────┐
        │ Register Component  │
        │ - Form with:        │
        │  • name             │
        │  • email            │
        │  • password         │
        │  • password_confirm │
        │  • attraction       │
        └────────┬────────────┘
                 │ (useForm hook manages state)
                 │
                 ▼
        ┌────────────────────┐
        │ Form Validation    │
        │ Client-side checks │
        └────────┬────────────┘
                 │
                 ▼
        POST /pesan-ticket/register
        (with Inertia post())
                 │
                 ▼
        ┌────────────────────────────────┐
        │ BookingController@register      │
        │ - Validate all fields           │
        │ - Check email uniqueness        │
        │ - Hash password                 │
        │ - Create User with role='user'  │
        │ - Auth::login($user)            │
        └────────┬───────────────────────┘
                 │
        ┌────────┴──────────┐
        │                   │
        ▼ (if attraction)   ▼ (no attraction)
    /pesan-ticket/          /
    checkout?               (home)
    attraction=...
        │
        └───────────────────┘
            ▼
    ✅ User logged in, session created
```

---

## User Login Flow

```
┌─────────────────────────────────────────────────────────────┐
│ User visits: /pesan-ticket/login?attraction=EventName        │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
        ┌────────────────────┐
        │ Login Component     │
        │ - Form with:        │
        │  • email            │
        │  • password         │
        │  • attraction param │
        └────────┬────────────┘
                 │ (useForm hook manages state)
                 │
                 ▼
        ┌────────────────────┐
        │ Form Validation    │
        │ Client-side checks │
        └────────┬────────────┘
                 │
                 ▼
        POST /pesan-ticket/login
        (with Inertia post())
                 │
                 ▼
        ┌────────────────────────────────┐
        │ BookingController@login         │
        │ - Validate email & password     │
        │ - Auth::attempt($credentials)   │
        │ - Regenerate session            │
        └────────┬───────────────────────┘
                 │
        ┌────────┴──────────────┐
        │                       │
        ▼ (credentials ok)      ▼ (wrong creds)
    (if attraction)        Show error:
        │                 "Email atau
    /pesan-ticket/         password salah"
    checkout?                   │
    attraction=...         (stay on /login)
        │
        ▼ (no attraction)
        /
     (home)
        │
        └───────────────────┘
            ▼
    ✅ User logged in, session regenerated
```

---

## Booking Flow (with Authentication)

```
┌────────────────────────────────────────┐
│ 1. Browse Events/Attractions            │
│    /tempat-wisata                       │
└────────┬────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────┐
│ 2. Click "Pesan Tiket"                  │
│    → /pesan-ticket/register?attraction= │
│       Grebeg%20Suro                     │
└────────┬────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────┐
│ 3. Register (if new user)               │
│    OR                                   │
│    Login (if existing user)             │
│    ✅ Attraction preserved              │
└────────┬────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────┐
│ 4. Checkout Page                        │
│    /pesan-ticket/checkout?attraction=   │
│    - Shows event details                │
│    - Quantity selector                  │
│    - Price calculation                  │
│    ✅ User authenticated ✅             │
└────────┬────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────┐
│ 5. Confirm Booking                      │
│    POST /pesan-ticket/create            │
│    - Creates Ticket record              │
│    - Saves to database                  │
│    ✅ Ticket created ✅                 │
└────────┬────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────┐
│ 6. WhatsApp Confirmation                │
│    → wa.me/62882009759102               │
│    - Pre-filled message with:           │
│      • Event name                       │
│      • Quantity                         │
│      • Total price                      │
│      • Visit date                       │
└────────┬────────────────────────────────┘
         │
         ▼
    ✅ Booking Complete!
```

---

## Session & Authentication State

```
┌─────────────────────────────────────┐
│ Inertia Form State (useForm)         │
├─────────────────────────────────────┤
│ const { data, errors, processing }  │
│       = useForm({                   │
│           email: '',                │
│           password: '',             │
│           ...                       │
│       });                           │
└──────────────┬──────────────────────┘
               │
               ├─ data: Form input values
               │  └─ Updated via setData()
               │
               ├─ errors: Server validation
               │  └─ Displayed inline
               │
               └─ processing: Loading state
                  └─ Disables submit button

┌─────────────────────────────────────┐
│ CSRF Token (Handled Automatically)  │
├─────────────────────────────────────┤
│ Inertia.post('/pesan-ticket/login') │
│ - Automatically attaches CSRF token │
│ - No manual token management needed │
│ - Token validation on Laravel side  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Session (Laravel)                   │
├─────────────────────────────────────┤
│ After successful login:             │
│ - Auth::login($user)                │
│ - $request->session()->regenerate() │
│ - User data available in request    │
│ - Auth::check() returns true        │
│ - Auth::user() returns user object  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Inertia Shared Props (Layout)       │
├─────────────────────────────────────┤
│ Available in all pages:             │
│ - auth.user (if logged in)          │
│ - errors (flash validation)         │
│ - success (flash message)           │
│ - Preserved across requests         │
└─────────────────────────────────────┘
```

---

## Data Flow Diagram

```
┌──────────────────┐
│ React Component  │  useForm Hook
│                  │  ├─ data
│ - Form inputs    │  ├─ setData()
│ - Error display  │  ├─ post()
│ - Submit handler │  └─ processing
└────────┬─────────┘
         │
         │ e.preventDefault()
         │ post('/endpoint')
         │
         ▼
┌──────────────────────────────────┐
│ HTTP Request (Inertia)           │
│ - Headers: X-Inertia: true       │
│ - Headers: X-Inertia-Version     │
│ - CSRF token attached auto       │
│ - Form data as JSON body         │
└────────┬───────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ Laravel Controller               │
│ - Validate request               │
│ - Process business logic         │
│ - Update database                │
│ - Return response                │
└────────┬───────────────────────┘
         │
         ├─ Success: Redirect (Inertia)
         │
         └─ Validation Error:
            back()->withErrors()
            └─ Inertia captures & 
               sends to component
            
         ▼
┌──────────────────────────────────┐
│ React Component (Updated)        │
│ - Errors display in form         │
│ - Processing state removed       │
│ - Form ready for retry           │
└──────────────────────────────────┘
```

---

## Authentication Middleware Stack

```
Request
  │
  ├─ Route Middleware Layer
  │  ├─ IsAdmin
  │  │  ├─ Check: Auth::check() ?
  │  │  │         Auth::user()->role === 'admin' ?
  │  │  │
  │  │  ├─ Yes: Allow (next())
  │  │  └─ No:  Redirect home with error
  │  │
  │  ├─ auth (Laravel built-in)
  │  │  ├─ Check: User logged in?
  │  │  ├─ Yes: Allow
  │  │  └─ No:  Redirect to login
  │  │
  │  └─ web (Laravel built-in)
  │     ├─ Handle session
  │     ├─ Load authenticated user
  │     └─ Set CSRF token
  │
  ▼
Controller (Route Handler)
```

---

## Key Improvements Made

### Before (Broken)
```jsx
// ❌ Traditional form submission
<form action="/pesan-ticket/register" method="post">
  <input name="email" />
  <input type="hidden" name="_token" value={csrf} />
  {/* Manual CSRF handling */}
  {/* Manual state management */}
</form>

// Problems:
// - Form submission breaks Inertia state
// - Session not properly maintained
// - CSRF manual handling error-prone
// - No reactive error handling
```

### After (Fixed)
```jsx
// ✅ Inertia useForm hook
const { data, setData, post, errors, processing } = useForm({
  email: '',
  password: '',
});

function submit(e) {
  e.preventDefault();
  post('/pesan-ticket/login'); // Inertia handles everything
}

// Benefits:
// - Inertia manages state reactively
// - CSRF automatic
// - Session preserved
// - Real-time error display
```

---

## Testing Scenarios

### ✅ Scenario 1: New User Registration
```
1. Visit /pesan-ticket/register?attraction=Grebeg%20Suro
2. Fill form: name, email, password, confirm
3. Click "Daftar"
4. → CreateS user with role='user'
5. → Auth::login($user) 
6. → Redirect to /pesan-ticket/checkout?attraction=Grebeg%20Suro
7. ✅ User logged in, attraction preserved
```

### ✅ Scenario 2: Existing User Login
```
1. Visit /pesan-ticket/login
2. Enter email: test@example.com
3. Enter password: password
4. Click "Masuk"
5. → Auth::attempt() validates
6. → Session regenerated
7. → Redirect to /
8. ✅ User logged in, session active
```

### ✅ Scenario 3: Login with Wrong Password
```
1. Visit /pesan-ticket/login
2. Enter email: test@example.com
3. Enter password: wrongpassword
4. Click "Masuk"
5. → Auth::attempt() fails
6. → back()->withErrors(['email' => '...'])
7. → Error displayed in form
8. ✅ User stays on /login, error shown
```

### ✅ Scenario 4: Non-Admin Access Events
```
1. Login as test@example.com (role='user')
2. Visit /events
3. → IsAdmin middleware runs
4. → Auth::check() = true
5. → Auth::user()->role = 'user'
6. → 'user' !== 'admin' → redirect home
7. ✅ Access denied, redirected
```

### ✅ Scenario 5: Admin Access Events
```
1. Login as admin@reog.test (role='admin')
2. Visit /events
3. → IsAdmin middleware runs
4. → Auth::check() = true
5. → Auth::user()->role = 'admin'
6. → 'admin' === 'admin' → next()
7. → EventController@index runs
8. ✅ Events list displayed
```

---

## Summary

The authentication system is now fully functional with:
- ✅ Inertia useForm for reactive state management
- ✅ Proper session handling and regeneration
- ✅ Automatic CSRF token management
- ✅ Real-time validation error display
- ✅ Role-based access control (admin/user/editor)
- ✅ Attraction parameter preservation across flows
- ✅ Processing state indicators
- ✅ Seamless user experience

All components work together to provide a complete, secure, and user-friendly authentication system for the Reog Ponorogo booking platform!
