const express =  require('express')
const router = express.Router()
const image = require('../model/image')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const req = require('express/lib/request')
const res = require('express/lib/response')
const url = require('url')
const fetch = require('node-fetch');
const { json } = require('express/lib/response')
const API_KEY = 'hbPI98qcSZPnpfEc3dotY6dwhGTAdulho7LD91ve'

var unirest = require('unirest');

router.get('/:word',async (req,res) =>{
    const word = req.params.word;
    url_string = 'https://wordsapiv1.p.rapidapi.com/words/' + word;

    unirest.get(url_string)
  .header("x-rapidapi-key","ab6326c243msh045c0cd30db2756p181542jsn75541c105ae2")
  .end(function (result) {
    res.send(result.body.pronunciation);
    res.send(result.body.partOfSpeech);
    console.log(result.status, result.headers, result.body);
  });
});



module.exports = router