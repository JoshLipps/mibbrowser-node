//mib-to-json test tile using vows test framework

var vows = require('vows'),
    assert = require('assert'),
	mibtojson = require('../public/javascripts/mib-to-json.js').mibtojson; 

var parse = mibtojson.parse(""); //parse function from mib-to-json.js

vows.describe('MIB to JSON').addBatch({
    'A MIB to be imported': {
        'that\'s empty': {
        	topic : parse,
        	'is an empty JSON object': function (topic) {    
                assert.equal(topic,"{}");
            }
        } 
    }
}).export(module); // Export the Suite

