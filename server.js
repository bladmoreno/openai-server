const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const openai = require('openai');
require('dotenv').config();

openai.organizationId = process.env.ORGANIZAtION_ID;  
openai.apiKey = process.env.API_KEY;  

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/chat', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const gptResponse = await openai.Completion.create({
      engine: "text-davinci-004",
      prompt: prompt,
      max_tokens: 60
    });

    res.json(gptResponse.choices[0].text);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error in OpenAI call' });
  }
});

app.listen(3000, () => console.log('Server listening on port 3000'));