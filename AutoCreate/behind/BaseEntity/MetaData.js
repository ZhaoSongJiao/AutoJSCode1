var model = require("./BaseModel")

class MetaData extends model.Model {

    constructor(columnname, columntype, columnlength, tablename) {
        super();
        this.columnname = columnname;
        this.columntype = columntype;
        this.columnlength = columnlength;
        this.tablename = tablename;
        this.delsign=0;
        this.oldname="";
    }

    setUUID(uuid) {
        this.uuid = uuid
    }

    setDelsign(delsign) {
        this.delsign = delsign
    }

    setOldName(oldname) {
        this.oldname = this.oldname + oldname
    }

    setShowName(showname) {
        this.showname = showname;
    }

    setInputType(inputtype) {
        this.inputtype = inputtype;
    }

    getUUID()
    {
        return this.uuid
    }
    getColumnName()
    {
        return this.columnname;
    }
    getColumnType()
    {
        return this.columntype;
    }

    getDelsign()
    {
        return this.delsign;
    }

    getColumnLength()
    {
        return this.columnlength;
    }

    getTableName()
    {
        return this.tablename;
    }

    getShowName()
    {
        if(this.showname===null)
        {
            return this.getColumnName();
        }
        else
        {
            return this.showname;
        }
    }

    getInputType()
    {
        return this.inputtype;
    }

    getTedisType()
    {
        switch (this.getColumnType())
        {
            case "varchar": return "NvarChar";
            case "money": return "Money";
            case "int": return "Int";
            default:return "NvarChar"
        }
    }

}

module.exports={
    BaseMetaData:MetaData
}