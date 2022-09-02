import { Mesh } from 'three';

const targetZ = 25;

function generateMotions(lines: Mesh[], step: number) {
  return lines.map((line, index) => {
    const order = lines.length - index;
    const delay = index / lines.length - 1.5;
    const duration = 4;
    return {
      delay: delay / duration,
      originPZ: line.position.z,
      originRZ: line.rotation.z,
      targetPZ: targetZ + order * step,
      targetRZ: line.rotation.z + Math.PI / 2,
    };
  });
}

export default generateMotions;
