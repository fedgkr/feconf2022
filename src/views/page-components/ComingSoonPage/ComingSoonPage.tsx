import {useEffect} from "react";
import gsap, { Power2 } from 'gsap';
import {times} from 'lodash';
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {Object3D} from "three/src/core/Object3D";

// Rounded rectangle
const roundedRectShape = new THREE.Shape();
( function roundedRect( ctx, x, y, width, height, radius ) {

  ctx.moveTo( x, y + radius );
  ctx.lineTo( x, y + height - radius );
  ctx.quadraticCurveTo( x, y + height, x + radius, y + height );
  ctx.lineTo( x + width - radius, y + height );
  ctx.quadraticCurveTo( x + width, y + height, x + width, y + height - radius );
  ctx.lineTo( x + width, y + radius );
  ctx.quadraticCurveTo( x + width, y, x + width - radius, y );
  ctx.lineTo( x + radius, y );
  ctx.quadraticCurveTo( x, y, x, y + radius );

} )( roundedRectShape, 0, 0, 1, 1, 0.06 );

const points = roundedRectShape.getPoints();
const geoPoints = new THREE.BufferGeometry().setFromPoints(points);
geoPoints.center();

const startZ = 0;
const numOfLines = 20;

const lineList = times(numOfLines, (num) => {
  const line = new THREE.Line(geoPoints, new THREE.LineBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide }));
  const order = numOfLines - num;
  line.position.setZ(order - numOfLines + startZ);
  line.rotation.set(0, 0, Math.PI / 60 * num);
  return line;
});

const animationList = (list: Object3D[]) => {
  list.forEach((mesh, index) => {
    const props = {
      delay: index / list.length + 0.05,
      duration: 4,
      ease: Power2.easeIn,
    };
    gsap.to(mesh.position, {
      ...props,
      z: mesh.position.z + 25,
    });
    gsap.to(mesh.rotation, {
      ...props,
      z: mesh.rotation.z + (Math.PI / 5),
    });
  });
};

const ComingSoonPage = () => {
  useEffect(() => {
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    // Canvas
    const canvas = document.querySelector('canvas');
    // Scene
    const scene = new THREE.Scene();
    // Base camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 50);
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 5;
    // Controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    // Add
    scene.add(camera);
    lineList.forEach(line => scene.add(line));
    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Animation Start
    animationList(lineList);

    const render = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };
    render();
  }, []);
  return (
    <div>
      <canvas/>
    </div>
  );
}

export default ComingSoonPage;
