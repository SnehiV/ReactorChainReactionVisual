import Neutron from './neutron';
import Core from './core';
import Util from './util';

class Simulation {
  constructor(ctx, coreImage) {
    this.ctx = ctx;
    this.neutrons = [];
    this.populateNeutrons();
    this.createCore();
  }

  createCore(){
    this.core = new Core(this, {pos: [(Simulation.DIM_X / 2), (Simulation.DIM_Y / 2)], radius: 75});
  }

  populateNeutrons() {
    for (let i = 0; i < 50;   i++) {
      this.neutrons.push(new Neutron(this,
        {pos: Util.randomPos(Simulation.DIM_X, Simulation.DIM_Y),
          speed: 4, colorIndex: 0}));
    }
  }

  draw(ctx, coreImage){
    ctx.clearRect(0, 0, Simulation.DIM_X, Simulation.DIM_Y);
    ctx.fillStyle = Simulation.BG_COLOR;
    ctx.fillRect(0, 0, Simulation.DIM_X, Simulation.DIM_Y);

    this.core.draw(ctx);

    let coreLength = 140;
    ctx.drawImage(coreImage, ((Simulation.DIM_X/ 2) - (coreLength/ 2)),
    ((Simulation.DIM_Y/ 2) - (coreLength/ 2)), coreLength, coreLength);

    this.neutrons.forEach(neutron => neutron.draw(ctx));
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

  checkCollisions() {
    let neutrons = this.neutrons.slice(0);
    neutrons.forEach((neutron, idx) => {
      if (neutron.isCollidedWith(this.core)) {
        this.core.color = 'red';
        this.removeNeutron(idx);
        this.neutrons.push(this.core.generateNeutrons(neutron));
        this.core.color = 'white';
      }
    });
  }



}



Simulation.BG_COLOR = "#000000";
Simulation.DIM_X = 750;
Simulation.DIM_Y = 500;
Simulation.FPS = 32;


export default Simulation;
