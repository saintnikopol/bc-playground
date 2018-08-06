import React, { Component } from 'react';
import './App.css';

const PEERS = [
    'localhost:15100',
    'localhost:15101',
    'localhost:15102',
    'localhost:15103',
    'localhost:15104',
    'localhost:15105',
    'localhost:15106',
    'localhost:15107',
    'localhost:15108',
    'localhost:15109',
];

const MY_ADDRESS = '71238uqirbfh894-random-public-key-a-alkjdflakjfewn204ij';

const MOCK_TRANSACTIONS = [
    {
        'from': '71238uqirbfh894-random-public-key-a-alkjdflakjfewn204ij',
        'to': '93j4ivnqiopvh43-random-public-key-b-qjrgvnoeirbnferinfo',
        'amount': 3
    },

    {
        'from': '71238uqirbfh894-random-public-key-a-alkjdflakjfewn204ij',
        'to': '93j4ivnqiopvh43-random-public-key-b-qjrgvnoeirbnferinfo',
        'amount': 3
    },

    {
        'from': '71238uqirbfh894-random-public-key-a-alkjdflakjfewn204ij',
        'to': '93j4ivnqiopvh43-random-public-key-b-qjrgvnoeirbnferinfo',
        'amount': 3
    },

    {
        'from': '71238uqirbfh894-random-public-key-a-alkjdflakjfewn204ij',
        'to': '93j4ivnqiopvh43-random-public-key-b-qjrgvnoeirbnferinfo',
        'amount': 3
    },

    {
        'from': '71238uqirbfh894-random-public-key-a-alkjdflakjfewn204ij',
        'to': '93j4ivnqiopvh43-random-public-key-b-qjrgvnoeirbnferinfo',
        'amount': 3
    },

    {
        'from': '71238uqirbfh894-random-public-key-a-alkjdflakjfewn204ij',
        'to': '93j4ivnqiopvh43-random-public-key-b-qjrgvnoeirbnferinfo',
        'amount': 3
    },

    {
        'from': '71238uqirbfh894-random-public-key-a-alkjdflakjfewn204ij',
        'to': '93j4ivnqiopvh43-random-public-key-b-qjrgvnoeirbnferinfo',
        'amount': 3
    },

];

const MOCK_BLOCKS = [
    {
        "index": 1,
        "timestamp": new Date(),
        "data": 'ear9aemrfalefa0wamslfmawef',
        "hash": '3904maslfkmaselfamsfl',
    },

    {
        "index": 1,
        "timestamp": new Date(),
        "data": 'ear9aemrfalefa0wamslfmawef',
        "hash": '3904maslfkmaselfamsfl',
    },

    {
        "index": 1,
        "timestamp": new Date(),
        "data": 'ear9aemrfalefa0wamslfmawef',
        "hash": '3904maslfkmaselfamsfl',
    },

    {
        "index": 1,
        "timestamp": new Date(),
        "data": 'ear9aemrfalefa0wamslfmawef',
        "hash": '3904maslfkmaselfamsfl',
    },

    {
        "index": 1,
        "timestamp": new Date(),
        "data": 'ear9aemrfalefa0wamslfmawef',
        "hash": '3904maslfkmaselfamsfl',
    },

    {
        "index": 1,
        "timestamp": new Date(),
        "data": 'ear9aemrfalefa0wamslfmawef',
        "hash": '3904maslfkmaselfamsfl',
    },

    {
        "index": 1,
        "timestamp": new Date(),
        "data": 'ear9aemrfalefa0wamslfmawef',
        "hash": '3904maslfkmaselfamsfl',
    },

    {
        "index": 1,
        "timestamp": new Date(),
        "data": 'ear9aemrfalefa0wamslfmawef',
        "hash": '3904maslfkmaselfamsfl',
    },

    {
        "index": 1,
        "timestamp": new Date(),
        "data": 'ear9aemrfalefa0wamslfmawef',
        "hash": '3904maslfkmaselfamsfl',
    },

];

