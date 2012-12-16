//alarmsFront.js

var numberOfAlarms = 0; //lawl
//var selectOptions;

$(document).ready(function() {
   var firstDevice = window.location.hash ? 
      window.location.hash.replace('#', '') : "snmp.yawnneko.com";

   $('.icon-wrench').click(function(){$("#myModal").modal('show');});
   $('.icon-remove').live('click', removeOIDRow);
   //fillModal(firstDevice);
   google.setOnLoadCallback(activeclick(document.getElementById(firstDevice)));
});

//Draw all charts for a device
function drawCharts(device){
	$.get('api/host',{hostname:device},function(host){
		//console.log("Device:"+device+" "+host);
		host.alarms.forEach(function (ele,index,array){
			//add div 
			$.getJSON("/api/supportedOids", function(data){
				data.forEach(function(oidname){
					var chartDiv;
					if(oidname.oid==ele.oid){
						chartDiv = '<h4 id="chartDivLabel'+index+'">'+oidname.name+'</h4><div id="chartDiv'+index+'"></div>';
						$('#charts').append(chartDiv);
						drawChart(device,ele.oid,index);
					}
				});
			});
		});
	});
}

function drawChart(hostname,oid,index) {
 	//console.log(hostname+index);
	var data = new google.visualization.DataTable(),	
 	options = {is3D: true,'fill': 30,'legend': 'none'},
 	chart = new google.visualization.LineChart(document.getElementById('chartDiv'+index)),
 	dateFormat = new google.visualization.DateFormat({pattern: "h:mm aa, EEE"});	


 	data.addColumn('date', 'Time');
	data.addColumn('number', 'Value');
	data.addColumn('number', 'Error');
	data.addColumn('number', 'Warning');
	data.addColumn('number', 'Clear');

	//setInterval('updateChart()', 5000 );
	$.get('/api/history/',{hostname:hostname,oid:oid},function(res){
		for(var i=0;i<res.length;i++){res[i][0]=new Date(res[i][0]);}
		data.addRows(res);
		dateFormat.format(data, 0);
		chart.draw(data, options);
	});
	}
//Host list item clicked on 
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
function newHost(){
	clearModal();
	$("#myModal").modal('show');
}
function clearModal(){
	$("#oids").children().remove();
	$('#hostname').val("");
	$('#community').val('public');
	$('#port').val(161);
	addOidRow();
}


function reDrawGraphs(host){
	$("#charts").children().remove();
	//console.log(host);
	drawCharts(host);
}

function redrawAlarms(id){
	$("#alarms").children().remove();
	$.get('/api/Events',{device:id}, function(data){
    	for(var i=0;i<data.length;i++){
    		$("#alarms").append('<tr class="'+data[i].state+'" >'+
    			'<td><a href="/devices#'+data[i].device+'"> '+data[i].device+'</a></td>'+
            	'<td> '+data[i].alarmname+'</td>'+
            	'<td> '+data[i].state+'</td>'+
            	'<td> '+data[i].description+'</td>'+
            	'<td> '+data[i].value+'</td>'+
            	'<td> '+new Date(data[i].datestamp)+'</td> </tr>');

    	}
    });
}

function fillModal(id){
	$("#oids").children().remove();
	$.get('api/host',{hostname:id},function(data){
		$('#hostname').val(data.hostname);
		$('#community').val(data.community);
		$('#port').val(data.port);
		data.alarms.forEach(function (alarm,index,array){
			var errorstate="",warningstate="",clearstate="";
            eval(alarm.state+"state='selected'");

			$("#oids").append('<tr >'+
				'<td><select id="oidsSelector'+index+'" class="input-small" type="text" name="oid"></td>'+
				'<td><input class="input-small input-num" type="text" name="error" value="'+alarm.error+'""></td>'+
				'<td><input class="input-small" type="text" name="errormsg" value="'+alarm.errormsg+'""></td>'+
				'<td><input class="input-small input-num" type="text" name="warn" value="'+alarm.warn+'""></td>'+
				'<td><input class="input-small" type="text" name="warnmsg" value="'+alarm.warnmsg+'""></td>'+
				'<td><input class="input-small input-num" type="text" name="clear" value="'+alarm.clear+'""></td>'+
				'<td><input class="input-small" type="text" name="clearmsg" value="'+alarm.clearmsg+'""></td>'+
				'<td><select id="state" name="state">'+
                    '<option value="clear" '+clearstate+'>Clear</option>'+
					'<option value="warning" '+warningstate+'>Warning</option>'+
					'<option value="error" '+errorstate+'>Error</option>'+
				'</select> </td>'+
				'<td><i class="icon-remove"></i></td>'+
				'</tr>');
            fillOidsSelector(index, alarm.oid); 

		});
        numberOfAlarms = data.alarms.length;
	});
}

function addOidRow(){
	$("#oids").append('<tr>'+
		'<td><select id="oidsSelector'+numberOfAlarms+'" class="input-small" type="text" name="oid"></select></td>'+
		'<td><input class="input-small input-num" type="text" name="error"></td>'+
		'<td><input class="input-small" type="text" name="errormsg"></td>'+
		'<td><input class="input-small input-num" type="text" name="warn"></td>'+
		'<td><input class="input-small" type="text" name="warnmsg"></td>'+
		'<td><input class="input-small input-num" type="text" name="clear"></td>'+
		'<td><input class="input-small" type="text" name="clearmsg"></td>'+
		'<td><select id="state" name="state">'+
				'<option value="clear">Clear</option>'+
				'<option value="warning">Warning</option>'+
				'<option value="error">Error</option>'+
			'</select> </td>'+
		'<td><i class="icon-remove"></i></td>'+
		'</tr>');
    fillOidsSelector(numberOfAlarms, "");
    numberOfAlarms++;
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
		oid['oid'] = $(row).find('#oidsSelector'+rowIndex).val();
		oid['state'] = $(row).find('#state').val();
		host.alarms[rowIndex]=oid;
	});

    //console.log(host);
    $.post("api/host",host);
}

function deleteHost() {
    alert("Lucky you, this doesn't do anything yet.");
}

function fillOidsSelector(index, oid) {
	//commented out becaue otherwise it doesn't select properly accross devices
    //if(typeof(selectOptions) === 'undefined') {
       var selectOptions="";
        $.getJSON("/api/supportedOids", function(data){
            for(var i=0; i < data.length; i++) {
                selectOptions+="<option value="+data[i].oid
                    +(data[i].oid === oid?" selected ":"")
                    +">"+data[i].name+"</option>\n";
            }
			//console.log("index "+ index+ "alarm.oid" +oid);
            $("#oidsSelector"+index).append(selectOptions);
        });
    //} else { $("#oidsSelector"+index).append(selectOptions); }
}
