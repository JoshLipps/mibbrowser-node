
var oid;

oid = (function(name,onum){
    //add validation;
    //rethink how oids are represented maybe should be full oid not relative
    this.name = name;
    //this.type = type;
    this.onum = onum;
    //this.attrubites = attrubites;
    this.children = [];
    //optionalArg = (typeof optionalArg === "undefined") ? "defaultValue" : optionalArg

    function addChild(oid){
        this.children.append(oid);
    }

    function getRoot(){
        //iso(1) identified-organization(3)
        var root = new oid("iso",1);
        root.addChild(new oid("identified-organization",1.3));
        return root;
    }
    function print(){
        var child =0;
        console.log(this.name);
        for(child=0;child<this.children;i++){
            this.children[child].print();
        }
    }

});