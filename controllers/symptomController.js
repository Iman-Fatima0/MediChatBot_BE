const geminiModel = require('../utils/geminiClient');

exports.checkSymptoms = async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || symptoms.trim() === '') {
      return res.status(400).json({ message: 'Symptoms are required' });
    }

    const prompt = `
      A patient is experiencing the following symptoms: ${symptoms}.
      Provide a possible diagnosis, recommended next steps, and whether this might require emergency care.
      Keep it concise and medically appropriate.
    `;

    const result = await geminiModel.generateContent(prompt); // generate content using Gemini
    const response = await result.response; // access the response object (it's a promise)
    const text = response.text(); // get the text from the response

    res.status(200).json({ response: text });
  } catch (error) {
    console.error('Gemini Error:', error.message || error);
    res.status(500).json({ message: 'Failed to analyze symptoms' });
  }
};
