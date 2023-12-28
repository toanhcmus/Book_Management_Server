const express = require("express");
const router = express.Router();
const {
  ensureAuthenticatedUser,
  forwardAuthenticatedUser,
} = require("../config/auth");

const report = require("../controllers/reportC");

router.get("/", ensureAuthenticatedUser, report.page);

router.get("/", ensureAuthenticatedUser, report.page);

module.exports = router;
