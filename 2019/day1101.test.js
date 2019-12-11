const { Computer } = require('./computer');
const mf = [3,8,1005,8,309,1106,0,11,0,0,0,104,1,104,0,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,1,10,4,10,1001,8,0,29,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,102,1,8,51,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,1002,8,1,72,1,1104,8,10,2,1105,15,10,2,1106,0,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,101,0,8,107,3,8,102,-1,8,10,1001,10,1,10,4,10,108,1,8,10,4,10,101,0,8,128,2,6,8,10,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,102,1,8,155,1006,0,96,2,108,10,10,1,101,4,10,3,8,1002,8,-1,10,101,1,10,10,4,10,1008,8,0,10,4,10,1002,8,1,188,2,1,5,10,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,0,10,4,10,102,1,8,214,2,6,18,10,1006,0,78,1,105,1,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,102,1,8,247,2,103,8,10,2,1002,10,10,2,106,17,10,1,1006,15,10,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,1,10,4,10,101,0,8,285,1,1101,18,10,101,1,9,9,1007,9,992,10,1005,10,15,99,109,631,104,0,104,1,21102,387507921664,1,1,21102,1,326,0,1106,0,430,21102,932826591260,1,1,21102,337,1,0,1106,0,430,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21101,206400850983,0,1,21101,0,384,0,1105,1,430,21102,3224464603,1,1,21102,395,1,0,1106,0,430,3,10,104,0,104,0,3,10,104,0,104,0,21102,838433657700,1,1,21102,418,1,0,1106,0,430,21101,825012007272,0,1,21101,429,0,0,1106,0,430,99,109,2,21202,-1,1,1,21101,40,0,2,21101,461,0,3,21102,1,451,0,1105,1,494,109,-2,2105,1,0,0,1,0,0,1,109,2,3,10,204,-1,1001,456,457,472,4,0,1001,456,1,456,108,4,456,10,1006,10,488,1102,1,0,456,109,-2,2106,0,0,0,109,4,1202,-1,1,493,1207,-3,0,10,1006,10,511,21101,0,0,-3,21202,-3,1,1,21201,-2,0,2,21102,1,1,3,21102,1,530,0,1106,0,535,109,-4,2106,0,0,109,5,1207,-3,1,10,1006,10,558,2207,-4,-2,10,1006,10,558,22101,0,-4,-4,1106,0,626,22102,1,-4,1,21201,-3,-1,2,21202,-2,2,3,21101,0,577,0,1106,0,535,22102,1,1,-4,21101,1,0,-1,2207,-4,-2,10,1006,10,596,21102,0,1,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,618,21201,-1,0,1,21102,618,1,0,105,1,493,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2105,1,0];
const c = new Computer([...mf], {})
// const input = ``;
const matrixSize = 100

const robotMatrix = new Array(matrixSize)
  .fill(null)
  .map(() => new Array(matrixSize).fill(null).map(() => 0))



x = Math.round(matrixSize / 2 -1)
y = Math.round(matrixSize / 2 -1)

const i = c.runComputer();
i.next().value;


const printRobot = (x, y, robotMatrix) => {
  let toPrint = ``;
  for (let i = 0; i < matrixSize; i++) {
    for (let j = 0; j < matrixSize; j++) {
      if (i == y && j == x) toPrint += "X"
      else toPrint += robotMatrix[i][j] == 1 ? "#" : " "
    }
    toPrint += "\n";
  }
  console.log(toPrint);
}

const directionArrow = [[0, -1], [1, 0], [0, 1], [-1, 0]];
let directionIndex = 0;
// console.log(x, y);
const painted = new Set();
for (let l = 0; l < 10000; l++) {
  painted.add(`${x},${y}`);
  const currentTile = robotMatrix[y][x]
  let i = c.runComputer();
  i.next();
  c.pushInput(l == 0 ? 1 : currentTile)
  i.next()
  const [color, directionShift] = c.output;
  robotMatrix[y][x] = color
  // console.log(currentTile, x, y);
  c.output = [];
  directionIndex = directionIndex + (directionShift == 0 ? -1 : 1)
  if (directionIndex > 3) directionIndex = 0;
  if (directionIndex < 0) directionIndex = 3;
  x += directionArrow[directionIndex][0]
  y += directionArrow[directionIndex][1]
  // console.log(color, directionShift, x, y);
  // printRobot(x, y, robotMatrix)
  if (c.status == 99) {
    console.log(l)
    break;
  }
}
console.log('aaa')
printRobot(x, y, robotMatrix)


// console.log(
//   robotMatrix
//   .reduce((c, row) => c + row.reduce((c, i) => c + i ,0), 0));

// console.log(
// painted.size);

// console.log(robotMatrix);
let minX = 1000;
let maxX = 0;
let minY = 1000;
let maxY = 0;

painted.forEach(i => {
  const [x,y] = i.split(",")
  if (i[0] < minX) minX = x
  if (i[0] > maxX) maxX = x
  if (i[0] < minY) minY = y
  if (i[0] > maxY) maxY = y
});

console.log({ minX, minY, maxX, maxY });
console.log(painted.size);

const result = ``;
console.log(result);
test("dummy", () => { })
