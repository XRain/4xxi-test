var module = {};

module.externalMethod = function () {

};

module._internalMethod = function () {

};


for (var method in module) {
    if (!method.match(/^_(.*)/)) {
        exports[method] = module[method];
    }
}
