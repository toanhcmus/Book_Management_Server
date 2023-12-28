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

  async inventoryCheck(req, res) {
    try {
      let month = req.params.month;
      let year = req.params.year;
      console.log(month, year);
      // const rs = await Customer.selectCustomer(customerName, customerPhone);
      // const allBooks = await Book.selectAllBooks();
      // const customer = {
      //   name: customerName,
      //   phone: customerPhone,
      // };
      // if (rs.length > 0) {
      //   // console.log(1);
      //   res.render("bill", {
      //     checkCustomer: 1,
      //     customer: rs[0],
      //     allBooks: allBooks,
      //   });
      // } else {
      //   // console.log(0);
      //   res.render("bill", {
      //     checkCustomer: 0,
      //     customer: customer,
      //     allBooks: allBooks,
      //   });
    } catch (error) {
      res.render("500", { error: error.stack });
    }
  }
}

module.exports = new reportC();
