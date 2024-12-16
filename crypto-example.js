// Example usage of crypto-utils.js functions
// This example demonstrates how to use the encryption/decryption functions
// in a way that matches the existing codebase patterns

// For browser usage via CDN
// <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>

// For Node.js usage
// Uncomment this if running in Node.js:
// const CryptoJS = require('crypto-js');

const { 
    aesEncrypt, 
    aesDecrypt,
    customAesEncrypt,
    customAesDecrypt,
    desEncrypt,
    desDecrypt,
    hmacSign,
    base64Encode,
    base64Decode
} = require('./crypto-utils');

// Example data
const plaintext = "Hello, this is sensitive data!";
const aesKey = "E987E8B6BBEC3F920D219F7A4B5C619A"; // Example key from codebase
const desKey = "BCA7264DA3DA67F286CF4D7882FC276E"; // Example key from codebase
const hmacKey = "your-hmac-secret-key";

// Convert hex key to WordArray for CryptoJS
const aesKeyWordArray = CryptoJS.enc.Hex.parse(aesKey);
const desKeyWordArray = CryptoJS.enc.Hex.parse(desKey);

// Create IV as WordArray (16 bytes of zeros)
const iv = CryptoJS.lib.WordArray.create(new Uint8Array(16));

// Example 1: AES Encryption/Decryption (Standard)
async function aesExample() {
    try {
        // Convert plaintext to WordArray
        const plaintextWordArray = CryptoJS.enc.Utf8.parse(plaintext);
        
        // Encrypt
        const encrypted = await aesEncrypt(plaintextWordArray, aesKeyWordArray);
        console.log('AES Encrypted:', encrypted);

        // Decrypt
        const decrypted = await aesDecrypt(encrypted, aesKeyWordArray);
        // Convert WordArray back to UTF8
        const decryptedText = CryptoJS.enc.Utf8.stringify(decrypted);
        console.log('AES Decrypted:', decryptedText);
    } catch (error) {
        console.error('AES Error:', error);
    }
}

// Example 2: Custom AES Implementation (matches codebase pattern)
async function customAesExample() {
    try {
        // Convert plaintext to WordArray
        const plaintextWordArray = CryptoJS.enc.Utf8.parse(plaintext);
        
        // Custom encrypt with IV
        const customEncrypted = await customAesEncrypt(plaintextWordArray, aesKeyWordArray, iv);
        console.log('Custom AES Encrypted:', customEncrypted);

        // Custom decrypt with IV
        const customDecrypted = await customAesDecrypt(customEncrypted, aesKeyWordArray, iv);
        // Convert WordArray back to UTF8
        const decryptedText = CryptoJS.enc.Utf8.stringify(customDecrypted);
        console.log('Custom AES Decrypted:', decryptedText);
    } catch (error) {
        console.error('Custom AES Error:', error);
    }
}

// Example 3: DES Encryption/Decryption
async function desExample() {
    try {
        // Convert plaintext to WordArray
        const plaintextWordArray = CryptoJS.enc.Utf8.parse(plaintext);
        
        // DES encrypt
        const desEncrypted = await desEncrypt(plaintextWordArray, desKeyWordArray);
        console.log('DES Encrypted:', desEncrypted);

        // DES decrypt
        const desDecrypted = await desDecrypt(desEncrypted, desKeyWordArray);
        // Convert WordArray back to UTF8
        const decryptedText = CryptoJS.enc.Utf8.stringify(desDecrypted);
        console.log('DES Decrypted:', decryptedText);
    } catch (error) {
        console.error('DES Error:', error);
    }
}

// Example 4: HMAC Signing
async function hmacExample() {
    try {
        // Convert plaintext and key to WordArray
        const plaintextWordArray = CryptoJS.enc.Utf8.parse(plaintext);
        const hmacKeyWordArray = CryptoJS.enc.Utf8.parse(hmacKey);
        
        // Generate HMAC
        const signature = await hmacSign(plaintextWordArray, hmacKeyWordArray);
        console.log('HMAC Signature:', signature);
    } catch (error) {
        console.error('HMAC Error:', error);
    }
}

// Example 5: Base64 Encoding/Decoding
function base64Example() {
    try {
        // Convert plaintext to WordArray
        const plaintextWordArray = CryptoJS.enc.Utf8.parse(plaintext);
        
        // Encode
        const encoded = base64Encode(plaintextWordArray);
        console.log('Base64 Encoded:', encoded);

        // Decode
        const decoded = base64Decode(encoded);
        // Convert WordArray back to UTF8
        const decodedText = CryptoJS.enc.Utf8.stringify(decoded);
        console.log('Base64 Decoded:', decodedText);
    } catch (error) {
        console.error('Base64 Error:', error);
    }
}

// Create HTML elements for browser display
function createHtmlOutput() {
    const outputDiv = document.createElement('div');
    outputDiv.id = 'crypto-output';
    document.body.appendChild(outputDiv);

    const log = console.log;
    console.log = function(...args) {
        log.apply(console, args);
        const p = document.createElement('p');
        p.textContent = args.join(' ');
        outputDiv.appendChild(p);
    };
}

// Run examples
async function runExamples() {
    // Create output div if in browser
    if (typeof window !== 'undefined') {
        createHtmlOutput();
    }
    
    console.log('Running Crypto Examples...\n');
    
    console.log('1. AES Example:');
    await aesExample();
    console.log('\n2. Custom AES Example:');
    await customAesExample();
    console.log('\n3. DES Example:');
    await desExample();
    console.log('\n4. HMAC Example:');
    await hmacExample();
    console.log('\n5. Base64 Example:');
    base64Example();
}

// Run examples when document is ready (browser) or immediately (Node.js)
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', runExamples);
} else {
    runExamples();
} 