global.fetch = require('node-fetch')
const cc = require('cryptocompare')

let twit = require('twit');
let config = require('./config.js');

let Twitter = new twit(config);

async function FetchPrice() {
    try {
        const BTCUSDData = await cc.price('BTC', ['USD']);
        const BCHUSDData = await cc.price('BCH', ['USD']);
        const BCHBTCData = await cc.price('BCH', ['BTC']);
        const ETHBTCData = await cc.price('ETH', ['BTC']);
        const BCHETHData = await cc.price('BCH', ['ETH']);
        const USDTUSDData = await cc.price('USDT', ['USD']);
        return 'USDTUSD Price: ' + USDTUSDData.USD + 'USDT/USD\n' + 'BTCUSD Price: ' + BTCUSDData.USD + ' USD/BTC\n' + 'BCHUSD Price: ' + BCHUSDData.USD + ' USD/BCH\n' + 'BCHBTC Price: ' + BCHBTCData.BTC + ' BCH/BTC\n' + 'ETHBTC Price: ' + ETHBTCData.BTC + ' ETH/BTC\n' + 'BCHETH Price: ' + BCHETHData.ETH + 'BCH/ETH';
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
