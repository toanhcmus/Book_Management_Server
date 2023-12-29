const express = require('express');
const router = express.Router();
const { ensureAuthenticatedUser, forwardAuthenticatedUser } = require('../config/auth');
const Report = require('../controllers/reportC');

router.get("/", ensureAuthenticatedUser, Report.pageReport);
router.post("/", ensureAuthenticatedUser, Report.inventoryReport);

module.exports = router;