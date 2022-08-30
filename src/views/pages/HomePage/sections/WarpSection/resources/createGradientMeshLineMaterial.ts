import { CanvasTexture, DoubleSide } from 'three';
import { MeshLineMaterial } from 'three.meshline';
import createGradientTexture from '~/views/pages/HomePage/sections/WarpSection/resources/createGradientTexture';

function createGradientMeshLineMaterial() {
  const texture = new CanvasTexture(createGradientTexture());
  return new MeshLineMaterial({
    useMap: true,
    map: texture,
    side: DoubleSide,
    lineWidth: 0.02,
  });
}

export default createGradientMeshLineMaterial;
