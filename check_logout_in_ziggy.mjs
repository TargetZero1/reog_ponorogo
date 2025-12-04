import http from 'http';

http.get('http://127.0.0.1:8000/id', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const hasLogout = data.includes('"logout"');
    console.log(`Has "logout" in Ziggy: ${hasLogout}`);
    
    if (hasLogout) {
      const logoutMatch = data.match(/"logout":({[^}]+})/);
      if (logoutMatch) {
        console.log(`Logout route: ${logoutMatch[1]}`);
      }
    } else {
      // Check what routes are there
      const routeMatches = data.match(/"([a-z_\.]+)":/g);
      if (routeMatches) {
        const routes = [...new Set(routeMatches.map(r => r.slice(1, -2)))];
        console.log(`\nTotal routes: ${routes.length}`);
        console.log('Routes:');
        routes.forEach(r => console.log(`  - ${r}`));
      }
    }
  });
}).on('error', (e) => console.error(e.message));
