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
				'<td><input class="input-small" type="text" name="oid" value='+alarm.oid+'></td>'+
				'<td><input class="input-small" type="text" name="error" value='+alarm.error+'></td>'+
				'<td><input class="input-small" type="text" name="emsg" value='+alarm.errormsg+'></td>'+
				'<td><input class="input-small" type="text" name="warn" value='+alarm.warn+'></td>'+
				'<td><input class="input-small" type="text" name="wmsg" value='+alarm.warnmsg+'></td>'+
				'<td><input class="input-small" type="text" name="clear" value='+alarm.clear+'></td>'+
				'<td><input class="input-small" type="text" name="cmsg" value='+alarm.clearmsg+'></td>'+
				'</tr>');
		}
		$("#oids").append('<tr>'+
				'<td><input class="input-small" type="text" name="oid"></td>'+
				'<td><input class="input-small" type="text" name="error"></td>'+
				'<td><input class="input-small" type="text" name="emsg"></td>'+
				'<td><input class="input-small" type="text" name="warn"></td>'+
				'<td><input class="input-small" type="text" name="wmsg"></td>'+
				'<td><input class="input-small" type="text" name="clear"></td>'+
				'<td><input class="input-small" type="text" name="cmsg "></td>'+
				'</tr>');

		//<td id="oid"><input type="text" id="" placeholder="yo"><td>
	});
}


function jq(myid) {
   return '#' + myid.replace(/(:|\.)/g,'\\$1');
}

function postHost() {
    var postData;
    $('#oid[class="input-small"').each(function() {

    })
    //$.post("/postHost", )
}