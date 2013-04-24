var dbUtil = require('./cloudfoundryUtil'), conn, db;
module.exports = {
    connect: function(dbServiceName) {
        db = dbUtil.connect('mongodb', dbServiceName);
        db.open(function(err, connection) {
            if (err || !connection) {
                console.log('Could not connect to MongoDB');
            } else {
                console.log('Connected to MongoDB successfully');
                conn = connection;
            }
        });
    },
    addGeneralItem: function(tasks, callback) {
        db.collection('usertasks');
        db.bind('usertasks');
        db.usertasks.ensureIndex({"targetLocation": "2d"}, { w: 0 });
        db.usertasks.insert(tasks, function(err, document) {
            if(!err) {
                callback(null, "general item added successfully !");
            } else {
                callback(err);
            }
        });
    },
    getItem: function(userid, callback) {
        db.collection('usertasks');
        db.bind('usertasks');
        db.usertasks.find({userid : userid}, function(err, cursor) {
            if(!err) {
                cursor.toArray(callback);
            }
        });
    },
    getTargetLocation: function(userid, callback) {
        db.collection('usertasks');
        db.bind('usertasks');
        db.usertasks.find({userid : userid}, {targetLocation : true}, function(err, cursor) {
            if(!err) {
                cursor.toArray(callback);
            }
        });
    },
    // findNearbyTargetPoints: function(userid, coordinates, callback) {
    //     var datetime = new Date().getTime();
    //     console.log(coordinates['longitude'], coordinates['latitude']);
    //     db.collection('usertasks');
    //     db.bind('usertasks');
    //     db.usertasks.find({userid : userid, active : 1, notified : {$lt : datetime - 3600000}, 
    //         $and : [{targetLocation: {"$within" : {"$center" : 
    //         [[parseFloat(coordinates['longitude']), parseFloat(coordinates['latitude'])], 0.014] }}},
    //         {"places.location": {"$within" : {"$center" : 
    //         [[parseFloat(coordinates['longitude']), parseFloat(coordinates['latitude'])], 0.014] }}}]}, 
    //         function(err, cursor) {
    //         if(!err) {
    //             cursor.toArray(callback);
    //         }
    //     });
    // },
    findNearbyTargetPoints: function(userid, coordinates, callback) {
        var datetime = new Date().getTime();
        db.collection('usertasks');
        db.bind('usertasks');        
        db.usertasks.find({userid : userid, active : 1, notified : {$lt : datetime - 3600000}, 
           targetLocation : {"$within" : {"$center" : 
            [[parseFloat(coordinates['longitude']), parseFloat(coordinates['latitude'])], 0.014] }}}, 
            function(err, cursor) {
            if(!err) {
                cursor.toArray(callback);
            }
        });
    },
    findNearByPlaces: function(userid, coordinates, callback) {
        var datetime = new Date().getTime();
        console.log('coordinates ' + parseFloat(coordinates['longitude']) + 
            parseFloat(coordinates['latitude']));
        
        db.collection('usertasks');
        db.bind('usertasks');
        db.usertasks.find({userid : userid, active : 1, notified : {$lt : datetime - 3600000}, 
            "places.location": {"$within" : {"$center" : 
            [[parseFloat(coordinates['longitude']), parseFloat(coordinates['latitude'])], 5] }}}, 

            function(err, cursor) {
            if(!err) {
                cursor.toArray(callback);
            } else {
                callback(err);
            }
        });
    },

    updateCoordiantes: function(userid, id, callback) {
        var datetime = new Date().getTime();
        db.collection('usertasks');
        db.bind('usertasks');
        db.usertasks.update({"_id" : id}, 
            {$set :{notified : datetime}}, function(err, result) {
            if(!err) {
                callback(null, result);
            } else {
                callback(err);
            }
        });
    },
    storePlaces: function(task, callback) {
        db.collection('usertasks');
        db.bind('usertasks');
        db.usertasks.ensureIndex({"places.location": "2d"}, { w: 0 });
        db.usertasks.insert(task, function(err, resultJson) {
            if(!err) {
                callback(null, resultJson);
            } else {
                callback(err);
            }
        });
    }

}