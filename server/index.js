let Koa = require('koa');
let bodyParser = require('koa-bodyparser');
let route = require('koa-route');

let bc = require('./blockchain');

let thisNodeTransactions = [];

let blockchain = bc.boot();

let app = new Koa();
app.use(bodyParser());

let Transactions = {};
let mineAddress = "q3nf394hjg-random-miner-address-34nf3i4nflkn3oi"

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

app.use(route.post('/txion', (ctx, next) => {
    let lastBlock = blockchain[blockchain.length - 1];
    let blockDescription = bc.mine(thisNodeTransactions, blockchain, mineAddress);
    ctx.body = blockDescription;

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
