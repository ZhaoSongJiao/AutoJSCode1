var fs = require('fs');
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

function getConnect(callBack) {
    if (!global.sqlCon || global.sqlCon.closed) {
        var path=__dirname
        fs.readFile(path+'/db.json', function (err, data) {
            if (err) {
                callBack(err);
                return;
            }
            else {
                var config = JSON.parse(data);
                global.sqlCon = new Connection(config);
                global.sqlCon.on('connect', function (err) {
                    if (err) {
                        callBack(err);
                    }
                    else callBack(null,global.sqlCon);
                });

            }
        });
    }
 else callBack(null,global.sqlCon);
}

module.exports = {
    getConnect: getConnect
};


