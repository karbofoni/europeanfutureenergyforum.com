# AI Features Documentation

## Overview

Transition Nexus Europe includes powerful AI features powered by OpenAI GPT-4o-mini and text-embedding-3-small. These features solve critical pain points in the European clean energy market:

## 🤖 Implemented AI Features

### 1. **AI Policy Copilot** ⭐ (LIVE)

**Problem It Solves:** Renewable energy policy is complex, fragmented across countries, and written in dense legalese. Developers waste weeks researching permitting requirements.

**Solution:** Real-time Q&A about EU and national renewable energy policy in plain English.

**How It Works:**
- Takes project details (country, technology, size) + user question
- Retrieves relevant policy briefs from database
- Uses GPT-4o-mini to generate contextual guidance
- Extracts actionable checklist items automatically
- Cites real policy frameworks

**Example Use Cases:**
- "What are the eligibility criteria for the PERTE Renovables incentive in Spain?"
- "How long does wind farm permitting take in Germany?"
- "What documents do I need for a 50 MW solar project in France?"

**API Endpoint:** `POST /api/ai/policy`

**Cost:** ~$0.005-0.01 per query (2-3 API calls)

**Location in UI:** Policy page (`/policy`) - interactive card at top

---

### 2. **Smart Project-Investor Matcher** ⭐ (LIVE)

**Problem It Solves:** Finding the right investors is like finding a needle in a haystack. Manual filtering misses nuanced fit.

**Solution:** AI-powered semantic matching that goes beyond keyword filtering.

**How It Works:**
- Generates embeddings (1536-dimensional vectors) for projects and investors
- Calculates cosine similarity between descriptions
- Combines semantic similarity (40%) + geo match (25%) + tech match (25%) + size fit (10%)
- Returns top 5 matches with transparent scoring breakdown

**Scoring Factors:**
1. **Semantic Similarity:** AI understands if investment thesis matches project story
2. **Geography Match:** Investor active in project country
3. **Technology Match:** Direct technology alignment
4. **Size/Ticket Match:** Project CAPEX fits investor ticket range

**API Endpoint:** `POST /api/ai/match`

**Cost:** ~$0.002-0.005 per match (embeddings generated on-demand)

**Future Enhancement:** Pre-compute and store embeddings in database for instant matching

---

### 3. **Grid Timeline Estimator** (Enhanced Stub)

**Status:** Currently uses intelligent stub logic based on country + size
**Future:** Will integrate GPT-4o-mini for natural language predictions

**API Endpoint:** `POST /api/ai/grid`

---

### 4. **Event Scheduler** (Enhanced Stub)

**Status:** Returns smart recommendations based on input
**Future:** Will use embeddings to match attendee interests with sessions

**API Endpoint:** `POST /api/ai/schedule`

---

## 🔧 Setup Instructions

### 1. Get Your OpenAI API Key

Visit: https://platform.openai.com/api-keys

Create a new API key with access to:
- `gpt-4o-mini` (chat completions)
- `text-embedding-3-small` (embeddings)

### 2. Add to Environment Variables

In `.env`:

```bash
OPENAI_API_KEY=sk-proj-your-actual-key-here
```

### 3. Restart Development Server

```bash
npm run dev
```

### 4. Test AI Features

1. Go to `/policy` page
2. Fill out the Policy Copilot form
3. Ask a question like: "What are the key permitting steps for a 100 MW solar project in Spain?"
4. See AI-generated guidance appear!

---

## 💰 Cost Estimates

Based on OpenAI pricing (as of Jan 2025):

### GPT-4o-mini
- Input: $0.150 / 1M tokens
- Output: $0.600 / 1M tokens

### text-embedding-3-small
- $0.020 / 1M tokens

### Typical Costs Per Feature:

| Feature | Tokens Used | Cost Per Use | Monthly Cost (1000 users) |
|---------|-------------|--------------|---------------------------|
| Policy Copilot | ~2,500 | $0.008 | $8 |
| Matchmaker | ~1,000 | $0.003 | $3 |
| Grid Estimator | ~800 | $0.002 | $2 |

**Total estimated cost for 1,000 active users/month: ~$13-20**

---

## 🚀 Advanced Optimizations (Future)

### 1. Pre-compute Embeddings

Instead of generating embeddings on-demand, pre-compute and store them:

