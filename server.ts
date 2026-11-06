import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Helper to check if a valid Gemini API key is configured
const hasValidGeminiKey = (): boolean => {
  const key = process.env.GEMINI_API_KEY;
  return Boolean(key && key.trim() !== '' && key !== 'MY_GEMINI_API_KEY');
};

// Helper to run promise with timeout
const withTimeout = <T>(promise: Promise<T>, timeoutMs = 6000): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('AI request timed out')), timeoutMs)
    ),
  ]);
};

// AI Recommendation Route
app.post('/api/ai/recommendations', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { userPreferences, watchedTitles, mood, catalogSummary } = req.body || {};

  const defaultRecommendations = [
    {
      title: "Tears of Steel",
      matchScore: 98,
      reason: "An extraordinary cyberpunk short set in dystopian Amsterdam blending live-action with breathtaking visual effects and robotic tentacles.",
      moodFit: "Cyberpunk Thriller",
      keyThemes: ["Dystopia", "Sci-Fi", "VFX Masterpiece"]
    },
    {
      title: "Metropolis",
      matchScore: 96,
      reason: "Fritz Lang's legendary 1927 masterpiece that pioneered modern science-fiction cinema with awe-inspiring German Expressionism.",
      moodFit: "Philosophical Sci-Fi",
      keyThemes: ["Class Struggle", "Futurism", "Visionary Architecture"]
    },
    {
      title: "Night of the Living Dead",
      matchScore: 93,
      reason: "George A. Romero's suspenseful classic that redefined the thriller and horror genre with claustrophobic atmosphere and social commentary.",
      moodFit: "Suspense & Tension",
      keyThemes: ["Survival", "Mystery", "Cult Classic"]
    },
    {
      title: "Cosmos Laundromat",
      matchScore: 91,
      reason: "Blender Foundation's surreal, visually mesmerizing tale exploring life, identity, and wildly imaginative parallel dimensions.",
      moodFit: "Surreal Adventure",
      keyThemes: ["Existential Drama", "Stunning Animation", "Whimsical"]
    }
  ];

  if (!hasValidGeminiKey()) {
    return res.status(200).json({
      fallback: true,
      recommendations: defaultRecommendations
    });
  }

  try {
    const prompt = `You are CineVerse AI, an elite film scholar and movie recommender.
User's preferences: ${userPreferences || 'Open to all cinematic masterpieces'}
Mood/Vibe requested: ${mood || 'Exciting, thought-provoking'}
Recently enjoyed movies: ${Array.isArray(watchedTitles) ? watchedTitles.join(', ') : 'Eclectic cinema'}

Here is a subset of available titles in our legal streaming & download catalog:
${catalogSummary || 'Classic cinema, Sci-Fi, Open Movies, Film Noir, Horror, Animation'}

Based on this, return a JSON response containing an array of 4 tailored movie recommendations.
For each recommendation, provide:
- title: string
- matchScore: number (between 85 and 99)
- reason: string (1-2 sentences explaining why this matches their taste and mood)
- moodFit: string (e.g. "Mind-Bending", "Adrenaline Rush", "Nostalgic Atmosphere", "Visual Feast")
- keyThemes: array of 3 strings

Output valid JSON only matching this schema without markdown fences:
{
  "recommendations": [
    {
      "title": "Movie Title",
      "matchScore": 95,
      "reason": "Why the user will enjoy it based on their mood and history",
      "moodFit": "Vibe label",
      "keyThemes": ["theme1", "theme2", "theme3"]
    }
  ]
}`;

    const response = await withTimeout(
      ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      }),
      6000
    );

    const text = response.text || '{}';
    const json = JSON.parse(text);
    return res.json(json);
  } catch (error: any) {
    console.error('Error or timeout generating AI recommendations:', error.message || error);
    return res.status(200).json({
      fallback: true,
      recommendations: defaultRecommendations
    });
  }
});

