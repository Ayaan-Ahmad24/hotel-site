const Message = require('../models/message.model');

// Create a new message
module.exports.createMessage = async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const newMessage = new Message({ name, email, message });
        await newMessage.save();
        res.status(201).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
};

// Get all messages (admin only)
module.exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
};
