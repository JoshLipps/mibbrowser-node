var mongo = require('mongodb');

// a mongo connection cache
// pass in host & port
// it returns a function accepting dbName, collectionName & callback
// adapted from http://stackoverflow.com/a/12039606/953401
var mongoCache = function(mongoUri){

  // keep our open connections
  var mongoDatabases = {};

  var ensureDatabase = function(readyCallback){
    // check if we already have this db connection open
    if(mongoDatabases[mongoUri]){
      readyCallback(null, mongoDatabases[mongoUri]);
      console.log("Duplicate DB request");
      return;
    }

    // get a handle on the database
    var db = mongo.MongoClient;
    db.connect(mongoUri, function(error, databaseConnection){
      if(error) throw error;

      console.log("Connected! This shouldn't show up too often.");
      // add the database to the cache
      mongoDatabases[mongoUri] = databaseConnection;

      // remove the database from the cache if it closes
      databaseConnection.on('close', function(){
        delete(mongoDatabases[mongoUri] = null);
      })

      // return the database connection
      readyCallback(error, databaseConnection);
    })
  }

  var ensureCollection = function(collectionName, readyCallback){

    ensureDatabase(function(error, databaseConnection){
      if(error) throw error;

      databaseConnection.createCollection(collectionName, function(error, collection) {
        if(error) throw error;

        // return the collection finally
        readyCallback(error, collection);
      })

    })
  }

  return ensureCollection;
}

//module.exports = mongoCache;
//Requires are cached (across entire node app) on first call, moving mongoCache init here uses it accross the entire app (I think);   
//see http://nodejs.org/api/modules.html#modules_caching
module.exports = mongoCache(process.env.MONGOLAB_URI);