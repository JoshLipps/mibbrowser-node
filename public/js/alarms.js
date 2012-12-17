$(document).ready(function(){
    getNewAlarms(new Date());
    setInterval("getNewAlarms(new Date())", 10000);
});

function getNewAlarms(lastCheckTime) {
    var i, eventsHTML = "";
    $.getJSON("api/events", {datestamp:lastCheckTime.setSeconds(lastCheckTime.getSeconds()-10)}, function(events){
        for (i = 0; i<events.length; i++) {
            eventsHTML+= "<tr class=\""+events[i].state+"\">"
            +"<td><a href=\"/devices#"+events[i].device+"\">"+events[i].device+"</a></td>"
            +"<td>"+events[i].alarmname+"</td>"
            +"<td>"+events[i].state+"</td>"
            +"<td>"+events[i].description+"</td>"
            +"<td>"+events[i].value+"</td>"
            +"<td>"+new Date(events[i].datestamp)+"</td></tr>";
        }
        $("#alarms").prepend(eventsHTML);
        if (eventsHTML !== "") console.log("Events added.");
    });
}