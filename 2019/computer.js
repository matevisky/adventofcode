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

const initComputer = (mainframe, params) => {
  params = params || {};
  const computer = {
    id: params.id || 'default',
    memory: [...(mainframe || [99])],
    input: [],
    output: [],
    position: 0,
    a: null,
    b: null,
    command: {},
    debug: {
      currentStep: 0,
      maxStep: params.maxStep || 9999
    }
  };

  return computer;
}

const runComputer = (computer) => {
  if (!computer.state) computer.state = "normal";

  let i = 0;
  do {
    computer = runComputerStep(computer);
    i++;
  } while (computer.command.opcode != 99 && computer.command.opcode != 4 && i < 9999)
  computer['i'] = i;

  return computer
}

const runComputerStep = (computer) => {
  if (computer.state != "input") {
    computer = getNextCommand(computer)
  }
  computer = readParameters(computer)
  if (computer.state == "input") return computer;
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
    if (input.length == 0) {
      if (computer.state == "input") {
        computer.state = "inputerror"
        return computer;
      }
      computer.state = "input";
      return computer;
    }
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

module.exports = { initComputer };
