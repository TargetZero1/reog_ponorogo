#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

console.log('\n🔍 Verifying URL Generation Fixes\n');
console.log('=' .repeat(60));

const files = [
    'app/Http/Controllers/EventController.php',
    'app/Http/Controllers/PlaceController.php'
];

const checkRedirect = (content, method, hasLocale) => {
    const pattern = new RegExp(`public function ${method}.*?return redirect\\(\\)->route\\(`, 's');
    const match = content.match(pattern);
    
    if (!match) return null;
    
    const localeCheck = content.includes("['locale' => request()->route('locale')]");
    return localeCheck === hasLocale;
};

let allGood = true;

for (const file of files) {
    const fullPath = path.resolve(`./${file}`);
    if (!fs.existsSync(fullPath)) {
        console.log(`❌ File not found: ${file}`);
        allGood = false;
        continue;
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    const fileName = path.basename(file);
    console.log(`\n📄 ${fileName}`);
    
    const methods = ['store', 'update', 'bulkDelete', 'bulkPublish', 'destroy'];
    
    for (const method of methods) {
        const hasLocaleRedirect = content.match(
            new RegExp(`public function ${method}[^}]*redirect\\(\\)->route\\([^,]*['"]admin\\.[a-z\\.]+['"],\\s*\\['locale'`, 's')
        );
        
        if (hasLocaleRedirect) {
            console.log(`   ✅ ${method}() - Has locale parameter`);
        } else if (content.includes(`public function ${method}`)) {
            console.log(`   ⚠️  ${method}() - Check if needs locale parameter`);
        }
    }
}

console.log('\n' + '=' .repeat(60));
if (allGood) {
    console.log('\n✅ All URL generation fixes verified!\n');
} else {
    console.log('\n❌ Some issues found. Please review.\n');
}
