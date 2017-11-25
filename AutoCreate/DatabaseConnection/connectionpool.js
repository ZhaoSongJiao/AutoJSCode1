var ConnectionPool = require('tedious-connection-pool');
var Request = require('tedious').Request;

var poolconfig={
    min:2,
    max:50,
    log:true
}

var connectconfig={
    "userName": "sa",
    "password": "sa",
    "server": "192.168.12.12",
    "options": {
    "port":"1435",
        "database": "auto",
        "useColumnNames": true,
        "rowCollectionOnRequestCompletion": true
}

}

var pool=new ConnectionPool(poolconfig,connectconfig);

function getConnectionFrompool(callback) {
    pool.acquire(function (err, connection) {
        if(err)
        {
            console.log(err)
            callback(err,null)
        }
        else
        {
            callback(null,connection)
        }
    })
}

module.exports={
    getConnection:getConnectionFrompool,
    getConnect:getConnectionFrompool
}









