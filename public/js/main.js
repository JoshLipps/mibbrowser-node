$(document).ready(function() {
  $('#files').change(handleFileSelect);
  //This is so that filebutton works well
  $('input[id=files]').change(function() {
     $('#mibfile').val($(this).prop("files.0.name"));
  });
});

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
    oidquery = $("#oid").val();

    //TODO use jquery to find all selected oids
    //TODO add support for multiple oids

    $.get('/api/',{host:hostquery,community:communityquery,oid:oidquery}, function(data){
        $(".oidoutput").text(data);
    });
}
