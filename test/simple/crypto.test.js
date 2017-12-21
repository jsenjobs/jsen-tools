const crypto = require('crypto');

function testRsa() {
    const sign = crypto.createSign('sha256');
    sign.update('some data to sign');
    const privateKey =
`-----BEGIN PRIVATE KEY-----
MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALESqaW0U7116TSH
Zh28s/OkMOW2i87yC+DRBsuCKklIzdymMcO4vxT9srWJdgWJsRYX2AAGbYblzaaU
d3P/g9uh/m4fI2QwBLU2c3B6izolnZGetr0f3qWQRCKv7Hv4Pn2f6i6BVp/PPwAb
+tYA9vyJ7l/hnBB8FI5eTosuRUbxAgMBAAECgYAxiqcsVWeYeoTkzX0klMdEQ4vq
uUgkflQUcmcUSTbLijMOqPEDcY0EsnZtlCgRJJUHOWSVnTbHp0QCd0d0jOi2805e
K03jB7lc4l9yz0CxMppNEEkeH6NsZuZrWEuk7hB3sqIUxnN2YZR+8bz8kPb+BR3p
HpJ09a5NtaialcKkgQJBANp4cy4MWDtC6Hh/qx2j0/VIFedE6B1cK6Sg6BCdrf4h
+T6/QsSSUiNttJl714BHjN05cKekAAAO1ACaJfy0TsMCQQDPfbHCdR2GdHGpAVM7
H6+i/l4U9PtPVS8qXp5FL5HALdxZqM6T/t/rG3Oh065V+Az+E3OFFp5xs3mHY7/p
OmA7AkEAtQPKA2RtEqUMcxLtGADvFTNmGpoobHM7IgvEXEgZqxBBMPFOBAtsjThP
xEAtPXeLSp1WL0CeU2310I3oXaqT+wJAbBJk/wrvGPQXq1Z0WowzeCsTJ8k+CGEv
Ett7hj+zo6x/Y/fHuU/8o0GGJdjSqhZr9f59oelZF5HKj9lFwR3VtwJBANUfxsvn
w7jdxu5IX+Uexn/Zq0uYJG8ukZTmlE853I28pKzYh4noFBdjKcq46WREK21hnGIj
R94KT358rAcONas=
-----END PRIVATE KEY-----`;
    let sig = sign.sign(privateKey).toString('hex')
    console.log(sig);
    
    const verify = crypto.createVerify('RSA-SHA256');
    
    verify.write('some data to sign');
    verify.end();
    const publicKey =
`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCxEqmltFO9dek0h2YdvLPzpDDl
tovO8gvg0QbLgipJSM3cpjHDuL8U/bK1iXYFibEWF9gABm2G5c2mlHdz/4Pbof5u
HyNkMAS1NnNweos6JZ2Rnra9H96lkEQir+x7+D59n+ougVafzz8AG/rWAPb8ie5f
4ZwQfBSOXk6LLkVG8QIDAQAB
-----END PUBLIC KEY-----`;
    
    console.log(verify.verify(publicKey, sig, 'hex'));
}

