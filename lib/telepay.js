const DEFAULT_API_HOST = 'api.telepay.cash/rest'
const axios = require('axios')

class Telepay {
        #axios
        /**
         * @link Docs: https://telepay.readme.io/reference/
         * @param {string} auth_token Your merchant private API key.
         * @throws Error if API key Token is undefined
         */
        constructor(auth_token) {
                if (!auth_token) {
                        throw new Error("API Key is undefined")
                }
                this.axios = axios.create({
                        baseURL: DEFAULT_API_HOST,
                        headers: {
                                "AUTHORIZATION": auth_token
                        }
                })
        }

        /**
         * Info about the current merchant
         * @link Docs: https://telepay.readme.io/reference/getme
         * @returns {Promise} Promise
         *
         * @example{
                "version": "1.0",
                "merchant": {
                        "name": "Liduco",
                        "url": "https://liduco.com",
                        "logo_url": "https://ik.imagekit.io/telepay/merchants/liduco_AOz_dl3bR.png",
                        "logo_thumbnail_url": "https://ik.imagekit.io/telepay/tr:n-media_library_thumbnail/merchants/liduco_AOz_dl3bR.png",
                        "owner": {
                                "first_name": "Carlos",
                                "last_name": "Lugones",
                                "username": null
                        }
                }
        }      
        */

        getMe=()=> this.axios.get("/getMe")
        
        

        /**
         * Get your merchant wallet assets with corresponding balance
         * @link Docs: https://telepay.readme.io/reference/getbalance
         * @returns {Promise} Promise
         * @example {
                "wallets": [
                        {
                                "asset": "TON",
                                "blockchain": "TON",
                                "balance": 0
                        }
                ]
        }
         */
        getBalance=()=>this.axios.get("/getBalance")
        
        
        /**
         * Get assets suported by TelePay
         * @link Docs: https://telepay.readme.io/reference/getassets
         * @returns {Promise} Promise
         * @example
        {
                "assets": [
                        {
                                "asset": "TON",
                                "blockchain": "TON",
                                "url": "https://ton.org",
                                "networks": [
                                        "mainnet",
                                        "testnet"
                                ]
                        }
                ]
        }
         */
        getAssets=()=>this.axios.get("/getAssets")
        
        
        /**
         * Get your merchant invoices
         * @link Docs: https://telepay.readme.io/reference/getinvoices
         * @returns {Promise} Promise
         * @example{
                "invoices": [
                        {
                                "number": "PUEOS5RFQY",
                                "asset": "TON",
                                "blockchain": "TON",
                                "status": "pending",
                                "amount": "10.000000000000000000",
                                "description": "Producto",
                                "hidden_message": "https://lugodev.com",
                                "metadata": null,
                                "created_at": "2022-02-26T18:11:06.843599Z",
                                "updated_at": null
                        }
                ]
        }
         */
        getInvoices =()=> this.axios.get("/getInvoices")
        
        
        
        /**
         * Get invoice details, by ID
         * @link Docs: https://telepay.readme.io/reference/getinvoice
         * @param {number} invoice_id The ID of the invoice
         * @returns {Promise} Promise
         * @example{
                "version": "1.0",
                "invoices": [
                        {
                                "number": "PUEOS5RFQY",
                                "asset": "TON",
                                "blockchain": "TON",
                                "status": "pending",
                                "amount": "10.000000000000000000",
                                "description": "Producto",
                                "hidden_message": "https://lugodev.com",
                                "metadata": null,
                                "created_at": "2022-02-26T18:11:06.843599Z",
                                "updated_at": null
                        }
                ]
        }
        */
        getInvoice = (invoice_number)=>{
                if (typeof invoice_id!='number') {
                        throw new Error("The Invoice Number is not valid")
                }
                return this.axios.get(`/getInvoice/${invoice_number}`)
        }
        

        /**
         * Creates an invoice, associated to your merchant
         *
         * @link Docs: https://telepay.readme.io/reference/createinvoice
         * @param {string} asset REQUIRED The invoice asset
         * @param {string} blockchain REQUIRED The invoice blockchain, on on which the asset is located
         * @param {string} network REQUIRED The blockchain network, on which the asset is located. Examples: "testnet" and "mainnet" in TON.
         * @param {double} amount REQUIRED The invoice amount.
         * @param {string} [description] The invoice description.
         * @param {json} [metadata] The invoice attached metadata.
         * @param {string} [success_url] The URL to which the user is redirected to when the invoice is completed.
         * @param {string} [cancel_url] The URL to which the user is redirected to when the invoice is cancelled.
         * @param {int32} [expires_at] Minutes to invoice expiration. If not defined, default is 600 minutes (10 hours).
         * @returns {Promise} Promise
         * 
         * @example {
                "number": "FFU4OXKDBA",
                "asset": "TON",
                "blockchain": "TON",
                "network": "mainnet",
                "status": "pending",
                "amount": "5.000000000000000000",
                "description": "A product to test invoices",
                "hidden_message": null,
                "metadata": {
                        "color": "red",
                        "size": "large"
                },
                "checkout_url": "http://localhost:3000/checkout/FFU4OXKDBA",
                "success_url": "https://example.com/success",
                "cancel_url": "https://example.com/cancel",
                "explorer_url": null,
                "expires_at": "2022-03-30T00:29:23.626498Z",
                "created_at": "2022-03-29T23:59:23.626575Z",
                "updated_at": null
        }
         */

