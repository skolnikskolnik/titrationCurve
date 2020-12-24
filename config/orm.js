// Import MySQL connection.
const connection = require("./connection.js");
 
function printQuestionMarks(num) {
    var arr = [];
 
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
 
    return arr.toString();
}
 
// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
 
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string") {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }
 
    // translate array of strings to a single comma-separated string
    return arr.toString();
}
//In the orm.js file, create the methods that will execute the necessary MySQL commands in the controllers. 
//These are the methods you will need to use in order to retrieve and store data in your database.
 
const orm = {
    //selectAll()
    selectAll: function (tableInput, cb) {
        let queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    //selectWhere
    selectWhere: function (tableInput, col, vals, cb) {
        let queryString = `SELECT * FROM ${tableInput} WHERE ${col} = "${vals}";`;
        connection.query(queryString, function (err, result) {
            console.log(queryString, "line54 orm")
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    selectWhereTwo: function (tableInput, col1, val1, col2, val2, cb) {
        let queryString = `SELECT*FROM ${tableInput} WHERE ${col1} ="${val1}" AND ${col2} = ${val2};`;
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        })
    },
    //insertOne()
    insertOne: function (table, cols, vals, cb) {
        let queryString = "INSERT INTO " + table;
 
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";
 
        console.log(queryString);
 
        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    updateOne: function (table, objColVals, condition, cb) {
        let queryString = "UPDATE " + table;
 
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
 
        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
 
            cb(result);
        });
    },
    //Limit the number of updated ones to a certain number
    updateOneLimit: function (table, objColVals, limit, condition1, condition2, condition3, cb) {
        let queryString = "UPDATE " + table;
 
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition1;
        queryString += " AND ";
        queryString += condition2;
        queryString += " AND ";
        queryString += condition3;
        queryString +=" LIMIT ";
        queryString += limit +";"
 
        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
 
            cb(result);
        });
    },
    //Limit the number of updated ones to a certain number
    updateOneLimit: function (table, objColVals, limit, condition1, condition2, condition3, cb) {
        let queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition1;
        queryString += " AND ";
        queryString += condition2;
        queryString += " AND ";
        queryString += condition3;
        queryString +=" LIMIT ";
        queryString += limit +";"

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    updateOneWhere: function (table, objColVals, condition1, condition2, condition3, cb) {
        let queryString = "UPDATE " + table;
 
        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition1;
        queryString += " AND ";
        queryString += condition2;
        queryString += " AND ";
        queryString += condition3;
 
        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
 
            cb(result);
        });
    },
    //deleteOne()
    deleteOne: function (table, condition, cb) {
        let queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;
 
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
 
            cb(result);
        });
    },
    //Needed to create this function to add user to the users table of the database
    createUser: function (table, cols, vals, cb) {
        let queryString = "INSERT INTO " + table;
        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (?,?,?,?);";
 
        connection.query(queryString, vals, function (e, result) {
            console.log(queryString, vals)
            if (e) {
                throw e;
            }
            cb(result)
        })
 
    },
    //Make path for two conditions, plus one not condition, and a limit
    selectWhereNot: function(table, col1, val1, col2, val2, col3, val3, limit, cb){
        let queryString = `SELECT*FROM ${table} WHERE ${col1}=${val1} AND ${col2}=${val2} AND ${col3}!=${val3} LIMIT ${limit};`;
        connection.query(queryString, function (err, result) {
            console.log(queryString);
            if (err) {
                throw err;
            }
            cb(result);
        });
    }
}
// Export the orm object for the model (cat.js).
module.exports = orm;
 

