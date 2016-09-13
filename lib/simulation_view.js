

class SimulationView {
  constructor(simulation, ctx){
    this.ctx = ctx;
    this.simulation = simulation;
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.simulation.step(timeDelta);
    this.simulation.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}

export default SimulationView;
