$(document).ready(function() {
  $('#files').change(handleFileSelect);
  //document.getElementById('files').addEventListener('change', handleFileSelect, false);
  $("input[type=submit]").button().click(function( event ) {event.preventDefault();});
});

function handleFileSelect(evt) {
    var files = evt.target.files, // FileList object
    read =  new FileReader(),
    output = [],
    i,
    f;

    //
    for (i = 0, f; f = files[i]; i++){
        read.onload = (function(theFile) {
            return function(e) {
                var mib = mibtojson.parse(e.target.result);
                $("#list").text(mib);
                //console.log(e.target.result)//;
           };
        })(f);
        read.readAsText(f);
    }
}

function toGetAPI(){
    var hostin = $("#host").val();
    $.get('/api/',{host:hostin}, function(data){
        $("#list").text(data);
    });
}