function testRsa2() {
    const sign = crypto.createSign('RSA-SHA256');
    sign.update('some data to sign');
    const privateKey =
`-----BEGIN PRIVATE KEY-----
MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALESqaW0U7116TSH
Zh28s/OkMOW2i87yC+DRBsuCKklIzdymMcO4vxT9srWJdgWJsRYX2AAGbYblzaaU
d3P/g9uh/m4fI2QwBLU2c3B6izolnZGetr0f3qWQRCKv7Hv4Pn2f6i6BVp/PPwAb
+tYA9vyJ7l/hnBB8FI5eTosuRUbxAgMBAAECgYAxiqcsVWeYeoTkzX0klMdEQ4vq
uUgkflQUcmcUSTbLijMOqPEDcY0EsnZtlCgRJJUHOWSVnTbHp0QCd0d0jOi2805e
K03jB7lc4l9yz0CxMppNEEkeH6NsZuZrWEuk7hB3sqIUxnN2YZR+8bz8kPb+BR3p
HpJ09a5NtaialcKkgQJBANp4cy4MWDtC6Hh/qx2j0/VIFedE6B1cK6Sg6BCdrf4h
+T6/QsSSUiNttJl714BHjN05cKekAAAO1ACaJfy0TsMCQQDPfbHCdR2GdHGpAVM7
H6+i/l4U9PtPVS8qXp5FL5HALdxZqM6T/t/rG3Oh065V+Az+E3OFFp5xs3mHY7/p
OmA7AkEAtQPKA2RtEqUMcxLtGADvFTNmGpoobHM7IgvEXEgZqxBBMPFOBAtsjThP
xEAtPXeLSp1WL0CeU2310I3oXaqT+wJAbBJk/wrvGPQXq1Z0WowzeCsTJ8k+CGEv
Ett7hj+zo6x/Y/fHuU/8o0GGJdjSqhZr9f59oelZF5HKj9lFwR3VtwJBANUfxsvn
w7jdxu5IX+Uexn/Zq0uYJG8ukZTmlE853I28pKzYh4noFBdjKcq46WREK21hnGIj
R94KT358rAcONas=
-----END PRIVATE KEY-----`;
    let sig = sign.sign(privateKey, 'hex')
    console.error(sig + '\n\n');
    
    const verify = crypto.createVerify('RSA-SHA256');
    verify.update('some data to sign')
    const publicKey =
`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCxEqmltFO9dek0h2YdvLPzpDDl
tovO8gvg0QbLgipJSM3cpjHDuL8U/bK1iXYFibEWF9gABm2G5c2mlHdz/4Pbof5u
HyNkMAS1NnNweos6JZ2Rnra9H96lkEQir+x7+D59n+ougVafzz8AG/rWAPb8ie5f
4ZwQfBSOXk6LLkVG8QIDAQAB
-----END PUBLIC KEY-----`;
    
    console.log(verify.verify(publicKey, sig, 'hex'));
}
const privateKey =
`-----BEGIN PRIVATE KEY-----
MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALESqaW0U7116TSH
Zh28s/OkMOW2i87yC+DRBsuCKklIzdymMcO4vxT9srWJdgWJsRYX2AAGbYblzaaU
d3P/g9uh/m4fI2QwBLU2c3B6izolnZGetr0f3qWQRCKv7Hv4Pn2f6i6BVp/PPwAb
+tYA9vyJ7l/hnBB8FI5eTosuRUbxAgMBAAECgYAxiqcsVWeYeoTkzX0klMdEQ4vq
uUgkflQUcmcUSTbLijMOqPEDcY0EsnZtlCgRJJUHOWSVnTbHp0QCd0d0jOi2805e
K03jB7lc4l9yz0CxMppNEEkeH6NsZuZrWEuk7hB3sqIUxnN2YZR+8bz8kPb+BR3p
HpJ09a5NtaialcKkgQJBANp4cy4MWDtC6Hh/qx2j0/VIFedE6B1cK6Sg6BCdrf4h
+T6/QsSSUiNttJl714BHjN05cKekAAAO1ACaJfy0TsMCQQDPfbHCdR2GdHGpAVM7
H6+i/l4U9PtPVS8qXp5FL5HALdxZqM6T/t/rG3Oh065V+Az+E3OFFp5xs3mHY7/p
OmA7AkEAtQPKA2RtEqUMcxLtGADvFTNmGpoobHM7IgvEXEgZqxBBMPFOBAtsjThP
xEAtPXeLSp1WL0CeU2310I3oXaqT+wJAbBJk/wrvGPQXq1Z0WowzeCsTJ8k+CGEv
Ett7hj+zo6x/Y/fHuU/8o0GGJdjSqhZr9f59oelZF5HKj9lFwR3VtwJBANUfxsvn
w7jdxu5IX+Uexn/Zq0uYJG8ukZTmlE853I28pKzYh4noFBdjKcq46WREK21hnGIj
R94KT358rAcONas=
-----END PRIVATE KEY-----`;
function testRsa3(data) {
    data = new Buffer(data, 'utf-8')
    const privateKey =
`-----BEGIN PRIVATE KEY-----
MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBALESqaW0U7116TSH
Zh28s/OkMOW2i87yC+DRBsuCKklIzdymMcO4vxT9srWJdgWJsRYX2AAGbYblzaaU
d3P/g9uh/m4fI2QwBLU2c3B6izolnZGetr0f3qWQRCKv7Hv4Pn2f6i6BVp/PPwAb
+tYA9vyJ7l/hnBB8FI5eTosuRUbxAgMBAAECgYAxiqcsVWeYeoTkzX0klMdEQ4vq
uUgkflQUcmcUSTbLijMOqPEDcY0EsnZtlCgRJJUHOWSVnTbHp0QCd0d0jOi2805e
K03jB7lc4l9yz0CxMppNEEkeH6NsZuZrWEuk7hB3sqIUxnN2YZR+8bz8kPb+BR3p
HpJ09a5NtaialcKkgQJBANp4cy4MWDtC6Hh/qx2j0/VIFedE6B1cK6Sg6BCdrf4h
+T6/QsSSUiNttJl714BHjN05cKekAAAO1ACaJfy0TsMCQQDPfbHCdR2GdHGpAVM7
H6+i/l4U9PtPVS8qXp5FL5HALdxZqM6T/t/rG3Oh065V+Az+E3OFFp5xs3mHY7/p
OmA7AkEAtQPKA2RtEqUMcxLtGADvFTNmGpoobHM7IgvEXEgZqxBBMPFOBAtsjThP
xEAtPXeLSp1WL0CeU2310I3oXaqT+wJAbBJk/wrvGPQXq1Z0WowzeCsTJ8k+CGEv
Ett7hj+zo6x/Y/fHuU/8o0GGJdjSqhZr9f59oelZF5HKj9lFwR3VtwJBANUfxsvn
w7jdxu5IX+Uexn/Zq0uYJG8ukZTmlE853I28pKzYh4noFBdjKcq46WREK21hnGIj
R94KT358rAcONas=
-----END PRIVATE KEY-----`;
    const publicKey =
`-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCxEqmltFO9dek0h2YdvLPzpDDl
tovO8gvg0QbLgipJSM3cpjHDuL8U/bK1iXYFibEWF9gABm2G5c2mlHdz/4Pbof5u
HyNkMAS1NnNweos6JZ2Rnra9H96lkEQir+x7+D59n+ougVafzz8AG/rWAPb8ie5f
4ZwQfBSOXk6LLkVG8QIDAQAB
-----END PUBLIC KEY-----`;
    let en = crypto.publicEncrypt(publicKey, data)
    let st = en.toString('base64')
    let ts = new Buffer(st, 'base64')
    let de = crypto.privateDecrypt(privateKey, ts)
    console.log(de.toString('utf-8'))

}

