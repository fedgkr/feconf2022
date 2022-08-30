import { WebGLRenderer } from 'three';

import WarpMotionScene from './WarpMotionScene';
import WarpCamera from './WarpCamera';

class WarpRenderer {
  private renderer: WebGLRenderer;
  private camera: WarpCamera;

  constructor(
    private canvas: HTMLCanvasElement,
    private scene: WarpMotionScene,
    dimension: WindowDimension
  ) {
    this.camera = new WarpCamera(this.scene, dimension);
    this.renderer = new WebGLRenderer({ canvas, antialias: true });
    this.renderer.setClearColor(0x000000, 0);
    this.size(dimension);
  }

  public resize(dimension: WindowDimension) {
    this.size(dimension);
    this.camera.resize(dimension);
  }

  public render() {
    this.renderer.render(this.scene.getScene(), this.camera.getCamera());
  }

  private size(dimension: WindowDimension) {
    this.renderer.setSize(dimension.width, dimension.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
}

export default WarpRenderer;
