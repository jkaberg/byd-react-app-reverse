/**
 * Crypto Utilities for Encryption/Decryption Operations
 * 
 * Required Dependencies:
 * 1. crypto-js: npm install crypto-js
 *    Used for AES encryption/decryption and SHA256 hashing
 * 2. node crypto module (built-in for Node.js)
 *    Used for CustomAES implementation
 * 
 * Usage:
 * import { AES, CustomAES, DES, HMAC, Base64 } from './crypto-utils.js';
 */

/**
 * AES (Advanced Encryption Standard) Implementation
 * Uses CryptoJS library for encryption/decryption with CBC mode
 * 
 * Required: 
 * import CryptoJS from 'crypto-js';
 * 
 * Example Usage:
 * const plaintext = "Hello, World!";
 * const encrypted = AES.encrypt(plaintext);
 * const decrypted = AES.decrypt(encrypted);
 * console.log(decrypted); // "Hello, World!"
 */
const AES = {
    /**
     * Encrypts data using AES-256-CBC
     * @param {string} data - The plaintext to encrypt
     * @returns {string} Hex string of encrypted data
     */
    encrypt: function(data) {
        const KEY = "BCA7264DA3DA67F286CF4D7882FC276E";
        const hashedKey = CryptoJS.SHA256(KEY);
        const iv = CryptoJS.enc.Utf8.parse("");
        const dataBytes = CryptoJS.enc.Utf8.parse(data);
        
        const encrypted = CryptoJS.AES.encrypt(dataBytes, hashedKey, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        
        return encrypted.ciphertext.toString();
    },

    /**
     * Decrypts AES encrypted data
     * @param {string} encryptedData - Hex string of encrypted data
     * @returns {string} Decrypted plaintext
     */
    decrypt: function(encryptedData) {
        const KEY = "BCA7264DA3DA67F286CF4D7882FC276E";
        const hashedKey = CryptoJS.SHA256(KEY);
        const iv = CryptoJS.enc.Utf8.parse("");
        const encryptedHex = CryptoJS.enc.Hex.parse(encryptedData);
        const encryptedBase64 = CryptoJS.enc.Base64.stringify(encryptedHex);
        
        const decrypted = CryptoJS.AES.decrypt(encryptedBase64, hashedKey, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        
        return decrypted.toString(CryptoJS.enc.Utf8);
    }
};

/**
 * Custom AES Implementation using Node.js crypto module
 * Uses a different key and implementation from the standard AES
 * 
 * Required:
 * const crypto = require('crypto'); // Node.js built-in
 * 
 * Example Usage:
 * const plaintext = "Hello, World!";
 * const encrypted = CustomAES.encrypt(plaintext);
 * // Note: This implementation only provides encryption
 */
const CustomAES = {
    /**
     * Encrypts data using AES-128-CBC with a custom key
     * @param {string} data - The plaintext to encrypt
     * @returns {string} Uppercase hex string of encrypted data
     */
    encrypt: function(data) {
        const KEY = "E987E8B6BBEC3F920D219F7A4B5C619A";
        const keyBytes = this.processKey(KEY);
        const iv = new Uint8Array(16); // Zero IV
        let result = "";
        
        const cipher = crypto.createCipheriv("aes-128-cbc", keyBytes, iv);
        result += cipher.update(data, "utf8", "hex");
        result += cipher.final("hex");
        
        return result.toUpperCase();
    },
    
    /**
     * Processes the encryption key
     * @private
     * @param {string} key - Hex string key
     * @returns {Buffer} Processed key as Buffer
     */
    processKey: function(key) {
        return Buffer.from(key, 'hex');
    }
};

/**
 * DES (Data Encryption Standard) Implementation
 * Classic symmetric encryption algorithm (Note: Not recommended for new applications)
 * 
 * Example Usage:
 * const block = [0x12345678, 0x90ABCDEF]; // 64-bit block as two 32-bit words
 * const key = generateDESKey(); // You need to implement key generation
 * DES.encrypt(block, key);
 * // block is now encrypted in place
 */
const DES = {
    // Constants for DES algorithm
    SBOX: [
        // S-box tables would go here
        // These are standard DES S-boxes, removed for brevity
    ],
    PMASK: [
        // Permutation masks would go here
        // These are standard DES permutation masks, removed for brevity
    ],

    /**
     * Encrypts a 64-bit block using DES
     * @param {number[]} block - Array of two 32-bit numbers representing the block
     * @param {number[]} key - Array of 16 subkeys for the rounds
     */
    encrypt: function(block, key) {
        this._lBlock = block[0];
        this._rBlock = block[1];
        
        // Initial Permutation
        this.permute(4, 0x0f0f0f0f);
        this.permute(16, 0x0000ffff);
        this.permuteBlock(2, 0x33333333);
        this.permuteBlock(8, 0x00ff00ff);
        this.permute(1, 0x55555555);
        
        // 16 Rounds
        for (let round = 0; round < 16; round++) {
            const subkey = key[round];
            let temp = this._rBlock;
            let f = 0;
            
            // F function
            for (let i = 0; i < 8; i++) {
                f |= this.SBOX[i][((temp ^ subkey[i]) & this.PMASK[i]) >>> 0];
            }
            
            this._rBlock = this._lBlock;
            this._lBlock = temp ^ f;
        }
        
        // Final Permutation
        let temp = this._lBlock;
        this._lBlock = this._rBlock;
        this._rBlock = temp;
        
        this.permute(1, 0x55555555);
        this.permuteBlock(8, 0x00ff00ff);
        this.permuteBlock(2, 0x33333333);
        this.permute(16, 0x0000ffff);
        this.permute(4, 0x0f0f0f0f);
        
        block[0] = this._lBlock;
        block[1] = this._rBlock;
    },

    /**
     * @private
     * Performs permutation operation
     */
    permute: function(shift, mask) {
        const tmp = ((this._lBlock >>> shift) ^ this._rBlock) & mask;
        this._rBlock ^= tmp;
        this._lBlock ^= tmp << shift;
    },

    /**
     * @private
     * Performs block permutation operation
     */
    permuteBlock: function(shift, mask) {
        const tmp = ((this._rBlock >>> shift) ^ this._lBlock) & mask;
        this._lBlock ^= tmp;
        this._rBlock ^= tmp << shift;
    }
};

/**
 * HMAC (Hash-based Message Authentication Code) Implementation
 * Used for message authentication using a cryptographic hash function
 * 
 * Required:
 * A hash function implementation that provides:
 * - blockSize property
 * - outSize property
 * - update() method
 * - digest() method
 * 
 * Example Usage:
 * const hash = new SHA256(); // You need to provide a hash implementation
 * const hmac = new HMAC(hash, "secretKey");
 * hmac.update("Message to authenticate");
 * const mac = hmac.digest();
 */
class HMAC {
    /**
     * Creates a new HMAC instance
     * @param {object} hash - Hash function implementation
     * @param {string|Buffer} key - Secret key for HMAC
     */
    constructor(hash, key) {
        this.hash = hash;
        this.blockSize = hash.blockSize / 8;
        this.outSize = hash.outSize / 8;
        this.inner = null;
        this.outer = null;
        this._init(this.toArray(key));
    }

    /**
     * @private
     * Initializes the HMAC with the key
     */
    _init(key) {
        if (key.length > this.blockSize) {
            key = new this.hash().update(key).digest();
        }
        
        const ipad = new Array(this.blockSize);
        const opad = new Array(this.blockSize);
        
        for (let i = 0; i < this.blockSize; i++) {
            ipad[i] = key[i] ^ 0x36;
            opad[i] = key[i] ^ 0x5c;
        }
        
        this.inner = new this.hash().update(ipad);
        this.outer = new this.hash().update(opad);
    }

    /**
     * Updates the HMAC with data
     * @param {string|Buffer} data - Data to authenticate
     * @returns {HMAC} this for chaining
     */
    update(data) {
        this.inner.update(data);
        return this;
    }

    /**
     * Finalizes the HMAC computation
     * @returns {Buffer} The computed HMAC
     */
    digest() {
        this.outer.update(this.inner.digest());
        return this.outer.digest();
    }

    /**
     * @private
     * Converts input to array
     */
    toArray(buf) {
        if (Buffer.isBuffer(buf)) return Array.from(buf);
        if (typeof buf === 'string') return Array.from(Buffer.from(buf));
        return Array.from(buf);
    }
}

/**
 * Base64 Implementation
 * Provides encoding and decoding of Base64 data
 * This is a custom implementation, consider using built-in btoa/atob for browser
 * or Buffer.from().toString('base64') for Node.js in production
 * 
 * Example Usage:
 * const data = new Uint8Array([72, 101, 108, 108, 111]); // "Hello"
 * const encoded = Base64.encode(data);
 * const decoded = Base64.decode(encoded);
 */
const Base64 = {
    /**
     * Encodes data to Base64
     * @param {Uint8Array} data - Data to encode
     * @returns {string} Base64 encoded string
     */
    encode: function(data) {
        const BASE64_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        let result = '';
        
        for (let i = 0; i < data.length; i += 3) {
            const chunk = (data[i] << 16) + (data[i + 1] << 8) + data[i + 2];
            result += BASE64_CHARS[(chunk >> 18) & 63];
            result += BASE64_CHARS[(chunk >> 12) & 63];
            result += BASE64_CHARS[(chunk >> 6) & 63];
            result += BASE64_CHARS[chunk & 63];
        }
        
        // Handle padding
        const padding = data.length % 3;
        if (padding) {
            result = result.slice(0, -padding) + '='.repeat(padding);
        }
        
        return result;
    },
    
    /**
     * Decodes Base64 string
     * @param {string} str - Base64 encoded string
     * @returns {Uint8Array} Decoded data
     */
    decode: function(str) {
        const BASE64_LOOKUP = new Uint8Array(256);
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('').forEach((c, i) => {
            BASE64_LOOKUP[c.charCodeAt(0)] = i;
        });
        
        const len = str.length;
        let bufferLength = str.length * 0.75;
        if (str[len - 1] === '=') bufferLength--;
        if (str[len - 2] === '=') bufferLength--;
        
        const bytes = new Uint8Array(bufferLength);
        let p = 0;
        
        for (let i = 0; i < str.length; i += 4) {
            const encoded1 = BASE64_LOOKUP[str.charCodeAt(i)];
            const encoded2 = BASE64_LOOKUP[str.charCodeAt(i + 1)];
            const encoded3 = BASE64_LOOKUP[str.charCodeAt(i + 2)];
            const encoded4 = BASE64_LOOKUP[str.charCodeAt(i + 3)];
            
            bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
            bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
            bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
        }
        
        return bytes;
    }
};

// Export all crypto utilities
export {
    AES,
    CustomAES,
    DES,
    HMAC,
    Base64
}; 