const geolocation = require('./geolocation')
const geoservice = require('./geoservice')
const directions = require('./directions')
const datasets = require('./datasets')
const error = require('./error')

module.exports = function getData(dataset, address) {
      return geolocation.geometry(address).then(function(location) {
      console.log("Made it inside the getData function");
        var url = dataset["url"];
        var geometry = location.x + "," + location.y;
        return geoservice().query(url, geometry, dataset["distance"].distance).then(function(layer) {

         var response = dataset["template"].replace(/\{(\w*)\}/g, function(m,key) {
               return layer.features[0].attributes[key];
         });

         /*if(dataset == "bus stops") {
             return directions(location, layer.features[0].geometry, env).then(function(steps) {
                 response += "\nHow to get there: " + steps;
                return response;
             })
         } else {*/
         return response;
         //}

       })
      })
      .catch(function (message) {
        //var response = "There was an error getting data for " + dataset.toLowerCase() + ".";
        //return response;
        //   response += error
        return Promise.resolve(error());
      });
    }
