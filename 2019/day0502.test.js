let computer = {
  memory: [],
  input: [],
  output: [],
}


const executeCommand = computer => {

  computer.position += 4;
  return computer
}

const readParameters = computer => {

}


const runComputer = computer => {
  computer.position = 0
  do {
    computer = getNextCommand(computer)
    computer = readParameters(computer)
    computer = executeCommand(computer)

  } while(computer.command.opcode != 99)

  return computer
}

const getNextCommand = computer => {
  computer.command = getCommand(computer.memory[computer.position])
  return computer
}

const getCommand = code => {
  let codeSeq = (code || "").toString().split("")
  let oc1 = codeSeq.pop() || "0"
  let oc2 = codeSeq.pop() || ""
  let opcode = parseInt(oc2 + oc1)
  let m1 = parseInt(codeSeq.pop() || "0")
  let m2 = parseInt(codeSeq.pop() || "0")
  let m3 = parseInt(codeSeq.pop() || "0")

  return { opcode, m1, m2,m3 }
}

test("run computer basic", () => {
  let computer1 = { memory: [99], input: [], output: [] }
  let computer1Result = { memory: [99], input: [], output: [] }
  expect(runComputer(computer1)).toMatchObject(computer1Result)

  let computer2 = { memory: [1, 1, 2, 0, 99], input: [], output: [] }
  let computer2Result = { memory: [3, 1, 2, 0, 99], input: [], output: [] }
  expect(runComputer(computer2)).toMatchObject(computer2Result)
})

test("get next command", () => {
  let computer = { memory: [0, 1, 2, 3, 99], position: 4 }
  expect(getNextCommand(computer)).toMatchObject({command:{opcode:99, m1:0, m2: 0, m3: 0}})
})

test("command working", () => {
  expect(getCommand(1)).toMatchObject({opcode: 1, m1: 0, m2: 0, m3: 0})
  expect(getCommand(99)).toMatchObject({opcode: 99, m1: 0, m2: 0, m3: 0})
  expect(getCommand(102)).toMatchObject({opcode: 2, m1: 1, m2: 0, m3: 0})
  expect(getCommand(1003)).toMatchObject({opcode: 3, m1: 0, m2: 1, m3: 0})
  expect(getCommand(10004)).toMatchObject({opcode: 4, m1: 0, m2: 0, m3: 1})
})






