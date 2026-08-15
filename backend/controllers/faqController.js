const axios = require('axios');

const askFAQChatbot = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, error: "Message is required" });
        }

        const systemPrompt = `You are a helpful and polite AI customer support assistant for "Sereine De Femme", an exclusive online fashion and gifting boutique. 
        Here are the store details:
        - Brand Name: Sereine De Femme
        - Shipping: Standard shipping takes 3-5 business days across India. Free shipping on orders above ₹1500.
        - Return/Exchange Policy: Easy 7-day return and exchange policy from the date of delivery. Items must be unused and in original packaging.
        - Support Email: support@sereinedefemme.com
        - Order Status: For specific order tracking and details, direct customers to check their 'My Orders' page.
        
        Answer customer questions concisely and strictly based on these details.`;

        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                model: 'llama-3.1-8b-instant', // Updated active Groq model
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: message }
                ],
                temperature: 0.7,
                max_tokens: 250
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                timeout: 15000
            }
        );

        let aiReply = "I am sorry, I couldn't process that right now. Please contact our support at support@sereinedefemme.com.";

        if (response.data && response.data.choices && response.data.choices[0]?.message?.content) {
            aiReply = response.data.choices[0].message.content.trim();
        }

        res.status(200).json({ success: true, reply: aiReply });

    } catch (error) {
        console.error("Groq Chat Error:", error.response?.data || error.message);
        res.status(500).json({ 
            success: false, 
            error: "AI service is currently busy. Please try again." 
        });
    }
};

module.exports = { askFAQChatbot };