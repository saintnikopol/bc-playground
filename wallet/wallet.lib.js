import crypto from 'crypto';
import eccrypto from 'eccrypto';

function createAddress (publicKey) {
    let sha256 = crypto.createHash('sha256');
    sha256.update(publicKey);
    return sha256.digest('hex');
}

// Uncompressed (65-byte) public key
// that corresponds to the given private key
function getPublicKey (privateKey) {
    return eccrypto.getPublic(privateKey);
}

// Create a new random 32-byte private key.
function createPrivateKey () {
    return crypto.randomBytes(32);
}

export default {createAddress, getPublicKey, createPrivateKey};