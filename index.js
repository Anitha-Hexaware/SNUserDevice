var express = require('express');
var app = express();
var GlideRecord = require('servicenow-rest').gliderecord;
let instance = 'dev24552';
let tablename = 'Second_needIt';
let user = 'admin';
const password = 'CywRGSYNcFwq';
var gr = new GlideRecord(instance, tablename, user, password, 'v1');

gr.query().then(function (result) { //returns promise 
    console.log(result);
});
app.get("/",function(req,res){
    res.send("Localhost Server is  running!!!");
});
app.listen(process.env.PORT || 3000, function (message) {
    console.log("Server is running successfully");
});