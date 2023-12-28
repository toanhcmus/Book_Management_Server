const express = require('express');
const router = express.Router();
const { ensureAuthenticatedUser, forwardAuthenticatedUser } = require('../config/auth');
const bill = require('../controllers/billC')

router.get("/", ensureAuthenticatedUser, bill.pageCreate);
// router.post("/", ensureAuthenticatedUser, book.importBook);
router.get("/name=:name&phone=:phone", ensureAuthenticatedUser, bill.pageBill);

module.exports = router;