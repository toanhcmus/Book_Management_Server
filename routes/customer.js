const express = require('express');
const router = express.Router();
const { ensureAuthenticatedUser, forwardAuthenticatedUser } = require('../config/auth');
const customer = require('../controllers/customerC');

router.get("/", ensureAuthenticatedUser, customer.pageCustomer);
// router.post("/import", ensureAuthenticatedUser, book.importBook);
router.post("/check", ensureAuthenticatedUser,customer.checkCustomer);


module.exports = router;