const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authMiddlewares = require('../middlewares/authMiddlewares');


router.get('/', authMiddlewares.protect, profileController.getJoinedRooms);
router.post('/join', authMiddlewares.protect, profileController.joinRoom);



module.exports = router;
