import Simulation from './simulation';

class SimulationView {
  constructor(ctx, coreImage){
    this.ctx = ctx;
    this.coreImage = coreImage;
    this.active = true;
  }

  start() {
    const ctx = this.ctx;
    this.simulation = new Simulation(ctx);
    this.active = true;
    this.lastTime = 0;
    this.simulation.core.getKValue();
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;

    this.simulation.step(timeDelta);
    this.simulation.draw(this.ctx, this.coreImage);
    this.lastTime = time;
    if (this.active) {
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  stop() {
    this.active = false;
    let canvas = document.getElementsByTagName("canvas")[0];
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("kvalue").disabled = false;
    this.simulation.neutrons = [];
  }
}

export default SimulationView;
