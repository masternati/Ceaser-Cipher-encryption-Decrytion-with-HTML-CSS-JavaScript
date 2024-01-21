const Encrypt = document.querySelector('#encrypt');
const Decrypt = document.querySelector('#decrypt');
const key = document.querySelector('#key');

const listLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
  'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

let newText = '';
Encrypt.addEventListener('click', () => {
  const textarea = document.querySelector('#text');
  const textarea4 = document.querySelector('#text4');
  const keyValue = Number(key.value);

  for (let letter of textarea.value) {
    letter = letter.toLowerCase();
    if (!listLetters.includes(letter)) {
      continue
    }
    const indexLetter = listLetters.findIndex((item) => item === letter);
    let indexNewLetter = indexLetter + keyValue;

    if (indexNewLetter > 25) {
      indexNewLetter -= 26;
    }
    newText += listLetters[indexNewLetter];
    textarea4.value = newText;
  }
  newText = '';
})

Decrypt.addEventListener('click', () => {
  const textarea = document.querySelector('#text');
  const textarea4 = document.querySelector('#text4');
  const keyValue = Number(key.value);

  for (const letter of textarea.value) {
    if (!listLetters.includes(letter)) {
      continue
    }
    const indexLetter = listLetters.findIndex((item) => item === letter);
    let indexNewLetter = indexLetter - keyValue;

    if (indexNewLetter < 0) {
      indexNewLetter += 26;
    }
    newText += listLetters[indexNewLetter];
    textarea4.value = newText;
  }
  newText = '';
});




// Multiplicative Cipher Encryption
function multiplicativeCipherEncrypt(plainText, key) {
  var cipherText = "";
  for (var i = 0; i < plainText.length; i++) {
    var charCode = plainText.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) {
      cipherText += String.fromCharCode(((charCode - 65) * key) % 26 + 65);
    } else if (charCode >= 97 && charCode <= 122) { 
      cipherText += String.fromCharCode(((charCode - 97) * key) % 26 + 97);
    } else {
      cipherText += plainText.charAt(i);
    }
  }
  return cipherText;
}

document.getElementById('encrypt2').addEventListener('click', function () {
  const plainText2 = document.getElementById('text2').value
  let key2 = document.getElementById('key2').value
  if (Number(key2) % 2 === 0) {
    key2 = Number(key2) + 1
  }


  const encrypt = multiplicativeCipherEncrypt(plainText2, key2)
  document.getElementById('text5').innerText = encrypt
})

// Multiplicative Cipher Decryption
function multiplicativeCipherDecrypt(cipherText, key) {
  var plainText = "";
  var inverseKey = 0;
  for (var i = 0; i < 26; i++) {
    if ((i * key) % 26 === 1) {
      inverseKey = i;
      break;
    }
  }
  for (var i = 0; i < cipherText.length; i++) {
    var charCode = cipherText.charCodeAt(i);
    if (charCode >= 65 && charCode <= 90) { 
      plainText += String.fromCharCode(((charCode - 65) * inverseKey) % 26 + 65);
    } else if (charCode >= 97 && charCode <= 122) { 
      plainText += String.fromCharCode(((charCode - 97) * inverseKey) % 26 + 97);
    } else {
      plainText += cipherText.charAt(i); 
    }
  }
  return plainText;
}


document.getElementById('decrypt2').addEventListener('click', function () {
  const encryptText = document.getElementById('text2').value
  let key2 = document.getElementById('key2').value

  if (Number(key2) % 2 === 0) {
    key2 = Number(key2) + 1
  }

  const decrypt = multiplicativeCipherDecrypt(encryptText, key2)
  document.getElementById('text5').value = decrypt
})
