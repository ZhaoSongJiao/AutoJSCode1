var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var dbc = require('../DatabaseConnection/sqlDB')  //sqlDB已经执行了操作
var showdatas = {}

function getAllSQLServerTableNames(callback) {
    var sql = "SELECT NAME FROM  sysobjects t WHERE t.xtype='U'"
    var req = new Request(sql, function (err, rowCount, rows) {

        if (err) {
            console.log("request中出现了问题")
        }
        else {
            callback(err, rowCount, rows)
        }
    })


    console.log("start connection")
    dbc.getConnect(function (err,con) {
        if(err)
        {
            console.log(err)
            console.log("连接出现了问题")
        }
        else
        {
            console.log("开始进行执行");
            con.execSql(req)
            console.log("执行结束");
        }
    })
}


function getAllTableNames(callback) {

    getAllSQLServerTableNames(function (err, rowCount, rows) {
        if(rows)
        {
            var listdata=new Array();
            var i=0;
            for(i=0;i<rows.length;i++)
            {
                var adata=rows[i]
                listdata.push(adata.NAME.value)
            }
            callback(null,listdata);
        }
        else
        {
            console.log("查找不到数据库中的数据")
            callback(err,null)
        }
    })


}


module.exports={
    getRowTableName:getAllSQLServerTableNames,
    getCheckedTableName:getAllTableNames
}
