function Blocks ({blocks}) {
    //
    // {
    //     "index": newBlockIndex,
    //     "timestamp": newBlockTimestamp,
    //     "data": newBlockData,
    //     "hash": lastBlockHash,
    // }
    return (
        <ul>
            {blocks.map((index, timestamp, hash) =>
                <li>
                    <b>{index}</b> <i>{timestamp}</i>
                    <span>{hash}</span>
                </li>)}

        </ul>
    );
}

function Peers ({peers}) {
    //
    // {
    //     "index": newBlockIndex,
    //     "timestamp": newBlockTimestamp,
    //     "data": newBlockData,
    //     "hash": lastBlockHash,
    // }
    return (
        <ul>
            {peers.map((address, lastindex, ping) =>
                <li>
                    <span> {address} </span>
                    <b>{lastindex} blocks</b>
                    <i>{ping} ms</i>
                </li>
            )}
        </ul>
    );
}

/*
function Transactions(transactions) {
    //
    // {
    //     "index": newBlockIndex,
    //     "timestamp": newBlockTimestamp,
    //     "data": newBlockData,
    //     "hash": lastBlockHash,
    // }
    return (
        <ul>
            {transactions.map(({from, to, amount, timestamp}) =>
                <li>
                    <span> {address} </span>
                    <b>{lastindex} blocks</b>
                    <i>{ping} ms</i>
                </li>
            )}
        </ul>
    );
}
*/

function InOrOut ({from, to}, baseAddress) {
    let operationClass = 'circle-none';
    if (baseAddress === from) {
        operationClass = 'circle-red';
    } else if (baseAddress === to) {
        operationClass = 'circle-green';
    }
    return <div className={operationClass}/>;
}

function BalanceChange ({from, to, amount}, baseAddress) {
    let operationClass = '';
    let sign = '';
    if (baseAddress === from) {
        sign = '-';
        operationClass = 'color-red';
    } else if (baseAddress === to) {
        sign = '+';
        operationClass = 'color-green';
    }
    return <div className={operationClass}>{sign} {amount}</div>;
}

function TransactionAddress ({from, to, amount}, baseAddress) {
    let address = '';
    if (baseAddress === from) {
        address = to;
    } else if (baseAddress === to) {
        address = from;
    }
    return <span>{address}</span>;
}

function DateOfTransaction (timestamp) {
    return <span>{timestamp}</span>;
}

function TransactionsForAddress (transactions, baseAddress) {
    //
    // {
    //     "index": newBlockIndex,
    //     "timestamp": newBlockTimestamp,
    //     "data": newBlockData,
    //     "hash": lastBlockHash,
    // }
    return (
        <ul>
            {transactions
                .filter(({from, to}) => from === baseAddress || to === baseAddress)
                .map(({from, to, amount, timestamp}) =>
                    <li>
                        <DateOfTransaction timestamp={timestamp}/>
                        <InOrOut transaction={transactions} baseAdress={baseAddress}/>
                        <TransactionAddress transaction={transactions} baseAdress={baseAddress}/>
                        <BalanceChange transaction={transactions} baseAdress={baseAddress}/>
                    </li>
                )}
        </ul>
    );
}

class App extends Component {
    constructor (props) {
        super();
        this.state = {
            blocks: MOCK_BLOCKS,
            peers: PEERS,
            transactions: MOCK_TRANSACTIONS.map(item => {
                item.timestamp = new Date();
                return item;
            }),
            baseAddress: MY_ADDRESS,
        };
    }

    render () {
        return (
            <div className="App">
                <Peers peers={this.state.peers}/>
                <Blocks blocks={this.state.blocks}/>
                <TransactionsForAddress transactions={this.state.transactions} baseAddress={this.state.baseAddress}/>
            </div>
        );
    }
}

export default App;
