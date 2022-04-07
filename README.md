# NodeJS SDK for the TelePay API

TelePay client library for NodeJS, so you can easely process cryptocurrency payments using the REST API.

## Installation

Install the package with **npm**:

```bash
npm install telepay-node
```

Install the package with **yarn**:

```bash
yarn add telepay-node
```

## Using the library

Refer to the [TelePay Docs](https://telepay.readme.io) and follow the [first steps guide](https://telepay.readme.io/reference/first-steps), you'll get your TelePay account and API key.

To make requests to the TelePay API, you need to import the client.

**Import and use the client**

```javascript
const Telepay = require("telepay-node")

const telepay = new Telepay(secret_api_key)
```

## API endpoints

The API endpoints are documented in the [TelePay documentation](https://telepay.readme.io/reference/endpoints), refer to that pages to know more about them.

**<u>Every method returns a Promise.</u>**

**getMe**

Info about the current merchant. [Read docs](https://telepay.readme.io/reference/getme).

```javascript
telepay.getMe()
```

**getBalance**

Get your merchant wallet assets with corresponding balance. [Read docs](https://telepay.readme.io/reference/getbalance)

```javascript
telepay.getBalance()
```

**getAssets**

Get assets supported by TelePay. [Read docs](https://telepay.readme.io/reference/getassets).

```javascript
telepay.getAssets()
```
**getInvoices**

Get your merchant invoices. [Read docs](https://telepay.readme.io/reference/getinvoices).

```javascript
telepay.getInvoices()
```
**getInvoice**

Get invoice details, by ID. [Read docs](https://telepay.readme.io/reference/getinvoice).

```javascript
telepay.getInvoice(number)
```
**createInvoice**

Creates an invoice, associated to your merchant. [Read docs](https://telepay.readme.io/reference/createinvoice).

```javascript
telepay.createInvoice(asset,blockchain,network,amount,description,metadata, success_url, cancel_url, expires_at)
```
**transfer**

Transfer funds between internal wallets. Off-chain operation. [Read docs](https://telepay.readme.io/reference/transfer).

```javascript
telepay.transfer(asset, blockchain, network, amount, username, message)
```
**getWithdrawFee**

Get estimated withdraw fee, composed of blockchain fee and processing fee. [Read docs](https://telepay.readme.io/reference/getWithdrawFee).

```javascript
telepay.transfer(asset, blockchain, network, amount, to_address, message)
```
**withdraw**

Withdraw funds from merchant wallet to external wallet. On-chain operation.[Read docs](https://telepay.readme.io/reference/withdraw).

```javascript
telepay.withdraw(asset, blockchain, network, amount, to_address, message)
```

## ToDo
* Webhooks
