

class SimulationView {
  constructor(simulation, ctx, coreImage){
    this.ctx = ctx;
    this.simulation = simulation;
    this.coreImage = coreImage;
  }

  start() {
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.simulation.step(timeDelta);
    this.simulation.draw(this.ctx, this.coreImage);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
}

export default SimulationView;
