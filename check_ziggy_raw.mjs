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

async function checkZiggy() {
  try {
    const html = await request('GET', '/id');
    
    // Look for Ziggy script
    const ziggyStart = html.indexOf('const Ziggy=');
    if (ziggyStart !== -1) {
      const fragment = html.substring(ziggyStart, ziggyStart + 2000);
      console.log('Ziggy found:');
      console.log(fragment);
    } else {
      console.log('Ziggy not found');
    }
    
  } catch (err) {
    console.error('Error:', err.message);
  }
}

checkZiggy();
