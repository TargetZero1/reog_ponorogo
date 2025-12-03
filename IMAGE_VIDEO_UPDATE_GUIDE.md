# Image & Video Update Guide

## 🎥 YouTube Videos

### Current Status
VideoSection uses placeholder YouTube video IDs that need to be replaced.

### How to Update

1. **Find Reog Ponorogo YouTube Videos**
   - Search YouTube for "Reog Ponorogo" videos
   - Choose high-quality, official videos
   - Get the video ID from URL: `https://www.youtube.com/watch?v=VIDEO_ID_HERE`

2. **Update VideoSection.tsx**
   ```tsx
   // File: resources/js/Components/VideoSection.tsx
   // Line ~10-23
   
   const videos = [
     {
       id: 'VIDEO_ID_1', // Replace YOUR_YOUTUBE_VIDEO_ID_1
       title: 'Festival Reog Ponorogo 2024',
       description: 'Pertunjukan Pembukaan',
       thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_1/maxresdefault.jpg'
     },
     {
       id: 'VIDEO_ID_2', // Replace YOUR_YOUTUBE_VIDEO_ID_2
       title: 'Reog Ponorogo - Dadak Merak',
       description: 'Pertunjukan Tradisional',
       thumbnail: 'https://img.youtube.com/vi/VIDEO_ID_2/maxresdefault.jpg'
     }
   ];
   ```

3. **Example:**
   - Video URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
   - Video ID: `dQw4w9WgXcQ`
   - Thumbnail: `https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg`

---

## 🖼️ Images

### Current Status
Images are using Unsplash placeholders. Need to replace with actual Reog Ponorogo photos.

### Where Images Are Used

#### 1. Hero Section (`Hero.tsx`)
**Location:** Line ~10-23
**Current:** Unsplash Indonesian dance images
**Should be:** Reog Ponorogo performance photos

**Update:**
```tsx
const heroSlides = [
  {
    title: 'Reog Ponorogo',
    subtitle: 'Pesona Budaya dari Jawa Timur',
    description: '...',
    image: '/storage/images/reog-hero-1.jpg' // Replace with actual image
  },
  {
    title: 'Warisan Budaya',
    subtitle: 'UNESCO Cultural Heritage',
    description: '...',
    image: '/storage/images/reog-hero-2.jpg' // Replace with actual image
  }
];
```

#### 2. Gallery Section (`GallerySection.tsx`)
**Location:** Line ~9-52
**Current:** Unsplash cultural images
**Should be:** Reog Ponorogo photos (Dadak Merak, Warok, performances)

**Update:**
```tsx
const gallery = [
  {
    id: 1,
    image: '/storage/images/dadak-merak.jpg', // Replace
    title: 'Dadak Merak Megah',
    category: 'Pertunjukan',
    likes: 234
  },
  // ... more items
];
```

#### 3. Reog Section (`ReogSection.tsx`)
**Location:** Line ~56
**Current:** Unsplash cultural heritage image
**Should be:** High-quality Reog Ponorogo performance photo

**Update:**
```tsx
<ImageWithFallback
  src="/storage/images/reog-performance.jpg" // Replace
  alt="Reog Ponorogo"
  className="..."
/>
```

---

## 📁 Image Storage Options

### Option 1: Local Storage (Recommended for Development)
1. Upload images to `storage/app/public/images/`
2. Run: `php artisan storage:link`
3. Use URLs: `/storage/images/filename.jpg`

### Option 2: CDN/Cloud Storage
1. Upload to cloud storage (AWS S3, Cloudinary, etc.)
2. Use full URLs: `https://cdn.example.com/images/filename.jpg`

### Option 3: Public Folder
1. Upload to `public/images/`
2. Use URLs: `/images/filename.jpg`

---

## 🎨 Image Requirements

### Specifications
- **Hero Images:** 1920x1080px minimum, WebP or JPG
- **Gallery Images:** 1200x800px minimum, WebP or JPG
- **Thumbnails:** 400x300px, WebP or JPG
- **File Size:** Optimize to <500KB per image

### Content Guidelines
- Use actual Reog Ponorogo performance photos
- Show Dadak Merak masks prominently
- Include Warok performers
- Show traditional costumes and props
- High quality, well-lit photos
- Properly licensed/attributed

---

## 🔍 Finding Appropriate Images

### Sources for Reog Ponorogo Images:
1. **Official Sources:**
   - Ponorogo Tourism Office
   - Reog Ponorogo cultural organizations
   - Official festival documentation

2. **Stock Photos:**
   - Search "Reog Ponorogo" on stock photo sites
   - Ensure proper licensing

3. **Your Own Photos:**
   - Take photos at Reog performances
   - Document cultural events
   - Ensure permission from performers

---

## ✅ Quick Update Checklist

- [ ] Replace YouTube video IDs in VideoSection.tsx
- [ ] Test YouTube video preview and embed
- [ ] Upload Reog Ponorogo images to storage
- [ ] Update Hero section images
- [ ] Update Gallery section images
- [ ] Update Reog section image
- [ ] Verify all images load correctly
- [ ] Optimize image file sizes
- [ ] Test on different screen sizes

---

## 🚀 After Updates

1. Clear browser cache
2. Test all pages with new images/videos
3. Verify YouTube embeds work
4. Check image loading performance
5. Ensure mobile responsiveness