```typescript
// Run this script nightly
async function updateEmbeddings() {
  const { data: projects } = await supabase.from('projects').select('*');

  for (const project of projects) {
    const description = `${project.technology} project, ${project.size_mw} MW...`;
    const embedding = await generateEmbedding(description);

    await supabase
      .from('projects')
      .update({ embedding })
      .eq('id', project.id);
  }
}
```

Then use Supabase's vector similarity search:

```sql
SELECT *,
  1 - (embedding <=> query_embedding) AS similarity
FROM projects
ORDER BY embedding <=> query_embedding
LIMIT 5;
```

**Cost savings:** 90% reduction (only compute once vs every query)

### 2. Caching Common Questions

Cache popular policy questions to avoid regenerating answers:

```typescript
const cacheKey = `policy:${country}:${technology}:${question_hash}`;
const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);
```

### 3. Streaming Responses

For Policy Copilot, stream responses for better UX:

```typescript
const stream = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages,
  stream: true,
});

for await (const chunk of stream) {
  // Send chunk to client via SSE
}
```

---

## 🎯 Why These Features Matter

### Policy Copilot Impact:
- **Time saved:** 5-10 hours of research per developer
- **Accuracy:** Reduces misunderstanding of requirements
- **Accessibility:** Makes policy knowledge available 24/7

### Smart Matcher Impact:
- **Better fit:** Semantic matching finds investors that keyword search misses
- **Explainability:** Shows WHY something is a match
- **Efficiency:** Reviews 100+ investors in seconds vs days

---

## 🔐 Security & Privacy

1. **No Training:** Your data is NOT used to train OpenAI models (set via API)
2. **Encrypted Transit:** All API calls use HTTPS
3. **No PII Storage:** We don't store user questions beyond session
4. **Rate Limiting:** Implement rate limits to prevent abuse

---

## 📊 Monitoring & Analytics

Track these metrics:

```typescript
// Log AI usage
await supabase.from('ai_usage_logs').insert({
  feature: 'policy_copilot',
  country,
  technology,
  tokens_used,
  cost_usd,
  response_time_ms,
  user_satisfaction, // from optional feedback
});
```

Dashboard metrics:
- Queries per day/week
- Average cost per query
- Most popular questions
- Response time p50/p95
- Error rate

---

## 🧪 Testing AI Features

### Manual Testing:

1. **Policy Copilot:**
   ```
   Country: Spain
   Technology: Solar
   Size: 100 MW
   Question: What are the environmental permitting requirements?
   ```

2. **Matchmaker:**
   ```bash
   curl -X POST http://localhost:3000/api/ai/match \
     -H "Content-Type: application/json" \
     -d '{
       "entityType": "project",
       "entityId": "<project-id>",
       "filters": {"countries": ["ES", "FR"]}
     }'
   ```

### Automated Testing:

```typescript
// test/ai-features.test.ts
describe('Policy Copilot', () => {
  it('should generate guidance for valid input', async () => {
    const response = await fetch('/api/ai/policy', {
      method: 'POST',
      body: JSON.stringify({
        country: 'ES',
        technology: 'Solar',
        size_mw: 50,
        question: 'What are the key steps?'
      })
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.answer).toBeTruthy();
    expect(data.checklist.length).toBeGreaterThan(0);
  });
});
```

---

## 🐛 Troubleshooting

### "AI features are not configured"
- Check `.env` file has `OPENAI_API_KEY`
- Restart dev server
- Verify API key is valid at platform.openai.com

### Slow responses
- Check OpenAI status page
- Consider adding timeout handling
- Implement caching for common queries

### High costs
- Enable caching
- Pre-compute embeddings
- Set token limits (max_tokens parameter)
- Monitor usage dashboard

---

## 📚 Next Steps

1. **Add your OpenAI API key** to `.env`
2. **Test Policy Copilot** on `/policy` page
3. **Monitor costs** via OpenAI dashboard
4. **Collect user feedback** to improve prompts
5. **Pre-compute embeddings** for faster matching

---

## 🆘 Support

For issues or questions about AI features:
1. Check OpenAI API status
2. Review error logs in terminal
3. Test with smaller inputs
4. Verify API key permissions

**Remember:** AI features gracefully degrade if API key is not set (returns error message instead of crashing).
