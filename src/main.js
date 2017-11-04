var List = require('./List.js');
var Stack = require('./Stack.js');
var Queue = require('./Queue.js');
var BHeap = require('./BHeap.js');
var PriorityQueue = require('./PriorityQueue.js');
var HashMap = require('./HashMap.js');
var BST = require('./BST.js');
var RBTree = require('./RedBlackTree.js');
var Set = require('./Set.js');
var Graph = require('./Graph.js');


Array.prototype.SWAG = function (){
    return "This is where I can place shims";
};

module.exports = { List, Stack, Queue, BHeap, PriorityQueue, HashMap, BST, RBTree, Set, Graph };

