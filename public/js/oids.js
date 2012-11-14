var oid;

oid = (function(name,type,oid,attrubites){
	//add validation;
	//rethink how oids are represented maybe should be full oid not relative
	this.name = name;
	this.type = type;
	this.oid = oid;
	this.attrubites = attrubites;
	this.children = [];
	//optionalArg = (typeof optionalArg === "undefined") ? "defaultValue" : optionalArg

	function addChild(oid){
		this.children.push(oid);
	}
	function getRoot(){
		//iso(1) identified-organization(3)
		var root = new oid("iso","OID",1,[]);
		root.addChild(new oid("identified-organization","OID",3,[]));
		return root;
	}


});