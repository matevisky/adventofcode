







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

const runScenariob = (ampSettings, currentOutput) => {
  let computers = {
    0: {
      memory: [...mainframe_memory],
      input: [ampSettings[0]],
      output: [],
      position: 0,
      a: null,
      b: null,
      command: {},
    },
    1: {
      memory: [...mainframe_memory],
      input: [ampSettings[1]],
      output: [],
      position: 0,
      a: null,
      b: null,
      command: {},
    },
    2: {
      memory: [...mainframe_memory],
      input: [ampSettings[2]],
      output: [],
      position: 0,
      a: null,
      b: null,
      command: {},
    },
    3: {
      memory: [...mainframe_memory],
      input: [ampSettings[3]],
      output: [],
      position: 0,
      a: null,
      b: null,
      command: {},
    },
    4: {
      memory: [...mainframe_memory],
      input: [ampSettings[4]],
      output: [],
      position: 0,
      a: null,
      b: null,
      command: {},
    },
  }

  let index = 0;
  let stack = 0;
  currentOutput = currentOutput || 0;
  do {
    stack++;
    current_computer = computers[index]
    current_computer.seq = ampSettings[index];
    current_computer.input.push(currentOutput);
    current_computer = runComputer(current_computer)
    if (current_computer.command.opcode == 4) {
      currentOutput = current_computer.output[0];
      current_computer.output = [];
      index++;
      if (index >= ampSettings.length) index = 0;
    }
    // console.log(ampSettings[index], currentOutput);
    // if (currentOutput == 139629729) {
    //   console.log(current_computer);
    //   break;
    // }


  } while (current_computer.command.opcode != 99 && stack < 999)

  // console.log(stack);
  // console.log(current_computer);
  return currentOutput
}


const mainframe_memory = [3, 8, 1001, 8, 10, 8, 105, 1, 0, 0, 21, 38, 63, 72, 81, 106, 187, 268, 349, 430, 99999, 3, 9, 101, 5, 9, 9, 1002, 9, 3, 9, 101, 3, 9, 9, 4, 9, 99, 3, 9, 102, 3, 9, 9, 101, 4, 9, 9, 1002, 9, 2, 9, 1001, 9, 2, 9, 1002, 9, 4, 9, 4, 9, 99, 3, 9, 1001, 9, 3, 9, 4, 9, 99, 3, 9, 102, 5, 9, 9, 4, 9, 99, 3, 9, 102, 4, 9, 9, 1001, 9, 2, 9, 1002, 9, 5, 9, 1001, 9, 2, 9, 102, 3, 9, 9, 4, 9, 99, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 99, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 99, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 99, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 1002, 9, 2, 9, 4, 9, 3, 9, 101, 1, 9, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 1001, 9, 1, 9, 4, 9, 3, 9, 102, 2, 9, 9, 4, 9, 3, 9, 101, 2, 9, 9, 4, 9, 99];

let currentMax = 0;
for (let x1 = 5; x1 < 10; x1++) {
  for (let x2 = 5; x2 < 10; x2++) {
    if (x2 == x1) continue;
    for (let x3 = 5; x3 < 10; x3++) {
      if (x3 == x1 || x3 == x2) continue;
      for (let x4 = 5; x4 < 10; x4++) {
        if (x4 == x1 || x4 == x2 || x4 == x3) continue;
        for (let x5 = 5; x5 < 10; x5++) {
          if (x5 == x1 || x5 == x2 || x5 == x3 || x5 == x4) continue;
          const current = runScenariob([x1, x2, x3, x4, x5],0);
          if (current > currentMax) currentMax = current;
        }
      }
    }
  }

}
console.log(currentMax);
// const mainframe_memory = [
//   3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,
//   27, 4, 27, 1001, 28, -1, 28, 1005, 28, 6, 99, 0, 0, 5
// ];
// const scenario = [9,8,7,6,5]
// const mainframe_memory = [
//   3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,
//   -5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,
//   53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10
// ];
// const scenario = [9,7,8,5,6]

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


// console.log(runScenariob(scenario, 0))