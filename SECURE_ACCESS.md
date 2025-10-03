# 🔐 SECURE API ACCESS GUIDE

## 🎯 **Never Share Keys Again - One-Time Setup**

### **1. Server-Side Security (VPS)**
```javascript
// ✅ SECURE - Server-side API calls only
const apiKey = process.env.HETZNER_API_KEY; // From environment
const response = await fetch('https://api.hetzner.cloud/v1/servers', {
  headers: { 'Authorization': `Bearer ${apiKey}` }
});
```

### **2. Client-Side Usage (Frontend)**
```javascript
// ✅ SECURE - Call your server, not APIs directly
const result = await fetch('/tools/hetzner-action', {
  method: 'POST',
  body: JSON.stringify({ action: 'list-servers' })
});
// Client never sees API keys
```

### **3. How to Add New API Keys**
```bash
# SSH to VPS once
ssh root@78.47.220.148

# Add to .env file
echo "OPENAI_API_KEY=your-new-key" >> /root/tools/.env

# Restart server
pm2 restart amualabs-tools
```

### **4. Access Pattern for Tools**
```
User Request → amualabs.com/tools/[tool] 
            → Cloudflare Pages Proxy 
            → Hetzner VPS (keys secured here)
            → External APIs
            → Response back to user
```

## 🛠️ **Tool Development Pattern**

### **Server Endpoint (VPS)**
```javascript
app.post('/tools/ai-generate', async (req, res) => {
  const apiKey = getApiKey('OPENAI'); // Secure helper
  // Your API logic here
  res.json({ result: 'processed securely' });
});
```

### **Frontend Usage**
```javascript
// Just call your endpoint
fetch('/tools/ai-generate', {
  method: 'POST',
  body: JSON.stringify({ prompt: userInput })
})
```

## 🔐 **Security Benefits**
- ✅ API keys never exposed to browsers
- ✅ No keys in client-side code
- ✅ All external API calls server-side
- ✅ One secure server, unlimited tools
- ✅ Add new keys without code changes

**Result: Build unlimited tools without sharing keys ever again!** 🚀
