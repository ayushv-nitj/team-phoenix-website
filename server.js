const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();
const app = express();

// CORS: Allow your GitHub Pages domain
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://127.0.0.1:5500',
      'http://localhost:5500',
      'https://ayushv-nitj.github.io'
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));




app.use(express.json());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "google/gemini-1.5-flash", // Gemini Flash via Groq
        messages: [{ role: "user", content: userMessage }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`, // <-- you'll set this in .env
           "HTTP-Referer": "https://ayushv-nitj.github.io/team-phoenix-website/",
          "X-Title": "Team Phoenix Chatbot"
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.status(200).json({ reply });

  } catch (error) {
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data);
    } else {
      console.error("Request Error:", error.message);
    }
    res.status(500).json({ error: "Error from Gemini API" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
