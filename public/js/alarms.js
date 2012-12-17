$(document).ready(function(){
    getNewAlarms();
    setInterval("getNewAlarms()", 30000);
});

function getNewAlarms() {
    var i, eventsHTML = "", now = new Date();
    $.getJSON("api/events", {datestamp:now.setSeconds(now.getSeconds()-30)}, function(events){
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
        //if (eventsHTML !== "") console.log("Events added.");
    });
}