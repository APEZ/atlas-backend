"use strict";
exports.__esModule = true;
var express_1 = require("express");
var fs = require("fs");
var app = express_1["default"]();
console.log(__dirname + '/controllers');
for (var file in fs.readdirSync(__dirname + '/controllers')) {
    var routes = require(__dirname + file);
    if (typeof routes['path'] === 'undefined')
        continue;
    if (typeof routes['get'] !== 'undefined')
        app.get(routes['path'], routes['get']);
    if (typeof routes['post'] !== 'undefined')
        app.post(routes['path'], routes['post']);
    if (typeof routes['put'] !== 'undefined')
        app.put(routes['path'], routes['put']);
    if (typeof routes['delete'] !== 'undefined')
        app["delete"](routes['path'], routes['delete']);
}
app.all('*', function (request, response) {
    response.status(404);
});
app.listen(8080);
// export const handler: serverless.Handler = serverless(app);
