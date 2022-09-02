import times from 'lodash/times';

import createGradientMeshLineMaterial from '../../resources/createGradientMeshLineMaterial';
import createRectGeometry from '../../resources/createRectGeometry';
import createRectMesh from '../../resources/createRectMesh';

const originZ = 7;

function generateLines(count: number, step: number) {
  const material = createGradientMeshLineMaterial();
  const geometry = createRectGeometry();

  return times(count, (index) => {
    const mesh = createRectMesh(geometry, material);
    const order = count - index;
    mesh.position.setZ(originZ + order * step);
    mesh.rotation.set(0, 0, (Math.PI / 60) * order);
    return mesh;
  });
}

export default generateLines;
