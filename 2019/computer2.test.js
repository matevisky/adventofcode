const statuses = {
  ERROR: -1,
  NORMAL: 0,
  INPUT: 3,
  OUTPUT: 4,
  END: 99,
}

const defaults = {
  MAX_STEP: 999,
  DEFAULT_COMPUTER_NAME: 'default',
  // DEFAULT_MAINFRAME: [99],
  DEFAULT_MAINFRAME: [98, 1, 98, 1, 98, 1, 99],
}

class Computer {
  constructor(mainFrame = defaults.DEFAULT_MAINFRAME, params = {}) {
    this.memory = [...mainFrame];
    this.input = params.input || [];
    this.output = [];
    this.position = Number(params.position || 0) || 0;
    this.a = null;
    this.b = null;
    this.command = {
      opcode: null, ma: null, mb: null, mc: null};
    this.status = statuses.NORMAL;
    this.debug = {
      id: params.id || defaults.DEFAULT_COMPUTER_NAME,
      currentStep: 0,
      maxStep: Number(params.maxStep || defaults.MAX_STEP) || 999,
      message: "",
    };
  }

  * runComputer() {
    do  {
      this.debug.currentStep += 1;
      if (this.isStackOverflow()) return this;
      if (!this.getNextCommand()) return this;

      const p = this.getParameters()
      if (!p.next().value) {
        yield this;
        if (!p.next().value) return this;
      }

      if (!this.executeCommand()) return this;
    } while (this.command.opcode != 99)

    return this;
  }

  pushInput(items) {
    items = Array.isArray(items) ? items : [items];
    this.input = [...this.input, ...items];
  }

  shiftOutput() {
    return this.output.shift();
  }

  executeCommand() {
    const commands = {
      1: () => this.command1(),
      2: () => this.command2(),
      3: () => this.command3(),
      4: () => this.command4(),
      5: () => this.command5(),
      6: () => this.command6(),
      7: () => this.command7(),
      8: () => this.command8(),
      98: () => this.command98(),
      99: () => this.command99(),
      error: () =>this.commandError(),
    }
    let opcode = this.command.opcode;

    if (!commands.hasOwnProperty(opcode)) opcode = 'error';
    return commands[opcode]();
  }

  command1() {
    this.memory[this.memory[this.position + 3]] = this.a + this.b
    this.position += 4;
    return true;
  }

  command2() {
    this.memory[this.memory[this.position + 3]] = this.a * this.b
    this.position += 4;
    return true;
  }

  command3() {
    this.memory[this.memory[this.position + 1]] = this.a;
    this.position += 2;
    return true;
  }

  command4() {
    this.output.push(this.a);
    this.position += 2;
    return true;
  }

  command5() {
    this.position = this.a == 0 ? this.position + 3 : this.b
    return true;
  }

  command6() {
    this.position = this.a != 0 ? this.position + 3 : this.b
    return true;
  }

  command7() {
    this.memory[this.memory[this.position + 3]] = this.a < this.b ? 1 : 0;
    this.position += 4;
    return true;
  }

  command8() {
    this.memory[this.memory[this.position + 3]] = this.a == this.b ? 1 : 0;
    this.position += 4;
    return true;
  }

  command98() {
    this.position += 2;
    console.log('just a test');
    return true;
  }

  command99() {
    this.setStatus(statuses.END);
    return true;
  }

  commandError() {
    this.setStatus(statuses.ERROR, "Command not found error");
    return false;
  }

  * getParameters() {
    this.a = null;
    this.b = null;

    if (this.command.opcode == 3) {
      if (this.input.length == 0) {
        this.status = statuses.INPUT
        yield false;
        if (this.input.length == 0) {
          this.setStatus(statuses.ERROR, "IO error input not recieved");
          return false;
        }

      }
      this.a = this.input.shift();
    }
    this.a = Number(this.command.ma ? mem[pos + 1] : this.memory[this.memory[this.position + 1]]);
    this.b = Number(this.command.mb ? mem[pos + 2] : this.memory[this.memory[this.position + 2]]);

    return true;
  }

  getNextCommand() {
    if (this.position >= this.memory.length) {
      this.setStatus(statuses.ERROR, `Pointer out of range`);
      return false;
    }
    if (this.command.opcode == 99) return true;

    let codeStr = String(this.memory[this.position] || "");
    codeStr = "0".repeat(Math.max(0, 5 - codeStr.length)) + codeStr

    let opcode = Number(codeStr.slice(-2));
    let ma = Number(codeStr[2]);
    let mb = Number(codeStr[1]);
    let mc = Number(codeStr[0]);

    this.command = { ...this.command, opcode, ma, mb, mc };
    return true;
  }

  isStackOverflow() {
    if (this.debug.currentStep > this.debug.maxStep) {
      this.setStatus(statuses.ERROR, `Stack Overflow current step: ${this.debug.currentStep}`);
      return true;
    }
    return false
  }

  setStatus(status, message = null) {
    this.debug.message = message;
    this.status = status;
  }
}


test("run computer basic", () => {
  let c, i;
  c = new Computer([99]);
  i = c.runComputer();
  i.next().value;
  expect(c.status).toBe(99)

  c = new Computer([3,0,4,0,99], {input: [999]})
  i = c.runComputer();
  i.next().value;
  console.log(c);
  expect(c.status).toBe(99)
  expect(c.input).toMatchObject([])
  expect(c.output).toMatchObject([999])
  // let computer2 = { memory: [3,0,4,0,99], input: [999], output: [] }
  // let computer2Result = { ...computer2, input: [], output: [999], memory: [999, 0, 4, 0, 99] }
  // let res2 = runComputer(computer2);
  // expect(res2).toMatchObject(computer2Result)

  // let computer3 = {
  //   memory: [3,3,1105,-1,9,1101,0,0,12,4,12,99,1],
  //   input: [1],
  //   output: []
  // }
  // let computer3Result = { input: [], output: [1],  }
  // let res3 = runComputer(computer3);
  // expect(res3).toMatchObject(computer3Result)
  // let computer4 = {
  //   memory: [3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9],
  //   input: [0],
  //   output: []
  // }
  // let computer4Result = { input: [], output: [0],  }
  // let res4 = runComputer(computer4);
  // expect(res4).toMatchObject(computer4Result)
  // let computer5 = {
  //   memory: [3, 21, 1008, 21, 8, 20, 1005, 20, 22, 107, 8, 21, 20, 1006, 20, 31, 1106, 0, 36, 98, 0, 0, 1002, 21, 125, 20, 4, 20, 1105, 1, 46, 104, 999, 1105, 1, 46, 1101, 1000, 1, 20, 4, 20, 1105, 1, 46, 98, 99],
  //   input: [1],
  //   output: []
  // }
  // let computer5Result = { input: [], output: [999],  }
  // let res5 = runComputer(computer5);
  // expect(res5).toMatchObject(computer5Result)
})

test("dummy", () => { })


