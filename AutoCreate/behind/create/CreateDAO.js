var fs=require("fs")
var getcolumns=require("../../Base/getATableAllColumn")
var gettables=require("../../Base/getAllTableName")
var daoTemplate=require("./CreateDAOTemplate")


function createADAOByTableName(tablename,callback) {

    getcolumns.getEntityColum(tablename,function (err,listcolumn) {
        var tablecolums=listcolumn;
        var i=0;
        var absdir=__dirname;
        console.log(absdir)
        var filename=absdir+"\\"+tablename+"DAO.js";
        console.log("newfilename:"+filename)
        fs.exists(filename,function(exist){
            if(exist)
            {
                var newfilename="old_"+filename;
                fs.rename(filename,newfilename,function(err){
                    if (err){
                        console.log("修改失败");
                        callback(err,null,null)
                    }else{
                        console.log("将原有文件"+filename+"移动到了"+newfilename)
                    }
                })
            }

            var templete=daoTemplate.createByAllTemplete(tablename,tablecolums,"../dbc/sqlDB")

            fs.writeFile(filename,templete,function (err) {
                if(err)
                {
                    console.log("写入文件"+filename+"失败了");
                    callback(err,null,null)
                }else{
                    console.log(filename+"写入成功")
                    callback(null,filename,"success")
                }
            })


        })
    })
    console.log(tablename+"写入完成")
}

function CreateAllDAO(callback)
{
        gettables.getCheckedTableName(function (err, listdata) {
            if(listdata)
            {
                var i=0;
                //console.log(listdata)
                for(i=0;i<listdata.length;i++)
                {
                       createADAOByTableName(listdata[i],function (err,filname,flag) {
                           console.log("在循环中"+filname+"执行结果:"+flag)
                       })
                }
                console.log("所有写入完成")
                callback();
            }
            else
            {
                console.log(err)
                callback()
            }
        })
}


CreateAllDAO(function () {
    console.log("all have done")
})

/*
createADAOByTableName("getAddition",function (err, filename, flag) {
    console.log(flag)
})
*/



