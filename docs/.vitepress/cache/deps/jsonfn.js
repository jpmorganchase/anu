import {
  __commonJS
} from "./chunk-CF3WPAMV.js";

// node_modules/jsonfn/jsonfn.js
var require_jsonfn = __commonJS({
  "node_modules/jsonfn/jsonfn.js"(exports, module) {
    var JSONfn;
    if (!JSONfn) {
      JSONfn = {};
    }
    (function() {
      JSONfn.stringify = function(obj) {
        return JSON.stringify(obj, function(key2, value2) {
          return typeof value2 === "function" ? value2.toString() : value2;
        });
      };
      JSONfn.parse = function(str) {
        return JSON.parse(str, function(key, value) {
          if (typeof value != "string")
            return value;
          return value.substring(0, 8) == "function" ? eval("(" + value + ")") : value;
        });
      };
    })();
    exports.JSONfn = JSONfn;
  }
});
export default require_jsonfn();
//# sourceMappingURL=jsonfn.js.map
