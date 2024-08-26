import express from 'express';
import cors from 'cors';
import Groq from 'groq-sdk';

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Groq SDK with the API key
const groq = new Groq({ apiKey: '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' }); 

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  

  try {
    // Use Groq SDK to generate a chat completion
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: `Case details: ${message}. Please provide a summary of the case and identify which legal articles or sections (Daffa) apply in Pakistan.`,
        },
      ],
      model: 'mixtral-8x7b-32768',
    });

    // Extract the response from the Groq completion result
    const responseContent = completion.choices[0]?.message?.content || 'No response generated';

    // Assuming the response contains both the summary and applicable sections,
    // you might want to parse or structure the response as necessary.
    // This is a simple example of returning the whole content.
    res.status(200).json({ response: responseContent });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Something went wrong!' });
  }

});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
