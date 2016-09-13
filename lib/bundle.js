/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _simulation = __webpack_require__(1);
	
	var _simulation2 = _interopRequireDefault(_simulation);
	
	var _simulation_view = __webpack_require__(3);
	
	var _simulation_view2 = _interopRequireDefault(_simulation_view);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvas = document.getElementsByTagName("canvas")[0];
	  canvas.width = _simulation2.default.DIM_X;
	  canvas.height = _simulation2.default.DIM_Y;
	  var core = document.getElementById("core");
	
	  var ctx = canvas.getContext("2d");
	  var simulation = new _simulation2.default();
	  new _simulation_view2.default(simulation, ctx).start();
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _neutron = __webpack_require__(2);
	
	var _neutron2 = _interopRequireDefault(_neutron);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Simulation = function () {
	  function Simulation(ctx) {
	    _classCallCheck(this, Simulation);
	
	    this.ctx = ctx;
	    this.neutrons = [];
	    this.populateNeutrons();
	  }
	
	  _createClass(Simulation, [{
	    key: "randomPos",
	    value: function randomPos() {
	      return [Math.random() * Simulation.DIM_X, Math.random() * Simulation.DIM_Y];
	    }
	  }, {
	    key: "populateNeutrons",
	    value: function populateNeutrons() {
	      for (var i = 0; i < 100; i++) {
	        this.neutrons.push(new _neutron2.default(this, { pos: this.randomPos(), speed: 4 }));
	      }
	    }
	  }, {
	    key: "draw",
	    value: function draw(ctx) {
	      ctx.clearRect(0, 0, Simulation.DIM_X, Simulation.DIM_Y);
	      ctx.fillStyle = Simulation.BG_COLOR;
	      ctx.fillRect(0, 0, Simulation.DIM_X, Simulation.DIM_Y);
	
	      this.neutrons.forEach(function (neutron) {
	        return neutron.draw(ctx);
	      });
	    }
	  }, {
	    key: "moveNeutrons",
	    value: function moveNeutrons(timeDelta) {
	      this.neutrons.forEach(function (neutron) {
	        return neutron.move(timeDelta);
	      });
	    }
	  }, {
	    key: "step",
	    value: function step(timeDelta) {
	      this.moveNeutrons(timeDelta);
	    }
	  }, {
	    key: "isOutOfBounds",
	    value: function isOutOfBounds(pos) {
	      return pos[0] < 0 || pos[1] < 0 || pos[0] > Simulation.DIM_X || pos[1] > Simulation.DIM_Y;
	    }
	  }]);
	
	  return Simulation;
	}();
	
	Simulation.BG_COLOR = "#000000";
	Simulation.DIM_X = 1000;
	Simulation.DIM_Y = 1000;
	Simulation.FPS = 32;
	
	exports.default = Simulation;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _simulation = __webpack_require__(1);
	
	var _simulation2 = _interopRequireDefault(_simulation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Neutron = function () {
	  function Neutron(simulation, options) {
	    _classCallCheck(this, Neutron);
	
	    this.simulation = simulation;
	    this.pos = options.pos;
	    this.speed = 4;
	    this.vel = this.randomVelocity();
	    this.radius = 2;
	    this.color = 'rgb(255, 255, 0)';
	  }
	
	  _createClass(Neutron, [{
	    key: 'randomVelocity',
	    value: function randomVelocity() {
	      var deg = 2 * Math.PI * Math.random();
	      return [Math.sin(deg) * this.speed, Math.cos(deg) * this.speed];
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.fillStyle = this.color;
	
	      ctx.beginPath();
	      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
	      ctx.fill();
	    }
	  }, {
	    key: 'move',
	    value: function move(timeDelta) {
	      var velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
	      var offsetX = this.vel[0] * velocityScale;
	      var offsetY = this.vel[1] * velocityScale;
	      var pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
	      if (this.simulation.isOutOfBounds(pos)) {
	        this.randomWrap(pos);
	      } else {
	        this.pos = pos;
	      }
	    }
	  }, {
	    key: 'randomWrap',
	    value: function randomWrap(pos) {
	      var side = Math.floor(Math.random() * 4);
	      if (side === 0) {
	        this.pos = [Math.random() * _simulation2.default.DIM_X, 0];
	        this.vel = this.randomWrapVelocity(side);
	      } else if (side === 1) {
	        this.pos = [_simulation2.default.DIM_X, Math.random() * _simulation2.default.DIM_Y];
	        this.vel = this.randomWrapVelocity(side);
	      } else if (side === 2) {
	        this.pos = [Math.random() * _simulation2.default.DIM_X, _simulation2.default.DIM_Y];
	        this.vel = this.randomWrapVelocity(side);
	      } else if (side === 3) {
	        this.pos = [0, Math.random() * _simulation2.default.DIM_Y];
	        this.vel = this.randomWrapVelocity(side);
	      }
	    }
	  }, {
	    key: 'randomWrapVelocity',
	    value: function randomWrapVelocity(side) {
	      var deg = 2 * Math.PI * Math.random();
	      if (side === 0) {
	        return [Math.sin(deg) * this.speed, -Math.cos(deg) * this.speed];
	      } else if (side === 1) {
	        return [-Math.sin(deg) * this.speed, Math.cos(deg) * this.speed];
	      } else if (side === 2) {
	        return [Math.sin(deg) * this.speed, Math.abs(Math.cos(deg)) * this.speed];
	      } else if (side === 3) {
	        return [Math.abs(Math.sin(deg)) * this.speed, Math.cos(deg) * this.speed];
	      }
	    }
	  }]);
	
	  return Neutron;
	}();
	
	var NORMAL_FRAME_TIME_DELTA = 1000 / 60;
	
	exports.default = Neutron;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SimulationView = function () {
	  function SimulationView(simulation, ctx) {
	    _classCallCheck(this, SimulationView);
	
	    this.ctx = ctx;
	    this.simulation = simulation;
	  }
	
	  _createClass(SimulationView, [{
	    key: "start",
	    value: function start() {
	      this.lastTime = 0;
	      requestAnimationFrame(this.animate.bind(this));
	    }
	  }, {
	    key: "animate",
	    value: function animate(time) {
	      var timeDelta = time - this.lastTime;
	
	      this.simulation.step(timeDelta);
	      this.simulation.draw(this.ctx);
	      this.lastTime = time;
	
	      requestAnimationFrame(this.animate.bind(this));
	    }
	  }]);
	
	  return SimulationView;
	}();
	
	exports.default = SimulationView;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map