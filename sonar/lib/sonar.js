//311 Bot Main Function.
//Prathm Juneja. South Bend Office of Innovation
//Aidan Lewis
// To update the test version of the bot, type in "npm run update" in powershell at the root directory of the project.
// To reconfigure, look at the claudijs deployment instructions online. Run "npm run install" in the powershell at the root directory of the project.
// Add flags occordingly for facebook/twillio/alexa/groupme/slack etc...
const botBuilder = require('claudia-bot-builder')
const parseIntent = require('./parse_intent')
const getData = require('./get_data')
const getPopulation = require('./get_population')
const getCrime = require('./get_crime')
const getMap = require('./get_map')
const layerMap = require('./layer_map')
const ping = require('./ping')
const notes = require('./notes')
const hal = require('./hal')
const help = require('./help')
const Q = require('q');
var AWS = require('aws-sdk');
var fs = require('fs');
var readline = require('readline');

var config_info = require('./datasets');
config_info = config_info.config;
const dynamodb = new AWS.DynamoDB.DocumentClient();
AWS.config.setPromisesDependency(Q.Promise);

var DATASETS = {
    "map": "GetMap",
    "about": "Help",
    "other": "Search",
    "311": "Email"
}

function restoreCtx(sender)//Function will be used later to restore database information for the user that accesses the bot.
{
  console.log("Trying to restore context for sender", sender);

  var params = {
    TableName: 'ServiceProjectsBot',
    Key: {
      'UserID': sender
    }
  };

  return dynamodb.get(params).promise();
}

function persistCtx(sender, state) // This is used later to repopulate the database with user information
{
  console.log("Persisting context for sender", sender);

  var params = {
      TableName: 'ServiceProjectsBot',
      Item:{
          'UserID': sender,
          'State': state // this is used for persistence. The bot interacts differently with users depending on whether their state is start or fire/trash/map
      }
  };

  return dynamodb.put(params).promise();
}

function uploadInstance(timeInMs, senderTime, reqCommand, reqLocation, platform) //Very similar to the persist function, but used to log each user interaction
{
  var params = {
      TableName: 'ServiceProjectsBotLog',
      Item:{
          'UserID+Timestamp': senderTime,
          'Time': timeInMs,
          'Request Type': reqCommand,
          'Request Location': reqLocation,
          'Platform': platform
      }
  };

  return dynamodb.put(params).promise();
}

// check if element in array
Array.prototype.contains = function(element){
    return this.indexOf(element) > -1;
};


const api = botBuilder(function (request, originalRequest) { // Claudia JS main function

    var city = "South Bend, IN";
    var possibleStates = ["fire", "map", "trash", "other", "311", "about"];
    var sender = request.type + '.' + request.sender; // Platform of the sender + the unique sender id
    var retext;
    return restoreCtx(sender).then(function(existingCtx){ // Restore information based on that sender id to grab their state
        console.log("At the function");
        var state;
        if(existingCtx.Item){ // If that person did exist, then reinstate their state. If not just leave the state blank.
            state = existingCtx.Item.State;
        }
        config_concat = config_info["datasets"].concat(config_info["other options"]);
        var numchoice = parseInt(request.text);
        if (numchoice >= 1 && numchoice <= config_concat.length) { // If they have already seen the welcome message, their request will be one of these

            state = config_concat[numchoice - 1]["display name"]; // Grab their request and make it the users state
            var text = config_concat[numchoice-1]["question"];
            return persistCtx(sender, state).then(function(result){ // You want to restore that their state is now fire/trash/map and they are being asked about their location
                return text;
            });
        }
        possibleStates = []
        for (i in config_concat){
            possibleStates.push(config_concat[i]["display name"])
        }
        var dataset = "error";
        if (possibleStates.includes(state)) {
                console.log("Made it inside the dataset switch area");
                var loc = request.text + " " + city; // the location should be the new response
                var index = possibleStates.indexOf(state)
                
                if("url" in config_concat[index]){
                    console.log("Made it to GetData case");
                    console.log("Config concat");
                    console.log(config_concat[index]);
                    retext = getData(config_concat[index], loc); // the getData function will grab the dataset that we want in the location we requested
                }                
                state = "start";
                var timeInMs = Date.now(); // for the log
                senderTime = sender + '.' + timeInMs; // the log needs a unique key for every single instance, so we append the time to the username
                return persistCtx(sender, state).then(function(result){ // persist the state for the user
                  return uploadInstance(timeInMs, senderTime, state, loc, request.type).then(function(result){ //upload the log instance
                    return retext; // return the answer we got from the switch statement
                  });
                });

        }
        else { // This is the case where the user does not type fire/map/trash or not a location. This means they are just trying to start the program.
            //if(state != "start"){
                state = "start"; // set them to the start state
                return persistCtx(sender, state).then(function(result){ // upload their new state
                  // Everything below is simply a nice way of sending quick replies to facebook and allowing the user to quickly choose an option to interact with
                  var first_display = "";
                  for (var i = 0; i < config_info["datasets"].length; i++){
                        var x = parseInt(i) + 1;
                        first_display = first_display + "(" + x.toString() + ") " + config_info["datasets"][i]["display name"] + "\n";
                  }
                  
                  return "Hello! Welcome to " + config_info["city info"]["name"] + "\'s 311-Bot. Type the number of the option you wish to select.\n" + first_display;
                  
                });
        }
});}, { platforms: ['twilio'] });

module.exports = api;
