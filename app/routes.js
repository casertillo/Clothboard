// Dependencies
var mongoose        = require('mongoose');
var Crime           = require('./model.js');

// Opens App Routes
module.exports = function(app) {

    // GET Routes
    // --------------------------------------------------------
    // Retrieve records for all users in the db
    app.get('/crimes', function(req, res){

        // Uses Mongoose schema to run the search (empty conditions)
        var query = Crime.find({});
        query.exec(function(err, crimes){
            if(err)
                res.send(err);

            // If no errors are found, it responds with a JSON of all users
            res.json(crimes);
        });
    });

    // POST Routes
    // --------------------------------------------------------
    // Provides method for saving new users in the db
    app.post('/crimes', function(req, res){

    });
    
    app.post('/confirm', function(req, res){
         var idconfirm = req.body.idreq;
         
         var query = {"_id": idconfirm, "verified":false};
         var update = {verified: true};
         var options = {new: true};
         Crime.findOneAndUpdate(query, update, options, function(err, crime) {
          if (err) {
            console.log('got an error');

            res.json('ok');
          }
          if(!crime)
          {
            res.json('nothing');
          }
          else
          {
            res.json('ok');
           }
          // at this point person is null.
        });
    });
    // Retrieves JSON records for all users who meet a certain set of query conditions
    app.post('/query', function(req, res){

        // Grab all of the query parameters from the body.
        var lat             = req.body.latitude;
        var long            = req.body.longitude;
        var distance        = req.body.distance;
        var bike            = req.body.bike;
        var car             = req.body.car;
        var robbery         = req.body.robbery;
        var total           = req.body.total;  
        var partial         = req.body.partial;
        var violenceyes     = req.body.violenceyes; 
        var violenceno      = req.body.violenceno;

        // Opens a generic Mongoose Query. Depending on the post body we will...
        var query = Crime.find({});

        // ...include filter by Max Distance (converting miles to meters)
        if(distance){

            // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
            query = query.where('eventlocation').near({ center: {type: 'Point', coordinates: [long, lat]},

                // Converting meters to miles. Specifying spherical geometry (for globe)
                maxDistance: distance * 1609.34, spherical: true});
        }
        
        // ... Other queries will go here ... 
            // ...include filter by Gender (all options)
        if(bike || car || robbery){
            query.or([{ 'crimetype': bike }, { 'crimetype': car }, {'crimetype': robbery}]);
        }

        if(total){

            query.and([{ 'losttype': total }]);

        }
        if(partial)
        {
           query.and([{ 'losttype': partial }]); 
        }

        if(violenceyes)
        {
            query.and([{ 'violenceused': true }]); 
        }
        if(violenceno)
        {
            query.and([{ 'violenceused': false }]); 
        }
        query.and([{'verified': true}]);
        // Execute Query and Return the Query Results
        query.exec(function(err, crimes){
            if(err)
                res.send(err);

            // If no errors, respond with a JSON of all users that meet the criteria
            res.json(crimes);
        });
    });


};  
