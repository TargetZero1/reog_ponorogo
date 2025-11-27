# Checkout CORS Issue - Fixed

## Problem
Users encountered a CORS error when trying to submit the checkout form:
```
Access to XMLHttpRequest at 'https://wa.me/...' from origin 'http://127.0.0.1:8000' 
has been blocked by CORS policy
```

### Root Cause
The Checkout component was using **Inertia's `useForm()` hook with `.post()`**, which sends requests as XMLHttpRequest (AJAX). When the backend redirected to WhatsApp (`https://wa.me/...`), the browser blocked the cross-origin request due to CORS policy.

## Solution
Converted the Checkout form to use **standard HTML form submission** (`method="POST"`) instead of Inertia's `post()` method. This allows the browser to perform a **server-side redirect** without triggering CORS checks.

### Key Changes

#### Before (Using Inertia - ❌ CORS Error)
```tsx
import { useForm } from '@inertiajs/react';

const { data, setData, post, processing } = useForm({
  attraction: attraction || '',
  quantity: 1,
  total_price: pricePerTicket || 0,
  visit_date: '',
});

function submit(e: any) {
  e.preventDefault();
  post('/pesan-ticket/create');  // ❌ Sends XMLHttpRequest, causes CORS
}

return <form onSubmit={submit}>...</form>;
```

#### After (Standard Form - ✅ Server-side Redirect)
```tsx
import { useState, useRef } from 'react';

const [quantity, setQuantity] = useState(1);
const [visitDate, setVisitDate] = useState('');
const [processing, setProcessing] = useState(false);
const formRef = useRef<HTMLFormElement>(null);

function submit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if (!visitDate) {
    alert('Pilih tanggal kunjungan.');
    return;
  }
  setProcessing(true);
  formRef.current?.submit();  // ✅ Standard form submission
}

return (
  <form 
    ref={formRef} 
    onSubmit={submit} 
    method="POST" 
    action="/pesan-ticket/create"  // ✅ Direct server route
  >
    <input type="hidden" name="_token" value={csrf_token as string} />
    {/* form fields */}
  </form>
);
```

## Technical Details

**Why this works:**
1. Standard HTML form submission (not AJAX) bypasses CORS checks
2. Browser allows server-side redirects (HTTP 302)
3. User is redirected to WhatsApp directly
4. CSRF token included as hidden form field for security

**Preserved functionality:**
- ✅ Client-side validation (date picker, visit_date required)
- ✅ Live price calculation with reactive state
- ✅ Error display (server-side validation errors)
- ✅ Processing state visual feedback
- ✅ CSRF protection via hidden token
- ✅ Authentication check (redirects to login if not authenticated)

## Test Results

All tests passing (8/8):
- ✅ test_checkout_page_requires_authentication
- ✅ test_authenticated_user_can_view_checkout
- ✅ test_checkout_form_post_creates_ticket_and_redirects_to_whatsapp
- ✅ test_checkout_form_validates_required_fields
- ✅ test_checkout_form_validates_visit_date_must_be_future
- ✅ test_register_with_attraction_redirects_to_checkout
- ✅ test_existing_user_can_login_with_attraction_parameter
- ✅ test_authenticated_user_can_create_ticket

## How to Test

1. **Manual test via browser:**
   - Navigate to an event (e.g., Taman Wisata Ngembag)
   - Click "Pesan Tiket"
   - Login or register
   - Fill in quantity and visit date
   - Click "Pesan via WhatsApp"
   - Should redirect to WhatsApp directly (no CORS error in console)

2. **Run automated tests:**
   ```bash
   php artisan test tests/Feature/CheckoutFlowTest.php
   ```

## Files Modified

- `resources/js/Pages/Booking/Checkout.tsx`: Converted from Inertia `useForm()` to standard HTML form with React state
- `tests/Feature/CheckoutFlowTest.php`: Created comprehensive test suite for checkout flow

## Notes

- The backend (`BookingController::createTicket()`) remains unchanged
- CSRF token is automatically provided via Inertia's `usePage().props.csrf_token`
- Form is fully accessible and works without JavaScript (progressive enhancement)
- UX is identical to users, but underlying mechanism avoids CORS issues
