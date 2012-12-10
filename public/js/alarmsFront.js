//alarmsFront.js
$(document).ready(function() {
   //$('div.thedialog').dialog({ autoOpen: false })
   $('.icon-wrench').click(function(){$("#myModal").modal('show');});
});

function activeclick(elem){
    //console.log('The ID of the element which triggered this is: #' + elem.id);
    $(".active").toggleClass("active");
    $(jq(elem.id)).toggleClass("active");
    // refresh alarms
    redrawAlarms(elem.id);
    //TODO (Re)draw Graphs
    //TODO fillin modal
 	fillModal(elem.id); 
}
function redrawAlarms(id){
	$("#alarms").children().remove();
	$().get();
	$.get('/api/Events',{device:id}, function(data){
    	for(var i=0;i<data.length;i++){
    		$("#alarms").append('<tr class="'+data[i].state+'" >'+
    			'<td> '+data[i].device+'</td>'+
            	'<td> '+data[i].alarmname+'</td>'+
            	'<td> '+data[i].state+'</td>'+
            	'<td> '+data[i].description+'</td>'+
            	'<td> '+data[i].datestamp+'</td> </tr>');

    	}
    });
}
function fillModal(id){
	
}

function jq(myid) {
   return '#' + myid.replace(/(:|\.)/g,'\\$1');
}