const express = require('express');
const router = express.Router();
const { ensureAuthenticatedUser, forwardAuthenticatedUser } = require('../config/auth');
const rules = require('../controllers/rulesC');

router.get("/", ensureAuthenticatedUser, rules.pageRules);
router.post("/", ensureAuthenticatedUser, rules.rulesAlteration);

module.exports = router;