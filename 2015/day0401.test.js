const md5 = require('md5');
input = 'ckczppom'
let i = 0;
while (true) {
  i++;
  if (md5(input + String(i)).substr(0, 6) == '000000') break;
}
console.log(i);

test("dummy", () => { })


