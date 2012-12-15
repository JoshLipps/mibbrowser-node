
var oid;

objectID = function(name,oid){
    this.name = name;
    this.oid = oid;
    this.children = [];

    this.addaChild = function(child){
        var childOid = child.oid.replace(this.oid+".","").split(".",2);
        //console.log(childOid);
        if(childOid.length === 1){
            this.children[childOid]=child;
        }
        else{

            this.children[childOid[0]].addaChild(child);
        }
    };

    this.print = function(){
        console.log(this.name);
        this.children.forEach(function(element, index, array){element.print();});
    };

};



//console.log(JSON.stringify(oid));
//console.log(JSON.stringify(test));
exports.objectID = objectID;
