//alarmsFront.js
$(document).ready(function() {
   //$('div.thedialog').dialog({ autoOpen: false })
   $('.icon-wrench').click(function(){$("#myModal").modal('show');});
   fillModal("thor.yawnneko.com");
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
	$("#oids").children().remove();
	$.get('api/Host',{hostname:id},function(data){
		$('#hostname').val(data.hostname);
		$('#community').val(data.community);
		$('#oid').val(data.oid);
		$('#port').val(data.port);
		for(var j=0;j<data.alarms.length;j++){
			var alarm = data.alarms[j];
			$("#oids").append('<tr >'+
				'<td><input class="input-small" type="text" value='+alarm.oid+'></td>'+
				'<td><input class="input-small" type="text" value='+alarm.error+'></td>'+
				'<td><input class="input-small" type="text" value='+alarm.errormsg+'></td>'+
				'<td><input class="input-small" type="text" value='+alarm.warn+'></td>'+
				'<td><input class="input-small" type="text" value='+alarm.warnmsg+'></td>'+
				'<td><input class="input-small" type="text" value='+alarm.clear+'></td>'+
				'<td><input class="input-small" type="text" value='+alarm.clearmsg+'></td>'+
				'</tr>');
		}
		$("#oids").append('<tr>'+
				'<td><input class="input-small" type="text"></td>'+
				'<td><input class="input-small" type="text"></td>'+
				'<td><input class="input-small" type="text"></td>'+
				'<td><input class="input-small" type="text"></td>'+
				'<td><input class="input-small" type="text"></td>'+
				'<td><input class="input-small" type="text"></td>'+
				'<td><input class="input-small" type="text"></td>'+
				'</tr>');

		//<td id="oid"><input type="text" id="" placeholder="yo"><td>
	});
}


function jq(myid) {
   return '#' + myid.replace(/(:|\.)/g,'\\$1');
}