testRsa3('hello world')

function testEcc() {
    var crypto = require("crypto");
    var eccrypto = require("eccrypto");
    
    // A new random 32-byte private key.
    var privateKey = crypto.randomBytes(32);
    // Corresponding uncompressed (65-byte) public key.
    var publicKey = eccrypto.getPublic(privateKey);
    
    var str = "message to sign";
    // Always hash you message to sign!
    var msg = crypto.createHash("sha256").update(str).digest();
    
    eccrypto.sign(privateKey, msg).then(function(sig) {
      console.log("Signature in DER format:", sig);
      eccrypto.verify(publicKey, msg, sig).then(function() {
        console.log("Signature is OK");
      }).catch(function() {
        console.log("Signature is BAD");
      });
    });
}
function testEcc2() {
    var crypto = require("crypto");
    var eccrypto = require("eccrypto");
    
    var privateKeyA = crypto.randomBytes(32);
    var publicKeyA = eccrypto.getPublic(privateKeyA);
    var privateKeyB = crypto.randomBytes(32);
    var publicKeyB = eccrypto.getPublic(privateKeyB);

    privateKeyA = new Buffer(privateKeyA.toString('base64'), 'base64')
    // console.log(new Buffer(privateKeyA.toString('base64'), 'base64'))
    // console.log(privateKeyA)
    // console.log(privateKeyA)
    console.log(privateKeyA.toString('base64'))
    console.log(publicKeyA.toString('base64'))
    console.log(privateKeyB.toString('base64'))
    console.log(publicKeyB.toString('base64'))
    
    // Encrypting the message for B.
    eccrypto.encrypt(publicKeyB, Buffer("msg to b")).then(function(encrypted) {
      // B decrypting the message.
      eccrypto.decrypt(privateKeyB, encrypted).then(function(plaintext) {
        console.log("Message to part B:", plaintext.toString());
      });
    });
    
    // Encrypting the message for A.
    eccrypto.encrypt(publicKeyA, Buffer("msg to a")).then(function(encrypted) {
      // A decrypting the message.
      eccrypto.decrypt(privateKeyA, encrypted).then(function(plaintext) {
        console.log("Message to part A:", plaintext.toString());
      });
    });
}
function testEcc3() {
    const crypto = require("crypto")
    const eccrypto = require("eccrypto")
    let prK = new Buffer('G3osAjRXhuXtQ2ETFio4cersb4ovZixLOxwW4lOIsNc=', 'base64')
    let puK = new Buffer('BMCq2zG1vbVT1jy9QxHy2o+HlxR0SyfZC61LvEvTHzKICFl2gniPxNhCdnqZpnoNRAdGM27MIW+/q81SfR7wzAk=', 'base64')

    eccrypto.encrypt(puK, Buffer('hello world')).then(encrypted => {
        let a = encrypted.iv.toString('base64')
        let b = encrypted.ephemPublicKey.toString('base64')
        let c = encrypted.ciphertext.toString('base64')
        let d = encrypted.mac.toString('base64')
        let e = JSON.stringify(encrypted)
        let f = JSON.parse(e)
        // console.log(a)
        // console.log(b)
        // console.log(c)
        // console.log(d)
        console.log(e)
        console.log(f)
        let obj = {
            iv:Buffer(a, 'base64'),
            ephemPublicKey:Buffer(b, 'base64'),
            ciphertext:Buffer(c, 'base64'),
            mac:Buffer(d, 'base64')
        }
        console.log(obj)
        eccrypto.decrypt(prK, obj).then(text => {
            console.log(text.toString())
        })
    })
}
// testEcc3()