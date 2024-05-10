const express = require('express');
const router = express.Router();
const saveVideoController = require('./controllers/saveVideoController');
const saveBookmarkedVideoController = require('./controllers/saveBookmarkedVideoController');

router.post('/save-video', saveVideoController.saveVideo);

router.post('/save-bookmarked-video', saveBookmarkedVideoController.saveBookmarkedVideo);

module.exports = router;
