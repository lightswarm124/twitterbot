global.fetch = require('node-fetch')
const cc = require('cryptocompare')

let twit = require('twit');
let config = require('./config.js');

let Twitter = new twit(config);
/*
let BTCUSDPrice = cc.price('BTC', ['USD'])
    .then(price => {
        console.log(price);
    })
    .catch(console.error);

let BCHUSDPrice = cc.price('BCH', ['USD'])
    .then(price => {
        console.log(price);
    })
    .catch(console.error);

let BCHBTCPrice = cc.price('BCH', ['BTC'])
    .then(price => {
        console.log(price);
    })
    .catch(console.error);

console.log(BTCUSDPrice, " ", BCHUSDPrice, " ", BCHBTCPrice);

let BCHUSDPrice = await cc.price('BCH', ['USD']);
let BCHBTCPrice = await cc.price('BCH', ['BTC']);
*/
async function FetchPrice() {
    try {
        const BTCUSDData = await cc.price('BTC', ['USD']);
        const BCHUSDData = await cc.price('BCH', ['USD']);
        const BCHBTCData = await cc.price('BCH', ['BTC']);
        return 'BTCUSD Price: ' + BTCUSDData.USD + ' USD/BTC\n' + 'BCHUSD Price: ' + BCHUSDData.USD + ' USD/BCH\n' + 'BCHBTC Price: ' + BCHBTCData.BTC + ' BCH/BTC';
    } catch (err) {
        console.log(err);
    }
}

FetchPrice().then(tweet => {
    Twitter.post('statuses/update', {
        status: tweet
    }, function(err, data, response) {
        console.log(data)
    })
});
