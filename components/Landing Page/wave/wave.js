import { FC } from "react";
import { useCanvasContext } from "../hooks/useCanvas";
import useResponsiveSize from "../hooks/useResponsiveSize";
import { default as WaveObj } from "../lib/wave";

var Wave = function () {
  const { context } = useCanvasContext();
  const { width, height } = useResponsiveSize();
  let frequency = 0.013;
  const waves = {
    frontWave: new WaveObj([0.0211, 0.028, 0.015], "rgba(211,211,211,0.88)"),
    backWave: new WaveObj([0.0122, 0.018, 0.005], "rgba(169,169,169,0.48)"),
  };

  const render = () => {
    context?.clearRect(0, 0, width, height);
    Object.entries(waves).forEach(([, wave]) => {
      wave.draw(context, width, 450, frequency);
    });
    frequency += 0.005;
    requestAnimationFrame(render);
  };
  if (context) render();
  return null;
};

export default Wave;
