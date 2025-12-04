# Event & Place Image Suggestions

## How to Add Images to Events/Places

### Method 1: Admin Panel (Recommended)
1. Go to Admin → Events → Create/Edit
2. Click "Choose Image" button
3. Upload an image from your computer
4. Image will be automatically saved to `/public/images/events/`

### Method 2: Direct URL Assignment
Add images directly to database with image URLs from Unsplash or Pexels.

---

## Suggested Images for Events

### 1. Wayang Kulit Malam (Shadow Puppet Performance)
**Search Terms:** "wayang kulit", "shadow puppet", "javanese puppet"
**Unsplash URLs:**
- https://images.unsplash.com/photo-1545128485-c400e7702796?w=1200
- https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200
- https://source.unsplash.com/1200x800/?wayang,puppet,indonesia

**Alternative:** Search "wayang kulit" on Pexels.com and download

---

### 2. Pertunjukan Gambyong (Traditional Dance)
**Search Terms:** "javanese dance", "traditional dance indonesia", "gamelan"
**Unsplash URLs:**
- https://images.unsplash.com/photo-1555424965-48f87a6a14fd?w=1200
- https://images.unsplash.com/photo-1546551299-33284e0e6906?w=1200
- https://source.unsplash.com/1200x800/?javanese,dance,traditional

---

### 3. Festival Seni dan Budaya Ponorogo
**Search Terms:** "indonesian festival", "cultural festival", "reog ponorogo"
**Unsplash URLs:**
- https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200
- https://images.unsplash.com/photo-1546551299-33284e0e6906?w=1200
- https://source.unsplash.com/1200x800/?festival,indonesia,culture

---

### 4. Kunjungan Budaya Pelajar (Educational Cultural Visit)
**Search Terms:** "school cultural visit", "students traditional", "learning culture"
**Unsplash URLs:**
- https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200
- https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200
- https://source.unsplash.com/1200x800/?students,culture,education

---

### 5. Konser Musik Tradisional Gamelan
**Search Terms:** "gamelan", "traditional music indonesia", "javanese music"
**Unsplash URLs:**
- https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200
- https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200
- https://source.unsplash.com/1200x800/?gamelan,music,indonesia

---

### 6. Pertunjukan Topeng Ireng (Mask Dance)
**Search Terms:** "indonesian mask dance", "traditional mask", "javanese mask"
**Unsplash URLs:**
- https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200
- https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200
- https://source.unsplash.com/1200x800/?mask,dance,traditional

---

## Suggested Images for Tourist Places

### 1. Telaga Ngebel (Mountain Lake)
**Search Terms:** "mountain lake indonesia", "volcanic lake", "lake scenery"
**Unsplash URLs:**
- https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200
- https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200
- https://source.unsplash.com/1200x800/?lake,mountain,indonesia

---

### 2. Candi Sukuh (Ancient Temple)
**Search Terms:** "ancient temple indonesia", "javanese temple", "hindu temple"
**Unsplash URLs:**
- https://images.unsplash.com/photo-1548013146-72479768bada?w=1200
- https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200
- https://source.unsplash.com/1200x800/?temple,indonesia,ancient

---

### 3. Museum Reog Ponorogo
**Search Terms:** "museum indonesia", "cultural museum", "traditional museum"
**Unsplash URLs:**
- https://images.unsplash.com/photo-1566127444977-b8a8a5c87e15?w=1200
- https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=1200
- https://source.unsplash.com/1200x800/?museum,culture,indonesia

---

### 4. Taman Wisata Ngembag (Nature Park)
**Search Terms:** "nature park indonesia", "tropical garden", "green park"
**Unsplash URLs:**
- https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200
- https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200
- https://source.unsplash.com/1200x800/?park,nature,tropical

---

### 5. Alun-alun Ponorogo (Town Square)
**Search Terms:** "town square indonesia", "city plaza", "public square"
**Unsplash URLs:**
- https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200
- https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200
- https://source.unsplash.com/1200x800/?plaza,square,indonesia

---

### 6. Air Terjun Pletuk (Waterfall)
**Search Terms:** "waterfall indonesia", "tropical waterfall", "jungle waterfall"
**Unsplash URLs:**
- https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1200
- https://images.unsplash.com/photo-1508080472319-cbf45de18dbb?w=1200
- https://source.unsplash.com/1200x800/?waterfall,indonesia,tropical

---

### 7. Gunung Bayangkaki (Mountain)
**Search Terms:** "mountain indonesia", "volcano indonesia", "mountain landscape"
**Unsplash URLs:**
- https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200
- https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200
- https://source.unsplash.com/1200x800/?mountain,volcano,indonesia

---

## Quick Download Script (Optional)

For bulk downloading, you can use this PowerShell script:

```powershell
# Download sample images
$events = @{
    "wayang-kulit" = "https://images.unsplash.com/photo-1545128485-c400e7702796?w=1200"
    "gambyong" = "https://images.unsplash.com/photo-1555424965-48f87a6a14fd?w=1200"
    "festival" = "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200"
}

foreach ($event in $events.GetEnumerator()) {
    $fileName = "public/images/events/$($event.Key).jpg"
    Invoke-WebRequest -Uri $event.Value -OutFile $fileName
    Write-Host "Downloaded: $fileName"
}
```

---

## Free Image Sources

### Recommended Sites (No Attribution Required):
1. **Unsplash.com** - High-quality free photos
2. **Pexels.com** - Free stock photos
3. **Pixabay.com** - Free images and videos

### Search Terms for Reog Ponorogo:
- "reog ponorogo"
- "traditional javanese dance"
- "indonesian cultural performance"
- "wayang kulit"
- "gamelan"
- "javanese mask"
- "indonesian festival"

---

## Admin Usage Instructions

1. **Create Event:**
   - Go to `/id/admin/events/create` or `/en/admin/events/create`
   - Fill in event details (Indonesian + English)
   - Click "Choose Image" and upload
   - Click Save

2. **Edit Event:**
   - Go to `/id/admin/events`
   - Click Edit on any event
   - Click "Change Image" to replace existing image
   - Click Save

3. **Image Guidelines:**
   - Format: JPG, PNG, GIF
   - Max Size: 10MB
   - Recommended: 1200x800px
   - Aspect Ratio: 16:9 or 3:2

---

## Database Image Path

Images are stored at:
- **Events:** `/public/images/events/`
- **Places:** `/public/images/places/`

Database field: `image_path` (e.g., `/images/events/1733456789_wayang-kulit-malam.jpg`)
