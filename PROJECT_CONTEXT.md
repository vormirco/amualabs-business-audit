# AMUALABS TOOLS PROJECT CONTEXT

## 🎯 Project Overview
**Main Site**: https://b393cc17.amualabs.pages.dev (latest deployment)  
**Tools Endpoint**: `/tools/*` → Proxied to Hetzner VPS  
**Goal**: Build micro tools with API/LLM integrations hosted on main domain

## 🌐 Infrastructure Setup

### **Cloudflare Pages Configuration**
- **Main Site**: Deployed on Cloudflare Pages
- **Proxy Setup**: `_redirects` file routes `/tools/*` to VPS
- **Latest Deploy**: https://b393cc17.amualabs.pages.dev

### **Hetzner VPS Configuration**
- **IP**: `78.47.220.148`
- **Port**: `3000`
- **API Key**: `pXmZ7npwq2mbssk7A59U9gu7CD5FV5mVv3WZNbXthxOpGnMFkDe595NVfmnd5xlW`
- **Server**: Node.js + Express
- **Process Manager**: PM2

### **Routing Configuration**
```
_redirects file:
/tools/* http://78.47.220.148:3000/:splat 200
/api/* http://78.47.220.148:3000/api/:splat 200
```

## 🛠️ Tools Server Structure

### **VPS Server Setup** (`server.js`)
```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'AMUALABS Tools Server Running', timestamp: new Date() });
});

// Tools routes
app.get('/tools', (req, res) => {
  res.json({ message: 'Tools API Ready', tools: [] });
});
```

### **🔐 Secure Environment Variables**
```bash
# Server-side only (.env file on VPS)
HETZNER_API_KEY=pXmZ7npwq2mbssk7A59U9gu7CD5FV5mVv3WZNbXthxOpGnMFkDe595NVfmnd5xlW
PORT=3000
NODE_ENV=production
# Add more as needed:
# OPENAI_API_KEY=your-key
# ANTHROPIC_API_KEY=your-key
```

### **🛡️ Security Model**
- ✅ API keys stored server-side only (never in client code)
- ✅ All API calls happen on VPS server
- ✅ Client calls your server endpoints, not external APIs directly
- ✅ CORS restricted to amualabs.com domains only
- ✅ Environment file secured with chmod 600

## 🚀 Deployment Status

### **Main Website Components**
- ✅ **Homepage**: Terminal hero + bento process grid
- ✅ **About Page**: Team card hero + beliefs section
- ✅ **Work Page**: Portfolio bento grids
- ✅ **AI Agents Page**: Service details
- ✅ **Components**: Protected components system created
- ✅ **Animations**: Colorful bento grids with permanent borders

### **Protected Components Created**
1. `components/sections/hero-homepage.php` - 🔒 LOCKED
2. `components/sections/hero-about.php` - 🔒 LOCKED  
3. `components/sections/process-bento-grid.php` - 🔒 LOCKED

### **Tools Infrastructure**
- ✅ **Proxy Routing**: Cloudflare Pages → Hetzner VPS
- ✅ **VPS Setup Script**: Ready to deploy
- ⏳ **Server Deployment**: Pending execution
- ⏳ **Micro Tools**: Ready to build

## 🔧 Next Steps for Tools Development

### **1. Deploy Server to VPS**
```bash
bash vps-setup.sh
```

### **2. Test Routing**
```bash
curl https://your-domain.com/tools/
# Should return: { "status": "AMUALABS Tools Server Running" }
```

### **3. Build Micro Tools**
- API integrations with secured keys
- LLM-powered tools
- Utility functions
- Data processing tools

### **4. Tool Categories to Build**
- **AI/LLM Tools**: Text processing, content generation
- **API Tools**: Data fetching, webhook handlers
- **Utility Tools**: Converters, calculators, validators
- **Integration Tools**: CRM connectors, automation helpers

## 📁 Project File Structure
```
/Users/ikaris/Desktop/Amualabs.com/
├── php-site/                    # Main website
│   ├── _redirects              # Cloudflare routing config
│   ├── components/             # Protected website components
│   ├── index.html              # Homepage
│   ├── about.html              # About page
│   └── styles.css              # Main styles
├── tools/                      # Tools development
│   └── PROJECT_CONTEXT.md      # This file
├── vps-setup.sh               # Server deployment script
└── hetzener.txt               # Server credentials
```

## 🛡️ Security Notes
- API keys stored in VPS environment variables
- Hetzner credentials in local file only
- All API calls server-side for security
- CORS configured for main domain only

## 🎯 Current Objective
**Build micro tools accessible via `https://amualabs.com/tools/[tool-name]`** with full API/LLM integration capabilities using the secured Hetzner infrastructure.

---
**Last Updated**: 2025-01-11  
**Status**: Infrastructure ready, server deployment pending  
**Next**: Deploy tools server and build first micro tool
