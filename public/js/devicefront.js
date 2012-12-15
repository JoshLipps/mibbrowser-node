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
			var chartDiv = '<h3>OID: '+ele.oid+'</h3><div id="'+device.split('.',1)[0]+index+'"></div>';
			$('#charts').append(chartDiv);
			drawChart(device,ele.oid,index);
		});
	});
}

function drawChart(hostname,oid,index) {
 	//console.log(hostname+index);
	var data = new google.visualization.DataTable(),	
 	options = {title: 'Device Performance'},
 	chartDiv = hostname.split('.',1)[0]+index,
 	chart = new google.visualization.LineChart(document.getElementById(chartDiv)),
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
    //(Re)draw Graphs
    reDrawGraphs(elem.id);
    //Fill in config modal
 	fillModal(elem.id); 
}

function reDrawGraphs(host){
	$("#charts").children().remove();
	console.log(host);
	drawCharts(host);
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
			var alarm = data.alarms[j],errorstate="",warningstate="",clearstate="";
			if(alarm.state=='error'){errorstate="selected"}
			else if(alarm.state=='warning'){warningstate="selected"}
			else{clearstate="selected"}

			$("#oids").append('<tr >'+
				'<td><input class="input-small" type="text" name="oid" value="'+alarm.oid+'""></td>'+
				'<td><input class="input-small input-num" type="text" name="error" value="'+alarm.error+'""></td>'+
				'<td><input class="input-small" type="text" name="errormsg" value="'+alarm.errormsg+'""></td>'+
				'<td><input class="input-small input-num" type="text" name="warn" value="'+alarm.warn+'""></td>'+
				'<td><input class="input-small" type="text" name="warnmsg" value="'+alarm.warnmsg+'""></td>'+
				'<td><input class="input-small input-num" type="text" name="clear" value="'+alarm.clear+'""></td>'+
				'<td><input class="input-small" type="text" name="clearmsg" value="'+alarm.clearmsg+'""></td>'+
				'<td><select name="state">'+
					'<option value="success"'+clearstate+'>Success</option>'+
					'<option value="warning"'+warningstate+'>Warning</option>'+
					'<option value="error"'+errorstate+'>Error</option>'+
				'</select> </td>'+
				'<td><i class="icon-remove"></i></td>'+
				'</tr>');
		}
	});
}

function addOidRow(){
		$("#oids").append('<tr>'+
			'<td><input class="input-small" type="text" name="oid"></td>'+
			'<td><input class="input-small input-num" type="text" name="error"></td>'+
			'<td><input class="input-small" type="text" name="errormsg"></td>'+
			'<td><input class="input-small input-num" type="text" name="warn"></td>'+
			'<td><input class="input-small" type="text" name="warnmsg"></td>'+
			'<td><input class="input-small input-num" type="text" name="clear"></td>'+
			'<td><input class="input-small" type="text" name="clearmsg"></td>'+
			'<td><select name="state">'+
					'<option value="success">Success</option>'+
					'<option value="warning">Warning</option>'+
					'<option value="error">Error</option>'+
				'</select> </td>'+
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

//Function to read in Modal and config host values
function postHost() {
    var host = {};
    //should i get host first? Probably;
    host.hostname = $('#hostname').val();
	host.community = $('#community').val();
	host.port = $('#port').val();
	host.alarms = [];
	//find allrows in CSS id oids
	$('#oids tr').each(function(rowIndex,row){
		var oid = {};
		//get input boxes in each row
		$(row).find('input').each(function(inpitIndex,input){
			var name = $(input).attr('name'),
			value = $(input).val();
			oid[name] = value;
		});
		//grab state dropdown
		oid['state'] = $(row).find('select').val();

		host.alarms[rowIndex]=oid;
	});

    //console.log(host);
    $.post("api/host",host);
}
