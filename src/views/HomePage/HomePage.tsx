import { FC, useEffect } from 'react';
import { gsap, Power1 } from 'gsap';
import {
  BufferGeometry,
  CanvasTexture,
  DoubleSide,
  Mesh,
  PerspectiveCamera,
  Scene,
  Shape,
  Vector3,
  WebGLRenderer,
} from 'three';
import { MeshLine, MeshLineMaterial } from 'three.meshline';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { requestAnimationFrame } from '@daybrush/utils';
import { times } from 'lodash';

function generateTexture() {
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
  gradient.addColorStop(0, '#DD7EF3');
  // gradient.addColorStop(0.5, '#DD7EF3');
  // gradient.addColorStop(0.51, '#4F9CEF');
  gradient.addColorStop(1, '#4F9CEF');
  //	gradient.addColorStop(2, 'transparent');
  context.fillStyle = gradient;
  context.fill();

  document.body.appendChild(canvas);
  canvas.style.position = 'absolute';
  canvas.style.left = '0px';
  canvas.style.top = '0px';

  return canvas;
}

function init() {
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

  // shape
  //   .moveTo(shapePoints.startX, shapePoints.startY + shapePoints.radius)
  //   .lineTo(
  //     shapePoints.startX,
  //     shapePoints.startY + shapePoints.height - shapePoints.radius
  //   )
  //   .quadraticCurveTo(
  //     shapePoints.startX,
  //     shapePoints.startY + shapePoints.height,
  //     shapePoints.startX + shapePoints.radius,
  //     shapePoints.startY + shapePoints.height
  //   )
  //   .lineTo(
  //     shapePoints.startX + shapePoints.width - shapePoints.radius,
  //     shapePoints.startY + shapePoints.height
  //   )
  //   .quadraticCurveTo(
  //     shapePoints.startX + shapePoints.width,
  //     shapePoints.startY + shapePoints.height,
  //     shapePoints.startX + shapePoints.width,
  //     shapePoints.startY + shapePoints.height - shapePoints.radius
  //   )
  //   .lineTo(
  //     shapePoints.startX + shapePoints.width,
  //     shapePoints.startY + shapePoints.radius
  //   )
  //   .quadraticCurveTo(
  //     shapePoints.startX + shapePoints.width,
  //     shapePoints.startY,
  //     shapePoints.startX + shapePoints.width - shapePoints.radius,
  //     shapePoints.startY
  //   )
  //   .lineTo(shapePoints.startX + shapePoints.radius, shapePoints.startY)
  //   .quadraticCurveTo(
  //     shapePoints.startX,
  //     shapePoints.startY,
  //     shapePoints.startX,
  //     shapePoints.startY + shapePoints.radius
  //   );

  const points = shape.getPoints();
  const bufferGeometry = new BufferGeometry().setFromPoints(points);
  bufferGeometry.center();
  const texture = new CanvasTexture(generateTexture());
  const material = new MeshLineMaterial({
    useMap: true,
    map: texture,
    side: DoubleSide,
    lineWidth: 0.02,
  });

  const lineStandZ = 0;
  const lineCount = 20;
  const lineStep = 0.5;
  const lineList = times(lineCount, (index) => {
    const line = new MeshLine();
    line.setGeometry(bufferGeometry);
    const mesh = new Mesh(line, material);
    const order = lineCount - index;
    mesh.position.setZ(lineStandZ + order * lineStep);
    mesh.rotation.set(0, 0, (Math.PI / 60) * index);
    return mesh;
  });

  const size = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const canvas = document.querySelector('canvas');
  const scene = new Scene();

  lineList.forEach((line) => scene.add(line));

  /**
   * Camera
   */
  const camera = new PerspectiveCamera(75, size.width / size.height, 0.1, 100);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 15;
  scene.add(camera);

  lineList.forEach((line, index) => {
    // const animation = {
    //   delay: index / lineList.length + 0.05,
    //   duration: 4,
    //   ease: Power1.easeIn,
    // };
    // gsap.to(line.position, {
    //   ...animation,
    //   z: line.position.z + 25,
    // });
    // gsap.to(line.rotation, {
    //   ...animation,
    //   z: line.rotation.z + Math.PI / 5,
    // });
  });

  /**
   * Renderer
   */
  new OrbitControls(camera, canvas).enableDamping = true;
  const renderer = new WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const render = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  render();

  // const a = new Shape();
  // const w = 0;
  // const h = 0;
  // const v = 1;
  // const p = 1;
  // const b = 0.06;
  // a.moveTo(w, h + b);
  // a.lineTo(w, h + p - b);
  // a.quadraticCurveTo(w, h + p, w + b, h + p);
}

const HomePage: FC = () => {
  useEffect(() => {
    init();
  }, []);
  return (
    <div>
      <canvas></canvas>
    </div>
  );
};

export default HomePage;
