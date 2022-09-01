import WarpMotionScene from './WarpMotionScene';
import WarpRenderer from './WarpRenderer';
import WarpMotion from './WarpMotion';
import clamp from 'lodash/clamp';
import gte from 'lodash/gte';

class Warp {
  private renderer: WarpRenderer;
  private motion: WarpMotion;

  constructor(canvas: HTMLCanvasElement) {
    const scene = new WarpMotionScene();
    this.renderer = new WarpRenderer(canvas, scene, this.windowSize());
    this.motion = new WarpMotion(scene);

    this.addResizeHandler();
  }

  public removeResizeHandler() {
    window.removeEventListener('resize', this.onResize);
  }

  public run(duration: number, onUpdateStage: (val: boolean) => void) {
    duration = clamp((duration - 0.1) / 0.9, 0, 1);
    onUpdateStage(gte(duration, 0.94));
    this.motion.run(duration);
    this.renderer.render();
  }

  private windowSize(): WindowDimension {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  private addResizeHandler() {
    window.addEventListener('resize', this.onResize, { passive: true });
  }

  private onResize = () => {
    this.renderer.resize(this.windowSize());
    this.renderer.render();
  };
}

export default Warp;
