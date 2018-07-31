var request = require('request');

function createTransaction (fromAddress, toAddress, amount, peerUrl) {
    // Send a post request
    return new Promise(function (fullfiled, rejected) {
        request.post(
            // ...to the provided url
            peerUrl,
            {
                // ...in JSON
                json: {
                    from: fromAddress,
                    to: toAddress,
                    amount: amount
                }
            },
            function (error, response, responseBody) {
                //@NOTE: use "=="
                if (!error && response.statusCode == 200) {
                    fullfiled(responseBody);
                } else {
                    rejected(error);
                }
            }
        );
    });
}

export default {createTransaction};