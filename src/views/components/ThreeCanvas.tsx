import * as React from "react";
import { forwardRef, MutableRefObject, RefObject, useEffect, useImperativeHandle, useRef } from "react";
import * as THREE from "three";

export interface ThreeCanvasProps {
    perspective?: boolean;
    render: boolean;
    onRender: () => void;
}
export interface ThreeCanvasObject {
    canvasRef: RefObject<HTMLCanvasElement>;
    rendererRef: MutableRefObject<THREE.WebGLRenderer | undefined>;
    sceneRef: MutableRefObject<THREE.Scene | undefined>;
    cameraRef: MutableRefObject<THREE.OrthographicCamera | THREE.PerspectiveCamera | undefined>;
    sizeRef: MutableRefObject<{ width: number; height: number}>;
}
export const ThreeCanvas = forwardRef<ThreeCanvasObject, ThreeCanvasProps>((props, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer>();
    const sceneRef = useRef<THREE.Scene>();
    const cameraRef = useRef<THREE.OrthographicCamera | THREE.PerspectiveCamera>();
    const sizeRef = useRef<{ width: number; height: number}>({ width: 0, height: 0 });

    useImperativeHandle(ref, () => {
        return {
            canvasRef,
            rendererRef,
            sceneRef,
            cameraRef,
            sizeRef,
        };
    });

    useEffect(() => {
        // scene setup
        let width = window.innerWidth;
        let height = window.innerHeight;
        let aspect = width / height;

        const scene = new THREE.Scene();
        let camera: THREE.OrthographicCamera | THREE.PerspectiveCamera;


        if (props.perspective) {
            const fov = 60;
            const aspect = width / height;
            const near = 0.1;
            const far = 1000;

            camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        } else {
            camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0.1, 10000);
        }

        camera.position.z = 10;
        scene.add(camera);

        // renderer setup
        const canvas = canvasRef.current!;
        const parentElement = canvas.parentElement;
        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
        });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio || 1);
        renderer.autoClear = true;
        renderer.setClearColor(0x000000, 0);


        rendererRef.current = renderer;
        sceneRef.current = scene;
        cameraRef.current = camera;

        function onResize() {
            width = parentElement.clientWidth;
            height = parentElement.clientHeight;


            sizeRef.current = { width, height };
            aspect = width / height;

            renderer.setSize(width, height);

            (camera as any).left = -aspect;
            (camera as any).right = aspect;
            (camera as any).top = 1;
            (camera as any).bottom = -1;
            (camera as any).aspect = aspect;
            camera.near = 0.1;
            camera.far = 10000;
            camera.updateProjectionMatrix();
            props.onRender();
            renderer.render(scene, camera);
        }

        onResize();
        window.addEventListener("resize", onResize);

        return () => {
            renderer.clearColor()
            camera.clear();
            renderer.clear();
            scene.clear();
            window.removeEventListener("reisze", onResize);
        }
    }, []);

    useEffect(() => {
        if (!props.render) {
            return;
        }
        let raqId = requestAnimationFrame(function onRender() {
            props.onRender();
            rendererRef.current!.render(sceneRef.current!, cameraRef.current!);
            raqId = requestAnimationFrame(onRender);
        });

        return () => {
            cancelAnimationFrame(raqId);
        };
    }, [props.render]);

    return <canvas ref={canvasRef} className={"three-canvas"}></canvas>;
});

ThreeCanvas.displayName = 'ThreeCanvas';
