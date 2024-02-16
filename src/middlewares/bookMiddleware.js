//Middleware for creating request
const logCreateRequest = (req, res, next) => {
    console.log(`Creating a new book with BookName: ${req.body.BookName}, ISBN: ${req.body.ISBN}, Rating:${req.body.Rating}, Author:${req.body.Author}, Genre${req.body.Genre} `);
    next();
  };

// Middleware for fetching request
  const logReadRequest = (req, res, next) => {
    console.log('Fetching books');
    next();
  };
  
// Middleware for update request
  const logUpdateRequest = (req, res, next) => {
    console.log(`Updating book with ID: ${req.params.id}, new BookName: ${req.body.BookName}, new ISBN: ${req.body.ISBN}, new Rating:${req.body.Rating}, new Author:${req.body.Author}, new genre: ${req.body.Genre} `);
    next();
  };

// Middleware for delete request
  const logDeleteRequest = (req, res, next) => {
    console.log(`Deleting books with ID: ${req.params.id}`);
    next();
  };
  
  // Exporting routes to make them usable
  module.exports = {
    logCreateRequest,
    logReadRequest,
    logUpdateRequest,
    logDeleteRequest,
  };