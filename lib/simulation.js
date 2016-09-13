import Neutron from './neutron';


class Simulation {
  constructor(ctx) {
    this.ctx = ctx;
    this.neutrons = [];
    this.populateNeutrons();
  }

  randomPos(){
    return [Math.random() * Simulation.DIM_X, Math.random() * Simulation.DIM_Y];
  }

  populateNeutrons() {
    for (let i = 0; i < 100;   i++) {
      this.neutrons.push(new Neutron(this, {pos: this.randomPos(), speed: 4}));
    }
  }

  draw(ctx){
    ctx.clearRect(0, 0, Simulation.DIM_X, Simulation.DIM_Y);
    ctx.fillStyle = Simulation.BG_COLOR;
    ctx.fillRect(0, 0, Simulation.DIM_X, Simulation.DIM_Y);

    this.neutrons.forEach(neutron => neutron.draw(ctx));
  }

  moveNeutrons(timeDelta){
    this.neutrons.forEach(neutron => neutron.move(timeDelta));
  }

  step(timeDelta){
    this.moveNeutrons(timeDelta);
  }

  isOutOfBounds(pos){
    return (pos[0] < 0 || pos[1] < 0) ||
    (pos[0] > Simulation.DIM_X || pos[1] > Simulation.DIM_Y);
  }

}





Simulation.BG_COLOR = "#000000";
Simulation.DIM_X = 1000;
Simulation.DIM_Y = 600;
Simulation.FPS = 32;


export default Simulation;
