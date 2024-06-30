// Example encryption utility
const CryptoJS = require('crypto-js');

exports.encrypt = (message, key) => {
    return CryptoJS.AES.encrypt(message, key).toString();
};

exports.decrypt = (encryptedMessage, key) => {
    const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
    return bytes.toString(CryptoJS.enc.Utf8);
};
