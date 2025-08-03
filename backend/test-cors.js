const axios = require('axios');

// Test CORS configuration
async function testCORS() {
  const baseURL = 'https://report-backend-nu.vercel.app';
  
  console.log('Testing CORS configuration...');
  
  try {
    // Test OPTIONS request (preflight)
    console.log('\n1. Testing OPTIONS request (preflight)...');
    const optionsResponse = await axios.options(`${baseURL}/api/users/login`, {
      headers: {
        'Origin': 'https://islamic-report-app-ftxa.vercel.app',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type, Authorization'
      }
    });
    console.log('✅ OPTIONS request successful:', optionsResponse.status);
    console.log('CORS headers:', {
      'Access-Control-Allow-Origin': optionsResponse.headers['access-control-allow-origin'],
      'Access-Control-Allow-Methods': optionsResponse.headers['access-control-allow-methods'],
      'Access-Control-Allow-Headers': optionsResponse.headers['access-control-allow-headers'],
      'Access-Control-Allow-Credentials': optionsResponse.headers['access-control-allow-credentials']
    });
    
    // Test actual POST request
    console.log('\n2. Testing POST request...');
    const postResponse = await axios.post(`${baseURL}/api/users/login`, {
      email: 'test@example.com',
      password: 'testpassword'
    }, {
      headers: {
        'Origin': 'https://islamic-report-app-ftxa.vercel.app',
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ POST request successful:', postResponse.status);
    
  } catch (error) {
    console.error('❌ CORS test failed:', error.response?.status, error.response?.data);
    console.error('Error details:', error.message);
  }
}

// Test with different origins
async function testMultipleOrigins() {
  const baseURL = 'https://report-backend-nu.vercel.app';
  const origins = [
    'https://islamic-report-app-ftxa.vercel.app',
    'http://localhost:3000',
    'http://127.0.0.1:3000'
  ];
  
  console.log('\nTesting multiple origins...');
  
  for (const origin of origins) {
    try {
      const response = await axios.options(`${baseURL}/api/users/login`, {
        headers: {
          'Origin': origin,
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'Content-Type, Authorization'
        }
      });
      console.log(`✅ Origin ${origin}: ${response.status}`);
    } catch (error) {
      console.log(`❌ Origin ${origin}: ${error.response?.status || 'Failed'}`);
    }
  }
}

// Run tests
testCORS().then(() => {
  return testMultipleOrigins();
}).catch(console.error); 