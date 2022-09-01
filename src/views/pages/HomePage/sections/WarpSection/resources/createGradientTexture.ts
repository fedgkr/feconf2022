function createGradientTexture() {
  const size = 512;

  // create canvas
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  // get context
  const context = canvas.getContext('2d');

  // draw gradient
  context.rect(0, 0, size, size);
  const gradient = context.createLinearGradient(0, 0, size, 0);
  const violet = '#8F5FE7';
  const blue = '#304AB7';
  gradient.addColorStop(0, violet);
  gradient.addColorStop(0.25, violet);
  gradient.addColorStop(0.4, blue);
  gradient.addColorStop(0.75, blue);
  gradient.addColorStop(0.95, violet);
  context.fillStyle = gradient;
  context.fill();

  return canvas;
}

export default createGradientTexture;
