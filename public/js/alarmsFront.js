//alarmsFront.js
$(document).ready(function() {
   //$('div.thedialog').dialog({ autoOpen: false })
   $('.icon-wrench').click(function(){$("#myModal").modal('show');});
});

function activeclick(elem){
    console.log('The ID of the element which triggered this is: #' + elem.id);
    $(".active").toggleClass("active");
    $(jq(elem.id)).toggleClass("active");
    //TODO refresh alarms
    //TODO Redraw Graphs
}

function jq(myid) {
   return '#' + myid.replace(/(:|\.)/g,'\\$1');
}