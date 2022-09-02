import { Object3D, Scene } from 'three';

class WarpMotionScene {
  private scene = new Scene();

  public add(object: Object3D) {
    this.scene.add(object);
  }

  public getScene() {
    return this.scene;
  }
}

export default WarpMotionScene;
