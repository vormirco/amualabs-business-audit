# 🔍 Business Audit Tool - Amualabs

A comprehensive AI-powered business audit tool that analyzes websites across multiple dimensions and provides AI agent recommendations for revenue growth and cost savings.

## 🚀 Features

- **SEO Analysis**: Technical SEO, rankings, content strategy
- **Website Audit**: UX, performance, conversion optimization  
- **Business Analysis**: Market position, revenue streams, growth opportunities
- **Social Media Review**: LinkedIn, social presence, content strategy
- **Funding Research**: Investment history, valuations, funding opportunities
- **AI Agent Recommendations**: Custom AI solutions based on audit findings

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
cd /Users/ikaris/Desktop/Amualabs.com/tools
npm install
```

### 2. Configure API Key
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env and add your Perplexity API key
PERPLEXITY_API_KEY=your_actual_api_key_here
```

### 3. Start the Server
```bash
npm start
# Or for development with auto-reload:
npm run dev
```

### 4. Access the Tool
- **Web Interface**: http://localhost:3000/business-audit.html
- **API Endpoint**: POST http://localhost:3000/audit

## 📡 API Usage

### Audit Endpoint
```bash
curl -X POST http://localhost:3000/audit \
  -H "Content-Type: application/json" \
  -d '{"domain": "example.com"}'
```

### Response Format
```json
{
  "success": true,
  "audit": {
    "domain": "example.com",
    "timestamp": "2025-01-11T...",
    "seo": "SEO analysis content...",
    "website": "Website audit content...",
    "business": "Business analysis content...",
    "social": "Social media analysis...",
    "funding": "Funding research...",
    "agentRecommendations": "AI agent opportunities..."
  }
}
```

## 🧪 Testing

Run the test script to verify everything works:
```bash
npm test
```

This will test the audit functionality with a sample domain.

## 🔧 Customization

### Adding New Analysis Types
Edit `auditPrompts` in `business-audit-server.js`:
```javascript
const auditPrompts = {
  // Add new analysis type
  security: (domain) => `Analyze security aspects of ${domain}...`
};
```

### Modifying AI Agent Recommendations
Update the `generateAgentRecommendations` function to customize the AI agent suggestions based on your services.

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production (VPS)
```bash
# Copy files to VPS
scp -r * root@your-vps-ip:/root/tools/

# On VPS
npm install --production
pm2 start business-audit-server.js --name "business-audit"
```

## 📊 Usage Analytics

The tool logs audit requests and timing information. Monitor with:
```bash
# Check server logs
pm2 logs business-audit

# Monitor in real-time
tail -f audit.log
```

## 🔐 Security Notes

- API keys are stored server-side only
- All external API calls happen on the server
- Domain input is sanitized before processing
- CORS configured for specific origins only

## 🎯 Business Value

This tool serves as:
1. **Lead Generation**: Attracts potential clients with valuable audits
2. **Consultation Starting Point**: Provides data for sales conversations  
3. **AI Agent Sales Tool**: Shows specific automation opportunities
4. **Brand Authority**: Demonstrates AI expertise and business insight

## 📞 Support

For questions about the tool or AI agent implementations:
- Website: https://amualabs.com
- Contact: https://amualabs.com/contact

---

Built with ❤️ by Amualabs - AI Agents for Business Growth
