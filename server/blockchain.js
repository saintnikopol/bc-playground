let hash = require("hash.js");

let sha256 = hash.sha256();

// let signatureExample = sha256.update('abc').digest();
// console.log("let signatureExample = sha256.update('abc').digest(); signatureExample  === ", signatureExample );


class Block {
    constructor(index, timestamp, data, previousHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.hash_block();
    }

    hash_block () {
        sha256.update('' +
            this.index +
            this.timestamp +
            this.data +
            this.previousHash);
        return sha256.digest('hex');
    }
}

function getDateNow() {
    return Date.now();
}

function generateGenesisBlock() {
    // # Manually construct a block with
    // # index zero and arbitrary previous hash
    return new Block(0, getDateNow(), "Genesis Block", "0")
}

function generateNextBlock({index, hash}) {
    let thisIndex = index + 1,
        thisTimestamp = getDateNow(),
        thisData = "Hey! I'm block " + index,
        thisHash = hash;
    return new Block(thisIndex, thisTimestamp, thisData, thisHash);
}

/*
// Transaction:
{
    "from": "71238uqirbfh894-random-public-key-a-alkjdflakjfewn204ij",
    "to": "93j4ivnqiopvh43-random-public-key-b-qjrgvnoeirbnferinfo",
    "amount": 3
}

*/


function boot() {
    // # Create the blockchain and add the genesis block

    let blockchain = [generateGenesisBlock()];
    let previousBlock = blockchain[0];

    // # How many blocks should we add to the chain
    // # after the genesis block

    let numOfBlocksToAdd = 20;
    for (let i = 0; i < numOfBlocksToAdd; i++) {
        let blockToAdd = generateNextBlock(previousBlock);
        blockchain.push(blockToAdd);
        previousBlock = blockToAdd;
        // # Tell everyone about it!
        console.log(`Block #${blockToAdd.index} has been added to the blockchain!`);
        console.log(`Hash: ${blockToAdd.hash}\n`);
    }
}

// main();


let bc = {Block, generateGenesisBlock, generateNextBlock, boot};
module.exports = bc;