// AI Natural Language Search Assistant Route
app.post('/api/ai/search-assistant', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { query, availableMovies } = req.body || {};
  const queryStr = String(query || '').trim();

  const defaultSearchResponse = {
    fallback: true,
    explanation: `Here are the top cinematic matches curated by CineVerse AI for "${queryStr || 'your search'}":`,
    matchedTitles: ["Tears of Steel", "Metropolis", "Cosmos Laundromat"],
    identifiedGenres: ["Sci-Fi", "Cinema Classics"],
    suggestedPrompts: [
      "Movies with mind-bending cyberpunk visuals",
      "Public domain suspense classics for late night",
      "Visually stunning award-winning open animated shorts"
    ]
  };

  if (!hasValidGeminiKey()) {
    return res.status(200).json(defaultSearchResponse);
  }

  try {
    const prompt = `You are CineVerse AI Natural Language Search Assistant.
User's natural query: "${queryStr}"

Available catalog movies (title, genre, year, director, keywords):
${JSON.stringify(availableMovies || []).slice(0, 3000)}

Analyze the user's intent, mood, style, genre or plot request.
Pick the best matching movie titles from the catalog (up to 5), and provide a friendly cinematic AI explanation of what they were searching for and why these match. Also suggest 2 follow-up search queries.

Output valid JSON only:
{
  "explanation": "Brief conversational reply directly addressing their search",
  "matchedTitles": ["Title 1", "Title 2"],
  "identifiedGenres": ["Sci-Fi", "Noir"],
  "suggestedPrompts": ["Query 1", "Query 2"]
}`;

    const response = await withTimeout(
      ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      }),
      6000
    );

    const text = response.text || '{}';
    return res.json(JSON.parse(text));
  } catch (error: any) {
    console.error('Error or timeout in AI search assistant:', error.message || error);
    return res.status(200).json(defaultSearchResponse);
  }
});

// AI Movie Insights Route (Trivia, hidden themes, director style, why watch)
app.post('/api/ai/movie-insights', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const { title, year, director, synopsis } = req.body || {};

  const defaultInsights = {
    fallback: true,
    whyWatch: `A landmark achievement in ${year || 'cinema'} that continues to inspire filmmakers, digital creators, and storytellers across generations.`,
    directorStyle: `Directed by ${director || 'a visionary filmmaker'}, showcasing innovative camera blocking, high atmospheric contrast, and evocative mise-en-scène.`,
    hiddenThemes: ["Technology vs Humanity", "The inexorable passage of time", "Heroic resilience in adversity"],
    trivia: [
      "Preserved and distributed under legal open access and public heritage licensing.",
      "Renowned for its ground-breaking cinematography, digital craftsmanship, and historical influence."
    ],
    idealPairing: "Artisanal dark chocolate with a bold espresso or smoky black tea."
  };

  if (!hasValidGeminiKey()) {
    return res.status(200).json(defaultInsights);
  }

  try {
    const prompt = `You are CineVerse AI, a master film scholar.
Provide deep cinematic insights for the movie:
Title: ${title} (${year})
Director: ${director}
Synopsis: ${synopsis}

Generate JSON with:
1. "whyWatch": 2 compelling sentences on why a cinephile or casual viewer should watch this right now.
2. "directorStyle": 1-2 sentences highlighting the directorial technique or visual language.
3. "hiddenThemes": Array of 3 distinct symbolic/thematic elements.
4. "trivia": Array of 2 fascinating production or historical facts about this film or its open-source/public-domain heritage.
5. "idealPairing": Food/snack or cocktail pairing recommendation to accompany the viewing.

Output valid JSON only:
{
  "whyWatch": "...",
  "directorStyle": "...",
  "hiddenThemes": ["...", "...", "..."],
  "trivia": ["...", "..."],
  "idealPairing": "..."
}`;

    const response = await withTimeout(
      ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      }),
      6000
    );

    const text = response.text || '{}';
    return res.json(JSON.parse(text));
  } catch (error: any) {
    console.error('Error or timeout in AI movie insights:', error.message || error);
    return res.status(200).json(defaultInsights);
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({ status: 'ok', hasGeminiKey: hasValidGeminiKey(), time: new Date().toISOString() });
});

// Explicit 404 handler for any unmatched /api/* requests so Vite never serves HTML for API calls
app.all('/api/*', (req, res) => {
  res.status(404).json({ error: 'API route not found', path: req.path });
});

// Vite Middleware for dev & static serving for prod
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CineVerse AI Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
