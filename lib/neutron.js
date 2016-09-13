import Simulation from './simulation';

class Neutron {
  constructor(simulation, options){
    this.simulation = simulation;
    this.pos = options.pos;
    this.speed = 4;
    this.vel = this.randomVelocity();
    this.radius = 2;
    this.color = 'rgb(255, 255, 0)';
  }

  randomVelocity () {
    let deg = 2 * Math.PI * Math.random();
    return [Math.sin(deg) * this.speed, Math.cos(deg) * this.speed];
  }

  draw(ctx){
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    let offsetX = this.vel[0] * velocityScale;
    let offsetY = this.vel[1] * velocityScale;
    let pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    if (this.simulation.isOutOfBounds(pos)){
      this.randomWrap(pos);
    } else {
      this.pos = pos;
    }
  }

  randomWrap(pos){
    let side = Math.floor(Math.random() * 4);
    if (side === 0) {
      this.pos = [Math.random() * Simulation.DIM_X, 0];
      this.vel = this.randomWrapVelocity(side);
    } else if (side === 1) {
      this.pos = [Simulation.DIM_X, Math.random() * Simulation.DIM_Y];
      this.vel = this.randomWrapVelocity(side);
    } else if (side === 2) {
      this.pos = [Math.random() * Simulation.DIM_X, Simulation.DIM_Y];
      this.vel = this.randomWrapVelocity(side);
    } else if (side === 3) {
      this.pos = [0, Math.random() * Simulation.DIM_Y];
      this.vel = this.randomWrapVelocity(side);
    }
  }

  randomWrapVelocity(side){
    let deg = 2 * Math.PI * Math.random();
    if (side === 0) {
      return [Math.sin(deg) * this.speed, -(Math.cos(deg)) * this.speed];
    } else if (side === 1) {
      return [-(Math.sin(deg)) * this.speed, Math.cos(deg) * this.speed];
    } else if (side === 2) {
      return [Math.sin(deg) * this.speed, Math.abs(Math.cos(deg)) * this.speed];
    } else if (side === 3) {
      return [Math.abs(Math.sin(deg)) * this.speed,
        Math.cos(deg) * this.speed];
    }
  }





}

const NORMAL_FRAME_TIME_DELTA = 1000/60;

export default Neutron;
