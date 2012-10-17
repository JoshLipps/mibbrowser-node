//mib-to-json test tile using vows test frameworks


var vows = require('vows'),
    assert = require('assert'),
	mibtojson = require('../public/js/mib-to-json.js').mibtojson; 

var mibSkel= [
    "RFC1213-MIB DEFINITIONS ::= BEGIN",
    "",
    "IMPORTS",
    "    experimental, OBJECT-TYPE, Counter",
    "                           FROM RFC1155-SMI;",
    "",
    "-- contact IANA for actual number",
    "root    OBJECT IDENTIFIER ::= { experimental xx } -- REMOVEME",
    "",
    "END"
];
var parseEmpty = mibtojson.parse(""); //parse function from mib-to-json.js
var parseSkel = mibtojson.parse(mibSkel);


vows.describe('MIB to JSON').addBatch({
    'A MIB to be imported that': {
        'is empty': {
        	topic : parseEmpty,
        	'is an empty JSON object': function(topic){    
                assert.isEmpty(topic);
            }
        },
        'is bare': {
            topic : parseSkel,
            'has no comments': function(topic){
                var re = /-{2}/; //regex to search for -- comments
                assert.isFalse(re.test(topic)); 
            },
            'has no inline comments': function(topic){
                var re = /-{2}/; //regex to search for -- comments
                assert.isFalse(re.test(topic));
            },
            'has no text from comments': function(topic){
                var re=/REMOVEME/;
                assert.isFalse(re.test(topic));
            }
        } 
    }
}).export(module); // Export the Suite

