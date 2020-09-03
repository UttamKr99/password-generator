const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('customRange2');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboard = document.getElementById('clipboard');
clipboard.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
});
function range() {
  var x = document.getElementById('customRange2').value;
  document.getElementById('range').innerHTML = x;
}

const randFun = {
  upper: getUpparcase,
  lower: getLowercase,
  number: getNumber,
  symbol: getSymbol,
};

function generatePass() {
  const length = lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;
  // console.log(length, hasLower, hasSymbol, hasUpper);
  var x = getFullpass(length, hasLower, hasNumber, hasSymbol, hasUpper);
  resultEl.innerHTML = x;
}
function getFullpass(length, lower, number, symbol, upper) {
  let generatedPassword = '';
  const typesCount = upper + lower + number + symbol;

  const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );
  console.log(typesArr);
  if (typesCount === 0) return '';
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((val) => {
      const funcName = Object.keys(val)[0];
      //console.log('fun ' + funcName);
      //   console.log('-->' + randFun[funcName]());
      generatedPassword += randFun[funcName]();
    });
  }

  return generatedPassword.slice(0, length);
}
function getNumber() {
  return Math.floor(Math.random() * 10);
}

function getLowercase() {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 97));
}

function getUpparcase() {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
}
function getSymbol() {
  const symbol = '!@#$%^&*(){}[]/<.,>?;=+';
  return symbol[Math.floor(Math.random() * 10)];
}
