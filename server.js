const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORS: Allow your GitHub Pages domain
app.use(cors({
  origin: 'https://ayushv-nitj.github.io'
}));

app.use(express.json());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
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
    res.status(500).json({ error: "Error from ChatGPT server" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
