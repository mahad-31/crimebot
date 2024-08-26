import Groq from 'groq-sdk';

// Initialize Groq SDK with the API key
const groq = new Groq({ apiKey: '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' }); 

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

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

    // Return the response as JSON
    res.status(200).json({ response: responseContent });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: ' went wrong!' });
  }
}
