








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
    // console.log(ampSettings[index],currentOutput);
    stack++;
    // current_computer = computers[index]
    current_computer.seq = ampSettings[index];
    current_computer.input = [ampSettings[index], currentOutput];
    current_computer = runComputer(current_computer)
    if (current_computer.command.opcode == 4) {
      currentOutput = current_computer.output[0];
      current_computer.output= [];

      index++;
      if (index >= ampSettings.length) index = 0;
    }
    console.log(ampSettings[index],currentOutput);

  } while (current_computer.command.opcode != 99 && stack < 99)

  console.log(stack);
  console.log(current_computer);
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
  3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,
  27, 4, 27, 1001, 28, -1, 28, 1005, 28, 6, 99, 0, 0, 5
];
const scenario = [9,8,7,6,5]

// let current_computer = {
//   memory: [...mainframe_memory],
//   input: [],
//   output: [],
//   position: 18,
//   a: null,
//   b: null,
//   command: {},
// };
// console.log(current_computer);
// current_computer = runComputerStep(current_computer);
// console.log(current_computer);
// current_computer = runComputerStep(current_computer);
// console.log(current_computer);
// current_computer = runComputerStep(current_computer);
// console.log(current_computer);
// current_computer = runComputerStep(current_computer);
// console.log(current_computer);
// current_computer = runComputerStep(current_computer);
// console.log(current_computer);


console.log(runScenariob(scenario, 0))