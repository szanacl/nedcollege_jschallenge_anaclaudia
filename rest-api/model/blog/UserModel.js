const db = require("../../db/dbConection");

module.exports = class UserModel {
  static getAll(callback) {
    return db.query("SELECT * FROM users", callback);
  }

  static getId(id, callback) {
    return db.query("SELECT * FROM users WHERE id = ?", [id], callback);
  }
};
