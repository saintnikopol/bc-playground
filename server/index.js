let Koa = require('koa');
let bodyParser = require('koa-bodyparser');
let route = require('koa-route');

let bc = require('./blockchain');

let thisNodeTransactions = [];

let blockchain = bc.boot();

let app = new Koa();
app.use(bodyParser());

let Transactions = {};
let mineAddress = "q3nf394hjg-random-miner-address-34nf3i4nflkn3oi";

// # Store the url data of every
// # other node in the network
// # so that we can communicate
// # with them

let peerNodes = [
    'peer1.local',
    'peer2.local',
    'peer3.local',
    'peer4.local',
    'peer5.local',
];

Transactions.isValid = function ({from, to, amount} = {}) {
    return from && to && amount;
};

Transactions.add = function (allTransaction, transaction) {
    allTransaction.push(transaction);
};


// # On each new POST request,
app.use(route.post('/txion', (ctx, next) => {
    let json_obj = ctx.request.body;
    console.log('Got POST request as json object: \n', json_obj);

    // # we extract the transaction data
    // # Then we add the transaction to our list
    if (Transactions.isValid(json_obj)) {
        let newTransaction = json_obj;
        Transactions.add(thisNodeTransactions, json_obj);
        // # Because the transaction was successfully
        // # submitted, we log it to our console
        console.log(`New transaction`);
        console.log(`FROM: ${newTransaction.from}`);
        console.log(`TO: ${newTransaction.to}`);
        console.log(`AMOUNT: ${newTransaction.amout}\n`);
        // # Then we let the client know it worked out
        ctx.body =  "Transaction submission successful\n";

    } else {
        ctx.body =  "Transaction failed\n";
    }
    // let responseJSON = {test: 'zzz', request: json_obj};
    // ctx.body = responseJSON;
}));

app.use(route.post('/mine', (ctx, next) => {
    // # Get the last proof of work
    // let lastBlock = blockchain[blockchain.length - 1];

    /**
     * Block description Object
     * @type {{index, timestamp, data, hash}}
     */
    let blockDescription = bc.mine(thisNodeTransactions, blockchain, mineAddress);
    ctx.body = blockDescription;

}));



app.use(route.get('/blocks', (ctx, next) => {
    // # Get the last proof of work
    // let lastBlock = blockchain[blockchain.length - 1];
    let chainToSend = blockchain;

    // # we can send blocks as json objects later
    let jsonResponse = JSON.stringify(chainToSend);
    // # Send our chain to whomever requested it
    ctx.body = jsonResponse;

}));



/*
// Debug only
app.use(async ctx => {
    // the parsed body will store in ctx.request.body
    // if nothing was parsed, body will be an empty object {}
    var json_obj = ctx.request.body;
    //
    console.log('Got json object: \n', json_obj);
    ctx.body = json_obj;
});
*/


app.listen(8080); //the server object listens on port 8080
