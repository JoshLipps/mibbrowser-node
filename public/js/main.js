$(document).ready(function() {
    displayMib2();
    //$().toggleclass();
});

//event handler for file button
function handleFileSelect(evt) {
    var files = evt.target.files, // FileList object
    file = files[0],
    read =  new FileReader();

    read.onload = (function(theFile) {
        return function(e) {
            var mib = mibtojson.parse(e.target.result),i;
            for(i=0;i<mib.length;i++){
                mib[i] ="<div>"+mib[i]+"</div>";
            }

            $("#list").append(mib);
            //console.log(e.target.result);
        };
    }(file));
    read.readAsText(file);
}

function toGetAPI(){
    var hostquery = $("#host").val(),
    communityquery = $("#community").val(),
    oidquery = $("#oid").val(),
    actionquery=$("#action").val();

    //TODO use jquery to find all selected oids
    //TODO add support for multiple oids
    //TODO add multipule command support
    $.get('/api/',{host:hostquery,community:communityquery,oid:oidquery,action:actionquery}, function(data){
        $(".oidoutput").prepend("<p>"+data+"</p>");//append oid get commands
    });
}
function oidclick(elem){
    console.log('The ID of the element which triggered this is: ' + elem.id);
    $("#oid").val("."+elem.id);
}

function displayMib2(){
    $.get('/api/mib2',function(data){
                    printOID(data.mib2);
    });
}

function printOID(ou){
     //console.log(JSON.stringify(ou.children));
     //console.log();
     var pad = ou.oid.split(".").length;
     if(ou.children.length>0){
        $('.mibtree').append('<div id="'+ou.oid+'" onclick="oidclick(this)" class ="pad'+ pad +'">'+'<i class="icon-plus"/> '+ ou.name);
     }
     else
        $('.mibtree').append('<div id="'+ou.oid+'" onclick="oidclick(this)" class ="pad'+ pad +'">'+'<i class="icon-leaf"/> '+ ou.name);
     
     ou.children.forEach(function(element,index,array){if(element){printOID(element);}});
     $('.mibtree').append("</div>");
}
