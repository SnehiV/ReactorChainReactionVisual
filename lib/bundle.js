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
	
	var _simulation_view = __webpack_require__(5);
	
	var _simulation_view2 = _interopRequireDefault(_simulation_view);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvas = document.getElementsByTagName("canvas")[0];
	  canvas.width = _simulation2.default.DIM_X;
	  canvas.height = _simulation2.default.DIM_Y;
	  var core = document.getElementById("core");
	  var ctx = canvas.getContext("2d");
	  var View = new _simulation_view2.default(ctx, core);
	  var modal = document.getElementById("modal");
	  modal.className = "modal is-active";
	  var modalOff = function modalOff() {
	    return modal.className = "modal";
	  };
	
	  modal.onclick = function () {
	    modalOff();
	  };
	
	  document.getElementById("start").onclick = function (e) {
	    e.preventDefault();
	    View.start();
	  };
	  document.getElementById("stop").onclick = function (ev) {
	    ev.preventDefault();
	    View.stop();
	  };
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _neutron = __webpack_require__(2);
	
	var _neutron2 = _interopRequireDefault(_neutron);
	
	var _core = __webpack_require__(4);
	
	var _core2 = _interopRequireDefault(_core);
	
	var _util = __webpack_require__(3);
	
	var _util2 = _interopRequireDefault(_util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Simulation = function () {
	  function Simulation(ctx) {
	    _classCallCheck(this, Simulation);
	
	    this.ctx = ctx;
	    this.neutrons = [];
	    this.initialNeutronCount = 100;
	    this.createCore();
	    this.fissionCount = 0;
	    this.fissionsPerSecond = 0;
	    this.steadyPower = 3000;
	    this.animationCount = 0;
	    this.powerLevel = [];
	  }
	
	  _createClass(Simulation, [{
	    key: 'createCore',
	    value: function createCore() {
	      this.core = new _core2.default(this, { pos: [Simulation.DIM_X / 2, Simulation.DIM_Y / 2], radius: 70 });
	    }
	  }, {
	    key: 'getSpeed',
	    value: function getSpeed() {
	      var speedInput = document.getElementById('speed');
	      this.simulationSpeed = parseInt(speedInput.value);
	      speedInput.disabled = true;
	      this.steadyStateFPS = this.fpsAtSteadyState(this.simulationSpeed);
	    }
	  }, {
	    key: 'populateNeutrons',
	    value: function populateNeutrons() {
	      for (var i = 0; i < this.initialNeutronCount; i++) {
	        this.neutrons.push(new _neutron2.default(this, { pos: _util2.default.randomPos(Simulation.DIM_X, Simulation.DIM_Y),
	          colorIndex: 0 }));
	      }
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx, coreImage) {
	      ctx.clearRect(0, 0, Simulation.DIM_X, Simulation.DIM_Y);
	      ctx.fillStyle = Simulation.BG_COLOR;
	      ctx.fillRect(0, 0, Simulation.DIM_X, Simulation.DIM_Y);
	
	      this.core.color = 'white';
	      this.core.draw(ctx);
	      //
	      if (this.animationCount % 60 === 0) {
	        this.fissionsPerSecond = this.fissionCount;
	        this.fissionCount = 0;
	      }
	      //**Used to find fission per second for power level calibration**
	      //    let total = 0;
	      //    for (var i = 0; i < this.fissionsPerSecond.length; i++) {
	      //    total += this.fissionsPerSecond[i];
	      //    }
	      //    let avg = total / this.fissionsPerSecond.length;
	
	      //    If steady power is around 3000 MW for a PWR, using 100 initial neutrons at
	      //    k = 1, the average fission per second = 5.
	
	      var powerLevel = this.fissionsPerSecond * this.powerLevelPerFission(this.steadyStateFPS);
	      this.powerLevel.push(powerLevel);
	      ctx.font = "32px serif";
	      ctx.fillStyle = 'white';
	      ctx.fillText(powerLevel + ' MW', 100, 100);
	
	      var coreLength = 140;
	      ctx.drawImage(coreImage, Simulation.DIM_X / 2 - coreLength / 2, Simulation.DIM_Y / 2 - coreLength / 2, coreLength, coreLength);
	
	      this.neutrons.forEach(function (neutron) {
	        return neutron.draw(ctx);
	      });
	      this.animationCount += 1;
	    }
	  }, {
	    key: 'moveNeutrons',
	    value: function moveNeutrons(timeDelta) {
	      this.neutrons.forEach(function (neutron) {
	        return neutron.move(timeDelta);
	      });
	    }
	  }, {
	    key: 'step',
	    value: function step(timeDelta) {
	      this.moveNeutrons(timeDelta);
	      this.checkCollisions();
	    }
	  }, {
	    key: 'isOutOfBounds',
	    value: function isOutOfBounds(pos) {
	      return pos[0] < 0 || pos[1] < 0 || pos[0] > Simulation.DIM_X || pos[1] > Simulation.DIM_Y;
	    }
	  }, {
	    key: 'removeNeutron',
	    value: function removeNeutron(index) {
	      this.neutrons.splice(index, 1);
	    }
	  }, {
	    key: 'checkCollisions',
	    value: function checkCollisions() {
	      var _this = this;
	
	      var neutrons = this.neutrons.slice(0);
	      window.neutrons = this.neutrons;
	      neutrons.forEach(function (neutron, idx) {
	        if (neutron.isCollidedWith(_this.core)) {
	          _this.fissionCount += 1;
	          _this.removeNeutron(idx);
	          if (Math.random() <= _this.core.fissionProbability) {
	            _this.neutrons.push(_this.core.generateNeutron(neutron));
	            _this.neutrons.push(_this.core.generateNeutron(neutron));
	          }
	        }
	      });
	    }
	  }, {
	    key: 'fpsAtSteadyState',
	    value: function fpsAtSteadyState(speed) {
	      //If steady power is around 3000 MW for a PWR, using 100 initial neutrons at
	      // k = 1, the average fission per second = 5 at speed = 2.
	      var systemRatio = 5 / 2;
	      return systemRatio * speed;
	    }
	  }, {
	    key: 'powerLevelPerFission',
	    value: function powerLevelPerFission(fpsAtSteadyState) {
	      return this.steadyPower / fpsAtSteadyState;
	    }
	  }]);
	
	  return Simulation;
	}();
	
	Simulation.BG_COLOR = "#000000";
	Simulation.DIM_X = 750;
	Simulation.DIM_Y = 500;
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
	
	var _util = __webpack_require__(3);
	
	var _util2 = _interopRequireDefault(_util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Neutron = function () {
	  function Neutron(simulation, options) {
	    _classCallCheck(this, Neutron);
	
	    this.simulation = simulation;
	    this.pos = options.pos;
	    this.speed = this.simulation.simulationSpeed;
	    this.vel = options.vel || _util2.default.randomVelocity(this.speed);
	    this.radius = options.radius || 2;
	    this.colorIndex = options.colorIndex;
	    this.color = this.neutronColor(this.colorIndex);
	  }
	
	  _createClass(Neutron, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.fillStyle = this.color;
	
	      ctx.beginPath();
	      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true);
	      ctx.fill();
	    }
	  }, {
	    key: 'neutronColor',
	    value: function neutronColor(colorIndex) {
	      var colors = ["red", "yellow", "orange", "green", "blue", "purple", "pink"];
	      return colors[colorIndex];
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
	        this.vel = _util2.default.randomWrapVelocity(side, this.speed);
	      } else if (side === 1) {
	        this.pos = [_simulation2.default.DIM_X, Math.random() * _simulation2.default.DIM_Y];
	        this.vel = _util2.default.randomWrapVelocity(side, this.speed);
	      } else if (side === 2) {
	        this.pos = [Math.random() * _simulation2.default.DIM_X, _simulation2.default.DIM_Y];
	        this.vel = _util2.default.randomWrapVelocity(side, this.speed);
	      } else if (side === 3) {
	        this.pos = [0, Math.random() * _simulation2.default.DIM_Y];
	        this.vel = _util2.default.randomWrapVelocity(side, this.speed);
	      }
	    }
	  }, {
	    key: 'isCollidedWith',
	    value: function isCollidedWith(core) {
	      var centerDist = _util2.default.dist(this.pos, core.pos);
	      return centerDist < this.radius + core.radius;
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
	
	
	var Util = {
	  randomPos: function randomPos(x, y) {
	    return [Math.random() * x, Math.random() * y];
	  },
	  randomVelocity: function randomVelocity(speed) {
	    var deg = 2 * Math.PI * Math.random();
	    return [Math.sin(deg) * speed, Math.cos(deg) * speed];
	  },
	  randomWrapVelocity: function randomWrapVelocity(side, speed) {
	    var deg = 2 * Math.PI * Math.random();
	    if (side === 0) {
	      return [Math.sin(deg) * speed, Math.cos(deg) * speed];
	    } else if (side === 1) {
	      return [-Math.sin(deg) * speed, Math.cos(deg) * speed];
	    } else if (side === 2) {
	      return [Math.abs(Math.sin(deg)) * speed, Math.cos(deg) * speed];
	    } else if (side === 3) {
	      return [Math.abs(Math.sin(deg)) * speed, Math.cos(deg) * speed];
	    }
	  },
	  coreNeutronVelocity: function coreNeutronVelocity(side, speed) {
	    var deg = Math.PI * Math.random();
	    if (side === 0) {
	      return [Math.cos(deg) * speed, -Math.sin(deg) * speed];
	    } else if (side === 1) {
	      return [Math.abs(Math.cos(deg)) * speed, Math.sin(deg) * speed];
	    } else if (side === 2) {
	      return [Math.abs(Math.cos(deg)) * speed, Math.abs(Math.sin(deg)) * speed];
	    } else if (side === 3) {
	      return [-Math.cos(deg) * speed, Math.sin(deg) * speed];
	    }
	  },
	  dist: function dist(pos1, pos2) {
	    return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
	  }
	};
	
	exports.default = Util;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _neutron = __webpack_require__(2);
	
	var _neutron2 = _interopRequireDefault(_neutron);
	
	var _util = __webpack_require__(3);
	
	var _util2 = _interopRequireDefault(_util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Core = function (_Neutron) {
	  _inherits(Core, _Neutron);
	
	  function Core(simulation, options) {
	    _classCallCheck(this, Core);
	
	    var _this = _possibleConstructorReturn(this, (Core.__proto__ || Object.getPrototypeOf(Core)).call(this, simulation, options));
	
	    _this.speed = 0;
	    _this.vel = [0, 0];
	    _this.color = "white";
	    _this.clearLength = _this.radius + 15;
	    _this.neutronPostions = [[_this.pos[0], _this.pos[1] - _this.clearLength], [_this.pos[0] + _this.clearLength, _this.pos[1]], [_this.pos[0], _this.pos[1] + _this.clearLength], [_this.pos[0] - _this.clearLength, _this.pos[1]]];
	    _this.kValue = 1.0;
	    return _this;
	  }
	
	  _createClass(Core, [{
	    key: 'getKValue',
	    value: function getKValue(e) {
	      var kValueInput = document.getElementById("kvalue");
	      this.kValue = parseFloat(kValueInput.value);
	      kValueInput.disabled = true;
	      this.fissionProbability = this.calculateFissionProbability();
	    }
	  }, {
	    key: 'calculateFissionProbability',
	    value: function calculateFissionProbability() {
	      return this.simulation.initialNeutronCount * this.kValue / (this.simulation.initialNeutronCount * 2);
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
	    key: 'generateNeutron',
	    value: function generateNeutron(oldNeutron) {
	      var newColorIndex = void 0;
	      if (oldNeutron.colorIndex + 1 > 6) {
	        newColorIndex = 0;
	      } else {
	        newColorIndex = oldNeutron.colorIndex + 1;
	      }
	      var side = Math.floor(Math.random() * 4);
	      var newPos = this.neutronPostions[side];
	      var newVel = _util2.default.coreNeutronVelocity(side, oldNeutron.speed);
	
	      return new _neutron2.default(this.simulation, { pos: newPos, vel: newVel, colorIndex: newColorIndex });
	    }
	  }]);
	
	  return Core;
	}(_neutron2.default);
	
	exports.default = Core;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _simulation = __webpack_require__(1);
	
	var _simulation2 = _interopRequireDefault(_simulation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SimulationView = function () {
	  function SimulationView(ctx, coreImage) {
	    _classCallCheck(this, SimulationView);
	
	    this.ctx = ctx;
	    this.coreImage = coreImage;
	    this.active = true;
	    this.meltdown = false;
	    this.alarm = new Audio("assets/nuclear_alarm.mp3");
	  }
	
	  _createClass(SimulationView, [{
	    key: "start",
	    value: function start() {
	      var ctx = this.ctx;
	      this.simulation = new _simulation2.default(ctx);
	      this.active = true;
	      this.lastTime = 0;
	      this.simulation.core.getKValue();
	      this.simulation.getSpeed();
	      this.simulation.populateNeutrons();
	      requestAnimationFrame(this.animate.bind(this));
	    }
	  }, {
	    key: "animate",
	    value: function animate(time) {
	      var timeDelta = time - this.lastTime;
	
	      this.simulation.step(timeDelta);
	      this.simulation.draw(this.ctx, this.coreImage);
	      this.lastTime = time;
	      this.checkMeltdown();
	      if (this.active) {
	        requestAnimationFrame(this.animate.bind(this));
	      }
	    }
	  }, {
	    key: "stop",
	    value: function stop() {
	      var _this = this;
	
	      this.active = false;
	      var canvas = document.getElementsByTagName("canvas")[0];
	      window.setTimeout(function () {
	        return _this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	      }, 7000);
	      document.getElementById("kvalue").disabled = false;
	      document.getElementById("speed").disabled = false;
	      if (this.simulation.neutrons) {
	        this.simulation.neutrons = [];
	      }
	    }
	  }, {
	    key: "checkMeltdown",
	    value: function checkMeltdown() {
	      var total = 0;
	      for (var i = 0; i < this.simulation.powerLevel.length; i++) {
	        total += this.simulation.powerLevel[i];
	      }
	      var avgPowerLevel = total / this.simulation.powerLevel.length;
	      if (avgPowerLevel > 10000) {
	        this.alarm.currentTime = 14;
	        this.alarm.volume = 0.2;
	        this.alarm.play();
	        this.ctx.font = "bold 48px serif";
	        this.ctx.fillStyle = 'red';
	        this.ctx.fillText('MELTDOWN', 200, 400);
	        this.stop();
	      }
	    }
	  }]);
	
	  return SimulationView;
	}();
	
	exports.default = SimulationView;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map