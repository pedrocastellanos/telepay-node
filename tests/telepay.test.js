const axios = require('axios')
const Telepay = require('../lib/telepay')
jest.mock('axios');

test("Create Telepay Object without API Key", ()=>{
        expect(()=>{const telepay = new Telepay()}).toThrow('API Key is undefined')
})

