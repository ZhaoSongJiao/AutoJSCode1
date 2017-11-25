function CreateInsert(tablename, params) {

    var paramlength = params.length;
    var i = 0;
    var theinsertvar = "\n";
    for (i = 0; i < params.length; i++) {
        theinsertvar = theinsertvar + "var " + params[i].getName() + " = request.body." + params[i].getName() + ";\n";
    }
    var theInsertSqlName = "insert into " + tablename + "(";
    for (i = 0; i < paramlength; i++) {
        if (i == paramlength - 1) {
            theInsertSqlName = theInsertSqlName + params[i].getName() + ") "
        } else {
            theInsertSqlName = theInsertSqlName + params[i].getName() + ","
        }
    }
    var theInsertSqlValue = "values(";
    for (i = 0; i < paramlength; i++) {
        if (i == paramlength - 1) {
            theInsertSqlValue = theInsertSqlValue + "@" + params[i].getName() + ") "
        } else {
            theInsertSqlValue = theInsertSqlValue + "@" + params[i].getName() + ","
        }
    }

    var theInsertSql = theInsertSqlName + theInsertSqlValue;

    var allParameter = "";
    for (i = 0; i < paramlength; i++) {
        var aParameter = " req.addParameter(\"" + params[i].getName() + "\",TYPES." + params[i].getTedisType() + "," + params[i].getName() + ");\n";
        allParameter += aParameter;
    }


    var theInsertBase =
        "exports.insertA" + tablename + "=function (request, callback) {\n" +
        theinsertvar +
        "    var sql=\"" + theInsertSql + "\"\n" +
        "    var req=new Request(sql,function (err, rowCount, rows) {\n" +
        "        if(err)\n" +
        "        {\n" +
        "            console.log(\"error in the insert request the " + tablename + "\")\n" +
        "            callback(err,rowCount,rows)\n" +
        "        }\n" +
        "        else\n" +
        "        {\n" +
        "            if(rowCount>0)\n" +
        "            {\n" +
        "                console.log(\"insert " + tablename + " success\")\n" +
        "                callback(null,rowCount,rows)\n" +
        "            }\n" +
        "            else\n" +
        "            {\n" +
        "                console.log(\"insert error\")\n" +
        "                callback(null,rowCount,rows)\n" +
        "            }\n" +
        "        }\n" +
        "    });\n" +
        "\n" +
        "    dbc.getConnect(function (err, con) {\n" +
        "        if(err)\n" +
        "        {\n" +
        "            console.log(\"insert data error\")\n" +
        "        }\n" +
        "        else\n" +
        "        {\n" +
        allParameter +
        "\n" +
        "            con.execSql(req);\n" +
        "            console.log(\"insert a " + tablename + "data to database finish\")\n" +
        "        }\n" +
        "    })\n" +
        "\n" +
        "}\n" +
        "\n"

    return theInsertBase;
}


function CreateGetADetailData(tablename, params) {
    var getADataBase =
        "/**\n" +
        " * 通过ID查询一个客户信息\n" +
        " */\n" +
        "exports.getA" + tablename + "ById=function (request, callback) {\n" +
        "    var sql=\"select * from " + tablename + " where uuid=@uuidid\";\n" +
        "    var uuid=request.body.uuid;\n" +
        "    console.log(\"Id:\"+id);\n" +
        "    var req=new Request(sql,function (err,rowCount,rows) {\n" +
        "        if(err)\n" +
        "        {\n" +
        "            console.log(\"request中出现了问题\")\n" +
        "            callback(err,null,null)\n" +
        "        }\n" +
        "        else\n" +
        "        {\n" +
        "            callback(null,rowCount,rows)\n" +
        "        }\n" +
        "    })\n" +
        "\n" +
        "    dbc.getConnect(function (err,con) {\n" +
        "        if(err)\n" +
        "        {\n" +
        "            /*console.log(err)\n" +
        "            console.log(\"连接出现了问题\")*/\n" +
        "            callback(err,null)\n" +
        "        }\n" +
        "        else\n" +
        "        {\n" +
        "            console.log(\"开始进行执行\");\n" +
        "            req.addParameter(\"uuid\",TYPES.NVarChar,uuid);\n" +
        "            con.execSql(req)\n" +
        "            console.log(\"执行结束\");\n" +
        "        }\n" +
        "    })\n" +
        "}\n" +
        "\n" +
        "\n"
    return getADataBase
}


