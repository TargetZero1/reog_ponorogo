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

async function checkLogoutButton() {
  try {
    console.log('\nChecking Profile page for logout button...\n');
    
    // Get home page (no auth required)
    const html = await request('GET', '/id/profile');
    
    // Check if logout button/form exists
    const hasLogoutButton = html.includes('logout') || html.includes('Logout') || html.includes('Keluar');
    const hasLogoutFunction = html.includes('post(route(\'logout\')') || html.includes('post(route("logout")');
    const hasRouteLogout = html.includes('"logout"');
    
    console.log('✓ Page loaded successfully');
    console.log(`✓ Contains "logout" text: ${hasLogoutButton}`);
    console.log(`✓ Has logout post function: ${hasLogoutFunction}`);
    console.log(`✓ Has route("logout") call: ${hasRouteLogout}`);
    
    // Look for the actual logout route in Ziggy
    const ziggyMatch = html.match(/"logout":"([^"]+)"/);
    if (ziggyMatch) {
      console.log(`✓ Ziggy route path: ${ziggyMatch[1]}`);
    } else {
      console.log(`✗ No logout route found in Ziggy`);
    }
    
    // Check bootstrap.ts was loaded
    const hasBootstrap = html.includes('route') || html.includes('Ziggy');
    console.log(`✓ Route helper loaded: ${hasBootstrap}`);
    
  } catch (err) {
    console.error('Error:', err.message);
  }
}

checkLogoutButton();
