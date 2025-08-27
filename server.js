import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/api/chat', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: req.body.messages
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/image', async (req, res) => {
  try {
    const img = await openai.images.generate({
      model: 'gpt-image-1',
      prompt: req.body.prompt,
      size: '512x512',
      response_format: 'b64_json'
    });
    res.json({ b64: img.data[0].b64_json });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5050, () => console.log('Server running on port 5050'));
