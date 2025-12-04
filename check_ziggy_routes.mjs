import http from 'http';

function request(method, path) {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:8000${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', reject);
  });
}

async function checkLogoutRoute() {
  try {
    console.log('\nChecking for logout route in Ziggy...\n');
    
    // Get home page
    const html = await request('GET', '/id');
    
    // Look for Ziggy in the HTML
    const ziggyMatch = html.match(/const Ziggy=({[^}]*"routes":[^}]*})/);
    if (ziggyMatch) {
      const ziggyStr = ziggyMatch[1];
      const hasLogout = ziggyStr.includes('"logout"');
      console.log('✓ Ziggy routes found');
      console.log(`✓ Has logout route: ${hasLogout}`);
      
      // Extract logout route
      const logoutMatch = ziggyStr.match(/"logout":"([^"]+)"/);
      if (logoutMatch) {
        console.log(`  Logout path: ${logoutMatch[1]}`);
      }
      
      // Show sample routes
      const routeMatches = ziggyStr.match(/"([a-z]+)":/g);
      if (routeMatches) {
        const uniqueRoutes = [...new Set(routeMatches.map(r => r.slice(1, -2)))].slice(0, 15);
        console.log(`  Sample routes: ${uniqueRoutes.join(', ')}`);
      }
    } else {
      console.log('✗ Ziggy routes not found in HTML');
      console.log('  Checking if page contains route definitions...');
      console.log(`  Page length: ${html.length} bytes`);
      console.log(`  Has "routes": ${html.includes('"routes"')}`);
    }
    
  } catch (err) {
    console.error('Error:', err.message);
  }
}

checkLogoutRoute();
