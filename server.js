const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors({
  origin: '*'
}));
app.use(express.json());

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
   const response = await axios.post(
  "https://openrouter.ai/api/v1/chat/completions",
  {
    model: "openai/gpt-3.5-turbo", // or try "mistralai/mistral-7b-instruct"
    messages: [{ role: "user", content: userMessage }],
  },
  {
    headers: {
      Authorization: `Bearer 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`,
      "HTTP-Referer": "http://localhost:5000", // or your site domain
      "X-Title": "Team Phoenix Chatbot"
    },
  }
);


    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("ChatGPT error:", error.response?.data || error.message);
    res.status(500).json({ error: "Error from ChatGPT server" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



