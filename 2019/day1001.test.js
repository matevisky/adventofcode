const input = `......#.#.
#..#.#....
..#######.
.#.#.###..
.#..#.....
..#....#.#
#..#....#.
.##.#..###
##...#..#.
.#....####`;
const input2 = `#.#................#..............#......#......
.......##..#..#....#.#.....##...#.........#.#...
.#...............#....#.##......................
......#..####.........#....#.......#..#.....#...
.....#............#......#................#.#...
....##...#.#.#.#.............#..#.#.......#.....
..#.#.........#....#..#.#.........####..........
....#...#.#...####..#..#..#.....#...............
.............#......#..........#...........#....
......#.#.........#...............#.............
..#......#..#.....##...##.....#....#.#......#...
...#.......##.........#.#..#......#........#.#..
#.............#..........#....#.#.....#.........
#......#.#................#.......#..#.#........
#..#.#.....#.....###..#.................#..#....
...............................#..........#.....
###.#.....#.....#.............#.......#....#....
.#.....#.........#.....#....#...................
........#....................#..#...............
.....#...#.##......#............#......#.....#..
..#..#..............#..#..#.##........#.........
..#.#...#.......#....##...#........#...#.#....#.
.....#.#..####...........#.##....#....#......#..
.....#..#..##...............................#...
.#....#..#......#.#............#........##...#..
.......#.....................#..#....#.....#....
#......#..###...........#.#....#......#.........
..............#..#.#...#.......#..#.#...#......#
.......#...........#.....#...#.............#.#..
..##..##.............#........#........#........
......#.............##..#.........#...#.#.#.....
#........#.........#...#.....#................#.
...#.#...........#.....#.........#......##......
..#..#...........#..........#...................
.........#..#.......................#.#.........
......#.#.#.....#...........#...............#...
......#.##...........#....#............#........
#...........##.#.#........##...........##.......
......#....#..#.......#.....#.#.......#.##......
.#....#......#..............#.......#...........
......##.#..........#..................#........
......##.##...#..#........#............#........
..#.....#.................###...#.....###.#..#..
....##...............#....#..................#..
.....#................#.#.#.......#..........#..
#........................#.##..........#....##..
.#.........#.#.#...#...#....#........#..#.......
...#..#.#......................#...............#`;



const getAsteroid = input => {
  input = input.replace(/\./g, 0)
  input = input.replace(/\#/g, 1)
  return input.split("\n")
    .reduce((c, i) => {
      c.push(i.split(""))
      return c
    }, [])
}

const gcd = function(a, b) {
  if (!b) {
    return a;
  }

  return gcd(b, a % b);
}

const isValidCord = (currentAsteroid, yy, xx) => {
  if (xx < 0 || xx >= (currentAsteroid[0].length) || yy < 0 || yy >= currentAsteroid.length) return false;
  return true;
}

const getMaxVisible = (y, x) => {
  let visited = new Set();
  visited.add(`${y},${x}`);
  const resultAsteroid = [];
  currentAsteroid = getAsteroid(input);
  let queue = [[y, x]]
  let so = 0;
  while (queue.length > 0) {
    so++;
    const [cy, cx] = queue.shift();
    const key = `${cy},${cx}`
    const vectors = [[1, 0], [-1, 0], [0, 1], [0, -1]]
    vectors.forEach(v => {
      let xx = v[1] + cx;
      let yy = v[0] + cy;
      if (!isValidCord(currentAsteroid, yy, xx)) {
        return;
      }
      const vectorKey = `${yy},${xx}`
      if (visited.has(vectorKey)) return;
      queue.push([yy, xx]);
    })
    if (visited.has(key)) continue;
    visited.add(key);
    if (currentAsteroid[cy][cx] == 1) {
      resultAsteroid.push([cy, cx]);
      let vy1 = cy - y
      let vx1 = cx - x;
      const vvv = gcd(Math.abs(vy1), Math.abs(vx1));
      vy = vy1 / vvv;
      vx = vx1 / vvv;
      // if (vvv > 1) {
        // console.log(vy1, vx1, vvv, vy, vx)

      // }

      let ay = y;
      let ax = x;
      ay = y + vy;
      ax = x + vx;
      do {
        ay += vy;
        ax += vx;
        visited.add(`${ay},${ax}`)
      } while(isValidCord(currentAsteroid, ay, ax))
    }
  }
  // console.log(visited, currentCount, visited.size);
  return resultAsteroid;
}


printAsteroid = (currentAsteroid, result, sy, sx) => {
  let out = "";
  currentAsteroid[sy][sx] = "X"
  for ([y, x] of result) {
    currentAsteroid[y][x] = "o"
  }


for (let y = 0; y < currentAsteroid.length; y++) {
    let row = "";
    for (let x = 0; x < currentAsteroid[0].length; x++) {
      row += currentAsteroid[y][x];
    }
    out += row + "\n";
  }
  out = out.replace(/1/g, '#')
  out = out.replace(/0/g, '.')

  console.log(out);
  console.log(result.length);
}
// printAsteroid(getAsteroid(input), getMaxVisible(21, 4), 21, 4)

// console.log(getMaxVisible(21, 4));

// console.log()

let currentMax = 0;
let masterAsteroid = getAsteroid(input);
for (let y = 0; y < masterAsteroid.length; y++) {
  for (let x = 0; x < masterAsteroid[0].length; x++) {
    if (masterAsteroid[y][x] == 0) continue
    const max = getMaxVisible(y, x).length;
    if (max > currentMax) {
      currentMax = max;
      console.log(y, x, currentMax);
    }
  }
}
console.log(currentMax);



test("dummy", () => { })
