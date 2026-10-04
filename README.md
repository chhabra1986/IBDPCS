# IB CS Paper Generator (first assessment 2027)

Students open the site, choose SL or HL and Python or Java, and generate Paper 1, Paper 2 or
topic tests with markschemes. They can upload scanned answers for AI feedback. Marking runs in
`api/mark.js`, which calls an OpenAI-compatible API (Gemini) using a key kept on the server.

## Files
- `index.html` – page layout and styles
- `app.js` – paper builder, rendering, downloads, feedback
- `data/core.js` – topics, markbands, discussion questions, helpers
- `data/mcq.js` – quick-check MCQs (topic tests only)
- `data/themeA.js` – Paper 1 Section A questions (A1–A4, with HL-only parts)
- `data/case.js` – Paper 1 Section B case-study style questions
- `data/themeB.js` – Paper 2 SL questions (Python + Java)
- `data/themeB-hl.js` – Paper 2 HL-only questions (Python + Java)

## Vercel environment variables
- `CODECRAFT_API_KEY` – your Gemini API key (AI Studio)
- `CODECRAFT_BASE_URL` – `https://generativelanguage.googleapis.com/v1beta/openai`
- `CODECRAFT_MODEL` – e.g. `gemini-3.8-flash`

All model code answers (Python and Java) and SQL answers were tested before release.
