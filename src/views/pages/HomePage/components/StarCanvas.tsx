import { useEffect, useRef } from "react";

export function StarCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const vertices: Array<{
            pos: number[];
            velocity: number[];
            distance: number;
            size: number;
        }> = [];

        for (let i = 0; i < 200; i++) {
    
          const x = 100 * Math.random();
          const y = 100 * Math.random();
          const z = Math.random() * 0.9;
          const vx = 0.1 + Math.random() * 0.5;
          const vy = 0.1 + Math.random() * 0.5;
          const distance = 1 + Math.random() * 9;
          const size = 0.1 + Math.random() * 1.9;
    
          vertices.push({
            pos: [
                x, y, z
            ],
            velocity: [
                vx,
                vy,
            ],
            size,
            distance,
          });
    
        }
        const startTime = Date.now();

        function onResize(e: ResizeObserverEntry[]) {
            const boxSize = e[0].borderBoxSize[0];

            canvas.width = boxSize.inlineSize;
            canvas.height = boxSize.blockSize;
        }
    
        function onRender() {
            const width = canvas.width;
            const height = canvas.height;

            ctx.clearRect(0, 0, width, height);

            const distTime = Date.now() - startTime;

            vertices.forEach(({ pos, velocity, distance, size }) => {
                const scalar = Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
                const totalDistance = distTime * scalar / 1000;
                const isReverse = Math.floor(totalDistance / distance) % 2 !== 0;
                let nextDistance = totalDistance % distance;

                if (isReverse) {
                    nextDistance = distance - nextDistance;
                }

                const halfHeight = height / 2;
                const x = (pos[0] + nextDistance / scalar * velocity[0]) * width / 100;
                const y = (pos[1] + nextDistance / scalar * velocity[1]) * height / 100;
                let a = 1 - pos[2];

                if (y > halfHeight) {
                    a *= (height - y) / halfHeight;
                }
                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
                ctx.arc(
                  x,
                  y,
                  size,
                  0, 2 * Math.PI,
                );
                ctx.fill();
            })
        }
        let raqId = requestAnimationFrame(function raq() {
            onRender();

            raqId = requestAnimationFrame(raq);
        });


        const observer = new ResizeObserver(onResize);
        
        observer.observe(canvas);
        
        return () => {
            cancelAnimationFrame(raqId);

            observer.disconnect();
        };
    }, []);

    return <canvas ref={canvasRef} className="star-canvas"></canvas>;
}