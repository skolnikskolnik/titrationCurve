// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

const titration = {
    insertOneAcid: function (cols, vals, cb) {
        orm.insertOne("acids", cols, vals, function (res) {
            cb(res);
        });
    },
    selectAll: function(cb){
        orm.selectAll("acids", function(res){
            cb(res);
        })
    },
    selectOneColumn: function(col, cb){
        orm.selectOneColumn(col, "acids", function(res){
            cb(res);
        })
    },
    selectWhere: function(col, vals, cb){
        orm.selectWhere("acids", col, vals, function (res) {
            cb(res);
        })
    }
}

module.exports = titration;