import Simulation from './simulation';
import SimulationView from './simulation_view';




document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementsByTagName("canvas")[0];
  canvas.width = Simulation.DIM_X;
  canvas.height = Simulation.DIM_Y;
  const core = document.getElementById("core");
  const ctx = canvas.getContext("2d");
  // const simulation = new Simulation(ctx);
  const View = new SimulationView(ctx, core);

  document.getElementById("start").onclick = (e) => {
    e.preventDefault();
    View.start();
  };
  document.getElementById("stop").onclick = (ev) => {
    ev.preventDefault();
    View.stop();
  };
  //
  // const graph = document.getElementById("graph");
  // ReactDOM.render
});
