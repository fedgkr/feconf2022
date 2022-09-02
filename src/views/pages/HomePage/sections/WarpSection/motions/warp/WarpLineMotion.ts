import { Mesh } from 'three';
import { MeshLineMaterial } from 'three.meshline';

import WarpMotionScene from './WarpMotionScene';
import generateMotions from '../fn/generateMotions';
import generateLines from '~/views/pages/HomePage/sections/WarpSection/motions/fn/generateLines';
import animateLine from '~/views/pages/HomePage/sections/WarpSection/motions/fn/animateLine';

class WarpLineMotion {
  private count = 15;
  private step = 1;
  private meshes: Mesh<any, MeshLineMaterial>[];
  private motionInfo: ReturnType<typeof generateMotions>;

  constructor(private scene: WarpMotionScene) {
    this.meshes = generateLines(this.count, this.step);
    this.motionInfo = generateMotions(this.meshes, this.step);
    this.registerMeshes();
  }

  public run(duration: number) {
    this.motionInfo.forEach((motion, index) => {
      const mesh = this.meshes[index];
      mesh.material.opacity = 0;
      animateLine(mesh, motion, duration);
    });
  }

  private registerMeshes() {
    this.meshes.forEach((mesh) => this.scene.add(mesh));
  }
}

export default WarpLineMotion;
