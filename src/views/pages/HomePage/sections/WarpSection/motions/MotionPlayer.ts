import clamp from 'lodash/clamp';

import WarpMotionScene from './warp/WarpMotionScene';
import WarpRenderer from './warp/WarpRenderer';
import WarpLineMotion from './warp/WarpLineMotion';

class MotionPlayer {
  private renderer: WarpRenderer;
  private warpMotion: WarpLineMotion;

  public prepare(canvas: HTMLCanvasElement) {
    const scene = new WarpMotionScene();
    this.renderer = new WarpRenderer(canvas, scene, this.windowSize);
    this.warpMotion = new WarpLineMotion(scene);
  }

  public run({ current, distance, height }: MotionData, reduced: boolean) {
    const duration = (height - current) / distance;
    const clamped = reduced ? 0.5 : clamp((duration - 0.1) / 0.9, 0, 1);
    this.warpMotion.run(clamped);
    this.renderer.render();
  }

  public addResizeHandler() {
    window.addEventListener('resize', this.onResize, { passive: true });
    this.onResize();
  }

  public removeResizeHandler() {
    window.removeEventListener('resize', this.onResize);
  }

  private get windowSize(): WindowDimension {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  private onResize = () => {
    this.renderer.resize(this.windowSize);
    this.renderer.render();
  };
}

export default MotionPlayer;
