# Profile Picture Upload System

## Overview
Users can now upload and manage their profile pictures with a clean UI and automatic fallback to UserCircle icon when no picture is uploaded.

## Features

### 1. Database Structure
- **Migration**: `2025_12_04_191933_add_profile_picture_to_users_table.php`
- **Field**: `profile_picture` (string, nullable)
- **Storage**: `/public/images/profiles/`

### 2. User Interface (Profile Page)

**Location**: `resources/js/Pages/Profile.tsx`

**Components**:
- Circular profile preview (24x24 rounded-full)
- Upload button with Upload icon
- Change/Remove buttons when picture exists
- File validation: JPG, PNG, GIF (max 10MB)
- Gradient placeholder when no image

**Example**:
```tsx
{previewUrl ? (
  <img src={previewUrl} className="w-24 h-24 rounded-full object-cover" />
) : (
  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-100 to-amber-100">
    <User size={40} className="text-red-400" />
  </div>
)}
```

### 3. Navigation Display

**Location**: `resources/js/Components/ProfileDropdown.tsx`

**Behavior**:
- Shows uploaded image if `user.profile_picture` exists
- Falls back to UserCircle icon if no picture
- Maintains consistent sizing and styling
- Added ring-2 for better visibility

**Example**:
```tsx
{user?.profile_picture ? (
  <img src={user.profile_picture} className="w-full h-full object-cover" />
) : (
  <UserCircle size={24} />
)}
```

### 4. Backend Logic

**Location**: `routes/web.php` (profile.update route)

**Process**:
1. Validates uploaded image (max 10MB, jpeg/png/jpg/gif)
2. Deletes old profile picture if exists
3. Generates unique filename: `timestamp_username.extension`
4. Moves to `/public/images/profiles/`
5. Saves path to database: `/images/profiles/filename.jpg`

**Code**:
```php
if ($request->hasFile('profile_picture')) {
    // Delete old image
    if ($user->profile_picture && file_exists(public_path($user->profile_picture))) {
        unlink(public_path($user->profile_picture));
    }
    
    // Upload new image
    $image = $request->file('profile_picture');
    $filename = time() . '_' . str_replace(' ', '_', $user->name) . '.' . $image->getClientOriginalExtension();
    $image->move(public_path('images/profiles'), $filename);
    $user->profile_picture = '/images/profiles/' . $filename;
}
```

### 5. Form Submission

**Method**: POST with `_method: 'PUT'` (Laravel method spoofing)
- Required for file uploads via Inertia.js
- Uses `forceFormData: true` to ensure FormData encoding
- Same pattern as Events image upload

## User Flow

1. **Upload New Picture**:
   - Click "Upload Foto" button
   - Select image file
   - Preview appears instantly
   - Click "Save Changes" to upload
   - Picture appears in navbar immediately

2. **Change Existing Picture**:
   - Click "Ganti Foto" button
   - Select new image
   - Old image is automatically deleted
   - New image replaces it

3. **Remove Picture**:
   - Click "Hapus" button next to preview
   - Reverts to icon placeholder
   - Old file deleted from server

## Technical Details

- **Storage Directory**: `/public/images/profiles/`
- **Filename Format**: `{timestamp}_{sanitized_username}.{ext}`
- **Max File Size**: 10MB
- **Allowed Formats**: JPEG, PNG, JPG, GIF
- **Validation**: Server-side in profile.update route
- **Display**: Conditional rendering in ProfileDropdown and Profile page

## Navigation Alignment Fix

**Problem**: Text appearing "atas bawah" (misaligned vertically)

**Solution**: 
- Restructured Navbar.tsx with proper flex containers
- Added `whitespace-nowrap` to prevent text wrapping
- Separated admin section with border-left divider
- Ensured consistent vertical alignment with `items-center`

**Structure**:
```tsx
<div className="flex items-center space-x-1">
  {navLinks.map(link => (
    <button className="whitespace-nowrap">{link.label}</button>
  ))}
</div>
```

## Files Modified

1. **Frontend**:
   - `resources/js/Pages/Profile.tsx` - Upload UI with preview
   - `resources/js/Components/ProfileDropdown.tsx` - Conditional image/icon display
   - `resources/js/Components/Navbar.tsx` - Alignment improvements

2. **Backend**:
   - `database/migrations/2025_12_04_191933_add_profile_picture_to_users_table.php` - New migration
   - `app/Models/User.php` - Added 'profile_picture' to fillable
   - `routes/web.php` - Updated profile.update with image handling

3. **Storage**:
   - Created `/public/images/profiles/` directory

## Status
✅ **COMPLETED** - All features implemented and tested
- Profile picture upload working
- Navigation alignment fixed
- Icon placeholder functional
- Image deletion working
- Frontend rebuilt and deployed
