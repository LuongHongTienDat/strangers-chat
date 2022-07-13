const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authMiddlewares = require('../middlewares/authMiddlewares');


router.get('/', authMiddlewares.protect, messageController.getMessagesFromRoom);



module.exports = router;
