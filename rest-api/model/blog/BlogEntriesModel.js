const db = require("../../db/dbConection");

module.exports = class BlogModel {
  static getAll(callback) {
    return db.query(
      "SELECT * FROM blog_entries ORDER BY created_at DESC",
      callback
    );
  }

  //   Post only user
  static getAllId(id, callback) {
    return db.query(
      "SELECT users.*, blog_entries.title, blog_entries.content, blog_entries.created_at FROM users JOIN blog_entries ON users.id = blog_entries.user_id WHERE users.id = ? ORDER BY created_at DESC",
      [id],
      callback
    );
  }

  static getId(id, callback) {
    return db.query("SELECT * FROM blog_entries WHERE id = ?", [id], callback);
  }

  static add(post, callback) {
    return db.query(
      "INSERT INTO blog_entries (title, content, image, url, user_id) VALUES (?,?,?,?,?)",
      [post.title, post.content, post.image, post.url, post.user_id],
      callback
    );
  }

  static delete(id, callback) {
    return db.query("DELETE FROM blog_entries WHERE id = ?", [id], callback);
  }

  static update(post, callback) {
    if(post.imagem != null){
      return db.query(
        "UPDATE blog_entries SET title = ?, content = ?, url = ? WHERE id = ?",
        [post.title, post.content, post.url, post.id],
        callback);
      }else{
         return db.query(
        "UPDATE blog_entries SET title = ?, content = ? , image = ? , url = ? WHERE id = ?",
        [post.title, post.content, post.image, post.url, post.id],
        callback);
      };
    }

};
