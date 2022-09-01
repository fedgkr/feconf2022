import { Mesh } from 'three';
import { MeshLineMaterial } from 'three.meshline';

import WarpMotionScene from './WarpMotionScene';
import generateMotions from './generateMotions';
import generateLines from '~/views/pages/HomePage/sections/WarpSection/utils/generateLines';

class WarpMotion {
  private count = 15;
  private step = 1;
  private meshs: Mesh<any, MeshLineMaterial>[];
  private motionInfo: ReturnType<typeof generateMotions>;

  constructor(private scene: WarpMotionScene) {
    this.meshs = generateLines(this.count, this.step);
    this.motionInfo = generateMotions(this.meshs, this.step);
    this.registerMeshs();
  }

  public run(duration: number) {
    const shouldRender = duration !== 0;
    this.motionInfo.forEach((motion, index) => {
      const mesh = this.meshs[index];
      if (shouldRender) {
        const { delay, originPZ, originRZ, targetPZ, targetRZ } = motion;
        const delayed = duration + delay;
        const posZ = (targetPZ - originPZ) * delayed;
        const rotZ = (targetRZ - originRZ) * delayed;
        mesh.position.z = originPZ + posZ;
        mesh.rotation.z = targetRZ + rotZ;
      }
      mesh.material.transparent = true;
      mesh.material.opacity = shouldRender ? mesh.position.z / 15 : 0;
    });
  }

  private registerMeshs() {
    this.meshs.forEach((mesh) => this.scene.add(mesh));
  }
}

export default WarpMotion;
