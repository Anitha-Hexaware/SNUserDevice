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
})