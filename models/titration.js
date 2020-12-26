// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

const titration = {
    insertOneAcid: function (cols, vals, cb) {
        orm.insertOne("acids", cols, vals, function (res) {
            cb(res);
        });
    }
}

module.exports = titration;