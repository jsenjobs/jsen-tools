const publicKey =
`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCxEqmltFO9dek0h2YdvLPzpDDl
tovO8gvg0QbLgipJSM3cpjHDuL8U/bK1iXYFibEWF9gABm2G5c2mlHdz/4Pbof5u
HyNkMAS1NnNweos6JZ2Rnra9H96lkEQir+x7+D59n+ougVafzz8AG/rWAPb8ie5f
4ZwQfBSOXk6LLkVG8QIDAQAB
-----END PUBLIC KEY-----`;
const crypto = require("crypto")
const eccrypto = require("eccrypto")

exports.encodeData = function(data) {
    data = new Buffer(data, 'utf-8')
    let en = crypto.publicEncrypt(publicKey, data)
    return en.toString('base64')
}

exports.decodeData = function(data, pK) {
    try{
        data = new Buffer(data, 'base64')
        let de = crypto.privateDecrypt(pK, data)
        return de.toString('utf-8')
    } catch(e) {
        return null
    }
}

