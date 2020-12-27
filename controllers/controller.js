const express = require("express");
const path = require('path');
const orm = require("../config/orm.js");
const titrations = require("../models/titration.js");


const router = express.Router();


// Import the model (titration.js) to use its database functions.
const titration = require("../models/titration.js");

//When user enters a new acid, it should be added to the db
// router.post("/newacid", function(req,res){
//     console.log(req.body);
//     titration.insertOneAcid([
//         "acid_name", "pKa", "Ka"
//     ], [
//         req.body.acid_name, req.body.pKa, req.body.Ka
//     ], function(result){
//         res.json(result);
//     })
// });

router.post("/newacid/:acidname/:pKa/:Ka", function(req,res){
    titration.insertOneAcid([
        "acid_name", "pKa", "Ka"
    ], [
        req.params.acidname, req.params.pKa, req.params.Ka
    ], function(result){
        res.json(result);
    })
});

//Route to get all of the acid names
router.get("/acidnames", function(req,res){
    titration.selectAll(function(data){
        res.json({titrations: data});
    });
});

router.get("/acids/:index", function(req, res){
    let id = req.params.index;
    titration.selectWhere("id", id, function(data){
        res.json(data);
    } )
})

// Export routes for server.js to use.
module.exports = router;

