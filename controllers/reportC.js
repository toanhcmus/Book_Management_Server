class reportC {
  async pageCreate(req, res) {
    try {
      res.render("report", {
        // inventory
      });
    } catch (error) {
      res.render("500", { error: error.stack });
    }
  }

  async inventoryTimeCreate(req, res) {
    try {
      res.render("inventory", {
        // inventory
      });
    } catch (error) {
      res.render("500", { error: error.stack });
    }
  }

  
  
}

module.exports = new reportC();
