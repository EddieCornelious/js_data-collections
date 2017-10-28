var List = require('./List.js');
var Stack = require('./Stack.js');
var Queue = require('./Queue.js');

Array.prototype.SWAG = function (){
    return "This is where I can place shims";
};

module.exports = { List, Stack, Queue };

