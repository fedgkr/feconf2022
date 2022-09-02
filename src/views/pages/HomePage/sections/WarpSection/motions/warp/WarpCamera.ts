import { PerspectiveCamera } from 'three';
import WarpMotionScene from './WarpMotionScene';

class WarpCamera {
  private camera: PerspectiveCamera;

  constructor(
    private scene: WarpMotionScene,
    private dimension: WindowDimension
  ) {
    this.init();
  }

  public resize(dimension: WindowDimension) {
    this.dimension = dimension;
    this.camera.aspect = dimension.width / dimension.height;
    this.camera.updateProjectionMatrix();
  }

  public getCamera() {
    return this.camera;
  }

  private init() {
    this.camera = new PerspectiveCamera(
      75,
      this.dimension.width / this.dimension.height,
      0.1,
      50
    );
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 23;
    this.scene.add(this.camera);
  }
}

export default WarpCamera;
