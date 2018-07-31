let hash = require("hash.js");
let bcrest = require("./bcrest");

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
    return new Block(0, getDateNow(), "Genesis Block", "0");
}

function generateNextBlock({index, hash}) {
    let thisIndex = index + 1,
        thisTimestamp = getDateNow(),
        thisData = "Hey! I'm block " + index,
        thisHash = hash;
    return new Block(thisIndex, thisTimestamp, thisData, thisHash);
}

function proofOfWork (lastProof) {
    // # Create a variable that we will use to find
    // # our next proof of work
    let incrementor = lastProof + 1;
    // # Keep incrementing the incrementor until
    // # it's equal to a number divisible by 9
    // # and the proof of work of the previous
    // # block in the chain
    while (!(incrementor % 9 === 0) && incrementor %lastProof === 0) {
        incrementor++;
    }
    // while not (incrementor % 9 == 0 and incrementor % last_proof == 0):
    // incrementor += 1
    // # Once that number is found,
    //     # we can return it as a proof
    // # of our work
    return incrementor;

}


function peerOptionsProvider(peer = 'localhost') {
    return {
        host: peer,
        port: 443,
        path: '/blocks',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
}

/**
 * Fetch chains from other peer nodes
 *
 * @param Array peerNodes
 * @returns {Promise<any[]>}
 */
function findNewChains(peerNodes) {
    // # Get the blockchains of every
    // # other node
    return Promise.all(peerNodes.map(
        bcrest.getJSONPromise(peerOptionsProvider)
    ));
}

/**
 * Fetch chains from other peer and return consesus chain
 *
 * @param blockchain
 * @param peerNodes
 * @returns {PromiseLike<T> | Promise<T> | *}
 */
function consensus(blockchain, peerNodes) {
    // # Get the blocks from other nodes
    return findNewChains(peerNodes).then(otherChains => {
        // # If our chain isn't longest,
        // # then we store the longest chain
        let longestChain = blockchain;

        // for chain in other_chains:
        otherChains.forEach(chain => {
            if (longestChain.length < chain.length) {
                longestChain = chain;
            }
        });

        // # If the longest chain isn't ours,
        // # then we stop mining and set
        // # our chain to the longest one
        blockchain = longestChain;

        return blockchain;
    });
}

/*
// Transaction:
{
    "from": "71238uqirbfh894-random-public-key-a-alkjdflakjfewn204ij",
    "to": "93j4ivnqiopvh43-random-public-key-b-qjrgvnoeirbnferinfo",
    "amount": 3
}

*/

// def mine():
// # Get the last proof of work
function mine(thisNodesTransactions, blockchain, minerAddress) {
    let lastBlock = blockchain[blockchain.length - 1];
    let lastProof = lastBlock.data['proof-of-work'];

    // # Find the proof of work for
    //     # the current block being mined
    // # Note: The program will hang here until a new
    // #       proof of work is found
    let proof = proofOfWork(lastProof);
    // # Once we find a valid proof of work,
    //     # we know we can mine a block so
    // # we reward the miner by adding a transaction
    thisNodesTransactions.append(
        { "from": "network", "to": minerAddress, "amount": 1 }
    );
    // # Now we can gather the data needed
    // # to create the new block

    let newBlockData = {
        "proof-of-work": proof,
        //@NOTE: Make array copy,
        // cause original thisNodesTransactions will be emptied later
        "transactions": thisNodesTransactions.map(item => item),
    };
    let newBlockIndex = lastBlock.index + 1;
    let thisTimestamp = getDateNow();
    let newBlockTimestamp = thisTimestamp;
    let lastBlockHash = lastBlock.hash;

    // # Empty transaction list
    // thisNodesTransactions[:] = []
    thisNodesTransactions.splice(0);
    // # Now create the
    // # new block!

    let minedBlock = Block(
        newBlockIndex,
        newBlockTimestamp,
        newBlockData,
        lastBlockHash,
    );

    blockchain.append(minedBlock);

    // # Let the client know we mined a block
    return {
        "index": newBlockIndex,
        "timestamp": newBlockTimestamp,
        "data": newBlockData,
        "hash": lastBlockHash,
    }

}

function boot() {
    // # Create the blockchain and add the genesis block

    let blockchain = [generateGenesisBlock()];
    // let previousBlock = blockchain[0];

    // # How many blocks should we add to the chain
    // # after the genesis block

/*
    let numOfBlocksToAdd = 20;
    for (let i = 0; i < numOfBlocksToAdd; i++) {
        let blockToAdd = generateNextBlock(previousBlock);
        blockchain.push(blockToAdd);
        previousBlock = blockToAdd;
        // # Tell everyone about it!
        console.log(`Block #${blockToAdd.index} has been added to the blockchain!`);
        console.log(`Hash: ${blockToAdd.hash}\n`);
    }
*/
    return blockchain;
}

// main();


let bc = {Block, generateGenesisBlock, generateNextBlock, boot, mine};
module.exports = bc;
