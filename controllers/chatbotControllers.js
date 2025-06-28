const ChatbotConversation = require('../models/ChatLog');
const { callGeminiAPI } = require('../config/geminiClient');

exports.handleChat = async (req, res) => {
  try {
    const { prompt } = req.body;
    const userId = req.user.id; // assuming you have auth middleware that adds req.user

    // Call Gemini API
    const responseText = await callGeminiAPI(prompt);

    // Save conversation to DB
    const newConversation = new ChatbotConversation({
      userId,
      prompt,
      response: responseText
    });
    await newConversation.save();

    res.json({ success: true, response: responseText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
