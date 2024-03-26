// node_modules/@babylonjs/core/Misc/typeStore.js
var _RegisteredTypes = {};
function RegisterClass(className, type) {
  _RegisteredTypes[className] = type;
}
function GetClass(fqdn) {
  return _RegisteredTypes[fqdn];
}

export {
  RegisterClass,
  GetClass
};
//# sourceMappingURL=chunk-AJT353ZC.js.map
