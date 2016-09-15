import Neutron from './neutron';
import Core from './core';
import Util from './util';

class Simulation {
  constructor(ctx) {
    this.ctx = ctx;
    this.neutrons = [];
    // this.collisionSound = new Audio("ring.wav");
    this.populateNeutrons();
    this.createCore();
    this.fissionCount = 0;
    this.fissionsPerSecond = 5;
    this.steadyPower = 3000;
    this.animationCount = 0;
    this.updateTemperature();
  }

  createCore(){
    this.core = new Core(this, {pos: [(Simulation.DIM_X / 2), (Simulation.DIM_Y / 2)], radius: 75});
  }

  populateNeutrons() {
    for (let i = 0; i < 100;   i++) {
      this.neutrons.push(new Neutron(this,
        {pos: Util.randomPos(Simulation.DIM_X, Simulation.DIM_Y),
          speed: 2, colorIndex: 0}));
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
      // this.fissionsPerSecond.push(this.fissionCount);
      this.fissionsPerSecond = this.fissionCount;
      this.fissionCount = 0;
    }

    ctx.font = "32px serif";
    ctx.fillStyle = 'white';
    // let total = 0;
    // // for(let i = 0; i < this.fissionsPerSecond.length; i++) {
    // //   total += this.fissionsPerSecond[i];
    // // }
    // // let avg = total / this.fissionsPerSecond.length;
    let powerLevel = (this.fissionsPerSecond) * 600;
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

  calculateFissionProbability() {
    let neutronCount = this.neutrons.length;
    return ((neutronCount * this.core.kValue) / (neutronCount * 2));
  }

  checkCollisions() {
    let neutrons = this.neutrons.slice(0);
    window.neutrons = this.neutrons;
    neutrons.forEach((neutron, idx) => {
      if (neutron.isCollidedWith(this.core)) {
        this.fissionCount += 1;
        // this.collisionSound.play();

        this.removeNeutron(idx);
        let probability = this.calculateFissionProbability();
        if (Math.random() <= probability) {
          this.neutrons.push(this.core.generateNeutron(neutron));
          this.neutrons.push(this.core.generateNeutron(neutron));
        }
        // this.collisionSound.currentTime = 0;
      }
    });
  }



}



Simulation.BG_COLOR = "#000000";
Simulation.DIM_X = 750;
Simulation.DIM_Y = 500;
Simulation.FPS = 32;


export default Simulation;
