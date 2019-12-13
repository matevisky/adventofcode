class Moon {
  constructor(x = 0) {
    this.x = x

    this.vx = 0
  }

  move() {
    this.x += this.vx
  }

  getState() {
    return `pos=<x=${this.x} vel=<x= ${this.vx}`
  }

}

class System {
  constructor() {
    this.moons = [];
    this.firstMoons = []
    this.step = 0;
  }

  addMoon(moon) {
    this.moons.push(moon)
    this.firstMoons.push(new Moon(moon.x))
  }

  checkSame() {
    for(let i = 0; i < this.moons.length; i++) {
      if (this.moons[i].x != this.firstMoons[i].x || this.moons[i].vx != this.firstMoons[i].vx) return false;
    }

    return true;
  }

  emulateStep() {
    this.pairingMoons();
    for(let i = 0; i < this.moons.length; i++) {
      this.moons[i].move();
    }
    this.step++
  }

  getState() {
    let ret = `After ${this.step} steps:\n`
    for (let i = 0 ; i < this.moons.length; i++) {
      ret += this.moons[i].getState() + "\n"
    }
    return ret
  }

  pairingMoons() {
    for(let i = 0; i < this.moons.length; i++) {
      for (let j = i + 1; j < this.moons.length; j++) {
        this.calculateGravity(this.moons[i], this.moons[j])
      }
    }
  }

  calculateGravity(m1, m2) {
    if (m1.x > m2.x) {
      m1.vx--
      m2.vx++
    }
    if (m1.x < m2.x) {
      m1.vx++
      m2.vx--
    }
  }


}

// <x=-7, y=-8, z=9>
// <x=-12, y=-3, z=-4>
// <x=6, y=-17, z=-9>
// <x=4, y=-10, z=-6>

const s = new System();
// s.addMoon(new Moon(-7, -8, 9))
// s.addMoon(new Moon(-12, -3, -4))
// s.addMoon(new Moon(6, -17, -9))
// s.addMoon(new Moon(4, -10, -6))

// s.addMoon(new Moon(-7))
// s.addMoon(new Moon(-12))
// s.addMoon(new Moon(6))
// s.addMoon(new Moon(4))

// s.addMoon(new Moon(-8))
// s.addMoon(new Moon(-3))
// s.addMoon(new Moon(-17))
// s.addMoon(new Moon(-10))

s.addMoon(new Moon(9))
s.addMoon(new Moon(-4))
s.addMoon(new Moon(-9))
s.addMoon(new Moon(-6))

for(let i = 0; i < 10000000; i++) {
  s.emulateStep()
  if (s.checkSame()) {
    console.log(i);
    break;
  }

}
console.log(s.getState())

//186028
//28482
//231614

 function gcd(a, b) {
        return !b ? a : gcd(b, a % b);
    }

    function lcm(a, b) {
        return (a * b) / gcd(a, b);
    }
console.log(lcm(lcm(186028, 28482),231614))