var oids = (function(name,type,oid,attributes){
	this.name = name;
	this.type = type;
	this.oid = oid;
	this.attributes = attributes;
	this.children = []; 
})