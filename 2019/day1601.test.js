let inputString = `12345678`
// inputString = `80871224585914546619083218645595`
let baseInputString = `5979191170169717862077216648762192653985597623787930086987293130353212240471170681317665705380248183301521422670505870401709941128404647339521102254666245040396413728348770769156344202669765682069585445382669048761117286035828625585066806950768793641059952047568069518052732707647911976489711949416136664525748035306326665330602393587482127402637740705195831629199514459362479275555392364839216959789722205861372562092023328386903650195075397002918218177035882713373749053043185983306592681679805123751095474220993995737650636492621987915052460605699657274377391203039769561320383501152467764004423782496166263553061987590536920890586691333402716017`
baseInputString = `12345678`
inputString = ``;
for (let i = 0; i < 1; i++)
{
  inputString += baseInputString
}

let input = inputString.split("").map(i => Number(i))

const calc = (input, posCache) => {
  const ret = []
  for (let i = 0; i < input.length; i++) {
    let sum = 0;
    for (let j = i; j < input.length; j++) {
      sum += input[j] * posCache[i][j]
    }
    ret.push(Math.abs(sum) % 10);
  }
  return ret;
}

const getPattern = (row, length) => {
  pattern = [0, 1, 0, -1]
  const res = [];
  for (let i = 0; i < length; i++) {
    index = (Math.floor((i + 1)/ row)) % 4
    res.push(pattern[index])
  }
  return res
}

const createPositon = length => {
  posMulti = [];
  for (let i = 1; i < length + 1; i++) {
    const pattern = getPattern(i, length)
    posMulti.push(pattern);
  }
  return posMulti
}


const posCache = createPositon(input.length)
//45834272


for (let i = 0; i <= 2; i++)
{
  console.log(i, input.join("")[2]);
  input = calc(input, posCache)
}
// console.log(posCache);




// console.log(createPositon(8));


// console.log(input);
// console.log(calc(input).join(""))

test("dummy", () => { })
/*
48226158

8
8 + 7 = 15 ==> 5
5 + 6 = 11 ==> 1
1 + 5 = 6 ==> 6


*/