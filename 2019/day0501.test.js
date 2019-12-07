const commands = {
  1: c => executeCommand1(c),
  2: c => executeCommand2(c),
  3: c => executeCommand3(c),
  4: c => executeCommand4(c),
  5: c => executeCommand5(c),
  6: c => executeCommand6(c),
  7: c => executeCommand7(c),
  8: c => executeCommand8(c),
  99: c => c,
}


let computer_day5 = {
  memory: [3,225,1,225,6,6,1100,1,238,225,104,0,1102,17,65,225,102,21,95,224,1001,224,-1869,224,4,224,1002,223,8,223,101,7,224,224,1,224,223,223,101,43,14,224,1001,224,-108,224,4,224,102,8,223,223,101,2,224,224,1,223,224,223,1101,57,94,225,1101,57,67,225,1,217,66,224,101,-141,224,224,4,224,102,8,223,223,1001,224,1,224,1,224,223,223,1102,64,34,225,1101,89,59,225,1102,58,94,225,1002,125,27,224,101,-2106,224,224,4,224,102,8,223,223,1001,224,5,224,1,224,223,223,1102,78,65,225,1001,91,63,224,101,-127,224,224,4,224,102,8,223,223,1001,224,3,224,1,223,224,223,1102,7,19,224,1001,224,-133,224,4,224,102,8,223,223,101,6,224,224,1,224,223,223,2,61,100,224,101,-5358,224,224,4,224,102,8,223,223,101,3,224,224,1,224,223,223,1101,19,55,224,101,-74,224,224,4,224,102,8,223,223,1001,224,1,224,1,224,223,223,1101,74,68,225,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,107,677,677,224,102,2,223,223,1006,224,329,1001,223,1,223,1008,226,677,224,102,2,223,223,1006,224,344,1001,223,1,223,7,226,677,224,102,2,223,223,1005,224,359,1001,223,1,223,8,226,226,224,102,2,223,223,1006,224,374,1001,223,1,223,1007,226,226,224,102,2,223,223,1006,224,389,101,1,223,223,8,677,226,224,1002,223,2,223,1005,224,404,101,1,223,223,1108,677,226,224,102,2,223,223,1006,224,419,1001,223,1,223,1108,226,677,224,102,2,223,223,1006,224,434,101,1,223,223,1108,677,677,224,1002,223,2,223,1005,224,449,101,1,223,223,1008,677,677,224,1002,223,2,223,1006,224,464,101,1,223,223,7,677,226,224,1002,223,2,223,1006,224,479,101,1,223,223,108,677,677,224,1002,223,2,223,1005,224,494,101,1,223,223,107,226,677,224,1002,223,2,223,1006,224,509,101,1,223,223,107,226,226,224,102,2,223,223,1006,224,524,1001,223,1,223,1107,226,677,224,1002,223,2,223,1006,224,539,101,1,223,223,1008,226,226,224,102,2,223,223,1006,224,554,1001,223,1,223,8,226,677,224,1002,223,2,223,1006,224,569,101,1,223,223,1007,677,677,224,102,2,223,223,1005,224,584,1001,223,1,223,1107,677,226,224,1002,223,2,223,1006,224,599,101,1,223,223,7,226,226,224,1002,223,2,223,1005,224,614,101,1,223,223,108,677,226,224,1002,223,2,223,1005,224,629,1001,223,1,223,108,226,226,224,1002,223,2,223,1005,224,644,101,1,223,223,1007,677,226,224,1002,223,2,223,1006,224,659,101,1,223,223,1107,226,226,224,102,2,223,223,1005,224,674,1001,223,1,223,4,223,99,226],
  input: [1],
  output: [],
  position: 0,
  a: null,
  b: null,
  command: {},
}

const runComputer = computer => {
  computer.position = 0
  let i = 0;
  do {
    computer = getNextCommand(computer)
    computer = readParameters(computer)
    computer = executeCommand(computer)
    i++

  } while(computer.command.opcode != 99 && i < 9999)

  return computer
}

const executeCommand = computer => {
  const fn = commands[computer.command.opcode];
  if (fn) {
    return fn(computer);
  } else {
    console.error(computer);
    throw new Error("Unknown command!!!");
  }
}

const executeCommand1 = computer => {
  let mem = computer.memory;
  let pos = computer.position;

  mem[mem[pos + 3]] = computer.a + computer.b

  computer.position += 4;
  return computer;
}

const executeCommand2 = computer => {
  let mem = computer.memory;
  let pos = computer.position;

  mem[mem[pos + 3]] = computer.a * computer.b

  computer.position += 4;
  return computer;
}

const executeCommand3 = computer => {
  let mem = computer.memory;
  let pos = computer.position;

  mem[mem[pos + 1]] = computer.a;

  computer.position += 2;
  return computer;
}

const executeCommand4 = computer => {
  computer.output.push(computer.a);

  computer.position += 2;
  return computer;
}

const executeCommand5 = computer => {
  if (computer.a != 0) {
    computer.position = computer.b
  } else {
    computer.position += 3;
  }

  return computer;
}

const executeCommand6 = computer => {
  if (computer.a == 0) {
    computer.position = computer.b
  } else {
    computer.position += 3;
  }

  return computer;
}

const executeCommand7 = computer => {
  let mem = computer.memory;
  let pos = computer.position;

  mem[mem[pos + 3]] = computer.a < computer.b ? 1 : 0;

  computer.position += 4;
  return computer;
}

const executeCommand8 = computer => {
  let mem = computer.memory;
  let pos = computer.position;

  mem[mem[pos + 3]] = computer.a == computer.b ? 1 : 0;

  computer.position += 4;
  return computer;
}

