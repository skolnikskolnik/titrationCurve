const express = require("express");
const path = require('path');
const orm = require("../config/orm.js");
const titrations = require("../models/titration.js");


const router = express.Router();


// Import the model (titration.js) to use its database functions.
const titration = require("../models/titration.js");

//When user enters a new acid, it should be added to the db
router.post("/newacid/:acidName/:pKa/:Ka", function(req,res){
    titration.insertOneAcid([
        "acid_name", "pKa", "Ka"
    ], [
        req.params.acidName, req.params.pKa, req.params.Ka
    ], function(result){
        res.json(result);
    })
});

//Route to get all of the acid names
router.get("/acidnames", function(req,res){
    titration.selectOneColumn("acid_name", function(data){
        res.json({acids:data}); 
    })
})

// Export routes for server.js to use.
module.exports = router;

