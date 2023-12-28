const express = require("express");
const router = express.Router();
const {
  ensureAuthenticatedUser,
  forwardAuthenticatedUser,
} = require("../config/auth");

const report = require("../controllers/reportC");

router.get("/", ensureAuthenticatedUser, report.pageCreate);

router.get("/inventory", ensureAuthenticatedUser, report.inventoryTimeCreate);

// router.get(
//   "/month=:month&year=:year",
//   ensureAuthenticatedUser,
//   report.inventoryCreate
// );
router.post('/inventory', async (req, res) => {
  let month = req.body.month;
  let year = req.body.year;
  console.log(month, year);
})

router.get("/timkim", ensureAuthenticatedUser, function (req, res) {
  res.send("<h1>hi</h1>")
});

module.exports = router;
