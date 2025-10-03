const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static('public'));

// Secure API key helper
const getPerplexityKey = () => {
  const key = process.env.PERPLEXITY_API_KEY;
  if (!key) throw new Error('Perplexity API key not configured');
  return key;
};

// Perplexity API helper
async function callPerplexity(prompt, model = 'llama-3.1-sonar-small-128k-online') {
  try {
    const response = await axios.post('https://api.perplexity.ai/chat/completions', {
      model: model,
      messages: [
        {
          role: 'system',
          content: 'You are a professional business analyst providing comprehensive audits. Be thorough, specific, and actionable in your analysis.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 4000,
      temperature: 0.2
    }, {
      headers: {
        'Authorization': `Bearer ${getPerplexityKey()}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Perplexity API Error:', error.response?.data || error.message);
    throw new Error('Failed to get audit analysis');
  }
}

// Business audit prompts
const auditPrompts = {
  seo: (domain) => `
    Analyze the SEO performance of ${domain}. Include:
    - Current search rankings and visibility
    - Technical SEO issues (speed, mobile, structure)
    - Content quality and keyword strategy
    - Backlink profile analysis
    - Local SEO performance (if applicable)
    - Competitor comparison
    - Specific improvement recommendations with priority levels
  `,
  
  website: (domain) => `
    Conduct a comprehensive website audit for ${domain}. Analyze:
    - User experience and design quality
    - Site speed and performance metrics
    - Mobile responsiveness
    - Conversion optimization opportunities
    - Content effectiveness
    - Technical issues and bugs
    - Security and accessibility
    - Specific recommendations for improvement
  `,
  
  business: (domain) => `
    Perform a business analysis for the company at ${domain}. Research:
    - Business model and revenue streams
    - Market position and competitive landscape
    - Target audience and customer segments
    - Value proposition analysis
    - Pricing strategy assessment
    - Growth opportunities and challenges
    - Financial health indicators (if publicly available)
    - Strategic recommendations
  `,
  
  social: (domain) => `
    Analyze the digital presence and social media strategy for ${domain}. Include:
    - LinkedIn company page performance and engagement
    - Other social media presence (Twitter, Facebook, Instagram)
    - Content marketing effectiveness
    - Brand consistency across platforms
    - Employee advocacy and thought leadership
    - Social media ROI and engagement metrics
    - Recommendations for improvement
  `,
  
  funding: (domain) => `
    Research the funding and investment status of ${domain}. Find:
    - Recent funding rounds and investors
    - Total capital raised to date
    - Valuation history and growth
    - Key investors and strategic partners
    - Funding stage and maturity
    - Comparison with industry peers
    - Future funding needs and opportunities
  `
};

// AI Agent recommendations based on audit
const generateAgentRecommendations = (auditData, domain) => {
  return `
Based on the audit findings for ${domain}, here are AI agent opportunities from Amualabs that could drive revenue growth or cost savings:

## REVENUE GENERATION AGENTS

🤖 **SEO Content Agent**
- Automate content creation based on keyword gaps identified
- Generate meta descriptions, title tags, and schema markup
- ROI: 25-40% increase in organic traffic within 3 months

🤖 **Lead Generation Agent** 
- Qualify website visitors using the conversion gaps found
- Personalize outreach based on user behavior analysis
- ROI: 30-50% improvement in lead conversion rates

🤖 **Social Media Agent**
- Automate LinkedIn content and engagement strategy
- Generate industry-specific posts and thought leadership content
- ROI: 20-35% increase in social media qualified leads

## COST REDUCTION AGENTS

🤖 **Customer Support Agent**
- Handle common inquiries identified from website analysis
- Reduce support ticket volume by 40-60%
- Cost Savings: $2,000-$8,000/month in support staff

🤖 **Content Audit Agent**
- Continuously monitor and optimize website content
- Automate technical SEO improvements
- Cost Savings: $3,000-$5,000/month vs hiring SEO specialist

🤖 **Competitive Intelligence Agent**
- Monitor competitor pricing, features, and marketing strategies
- Provide real-time market positioning insights
- ROI: 15-25% improvement in competitive response time

## IMPLEMENTATION PRIORITY
1. **Quick Wins** (1-2 weeks): Customer Support + SEO Content Agents
2. **Growth Focus** (1-2 months): Lead Generation + Social Media Agents  
3. **Strategic** (2-3 months): Competitive Intelligence Agent

**Next Steps**: Schedule a free 30-minute strategy call to discuss which agents would deliver the highest ROI for your specific situation.

Contact: https://amualabs.com/contact
  `;
};

// Main audit endpoint
app.post('/audit', async (req, res) => {
  try {
    const { domain } = req.body;
    
    if (!domain) {
      return res.status(400).json({ error: 'Domain is required' });
    }

    console.log(`Starting audit for: ${domain}`);

    // Run all audits in parallel for speed
    const auditResults = await Promise.allSettled([
      callPerplexity(auditPrompts.seo(domain)),
      callPerplexity(auditPrompts.website(domain)),
      callPerplexity(auditPrompts.business(domain)),
      callPerplexity(auditPrompts.social(domain)),
      callPerplexity(auditPrompts.funding(domain))
    ]);

    // Process results
    const audit = {
      domain,
      timestamp: new Date().toISOString(),
      seo: auditResults[0].status === 'fulfilled' ? auditResults[0].value : 'Analysis failed',
      website: auditResults[1].status === 'fulfilled' ? auditResults[1].value : 'Analysis failed', 
      business: auditResults[2].status === 'fulfilled' ? auditResults[2].value : 'Analysis failed',
      social: auditResults[3].status === 'fulfilled' ? auditResults[3].value : 'Analysis failed',
      funding: auditResults[4].status === 'fulfilled' ? auditResults[4].value : 'Analysis failed'
    };

    // Generate AI agent recommendations
    audit.agentRecommendations = generateAgentRecommendations(audit, domain);

    console.log(`Audit completed for: ${domain}`);
    res.json({ success: true, audit });

  } catch (error) {
    console.error('Audit Error:', error.message);
    res.status(500).json({ 
      error: 'Audit failed', 
      message: error.message 
    });
  }
});

// Health check
app.get('/', (req, res) => {
  res.json({ 
    status: 'Business Audit Tool Running',
    endpoint: '/audit',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🔍 Business Audit Tool running on port ${PORT}`);
  console.log(`📊 Ready to audit websites and generate AI agent recommendations`);
});

module.exports = app;
