// Test script for the business audit tool
const axios = require('axios');

async function testAudit() {
  const testDomain = 'stripe.com'; // Using a well-known company for testing
  
  console.log(`🧪 Testing business audit for: ${testDomain}`);
  console.log('📡 Starting audit request...\n');

  try {
    const startTime = Date.now();
    
    const response = await axios.post('http://localhost:3000/audit', {
      domain: testDomain
    }, {
      timeout: 120000 // 2 minutes timeout
    });

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    if (response.data.success) {
      console.log(`✅ Audit completed successfully in ${duration}s`);
      console.log('\n📊 Audit Results Summary:');
      console.log(`- Domain: ${response.data.audit.domain}`);
      console.log(`- Timestamp: ${response.data.audit.timestamp}`);
      console.log(`- SEO Analysis: ${response.data.audit.seo.length} characters`);
      console.log(`- Website Audit: ${response.data.audit.website.length} characters`);
      console.log(`- Business Analysis: ${response.data.audit.business.length} characters`);
      console.log(`- Social Media: ${response.data.audit.social.length} characters`);
      console.log(`- Funding Info: ${response.data.audit.funding.length} characters`);
      console.log(`- AI Agent Recommendations: ${response.data.audit.agentRecommendations.length} characters`);
      
      // Show a preview of SEO analysis
      console.log('\n🔍 SEO Analysis Preview:');
      console.log(response.data.audit.seo.substring(0, 200) + '...');
      
      console.log('\n🤖 AI Agent Recommendations Preview:');
      console.log(response.data.audit.agentRecommendations.substring(0, 300) + '...');
      
    } else {
      console.log('❌ Audit failed:', response.data);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

// Check if server is running first
async function checkServer() {
  try {
    const response = await axios.get('http://localhost:3000/');
    console.log('✅ Server is running:', response.data.status);
    return true;
  } catch (error) {
    console.log('❌ Server not running. Please start with: npm start');
    console.log('   Make sure to add your PERPLEXITY_API_KEY to .env file');
    return false;
  }
}

async function runTest() {
  console.log('🚀 Business Audit Tool Test\n');
  
  const serverRunning = await checkServer();
  if (serverRunning) {
    await testAudit();
  }
}

runTest();
