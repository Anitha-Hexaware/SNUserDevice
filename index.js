var fs = require('fs');
var builder = require('botbuilder');
var restify = require('restify');
var apiai = require('apiai');
var APIAII = apiai('1713551afad04759b3ca39e92f771774');
const uuidv1 = require('uuid/v1')();
require('dotenv-extended').load();
var apiairecognizer = require('api-ai-recognizer');
const unhandledRejection = require("unhandled-rejection");
// var request = require("request");
var SerNow = require('servicenow-rest').gliderecord;

let rejectionEmitter = unhandledRejection({
    timeout: 20
});

rejectionEmitter.on("unhandledRejection", (error, promise) => {
    fs.writeFileSync('./app.json', JSON.stringify(error), 'utf8');
})

rejectionEmitter.on('rejectionHandled', (error, promise) => {
    fs.writeFileSync('./app.json', JSON.stringify(error), 'utf8');
})

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url);
});
var connector = new builder.ChatConnector({
    appId: '7194e74e-4a90-4d2d-925f-f408729ac779',
    appPassword: 'TZH8Kmo65HJYFiViFUj8VY8'
});

server.post('/', connector.listen());

var bot = new builder.UniversalBot(connector, function (session) {
    // session.send("You said: %s", session.message.text);
    // session.send(JSON.stringify(session.message));
    // do check
    if (session.message.text) {
        var request = APIAII.textRequest(session.message.text, {
            sessionId: uuidv1
        });
        request.on('response', function (response) {
            let result = response.result;
            //do check
            session.send(JSON.stringify(result));
            if (result.metadata.intentName == "Default_Wecome_Intent") {
                session.send("Hi welcome !! \n\n How may I help you");
            } else if (result.metadata.intentName == "User registration") {
                let email = result.parameters["email"];
                let fName = result.parameters["given-name"];
                let lName = result.parameters["last-name"];
                let empId = result.parameters["number"];

                
                // let userPassword= result.parameters["password"];
                // let userNameintent= result.parameters["username"];
                if (email != "" && fName !== "" && lName !== "" && empId !== "") {
                    var userdetails = {
                        email: email,
                        uFirstName: fName,
                        uLastName: lName,
                        uEmpId: empId
                    };

                    // var sN = new SerNow({
                    //     instance: 'dev24552',
                    //     tablename: 'sys_user',
                    //     user: 'admin',
                    //     password: 'GcXuKjkVNSZq',
                    //     v1: 'v1'
                    // });



                    // var sN = new SerNow('dev24552', 'sys_user', 'admin', 'GcXuKjkVNSZq', 'v1');
                    // sN.insert(obj).then(function (response) {
                    //     session.send('Thank for your patience , Make sure you can login to update the details.')
                    // });

                } else {
                    session.send(result.fulfillment.speech);
                }
            } else if (result.metadata.intentName == "Default Fallback Intent") {
                session.send(result.fulfillment.speech);
            }
        });
        request.on('error', function (error) {
            //  console.log(error);
        });
        request.end();
    }

});

// var sN = new serviceNow({
//     instance: 'dev24552',
//     tablename: 'sys_user',
//     user: 'admin',
//     password: 'GcXuKjkVNSZq',
//     v1: 'v1'
// });
// sN.setReturnFields('number', 'short_description');
// sN.addEncodedQuery('active=true');
// sN.setLimit(10);

// var port = process.env.PORT || 5000;
// app.set('port', port);
// app.listen(port, function () {
//     console.log('Client server listening on port ' + port);
// });