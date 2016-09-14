import Neutron from './neutron';
import Util from './util';

class Core extends Neutron {
  constructor(simulation, options){
    super(simulation, options);
      // this.simulation = simulation;
      // this.pos = options.pos;
      this.speed = 0;
      this.vel = [0, 0];
      // this.radius = options.radius;
      this.color = "white";
      this.clearLength = this.radius + 15;
      this.neutronPostions = [
        [this.pos[0], (this.pos[1] - this.clearLength)],
        [(this.pos[0] + this.clearLength), this.pos[1]],
        [this.pos[0], (this.pos[1] + this.clearLength)],
        [(this.pos[0] - this.clearLength), this.pos[1]]
      ];
      this.kValue = 1.1;
  }


  draw(ctx){
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  generateNeutron(oldNeutron) {
    let newColorIndex;
    if ((oldNeutron.colorIndex + 1) > 6) {
      newColorIndex = 0;
    } else {
      newColorIndex = oldNeutron.colorIndex + 1;
    }
    let side = Math.floor(Math.random() * 4);
    let newPos = this.neutronPostions[side];
    let newVel = Util.coreNeutronVelocity(side, oldNeutron.speed);

    return new Neutron(this.simulation, {pos: newPos, vel: newVel, colorIndex: newColorIndex});
  }
}




export default Core;
