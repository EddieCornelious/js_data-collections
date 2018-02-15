
import MapInterface from "./MapInterface.js";
import RBTree from "./RedBlackTree.js";

class Map extends MapInterface {
  constructor() {
    this.map = new RBTree();  
  }
  
  put(key, value) {
    return this.map.insert(key, value);
  }
  
  getVal(key) {
    return this.map.find(key);
  }
  
  remove(key) {
    return this.map.remove(key);
  }
  
  keys() {
    return this.map.keys();
  }
  
  contains(key) {
    return this.map.contains(key);
  }
  
  size() {
    return this.map.size();
  }
 
}
