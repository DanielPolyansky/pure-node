const request = require('request');

request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDHTIPj1Oj_Zk7LTUQ-noopkGg6OeU8_uo',
    json: true
}, (err, res, body) => {
    console.log(JSON.stringify(body, undefined, 1));
});