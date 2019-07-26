import { AbiItem } from 'web3-utils';

export default [
    {
        constant: true,
        inputs: [],
        name: 'oracle',
        outputs: [
            {
                name: '',
                type: 'address',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            {
                name: '_oracle',
                type: 'address',
            },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: 'id',
                type: 'bytes32',
            },
            {
                indexed: false,
                name: 'url',
                type: 'string',
            },
        ],
        name: 'DataRequestedFromOracle',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                name: 'id',
                type: 'bytes32',
            },
            {
                indexed: false,
                name: 'value',
                type: 'string',
            },
            {
                indexed: false,
                name: 'errorCode',
                type: 'uint256',
            },
        ],
        name: 'DataReadFromOracle',
        type: 'event',
    },
    {
        constant: false,
        inputs: [
            {
                name: '_url',
                type: 'string',
            },
        ],
        name: 'request',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                name: '_url',
                type: 'string',
            },
            {
                name: '_delay',
                type: 'uint256',
            },
        ],
        name: 'delayedRequest',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                name: '_id',
                type: 'bytes32',
            },
            {
                name: '_value',
                type: 'string',
            },
            {
                name: '_errorCode',
                type: 'uint256',
            },
        ],
        name: '__callback',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
] as AbiItem[];
