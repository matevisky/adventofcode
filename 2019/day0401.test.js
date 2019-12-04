
let res = 0;

const rule1 = x => {
  let res = false
  let current = '';
  let c = 0
  x.split('').forEach((i, ii, a) => {
    if (i == current && (a[ii + 1] || 0) != i && (a[ii - 2] || 0) != i) {
      res = true
    }
    current = i
  })
  return res
}

const rule2 = x => {
  let res = true
  let current = '';
  x.split('').forEach(i => {
    if (i < current) {
      res = false
    }
    current = i
  })
  return res
}

// console.log(rule1('10112223'))
// console.log(rule2('112231'))

for (let i = 264360; i <= 746325; i++) {
  if (rule1(i.toString()) && rule2(i.toString())) {
    res++;
  }
}


console.log(res)

test('adds 1 + 2 to equal 3', () => {
  expect(res).toBe(3);
});