const input2 = `.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##`;
const input = `#.#................#..............#......#......
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
  let queueAdded = new Set();
  visited.add(`${y},${x}`);
  queueAdded.add(`${y},${x}`);
  const resultAsteroid = [];
  currentAsteroid = getAsteroid(input);
  let queue = [[y, x]]
  let so = 0;
  let so1 = 0;
  while (queue.length > 0) {
    so++;
    const [cy, cx] = queue.shift();
    const key = `${cy},${cx}`
    const vectors = [[1, 0], [-1, 0], [0, 1], [0, -1],[1, 1], [-1, -1], [1, -1], [-1, 1]]
    vectors.forEach(v => {
      let xx = v[1] + cx;
      let yy = v[0] + cy;
      if (!isValidCord(currentAsteroid, yy, xx)) {
        return;
      }
      const vectorKey = `${yy},${xx}`
      if (visited.has(vectorKey)) return;
      if (queueAdded.has(vectorKey)) return;
      queueAdded.add(vectorKey);
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
// printAsteroid(getAsteroid(input), getMaxVisible(2, 2), 2, 2)

// console.log(getMaxVisible(21, 4));

// console.log()

// let currentMax = 0;
let masterAsteroid = getAsteroid(input);
// for (let y = 0; y < masterAsteroid.length; y++) {
//   for (let x = 0; x < masterAsteroid[0].length; x++) {
//     if (masterAsteroid[y][x] == 0) continue
//     const max = getMaxVisible(y, x).length;
//     if (max > currentMax) {
//       currentMax = max;
//       console.log(y, x, currentMax);
//     }
//   }
// }
// console.log(currentMax);

//25 37 309

//console.log(masterAsteroid.length, masterAsteroid[0].length);
//calculate distance and degree
let py = 25;
let px = 37;
// let py = 13;
// let px = 11;
const asteroids = [];
const asteroidDegrees = new Set();
for (let y = 0; y < masterAsteroid.length; y++) {
  for (let x = 0; x < masterAsteroid[0].length; x++) {
    if (masterAsteroid[y][x] == 0) continue
    if (y == py && x == px) continue
    let rx = x - px;
    let ry = py - y;
    let degree = Math.atan2(rx, ry) * 180 / Math.PI;
    if (degree < 0) degree += 360;
    degree = Number(Math.round(degree* 1000000))
    asteroidDegrees.add(degree);
    asteroids.push({
      dist: Math.sqrt(ry * ry + px * px),
      degree,
      alive: true,
      x,
      y,
      rx,
      ry
    })
    // if (degree == 333434949) {
    //   console.log('got it', asteroidDegrees.has(333434949), asteroids.filter(i => i.degree == 333434949));
    // }
  }
}
let ad = Array.from(asteroidDegrees).sort((i, j) => i - j)
let result = []
let i = 0
let j = 0
while (result.length < asteroids.length && j < 10000) {
  j++
  let currentDegree = ad[i]
  i++;
  if (i > ad.length) i = 0;
  let currentAsteroids = asteroids
    .filter(i => i.degree == currentDegree && i.alive)
    .sort((i, j) => i.dist > j.dist ? 1 : -1)

  if (currentAsteroids.length == 0) continue;
  currentAsteroids[0].alive = false;
  let x = currentAsteroids[0].x;
  let y = currentAsteroids[0].y;

  // console.log(i, currentAsteroids[0])
  result.push({ x,y });

}
// console.log(asteroids.filter(i => i.degree == 333434949));
// console.log(asteroids.filter(i => i.alive == true));
console.log(j, asteroids.length, result.length);
// console.log(asteroids
//   .filter(i => i.alive)
//   .sort((i, j) => i.dist > j.dist ? 1 : -1)
// )
console.log(result[199]);

test("dummy", () => { })
