import { Shape } from 'three';

function createRectShape() {
  const shapeLength = 1;
  const shape = new Shape();
  const shapePoints = {
    startX: 0,
    startY: 0,
    width: shapeLength,
    height: shapeLength,
    radius: 0.0,
  };

  shape
    .moveTo(shapePoints.startX, shapePoints.startY)
    .lineTo(shapePoints.startX, shapePoints.startX + shapePoints.width)
    .lineTo(
      shapePoints.startX + shapePoints.width,
      shapePoints.startY + shapePoints.height
    )
    .lineTo(shapePoints.startY + shapePoints.height, shapePoints.startX)
    .lineTo(shapePoints.startX, shapePoints.startY);

  return shape;
}

export default createRectShape;
