const db = require("./db.js");

exports.createUser = function(email, name, id, accessToken) {
  db.entry
    .get("users")
    .push({
      email: email,
      name: name,
      github: { id: id, accessToken: accessToken }
    })
    .write();
};

exports.getUserById = function(id) {
  return db.entry
    .get("users")
    .find({ github: { id: id } })
    .value();
};

exports.updateAccessToken = function(id, accessToken) {
  db.entry
    .get("users")
    .find({ github: { id: id } })
    .assign({ github: { id: id, accessToken: accessToken } })
    .write();
};
