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
    addItem :function(tasks, callback) {
        db.collection('usertasks');
        db.bind('usertasks');
        db.usertasks.insert(tasks, function(err, document) {
            if(!err) {
                callback(null, "user taks insertion completed !");
            }
        });

    }
}