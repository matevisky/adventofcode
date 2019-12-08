const { initComputer } = require('./computer');

console.log(initComputer());



test("run computer basic", () => {
  let computer1 = { memory: [99], input: [], output: [] }
  let computer1Result = { ...computer1 }
  expect(runComputer(computer1)).toMatchObject(computer1Result)

  let computer2 = { memory: [3,0,4,0,99], input: [999], output: [] }
  let computer2Result = { ...computer2, input: [], output: [999], memory: [999, 0, 4, 0, 99] }
  let res2 = runComputer(computer2);
  expect(res2).toMatchObject(computer2Result)

  let computer3 = {
    memory: [3,3,1105,-1,9,1101,0,0,12,4,12,99,1],
    input: [1],
    output: []
  }
  let computer3Result = { input: [], output: [1],  }
  let res3 = runComputer(computer3);
  expect(res3).toMatchObject(computer3Result)
  let computer4 = {
    memory: [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9],
    input: [0],
    output: []
  }
  let computer4Result = { input: [], output: [0],  }
  let res4 = runComputer(computer4);
  expect(res4).toMatchObject(computer4Result)
  let computer5 = {
    memory: [3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31, 1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104, 999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99],
    input: [1],
    output: []
  }
  let computer5Result = { input: [], output: [999],  }
  let res5 = runComputer(computer5);
  expect(res5).toMatchObject(computer5Result)
})

test("command 1", () => {
  let computer1 = { memory: [1, 0, 0, 0], position: 0, a: 3, b: 2}
  let computer1Result = { ...computer1, position: 4, memory: [5, 0, 0, 0] }
  expect(executeCommand1(computer1)).toMatchObject(computer1Result)
})

test("command 2", () => {
  let computer1 = { memory: [2, 0, 0, 0], position: 0, a: 3, b: 2}
  let computer1Result = { ...computer1, position: 4, memory: [6, 0, 0, 0] }
  expect(executeCommand2(computer1)).toMatchObject(computer1Result)
})

test("command 3", () => {
  let computer1 = { memory: [0, 0], position: 0, a: 999}
  let computer1Result = { ...computer1, position: 2, memory: [999, 0]}
  expect(executeCommand3(computer1)).toMatchObject(computer1Result)
})

test("command 4", () => {
  let computer1 = { position: 0, output: [1], a:4}
  let computer1Result = { ...computer1, position: 2, output: [1, 4]}
  expect(executeCommand4(computer1)).toMatchObject(computer1Result)
})

test("read command test", () => {
  let computer1 = { memory: [1, 3, 4, 33, 44], command: { opcode: 1, ma: 0, mb: 0 }, position: 0 }
  let computer1Result = { ...computer1, a: 33, b: 44 }
  expect(readParameters(computer1)).toMatchObject(computer1Result)

  let computer2 = { memory: [1, 3, 4, 33, 44], command: { opcode: 2, ma: 1, mb: 1 }, position: 0 }
  let computer2Result = { ...computer2, a: 3, b: 4 }
  expect(readParameters(computer2)).toMatchObject(computer2Result)

  let computer3 = { memory: [3, 3, 4, 33, 44], input: [100,99], command: { opcode: 3, ma: 1, mb: 1 }, position: 0 }
  let computer3Result = { ...computer3, a: 100, b: null, input: [99]}
  let res = readParameters(computer3);
  expect(res).toMatchObject(computer3Result)
})

test("get next command", () => {
  let computer = { memory: [1, 1, 2, 3, 99], position: 4 }
  expect(getNextCommand(computer)).toMatchObject({command:{opcode:99, ma:0, mb: 0, mc: 0}})
})

test("command working", () => {
  expect(getCommand(1)).toMatchObject({opcode: 1, ma: 0, mb: 0, mc: 0})
  expect(getCommand(99)).toMatchObject({opcode: 99, ma: 0, mb: 0, mc: 0})
  expect(getCommand(102)).toMatchObject({opcode: 2, ma: 1, mb: 0, mc: 0})
  expect(getCommand(1003)).toMatchObject({opcode: 3, ma: 0, mb: 1, mc: 0})
  expect(getCommand(10004)).toMatchObject({opcode: 4, ma: 0, mb: 0, mc: 1})
})

test("dummy", () => { })
