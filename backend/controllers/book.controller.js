exports.create = (req, res) => {
  res.send({ message: "Create a new book" });
};

exports.findAll = (req, res) => {
  res.send({ message: "Retrieve all books" });
};

exports.findOne = (req, res) => {
  res.send({ message: "Retrieve a single book by id" });
  // const id = req.params.id;
  // res.send({ message: `Retrieve book with id: ${id}` });
};

exports.update = (req, res) => {
  res.send({ message: "Update a book by id" });
  // const id = req.params.id;
  // res.send({ message: `Update book with id: ${id}` });
};
exports.delete = (req, res) => {
  res.send({ message: "Delete a book by id" });
  // const id = req.params.id;
  // res.send({ message: `Delete book with id: ${id}` });
};

exports.deleteAll = (req, res) => {
  res.send({ message: "Delete all books" });
};
