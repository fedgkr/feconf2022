import { BufferGeometry, Mesh } from 'three';
import { MeshLine, MeshLineMaterial } from 'three.meshline';

function createRectMesh(geometry: BufferGeometry, material: MeshLineMaterial) {
  const line = new MeshLine();
  line.setGeometry(geometry);
  return new Mesh(line, material);
}

export default createRectMesh;
