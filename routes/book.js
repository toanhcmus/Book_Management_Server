const express = require('express');
const router = express.Router();
const { ensureAuthenticatedUser, forwardAuthenticatedUser } = require('../config/auth');
const book = require('../controllers/bookC');

router.get("/import", ensureAuthenticatedUser, book.pageImport);
router.post("/import", ensureAuthenticatedUser, book.importBook);

module.exports = router;