var storage = {};
var Parse = require('parse').Parse;
Parse.initialize("WWzS7Nm93MNV0TTkWszfRZscRqeEBGJHjHI2843H", "d97a4aIYt8ygfw6kfEuOUUb5FrfTQT8L1kvx0ZJO");

storage.save = function () {

};

storage._internalMethod = function () {

};


for (var method in storage) {
    if (!method.match(/^_(.*)/)) {
        exports[method] = storage[method];
    }
}