const readParameters = computer => {
  let com = computer.command;
  let mem = computer.memory;
  let pos = computer.position;
  let input = computer.input;

  computer.a = null;
  computer.b = null;

  if ([3].includes(com.opcode)) {
    computer.a = input.shift()
  } else if ([1, 2].includes(com.opcode)) {
    computer.a = com.ma ? mem[pos + 1] : mem[mem[pos + 1]];
    computer.b = com.mb ? mem[pos + 2] : mem[mem[pos + 2]];
  } else {
    computer.a = com.ma ? mem[pos + 1] : mem[mem[pos + 1]];
    computer.b = com.mb ? mem[pos + 2] : mem[mem[pos + 2]];
  }

  computer.a = parseInt(computer.a)
  computer.b = parseInt(computer.b)

  return computer;
}



const getNextCommand = computer => {
  computer.command = getCommand(computer.memory[computer.position])
  return computer
}

const getCommand = code => {
  let codeStr = (code || "").toString();
  while (codeStr.length < 5) {
    codeStr = "0" + codeStr;
  }
  let opcode = parseInt(codeStr.slice(-2));
  let ma = parseInt(codeStr[2])
  let mb = parseInt(codeStr[1])
  let mc = parseInt(codeStr[0])

  return { opcode, ma, mb, mc }
}

// test("run computer basic", () => {
//   let computer1 = { memory: [99], input: [], output: [] }
//   let computer1Result = { ...computer1 }
//   expect(runComputer(computer1)).toMatchObject(computer1Result)

//   let computer2 = { memory: [3,0,4,0,99], input: [999], output: [] }
//   let computer2Result = { ...computer2, input: [], output: [999], memory: [999, 0, 4, 0, 99] }
//   let res2 = runComputer(computer2);
//   expect(res2).toMatchObject(computer2Result)

//   let computer3 = {
//     memory: [3,3,1105,-1,9,1101,0,0,12,4,12,99,1],
//     input: [1],
//     output: []
//   }
//   let computer3Result = { input: [], output: [1],  }
//   let res3 = runComputer(computer3);
//   expect(res3).toMatchObject(computer3Result)
//   let computer4 = {
//     memory: [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9],
//     input: [0],
//     output: []
//   }
//   let computer4Result = { input: [], output: [0],  }
//   let res4 = runComputer(computer4);
//   expect(res4).toMatchObject(computer4Result)
//   let computer5 = {
//     memory: [3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31, 1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104, 999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99],
//     input: [1],
//     output: []
//   }
//   let computer5Result = { input: [], output: [999],  }
//   let res5 = runComputer(computer5);
//   expect(res5).toMatchObject(computer5Result)
// })

// test("command 1", () => {
//   let computer1 = { memory: [1, 0, 0, 0], position: 0, a: 3, b: 2}
//   let computer1Result = { ...computer1, position: 4, memory: [5, 0, 0, 0] }
//   expect(executeCommand1(computer1)).toMatchObject(computer1Result)
// })

// test("command 2", () => {
//   let computer1 = { memory: [2, 0, 0, 0], position: 0, a: 3, b: 2}
//   let computer1Result = { ...computer1, position: 4, memory: [6, 0, 0, 0] }
//   expect(executeCommand2(computer1)).toMatchObject(computer1Result)
// })

// test("command 3", () => {
//   let computer1 = { memory: [0, 0], position: 0, a: 999}
//   let computer1Result = { ...computer1, position: 2, memory: [999, 0]}
//   expect(executeCommand3(computer1)).toMatchObject(computer1Result)
// })

// test("command 4", () => {
//   let computer1 = { position: 0, output: [1], a:4}
//   let computer1Result = { ...computer1, position: 2, output: [1, 4]}
//   expect(executeCommand4(computer1)).toMatchObject(computer1Result)
// })

// test("read command test", () => {
//   let computer1 = { memory: [1, 3, 4, 33, 44], command: { opcode: 1, ma: 0, mb: 0 }, position: 0 }
//   let computer1Result = { ...computer1, a: 33, b: 44 }
//   expect(readParameters(computer1)).toMatchObject(computer1Result)

//   let computer2 = { memory: [1, 3, 4, 33, 44], command: { opcode: 2, ma: 1, mb: 1 }, position: 0 }
//   let computer2Result = { ...computer2, a: 3, b: 4 }
//   expect(readParameters(computer2)).toMatchObject(computer2Result)

//   let computer3 = { memory: [3, 3, 4, 33, 44], input: [100,99], command: { opcode: 3, ma: 1, mb: 1 }, position: 0 }
//   let computer3Result = { ...computer3, a: 100, b: null, input: [99]}
//   let res = readParameters(computer3);
//   expect(res).toMatchObject(computer3Result)
// })

// test("get next command", () => {
//   let computer = { memory: [1, 1, 2, 3, 99], position: 4 }
//   expect(getNextCommand(computer)).toMatchObject({command:{opcode:99, ma:0, mb: 0, mc: 0}})
// })

// test("command working", () => {
//   expect(getCommand(1)).toMatchObject({opcode: 1, ma: 0, mb: 0, mc: 0})
//   expect(getCommand(99)).toMatchObject({opcode: 99, ma: 0, mb: 0, mc: 0})
//   expect(getCommand(102)).toMatchObject({opcode: 2, ma: 1, mb: 0, mc: 0})
//   expect(getCommand(1003)).toMatchObject({opcode: 3, ma: 0, mb: 1, mc: 0})
//   expect(getCommand(10004)).toMatchObject({opcode: 4, ma: 0, mb: 0, mc: 1})
// })


console.log(runComputer(computer_day5));



test("dummy", () => { })