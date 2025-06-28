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

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response.text();

    res.status(200).json({ response });
  } catch (error) {
    console.error('Gemini Error:', error);
    res.status(500).json({ message: 'Failed to analyze symptoms' });
  }
};
