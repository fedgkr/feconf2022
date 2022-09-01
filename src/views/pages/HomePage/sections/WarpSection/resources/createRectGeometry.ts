import { BufferGeometry } from 'three';
import createRectShape from './createRectShape';

function createRectGeometry() {
  const bufferGeometry = new BufferGeometry().setFromPoints(
    createRectShape().getPoints()
  );
  bufferGeometry.center();
  return bufferGeometry;
}

export default createRectGeometry;
