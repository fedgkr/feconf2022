import { useEffect, useRef } from "react";

export function StarCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const vertexMap: Record<string, {
            pos: number[];
            velocity: number[];
            distance: number;
            size: number;
        }> = {};

        const startTime = Date.now();

        function onResize(e: ResizeObserverEntry[]) {
            const boxSize = e[0].borderBoxSize[0];

            const inlineSize = boxSize.inlineSize;
            const blockSize = boxSize.blockSize;
            canvas.width = inlineSize;
            canvas.height = blockSize;
        }
        const tile = 80;

        function getVertex(sx: number, sy: number) {
            const id = `${sx}x${sy}`;

            if (!vertexMap[id]) {
                const x = tile * sx + tile * 1.5 * Math.random() - tile * 0.75;
                const y = tile * sy + tile * 1.5 * Math.random() - tile * 0.75;
                const z = Math.random() * 0.9;
                const vx = 1 + Math.random() * 5;
                const vy = 1 + Math.random() * 5;
                const distance = 10 + Math.random() * 90;
                const size = 0.1 + Math.random() * 1.9;

                vertexMap[id] = {
                    pos: [
                        x, y, z
                    ],
                    velocity: [
                        vx,
                        vy,
                    ],
                    size,
                    distance,
                };
            }
            return vertexMap[id];
        }

        function onRender() {
            const width = canvas.width;
            const height = canvas.height;
            const distTime = Date.now() - startTime;

            ctx.clearRect(0, 0, width, height);

            const maxSX = Math.ceil(width / tile);
            const maxSY = Math.ceil(height / tile);

            for (let sx = 0; sx <= maxSX; ++sx) {
                for (let sy = 0; sy <= maxSY; ++sy) {
                    const {
                        velocity,
                        distance,
                        pos,
                        size,
                    } = getVertex(sx, sy);
                    const scalar = Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
                    const totalDistance = distTime * scalar / 1000;
                    const isReverse = Math.floor(totalDistance / distance) % 2 !== 0;
                    let nextDistance = totalDistance % distance;

                    if (isReverse) {
                        nextDistance = distance - nextDistance;
                    }
                    const x = (pos[0] + nextDistance / scalar * velocity[0]);
                    const y = (pos[1] + nextDistance / scalar * velocity[1]);
                    const a = 1 - pos[2];

                    ctx.beginPath();
                    ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
                    ctx.arc(
                        x,
                        y,
                        size,
                        0, 2 * Math.PI,
                    );
                    ctx.fill();
                }
            }
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