        createInvoice = (asset, blockchain, network, amount, description="", metadata="", success_url="", cancel_url="", expires_at=600)=>{
                if (typeof asset!='string' && asset.length===0) {
                        throw new Error('Asset is not correct')
                }
                if (typeof blockchain!='string' && blockchain.length===0) {
                        throw new Error('Blockchain is not correct')
                }
                if (typeof network!='string' && network.length===0) {
                        throw new Error('Network is not correct')
                }
                if (typeof amount!=number && amount > 0) {
                        throw new Error('Amount is not correct')
                }
                return this.axios.post("/createInvoice", {
                        asset, 
                        blockchain, 
                        network, 
                        amount, 
                        description, 
                        metadata, 
                        success_url, 
                        cancel_url, 
                        expires_at
                })
        }
        
        /**
         * Transfer funds between internal wallets. Off-chain operation.
         * @link Docs: https://telepay.readme.io/reference/transfer
         * @param {string} asset REQUIRED The asset to transfer
         * @param {string} blockchain REQUIRED The blockchain on which the asset is located
         * @param {string} network REQUIRED The blockchain network on which the asset is located
         * @param {string} amount REQUIRED The amount to transfer
         * @param {string} username REQUIRED The username of the destination merchant or user. Example: lugodev.
         * @param {string} [message] Optional message attached to the transfer, visible to the destination merchant or user.
         * @returns {Promise} Promise
         * @example {
                "success": true
        }
        */

        transfer = (asset, blockchain, network, amount, username, message="")=>{
                if (typeof asset!='string' && asset.length===0) {
                        throw new Error('Asset is not correct')
                }
                if (typeof blockchain!='string' && blockchain.length===0) {
                        throw new Error('Blockchain is not correct')
                }
                if (typeof network!='string' && network.length===0) {
                        throw new Error('Network is not correct')
                }
                if (typeof amount!=number && amount > 0) {
                        throw new Error('Amount is not correct')
                }
                if (typeof username!='string' && asset.length===0) {
                        throw new Error('Username is not correct')
                }
                return this.axios.post("/transfer", {
                        asset, 
                        blockchain, 
                        network, 
                        amount, 
                        description, 
                        username,
                        message
                })
        }

        /**
         * Get estimated withdraw fee, composed of blockchain fee and processing fee.
         * @link Docs: https://telepay.readme.io/reference/getWithdrawFee
         * @param {string} asset REQUIRED The asset to estimate the feed from
         * @param {string} blockchain REQUIRED The blockchain on which the asset is located
         * @param {string} network REQUIRED The blockchain network on which the asset is located
         * @param {double} amount REQUIRED The amount to estimate the feed from
         * @param {string} to_address REQUIRED The destination wallet address to estimate the feed
         * @param {string} message Optional message or payload.
         * @returns {Promise} Promise
         * @example {
                "blockchain_fee": 0.00168,
                "processing_fee": 0.05,
                "total": 0.05168
        }
        */
        
        getWithdrawFee = (asset, blockchain, network, amount, to_address, message="")=>{
                if (typeof asset!='string' && asset.length===0) {
                        throw new Error('Asset is not correct')
                }
                if (typeof blockchain!='string' && blockchain.length===0) {
                        throw new Error('Blockchain is not correct')
                }
                if (typeof network!='string' && network.length===0) {
                        throw new Error('Network is not correct')
                }
                if (typeof amount!=number && amount > 0) {
                        throw new Error('Amount is not correct')
                }
                if (typeof to_address!='string' && asset.length===0) {
                        throw new Error('Address is not correct')
                }
                return this.axios.post("/getWithdrawFee", {
                        asset, 
                        blockchain, 
                        network, 
                        amount, 
                        description, 
                        to_address,
                        message
                })
        }

        /**
         * Withdraw funds from merchant wallet to external wallet. On-chain operation.
         * @link Docs: https://telepay.readme.io/reference/withdraw
         * @param {string} asset REQUIRED The asset to estimate the feed from
         * @param {string} blockchain REQUIRED The blockchain on which the asset is located
         * @param {string} network REQUIRED The blockchain network on which the asset is located
         * @param {double} amount REQUIRED The amount to estimate the feed from
         * @param {string} to_address REQUIRED The destination wallet address to estimate the feed
         * @param {string} message Optional message or payload.
         * @returns {Promise} Promise
         * @example {
                "success": true
        }
        */

        withdraw = (asset, blockchain, network, amount, to_address, message="")=>{
                if (typeof asset!='string' && asset.length===0) {
                        throw new Error('Asset is not correct')
                }
                if (typeof blockchain!='string' && blockchain.length===0) {
                        throw new Error('Blockchain is not correct')
                }
                if (typeof network!='string' && network.length===0) {
                        throw new Error('Network is not correct')
                }
                if (typeof amount!=number && amount > 0) {
                        throw new Error('Amount is not correct')
                }
                if (typeof to_address!='string' && asset.length===0) {
                        throw new Error('Address is not correct')
                }
                return this.axios.post("/withdraw", {
                        asset, 
                        blockchain, 
                        network, 
                        amount, 
                        description, 
                        to_address,
                        message
                })
        }

} 

module.exports = Telepay



