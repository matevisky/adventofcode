class Moon {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x
    this.y = y
    this.z = z

    this.vx = 0
    this.vy = 0
    this.vz = 0
  }

  move() {
    this.x += this.vx
    this.y += this.vy
    this.z += this.vz
  }

  getEnergy() {
    return (Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)) *
      (Math.abs(this.vx) + Math.abs(this.vy) + Math.abs(this.vz))
  }

  getState() {
    return `pos=<x=${this.x}, y=  ${this.y}, z= ${this.z}>, vel=<x= ${this.vx}, y= ${this.vy}, z= ${this.vz}>`
  }

}

class System {
  constructor() {
    this.moons = [];
    this.step = 0;
  }
  addMoon(moon) {
    this.moons.push(moon)
  }

  emulateStep() {
    this.pairingMoons();
    for(let i = 0; i < this.moons.length; i++) {
      this.moons[i].move();
    }
    this.step++
  }

  getState() {
    let ret = `After ${this.step} steps energy: ${this.getEnergy()}:\n`
    for (let i = 0 ; i < this.moons.length; i++) {
      ret += this.moons[i].getState() + "\n"
    }
    return ret
  }

  getEnergy() {
    let energy = 0;
    for (let i = 0; i < this.moons.length; i++) {
      energy += this.moons[i].getEnergy()
    }
    return energy
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
    if (m1.y > m2.y) {
      m1.vy--
      m2.vy++
    }
    if (m1.y < m2.y) {
      m1.vy++
      m2.vy--
    }
    if (m1.z > m2.z) {
      m1.vz--
      m2.vz++
    }
    if (m1.z < m2.z) {
      m1.vz++
      m2.vz--
    }
  }
}

// <x=-7, y=-8, z=9>
// <x=-12, y=-3, z=-4>
// <x=6, y=-17, z=-9>
// <x=4, y=-10, z=-6>

const s = new System();
s.addMoon(new Moon(-7, -8, 9))
s.addMoon(new Moon(-12, -3, -4))
s.addMoon(new Moon(6, -17, -9))
s.addMoon(new Moon(4, -10, -6))

for(let i = 0; i < 1000; i++) {
s.emulateStep()

}
console.log(s.getState())

test("dummy", () => { })
