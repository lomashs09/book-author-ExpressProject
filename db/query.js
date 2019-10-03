const database = require("./config.js");

function executeQuery(sql,parameters) {
  return new Promise((resolve, reject) => {
    database.query(sql, parameters, (err, results) => {
      if (!err) {
        resolve(results);
      } else {
        reject(err);
      }
    });
  });
}

function getEntityFromTable(param) {
  let sql = `SELECT * FROM ${param}`;
  return executeQuery(sql);
}

function getAuthorByAuthorId(req) {
  let sql = "SELECT name FROM author where author_id = ?;";
  return executeQuery(sql,req.params.id);
}

function updateAuthor(req) {
  let sql = "UPDATE author SET name = ? where author_id = ?;";
  return executeQuery(sql,[req.body.name, req.body.author_id]);
}

function addAuthor(req) {
  var sql = "INSERT INTO author SET ?;"
  return executeQuery(sql, {author_id: null, name:req.body.name });
}

function deleteAuthor(req) {
  let sql = "DELETE FROM author WHERE author_id = ?;"
  return executeQuery(sql,req.params.id);
}

function getBookById(req) {
  let sql = "SELECT title FROM books where book_id = ?";
  return executeQuery(sql, req.params.id);
}

function updateBook(req){
    let sql = "UPDATE books SET title = ? where book_id = ?";
    return executeQuery(sql,[req.body.title, req.body.book_id]);
}

function addBook(req){
    var sql ="INSERT INTO books SET ?;"
    return executeQuery(sql,{author_id: req.body.author_id,title: req.body.title, GENRE:req.body.GENRE, book_id:req.body.book_id})
}
function deleteBook(req){
    let sql = "DELETE FROM books WHERE book_id = ?;"
    return executeQuery(sql,req.params.id);
}
function addUser(req,hashedPassword){
    console.log(hashedPassword);
    var sql ="insert into User SET ?;"
    return executeQuery(sql,{UserName:req.body.name, Email:req.body.email, Phone:req.body.phone, Password:hashedPassword} )

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
module.exports.addUser= addUser;
