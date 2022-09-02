import { Mesh } from 'three';
import { MeshLineMaterial } from 'three.meshline';

const animateLine = (mesh: Mesh<any, MeshLineMaterial>, motion, duration) => {
  const { delay, originPZ, originRZ, targetPZ, targetRZ } = motion;
  const delayed = duration + delay;
  const posZ = (targetPZ - originPZ) * delayed;
  const rotZ = (targetRZ - originRZ) * delayed;
  mesh.position.z = originPZ + posZ;
  mesh.rotation.z = targetRZ + rotZ;
  mesh.material.opacity = mesh.position.z / 15;
};

export default animateLine;