function CreateUpdateAData(tablename, params) {
    var paramlength = params.length;

    var theupdatevar = "\n";
    for (i = 0; i < params.length; i++) {
        theupdatevar = theupdatevar + "var " + params[i].getName() + " = request.body." + params[i].getName() + ";\n";
    }
    var allParameter = "";
    for (i = 0; i < paramlength; i++) {
        var aParameter = " req.addParameter(\"" + params[i].getName() + "\"," + params[i].getTedisType() + "," + params[i].getName() + ");\n";
        allParameter += aParameter;
    }
    var theupdatesql = "update " + tablename + " set "
    for (i = 0; i < paramlength; i++) {

        if (i == paramlength - 1) {
            theupdatesql = theupdatesql + " " + params[i].getName() + "=@" + params[i].getName() + " "
        } else {
            theupdatesql = theupdatesql + " " + params[i].getName() + "=@" + params[i].getName() + ","
        }
    }
    theupdatesql = theupdatesql + " where uuid=@uuid"


    var theupdatebase =
        "exports.UpdateA" + tablename + "=function (request, callback) {\n" +
        theupdatevar +
        "\n" +
        "    var sql=\"" + theupdatesql + "\"\n" +
        "    var req=new Request(sql,function (err, rowCount, rows) {\n" +
        "        if(err)\n" +
        "        {\n" +
        "            console.log(\"error in the insert request the Consigner\")\n" +
        "            callback(err,rowCount,rows)\n" +
        "        }\n" +
        "        else\n" +
        "        {\n" +
        "            if(rowCount>0)\n" +
        "            {\n" +
        "                console.log(\"update success\")\n" +
        "                callback(null,rowCount,rows)\n" +
        "            }\n" +
        "            else\n" +
        "            {\n" +
        "                console.log(\"update error\")\n" +
        "                callback(null,rowCount,rows)\n" +
        "            }\n" +
        "        }\n" +
        "    });\n" +
        "\n" +
        "    dbc.getConnect(function (err, con) {\n" +
        "        if(err)\n" +
        "        {\n" +
        "           callback(err,null)\n" +
        "        }\n" +
        "        else\n" +
        "        {\n" +
        allParameter
        +
        "            con.execSql(req);\n" +
        "            console.log(\"insert a  data to database finish\")\n" +
        "        }\n" +
        "    })\n" +
        "\n" +
        "}\n" +
        "\n"

    return theupdatebase;
}


function CreateDeleteAData(tablename, params) {

    var deleteBase =
        "exports.Delete" + tablename + "ByID=function (request, callback) {\n" +
        "    var sql=\"delete from  " + tablename + " where uuid=@uuid\";\n" +
        "    var uuid=request.body.uuid;\n" +
        "    var req=new Request(sql,function (err,rowCount,rows) {\n" +
        "        if(err)\n" +
        "        {\n" +
        "            callback(err,null,null)\n" +
        "        }\n" +
        "        else\n" +
        "        {\n" +
        "            callback(null,rowCount,rows)\n" +
        "        }\n" +
        "    })\n" +
        "\n" +
        "    dbc.getConnect(function (err,con) {\n" +
        "        if(err)\n" +
        "        {\n" +
        "            callback(err,null,null)\n" +
        "        }\n" +
        "        else\n" +
        "        {\n" +
        "            console.log(\"开始进行执行\");\n" +
        "            req.addParameter(\"uuid\",TYPES.NVarChar,uuid);\n" +
        "            con.execSql(req)\n" +
        "            console.log(\"执行结束\");\n" +
        "        }\n" +
        "    })\n" +
        "}"
    return deleteBase;
}

function CreateSelectAllData(tablename, params) {
    var showAll =
        "exports.showAll" + tablename + "=function (request, callback) {\n" +
        "    var sql=\"select * from " + tablename + "\"\n" +
        "    var req=new Request(sql,function (err,rowCount,rows) {\n" +
        "        if(err)\n" +
        "        {\n" +
        "            console.log(\"request " + tablename + "中出现了问题\")\n" +
        "        }\n" +
        "        else\n" +
        "        {\n" +
        "\n" +
        "            callback(err,rowCount,rows)\n" +
        "        }\n" +
        "    })\n" +
        "\n" +
        "    dbc.getConnect(function (err,con) {\n" +
        "        if(err)\n" +
        "        {\n" +
        "            console.log(err)\n" +
        "            console.log(\"连接出现了问题\")\n" +
        "        }\n" +
        "        else\n" +
        "        {\n" +
        "            console.log(\"开始进行执行\");\n" +
        "            con.execSql(req)\n" +
        "            console.log(\"执行结束\");\n" +
        "        }\n" +
        "    })\n" +
        "}\n" +
        "\n";
    return showAll;
}


function BackTemplete(tablename, params, dbclocation) {
    //../dbc/sqlDB
    var baseString =
        "var Request = require('tedious').Request;\n" +
        "var TYPES = require('tedious').TYPES;\n" +
        "var dbc=require('" + dbclocation + "')  //sqlDB已经执行了操作\n" +
        "\n"

    baseString += CreateInsert(tablename, params);
    baseString += "\n";
    baseString += CreateGetADetailData(tablename, params);
    baseString += "\n";
    baseString += CreateUpdateAData(tablename, params);
    baseString += "\n";
    baseString += CreateDeleteAData(tablename, params);
    baseString += "\n";
    baseString += CreateSelectAllData(tablename, params);
    baseString += "\n";






    return baseString;

}

module.exports = {
    createByAllTemplete: BackTemplete
}
