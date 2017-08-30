require('dotenv-extended').load();
var GlideRecord = require('servicenow-rest').gliderecord;
var builder = require('botbuilder');
var restify = require('restify');
var apiairecognizer = require('api-ai-recognizer');
var request = require("request");

//Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 5000, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: '',
    appPassword: ''
});

server.post('/api/messages', connector.listen());
// let instance = 'dev24552';
var sN = new GlideRecord({
    instance:'https://dev24552.service-now.com/',
    tablename : 'Second_needIt',
    username : 'admin',
    password : 'CywRGSYNcFwq',
    version : 'v1'
 
});

//POST Call Handler
var bot = new builder.UniversalBot(connector);
var recognizer = new apiairecognizer('50ab8ddd9a594abfbe4cfe1a951dee8d');

bot.recognizer(recognizer);

var intents = new builder.IntentDialog({ recognizers: [recognizer] });
bot.dialog('/', intents);

intents.matches('add_user', [
    function (session, args) {
      console.log("step -1");
      console.log("Args : "+JSON.stringify(args));
      var responseString="Hi, Please register the username "
      session.send(responseString);
    }
]);//Welcome Intent Fired

// intents.matches('Add user', [
//     function (session, args) {
//         console.log("Add user")
//         console.log("Args : "+JSON.stringify(args));
//         var responseString="Sure !"
//         session.send(responseString);
//     }
// ]);


intents.onDefault(function(session){
    session.send("Sorry...can you say that again?");
});

// gr.query().then(function (result) { 
//     console.log(result);
// });
