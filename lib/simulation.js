import Neutron from './neutron';
import Core from './core';
import Util from './util';

class Simulation {
  constructor(ctx) {
    this.ctx = ctx;
    this.neutrons = [];
    // this.collisionSound = new Audio("ring.wav");
    // this.simulationSpeed = 2;
    this.initialNeutronCount = 100;
    this.createCore();
    this.fissionCount = 0;
    this.fissionsPerSecond = 0;
    this.steadyPower = 3000;
    this.animationCount = 0;
    this.powerLevel = [];
  }

  createCore() {
    this.core = new Core(this, {pos: [(Simulation.DIM_X / 2), (Simulation.DIM_Y / 2)], radius: 70});
  }

  getSpeed() {
    let speedInput = document.getElementById('speed');
    this.simulationSpeed = parseInt(speedInput.value);
    speedInput.disabled = true;
    this.steadyStateFPS = this.fpsAtSteadyState(this.simulationSpeed);
  }

  populateNeutrons() {
    for (let i = 0; i < this.initialNeutronCount;   i++) {
      this.neutrons.push(new Neutron(this,
        {pos: Util.randomPos(Simulation.DIM_X, Simulation.DIM_Y),
         colorIndex: 0}));
    }
  }


  draw(ctx, coreImage){
    ctx.clearRect(0, 0, Simulation.DIM_X, Simulation.DIM_Y);
    ctx.fillStyle = Simulation.BG_COLOR;
    ctx.fillRect(0, 0, Simulation.DIM_X, Simulation.DIM_Y);

    this.core.color = 'white';
    this.core.draw(ctx);
    //
    if (this.animationCount % 60 === 0){
      this.fissionsPerSecond = this.fissionCount;
      this.fissionCount = 0;
    }

    ctx.font = "32px serif";
    ctx.fillStyle = 'white';
    // let total = 0;
    // for (var i = 0; i < this.fissionsPerSecond.length; i++) {
    //   total += this.fissionsPerSecond[i];
    // }
    // let avg = total / this.fissionsPerSecond.length;
    //If steady power is around 3000 MW for a PWR, using 100 initial neutrons at
    // k = 1, the average fission per second = 5.
    let powerLevel = (this.fissionsPerSecond) * this.powerLevelPerFission(this.steadyStateFPS);
    this.powerLevel.push(powerLevel);
    // if (powerLevel > 10000) {
    //   this.checkMeltdown();
    // }
    ctx.fillText(`${powerLevel} MW`, 100, 100);

    let coreLength = 140;
    ctx.drawImage(coreImage, ((Simulation.DIM_X/ 2) - (coreLength/ 2)),
    ((Simulation.DIM_Y/ 2) - (coreLength/ 2)), coreLength, coreLength);

    this.neutrons.forEach(neutron => neutron.draw(ctx));
    this.animationCount += 1;
  }

  moveNeutrons(timeDelta){
    this.neutrons.forEach(neutron => neutron.move(timeDelta));
  }

  step(timeDelta){
    this.moveNeutrons(timeDelta);
    this.checkCollisions();
  }

  isOutOfBounds(pos){
    return (pos[0] < 0 || pos[1] < 0) ||
    (pos[0] > Simulation.DIM_X || pos[1] > Simulation.DIM_Y);
  }

  removeNeutron(index){
    this.neutrons.splice(index, 1);
  }

  checkMeltdown() {
    let total = 0;
    for (var i = 0; i < this.powerLevel.length; i++) {
      total += this.powerLevel[i];
    }
    let avgPowerLevel = total / this.powerLevel.length;
    if (avgPowerLevel > 7500) {
      window.alert("MELTDOWN MELTDOWN MELTDOWN: PLEASE EVACUATE");
    }
  }


  checkCollisions() {
    if (this.animationCount % 120 === 0) {
      console.log(this.neutrons.length);
    }
    let neutrons = this.neutrons.slice(0);
    window.neutrons = this.neutrons;
    neutrons.forEach((neutron, idx) => {
      if (neutron.isCollidedWith(this.core)) {
        this.fissionCount += 1;
        this.removeNeutron(idx);
        if (Math.random() <= this.core.fissionProbability) {
          this.neutrons.push(this.core.generateNeutron(neutron));
          this.neutrons.push(this.core.generateNeutron(neutron));
        }
      }
    });
  }

  fpsAtSteadyState(speed) {
  //If steady power is around 3000 MW for a PWR, using 100 initial neutrons at
  // k = 1, the average fission per second = 5 at speed = 2.
  let systemRatio = 5/2;
  return systemRatio * speed;
  }

  powerLevelPerFission(fpsAtSteadyState){
    return this.steadyPower / fpsAtSteadyState;
  }



}



Simulation.BG_COLOR = "#000000";
Simulation.DIM_X = 750;
Simulation.DIM_Y = 500;
Simulation.FPS = 32;


export default Simulation;
