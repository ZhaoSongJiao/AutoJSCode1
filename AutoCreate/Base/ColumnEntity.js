class  ColumnEntity{

    constructor(name,type,maxlength)
    {
        this.name=name;
        this.type=type;
        this.maxlength=maxlength;
    }

    getName()
    {
        return this.name;
    }
    getType()
    {
        return this.type;
    }
    getMaxLength()
    {
        return this.maxlength;
    }
    getTedisType()
    {
        switch (this.getType())
        {
            case "varchar": return "NvarChar";
            case "money": return "Money";
            case "int": return "Int";
            default:return "NvarChar"
        }
    }

    toString()
    {
        return "name:"+this.getName()+"|type:"+this.getType()+"|maxLength:"+this.getMaxLength()+"|tedioustype:"+this.getTedisType()
    }
    

}


module.exports={
    entity:ColumnEntity
}