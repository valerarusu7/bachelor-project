"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Wave = /** @class */ (function () {
  function Wave(waveLength, color) {
    var _this = this;
    this.draw = function (context, width, height, frequency) {
      context.beginPath();
      context.moveTo(0, height);
      if (_this.waveLength.length < 3) {
        return;
      }
      for (var i = 0; i < width; i++) {
        var wave1 = Math.sin(i * _this.waveLength[0] - frequency);
        var wave2 = Math.sin(i * _this.waveLength[1] - frequency);
        var wave3 = Math.sin(i * _this.waveLength[2] - frequency);
        context.lineTo(i * 3.5, height - 350 + wave1 * wave2 * wave3 * 75);
      }
      context.lineTo(width, height);
      context.fillStyle = _this.color;
      context.fill();
      context.closePath();
    };
    this.waveLength = waveLength;
    this.color = color;
  }
  return Wave;
})();
exports.default = Wave;
