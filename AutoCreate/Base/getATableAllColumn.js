var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var dbcpool=require('../DatabaseConnection/connectionpool')
var model=require('./ColumnEntity')

function getAllColomnByTableName(tablename,callback) {
    var sql="select a.name ColumnName,b.name ColumnType,a.max_length MaxLength,a.precision,a.scale " +
        "from sys.columns a left join sys.types b on a.user_type_id=b.user_type_id " +
        "where a.object_id=object_id(@tablename)"
    var req = new Request(sql, function (err, rowCount, rows) {
        if (err) {
            console.log(tablename+"  request中出现了问题")
            console.log(err)
        }
        else {
            callback(err, rowCount, rows)
        }
    })
    dbcpool.getConnect(function (err,con) {
        if(err)
        {
            console.log(err)
            console.log("连接出现了问题")
        }
        else
        {
            console.log("开始进行"+tablename+"执行");
            req.addParameter("tablename",TYPES.NVarChar,tablename);
            con.execSql(req)
            console.log("执行结束");
        }
    })
}

function getCheckedColumnNames(tablename,callback)
{


    getAllColomnByTableName(tablename,function (err, rowCount, rows) {
        if(rows) {
            var length = rowCount;
            var i = 0;
            var listColumn = new Array();
            for (i = 0; i < rowCount; i++) {
                var acolumn = rows[i];
                var columnname = acolumn.ColumnName.value;
                var columntype = acolumn.ColumnType.value;
                var columnMaxLength = acolumn.MaxLength.value;
                var entity = new model.entity(columnname, columntype, columnMaxLength);
                listColumn.push(entity)
                //console.log(entity.toString())
            }
            callback(null,listColumn)
        }
        else
        {
            callback(err,null)
        }

    })
}

module.exports={
    getRowColumn:getAllColomnByTableName,
    getEntityColum:getCheckedColumnNames
}

/*
getCheckedColumnNames("getAddition",function (err, rowCount, rows) {

    console.log("success get Addition")


})
*/


/*getAllColomnByTableName("getAddition",function (err, rowCount, rows) {
    console.log("execute success")

    console.log(rows)
})*/





