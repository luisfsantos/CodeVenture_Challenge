const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
var entry = low(adapter);

// Setup users
entry.defaults({ users: [] }).write();

exports.entry = entry;
