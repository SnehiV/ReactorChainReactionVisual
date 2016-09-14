import Neutron from './neutron';

class Core extends Neutron {
  constructor(simulation, options){
    super(simulation, options);
      // this.simulation = simulation;
      // this.pos = options.pos;
      this.speed = 0;
      this.vel = [0, 0];
      // this.radius = options.radius;
      this.color = "white";
  }


  draw(ctx){
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }
}



export default Core;
