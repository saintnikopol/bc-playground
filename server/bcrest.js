var http = require("http");
var https = require("https");



/*
//"options" example

var options = {
    host: 'somesite.com',
    port: 443,
    path: '/some/path',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
};*/

/**
 * usage
 */

/*
rest.getJSON(options, function(statusCode, result) {
    // I could work with the result html/json here.  I could also just return it
    console.log("onResult: (" + statusCode + ")" + JSON.stringify(result));
    res.statusCode = statusCode;
    res.send(result);
});
*/

/**
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */
exports.getJSONCallback = function(options, onResult)
{
    console.log("rest::getJSON");

    var port = options.port == 443 ? https : http;
    var req = port.request(options, function(res)
    {
        var outputArray = [];
        console.log(options.host + ':' + res.statusCode);
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            outputArray.push(chunk);
        });

        res.on('end', function() {
            var obj = JSON.parse(outputArray.join(''));
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        //res.send('error: ' + err.message);
    });

    req.end();
};

const EMPTY_RESPONSE = [];
exports.getJSONPromise = function(options)
{
    return new Promise(function (fullfiled, rejected) {
        console.log("rest::getJSON");

        var port = options.port == 443 ? https : http;
        var req = port.request(options, function(res)
        {
            var outputArray = [];
            console.log(options.host + ':' + res.statusCode);
            res.setEncoding('utf8');

            res.on('data', function (chunk) {
                outputArray.push(chunk);
            });

            res.on('end', function() {
                if (res.statusCode == 200) {
                    var obj = JSON.parse(outputArray.join(''));
                    fullfiled(obj);
                } else {
                    fullfiled(EMPTY_RESPONSE);
                }
            });
        });

        req.on('error', function(err) {
        console.log(`call to peer ${options.host} failed`, err);
            fullfiled(EMPTY_RESPONSE);
        });

        req.end();

    });
};