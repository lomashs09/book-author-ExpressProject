const database = require("./config.js");

function executeQuery(sql) {
  return new Promise((resolve, reject) => {
    database.query(sql, (err, results) => {
      if (!err) {
        resolve(results);
      } else {
        reject();
      }
    });
  });
}

function getEntityFromTable(param) {
  let sql = `SELECT * FROM ${param}`;
  return executeQuery(sql);
}

function getAuthorByAuthorId(req) {
  let sql = `SELECT name FROM author where author_id = ${req.params.id};`;
  return executeQuery(sql);
}

function updateAuthor(req) {
  let sql = `UPDATE author SET name = "${req.body.name}" where author_id = ${req.body.author_id};`;
  return executeQuery(sql);
}
function addAuthor(req, res) {
  var sql = "INSERT INTO author VALUES(null,'" + req.body.name + "')";
  return executeQuery(sql);
}
function deleteAuthor(req, res) {
  let sql = `DELETE FROM author WHERE author_id = ${req.params.id};`;
  return executeQuery(sql);
}
function getBookById(req) {
  let sql = `SELECT title FROM books where book_id = ${req.params.id}`;
  return executeQuery(sql);
}

function updateBook(req){
    let sql = `UPDATE books SET title = "${req.body.title}" where book_id = ${req.body.book_id};`;
    return executeQuery(sql);
}

function addBook(req){
    var sql ="INSERT INTO books VALUES('" +req.body.author_id +"' , '" +req.body.title +"','" +req.body.GENRE +"'," +req.body.book_id +")";
    return executeQuery(sql)
}
function deleteBook(req){
    let sql = `DELETE FROM books WHERE book_id = ${req.params.id};`;
    return executeQuery(sql);
}

module.exports.getEntityFromTable = getEntityFromTable;
module.exports.getAuthorByAuthorId = getAuthorByAuthorId;
module.exports.updateAuthor = updateAuthor;
module.exports.addAuthor = addAuthor;
module.exports.deleteAuthor = deleteAuthor;
module.exports.getBookById = getBookById;
module.exports.updateBook = updateBook;
module.exports.addBook = addBook;
module.exports.deleteBook = deleteBook;
