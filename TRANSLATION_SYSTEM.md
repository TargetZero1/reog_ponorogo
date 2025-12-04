# Translation System - Reog Ponorogo

## Overview
The application now supports **bilingual content** stored directly in the database. Each event and place can have both **Indonesian (default)** and **English** translations without code duplication.

## How It Works

### Database Structure
New fields added to support translations:

**Events Table:**
- `title` (Indonesian - required)
- `title_en` (English - optional)
- `description` (Indonesian)
- `description_en` (English - optional)
- `location` (Indonesian)
- `location_en` (English - optional)

**Places Table:**
- `name` (Indonesian - required)
- `name_en` (English - optional)
- `description` (Indonesian)
- `description_en` (English - optional)
- `location` (Indonesian)
- `location_en` (English - optional)
- `category` (Indonesian)
- `category_en` (English - optional)

### How to Add Translations

#### When Creating/Editing Events:
1. Fill in Indonesian fields (required) - these are the default
2. Optionally fill in English fields with `_en` suffix
3. If English field is empty, Indonesian version will be shown to English users

#### Example:
```
Title (Indonesia): Wayang Kulit Malam
Title (English): Traditional Shadow Puppet Performance

Description (Indonesia): Pertunjukan wayang kulit tradisional Ponorogo dengan dalang berpengalaman...
Description (English): Traditional shadow puppet performance from Ponorogo with experienced puppeteer...

Location (Indonesia): Alun-alun Ponorogo
Location (English): Ponorogo Town Square
```

### Frontend Implementation
The frontend automatically detects user language (`/id/` or `/en/`) and:
1. Checks if English field (`*_en`) exists and has content
2. If yes → shows English version
3. If no → falls back to Indonesian version

### Benefits
✅ **Simple**: Just fill in extra fields when creating content
✅ **Efficient**: No duplicate database records
✅ **Flexible**: Can translate some content and leave others in Indonesian
✅ **Automatic**: Frontend automatically picks correct language
✅ **No Code Changes**: Works immediately after migration

### Admin Interface
Events Edit page now shows:
- **Judul Event (Indonesia)** - Required main field
- **Title (English)** - Optional translation field
- **Deskripsi (Indonesia)** - Main description
- **Description (English)** - Optional translation
- **Lokasi (Indonesia)** - Main location
- **Location (English)** - Optional translation

## Migration Applied
✅ Migration completed: `2025_12_04_190255_add_translation_fields_to_events_and_places_tables.php`
- Added 3 fields to `events` table
- Added 4 fields to `places` table
- All fields nullable (optional)
- Existing data unaffected

## Next Steps
1. Edit existing events/places to add English translations
2. New content can be created with both languages from the start
3. English users will see professional translated content
4. Indonesian users see original content

## Technical Details
- **Models Updated**: Event.php, Place.php (fillable arrays)
- **Frontend Updated**: Events/Show.tsx, TempatWisata.tsx (locale detection)
- **Admin Forms Updated**: Events/Edit.tsx (translation input fields)
- **Zero Downtime**: Existing content works without changes
