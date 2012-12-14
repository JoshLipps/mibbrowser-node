//alarmsFront.js


$(document).ready(function() {
   //TODO Get first device 
   var firstDevice = "snmp.yawnneko.com"
   $('.icon-wrench').click(function(){$("#myModal").modal('show');});
   $('.icon-remove').live('click', removeOIDRow);
   //fillModal(firstDevice);
   google.setOnLoadCallback(drawCharts(firstDevice));
   });

//Draw all charts for a device
function drawCharts(device){
	$.get('api/host',{hostname:device},function(host){
		//console.log("Device:"+device+" "+host);
		host.alarms.forEach(function (ele,index,array){
			//add div 
			var chartDiv = '<h3>OID: '+ele.oid+'</h3><div id="chart_div'+index+'"></div>';
			$('#charts').append(chartDiv);
			drawChart(device.hostname,ele.oid,index);
		});
	});
}

function drawChart(hostname,oid,index) {
	var data = new google.visualization.DataTable(),	
 	options = {title: 'Device Performance'},
 	chart = new google.visualization.LineChart(document.getElementById('chart_div'+index)),
 	dateFormat = new google.visualization.DateFormat({pattern: "h:mm aa, EEE"});	

 	
 	data.addColumn('date', 'Time');
	data.addColumn('number', 'Value');

	//setInterval('updateChart()', 5000 );
	$.get('/api/history/',{hostname:'thor.yawnneko.com',oid:'.1.3.6.1.2.1.1.3.0'},function(res){
		for(var i=0;i<res.length;i++){res[i][0]=new Date(res[i][0]);}
		data.addRows(res);
		dateFormat.format(data, 0);
		chart.draw(data, options);
	});
	}

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
	$.get('api/host',{hostname:id},function(data){
		$('#hostname').val(data.hostname);
		$('#community').val(data.community);
		$('#port').val(data.port);
		for(var j=0;j<data.alarms.length;j++){
			var alarm = data.alarms[j];
			$("#oids").append('<tr >'+
				'<td><input class="input-small" type="text" name="oid" value="'+alarm.oid+'""></td>'+
				'<td><input class="input-small" type="text" name="error" value="'+alarm.error+'""></td>'+
				'<td><input class="input-small" type="text" name="emsg" value="'+alarm.errormsg+'""></td>'+
				'<td><input class="input-small" type="text" name="warn" value="'+alarm.warn+'""></td>'+
				'<td><input class="input-small" type="text" name="wmsg" value="'+alarm.warnmsg+'""></td>'+
				'<td><input class="input-small" type="text" name="clear" value="'+alarm.clear+'""></td>'+
				'<td><input class="input-small" type="text" name="cmsg" value="'+alarm.clearmsg+'""></td>'+
				'<td><i class="icon-remove"></i></td>'+
				'</tr>');
		}
	});
}

function addOidRow(){
		$("#oids").append('<tr>'+
			'<td><input class="input-small" type="text" name="oid"></td>'+
			'<td><input class="input-small" type="text" name="error"></td>'+
			'<td><input class="input-small" type="text" name="emsg"></td>'+
			'<td><input class="input-small" type="text" name="warn"></td>'+
			'<td><input class="input-small" type="text" name="wmsg"></td>'+
			'<td><input class="input-small" type="text" name="clear"></td>'+
			'<td><input class="input-small" type="text" name="cmsg"></td>'+
			'<td><i class="icon-remove"></i></td>'+
			'</tr>');
}

function removeOIDRow(){
	//console.log("Remove Row");
	$(this).parents('tr').remove();	
}

function jq(myid) {
   return '#' + myid.replace(/(:|\.)/g,'\\$1');
}


function postHost() {
    var host = {};
    host.hostname = $('#hostname').val();
	host.community = $('#community').val();
	host.port = $('#port').val();
	host.alarms = [];
	//for()

    console.log(host);
    //$.post("/postHost", )
}
