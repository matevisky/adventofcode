








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



const runComputer = (computer) => {
  computer.position = 0
  let i = 0;
  do {
    computer = runComputerStep(computer);
    i++;
  } while (computer.command.opcode != 99 && computer.command.opcode != 4 && i < 9999)
  computer['i'] = i;

  return computer
}

const runComputerStep = (computer) => {
  computer = getNextCommand(computer)
  computer = readParameters(computer)
  computer = executeCommand(computer)
  return computer;
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

const peekNextCommand = computer => {
  return getCommand(computer.memory[computer.position]);
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

test("dummy", () => { })


const runScenario = ampSettings => {
  let currentOutput = 0;
  for (i of ampSettings)
  {
    let computer_day = {
      memory: [3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,
        -5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,
        53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10],
      input: [i, currentOutput],
      output: [],
      position: 0,
      a: null,
      b: null,
      command: {},
    }
    runComputer(computer_day)
    currentOutput = computer_day.output[0]
  }
  return currentOutput
}

const runScenariob = (ampSettings) => {


  // let computers = {
  //   0: {
  //     memory: [...mainframe_memory],
  //     input: [],
  //     output: [],
  //     position: 0,
  //     a: null,
  //     b: null,
  //     command: {},
  //   },
  //   1: {
  //     memory: [...mainframe_memory],
  //     input: [],
  //     output: [],
  //     position: 0,
  //     a: null,
  //     b: null,
  //     command: {},
  //   },
  //   2: {
  //     memory: [...mainframe_memory],
  //     input: [],
  //     output: [],
  //     position: 0,
  //     a: null,
  //     b: null,
  //     command: {},
  //   },
  //   3: {
  //     memory: [...mainframe_memory],
  //     input: [],
  //     output: [],
  //     position: 0,
  //     a: null,
  //     b: null,
  //     command: {},
  //   },
  //   4: {
  //     memory: [...mainframe_memory],
  //     input: [],
  //     output: [],
  //     position: 0,
  //     a: null,
  //     b: null,
  //     command: {},
  //   },
  // }
  let current_computer = {
    memory: [...mainframe_memory],
    input: [],
    output: [],
    position: 0,
    a: null,
    b: null,
    command: {},
  };

  let index = 0;
  let stack = 0;
  let currentOutput = 0;
  do {
    console.log(ampSettings[index],currentOutput);
    stack++;
    // current_computer = computers[index]
    current_computer.input = [ampSettings[index], currentOutput];
    current_computer = runComputer(current_computer)
    if (current_computer.command.opcode == 4) {
      currentOutput = current_computer.output[0];
      current_computer.output= [];

      index++;
      if (index >= ampSettings.length) index = 0;
      // if (currentOutput == 139629729) {
      //   console.log(current_computer);
      //   runComputer(current_computer)
      //   console.log(current_computer);
      //   break;
      // }
    }
    // console.log(ampSettings[index],currentOutput);



  } while (current_computer.command.opcode != 99 && stack < 909)
  // console.log(computers);
  return currentOutput
}



// let currentMax = 0;
// for (let x1 = 0; x1 < 5; x1++) {
//   for (let x2 = 0; x2 < 5; x2++) {
//     if (x2 == x1) continue;
//     for (let x3 = 0; x3 < 5; x3++) {
//       if (x3 == x1 || x3 == x2) continue;
//       for (let x4 = 0; x4 < 5; x4++) {
//         if (x4 == x1 || x4 == x2 || x4 == x3) continue;
//         for (let x5 = 0; x5 < 5; x5++) {
//           if (x5 == x1 || x5 == x2 || x5 == x3 || x5 == x4) continue;
//           const current = runScenario([x1, x2, x3, x4, x5]);
//           if (current > currentMax) currentMax = current;
//         }
//       }
//     }
//   }

// }
// console.log(currentMax);
const mainframe_memory = [
  3, 26, 1001, 26, -4, 26, 3, 27, 1002, 27, 2, 27, 1, 27, 26,
  27, 4, 27,
  1001, 28, -1, 28, 1005, 28, 6, 99, 0, 0, 5];

// console.log(current_computer);
// current_computer
// console.log(current_computer);


console.log(runScenariob([9,8,7,6,5], 0))