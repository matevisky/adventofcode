


const rule1 = x => {
  xArr = x.toString().split('');
  for (let i = 1; i < xArr.length; i++) {
    if (xArr[i] != xArr[i - 1]) continue;
    if (xArr[i] == xArr[i + 1]) continue;
    if (xArr[i] == xArr[i - 2]) continue;

    if (xArr[i] == xArr[i - 1]) return true;
  }
  return false
}

const rule2 = x => {
  xArr = x.toString().split('');
  for (let i = 1; i < xArr.length; i++) {
    if (xArr[i] < xArr[i - 1]) return false;
  }
  return true;
}

const searchCodes = (start, end, rules) => {
  res = [];
  for (let i = start; i <= end; i++) {
    const valid = rules.reduce((c, rule) => c ? rule(i) : c , true);
    if (valid) res.push(i);
  }
  return res;
}

console.log(searchCodes(264360, 746325,
  [
    x => rule1(x),
    x => rule2(x)
  ]).length);


//test
test("resolution day 4", () => {
  expect(searchCodes(264360, 746325,
    [x => rule1(x), x => rule2(x)]).length).toBe(617)
});

test("test rule1", () => {
  expect(rule1('10112223')).toBe(true);
  expect(rule1('112223')).toBe(true);
  expect(rule1('122233')).toBe(true);
  expect(rule1('12223303')).toBe(true);
  expect(rule1('101112223')).toBe(false);
  expect(rule1('1112223')).toBe(false);
  expect(rule1('111222333')).toBe(false);
  expect(rule1('1011122233303')).toBe(false);
})

test("test rule2", () => {
  expect(rule2('11222333')).toBe(true);
  expect(rule2('112223330')).toBe(false);
})

test("dummy", () => { })