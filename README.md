# ThreadMatch — AI-Powered Adaptive Styling Engine

**Live Demo:** [View Live App on Vercel](https://thread-match.vercel.app/)
**[Backend API](https://threadmatch-production.up.railway.app/api/health)**

## Project Overview

**ThreadMatch** (formerly StyleAI) is a full-stack web application that helps users make smarter clothing decisions based on their body type, occasion, weather conditions, and personal style preferences. The goal is to simulate the decision-making process of a personal stylist while providing outfit recommendations in seconds through an intuitive and interactive user experience.

The project began as a deterministic, rules-based MVP to validate the core recommendation workflow. It has since evolved to integrate a live LLM (Groq's LLaMA 3.3 70B) that generates personalized, context-aware outfit recommendations with honest styling rationale — including flagging when selected items don't suit the chosen occasion and suggesting how to adapt them.

---

## Problem Statement

Many users struggle with outfit selection despite owning multiple clothing items. Common challenges include:

- Choosing outfits that fit a specific occasion
- Matching colors effectively
- Understanding which clothing silhouettes complement their body type
- Deciding what to wear based on weather conditions
- Lack of personalized styling guidance

Existing fashion applications focus primarily on shopping rather than helping users style what they already own. ThreadMatch focuses entirely on recommendation and outfit composition — not e-commerce.

---

## Product Vision

Create an intelligent styling assistant capable of:

- Understanding user preferences and daily vibe
- Understanding wardrobe selections and constraints
- Generating personalized, ranked outfit recommendations
- Explaining styling decisions in plain language
- Flagging inappropriate combinations and suggesting adaptations
- Adapting recommendations dynamically based on context

The long-term vision is a virtual stylist available on demand — one that knows your wardrobe, your body type, and your lifestyle.

---

## Architecture

```
Client (React + Vite + Tailwind)
    │
    ├── /questionnaire    — 4-step vibe/occasion/weather/body type flow
    ├── /wardrobe-builder — item + color picker across 6 clothing categories
    └── /recommendation   — AI-ranked outfit cards with styling explanations
            │
            └── POST /api/recommendations (JWT protected)
                    │
                    ├── Auth middleware verifies JWT
                    ├── Builds combinations from wardrobe selections
                    ├── Caps at 12 combinations (context window management)
                    └── Groq API → LLaMA 3.3 70B
                            └── Returns 3 ranked outfits with reasons + styling notes
```

---

## Features

### Authentication

- User registration and login
- JWT-based stateless authentication
- Secure password hashing with bcrypt (10 rounds)
- Protected routes — recommendation engine requires login

### User Profiling (Questionnaire)

Users provide context via a 4-step flow:

- **Vibe** — comfortable, bold, minimal, professional, playful, elegant
- **Occasion** — casual, work, formal, party, date night, outdoor
- **Weather** — hot, warm, mild, cold with temperature labels
- **Body type** — rectangle, pear, apple, hourglass, athletic
- **Free text** — optional ("I want cotton trousers today")

### Wardrobe Builder

Users select from 40+ clothing items across 6 categories:

- Tops (crew tee, v-neck, graphic tee, polo, full/half sleeve, oversized)
- Women's Tops (crop top, tank, blouse, camisole, tube top, peplum, wrap)
- Shirts (oxford, linen, flannel, denim, formal, camp collar)
- Bottoms (slim/straight/baggy jeans, chinos, cotton/linen trousers, cargo, shorts)
- Women's Bottoms (mini/midi/maxi/pencil/pleated skirt, wide leg, palazzo)
- Outerwear (blazer, suit jacket, denim jacket, bomber, trench, cardigan, hoodie)

Each item supports multi-color selection from a 12-color palette. The AI uses color context to make specific pairing recommendations.

### AI Recommendation Engine

- All selected items are combined and randomly sampled (capped at 12)
- Combinations sent to Groq (LLaMA 3.3 70B) with full user context
- AI ranks top 3 outfits, explaining why each works for the user's vibe, occasion, weather and body type
- **Occasion rules enforced** — the AI flags mismatches (e.g. camisole for formal occasion) and adds a `stylingNote` suggesting how to adapt rather than rejecting the user's choice
- Results displayed as 3 side-by-side cards with color swatches and styling tips

---

## Technical Decisions

**Why cap combinations at 12**
Selecting many items with multiple colors generates hundreds of combinations. Sending all of them overflows the model's context window and produces inconsistent output. Randomly sampling 12 keeps the prompt tight and the model focused.

**Why the AI flags mismatches instead of filtering items**
If a user selects a camisole, silently removing it defeats the purpose. Instead the AI adds a `stylingNote` — "Layer with a blazer to make this work-appropriate" — which is what a real stylist would do.

**Why `temperature: 0`**
Outfit recommendations need to be deterministic and JSON-parseable. Higher temperature causes the model to wrap output in markdown or add prose, breaking the parser.

**Why Groq instead of OpenAI**
OpenAI's free tier was removed. Groq offers free inference on LLaMA models with 14,400 requests/day. The API is structurally identical to OpenAI so switching is one line change.

---

## Stack

| Layer    | Choice                      | Why                             |
| -------- | --------------------------- | ------------------------------- |
| Frontend | React + Vite + Tailwind CSS | Fast dev, utility-first styling |
| Backend  | Node.js + Express (ESM)     | Lightweight, familiar           |
| Database | MongoDB + Mongoose          | Flexible schema                 |
| Auth     | JWT + bcryptjs              | Stateless, secure               |
| AI       | Groq API (LLaMA 3.3 70B)    | Free tier, fast inference       |

---

## Local Setup

```bash
git clone https://github.com/Lavanya-0105/ThreadMatch.git
cd threadmatch
```

**Backend** — create `server/.env`:

```
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret_here
GROQ_API_KEY=your_groq_key
GROQ_MODEL=llama-3.3-70b-versatile
PORT=5000
```

```bash
cd server && npm install && npm run dev
```

**Frontend:**

```bash
cd client && npm install && npm run dev
```

---

## Known Limitations

- **Model deprecation** — Groq deprecates models every 2-3 months. Update `GROQ_MODEL` in `.env` when this happens.
- **Combination cap** — Only 12 randomly sampled combinations are sent to the AI per request. Different runs may produce slightly different results from the same wardrobe — intentional for variety.
- **No wardrobe persistence** — Selections live in localStorage and clear on every session. Saved wardrobes are planned.

---

## Roadmap

- [ ] Upload wardrobe photos — AI identifies clothing items automatically
- [ ] Weather API integration — recommendations adapt to real-time forecast
- [ ] Saved wardrobes — persist clothing items per user in MongoDB
- [ ] Daily outfit push notifications
- [ ] Community outfit sharing
