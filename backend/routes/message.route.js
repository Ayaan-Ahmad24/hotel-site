const express = require('express');
const { createMessage, getMessages } = require('../controllers/message.controller');
const router = express.Router();

// Route to create a new message
router.post('/messages', createMessage);

// Route to get all messages (admin only)
router.get('/messages', getMessages);

module.exports = router;
