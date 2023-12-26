const express = require('express');
const router = express.Router();
const { ensureAuthenticatedUser, forwardAuthenticatedUser } = require('../config/auth');
const book = require('../controllers/bookC');

router.get("/import", ensureAuthenticatedUser, book.pageImport);

module.exports = router;