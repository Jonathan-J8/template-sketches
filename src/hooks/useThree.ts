import {
	Animator,
	CameraWrapper,
	PointerTracker,
	RendererWrapper,
	Resizer,
	SceneWrapper,
} from 'joeat-utils';
import {
	OrthographicCamera,
	PerspectiveCamera,
	Plane,
	Quaternion,
	Raycaster,
	Scene,
	Vector2,
	Vector3,
	WebGLRenderer,
} from 'three';
import { EffectComposer, OrbitControls } from 'three/examples/jsm/Addons.js';
import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';
import onHotReload from './onHotReload';

// CANVAS
const canvas = document.getElementById('three');
if (!canvas || !(canvas instanceof HTMLCanvasElement))
	throw new Error('Canvas element with id "three" not found');

// THREE
const threeRenderer = new WebGLRenderer({ canvas, alpha: true, antialias: true });
const threeScene = new Scene();
const perspective = new PerspectiveCamera(75, 2, 0.1, 1000);
const orthographic = new OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
const controls = new OrbitControls(perspective, canvas);

// WRAPPERS & EMITTERS
const animator = new Animator();
const resizer = new Resizer(canvas);
const scene = new SceneWrapper({ instance: threeScene });
const renderer = new RendererWrapper({
	instance: threeRenderer,
	Vector2,
	EffectComposer,
});
const camera = new CameraWrapper({
	controls: controls,
	perspective,
	orthographic,
	Vector3,
	Quaternion,
});

// MOUSE EVENTS
const mouse = new PointerTracker({ camera: camera.instance, Raycaster, Plane, Vector2, Vector3 });
canvas.addEventListener('pointermove', mouse.onMove, false);
canvas.addEventListener('pointerout', mouse.onMove, false);
canvas.addEventListener('pointerdown', mouse.onPress, false);
canvas.addEventListener('pointerup', mouse.onPress, false);
window.addEventListener('scroll', mouse.onScroll, false);
window.addEventListener('scrollend', mouse.onScroll, false);

// RESIZE EVENT
const resize = (o: { width: number; height: number; pixelRatio: number }) => {
	const { width, height, pixelRatio } = o;
	camera.resize({ width, height });
	renderer.resize({ width, height, pixelRatio });
	renderer.update({ scene: scene.instance, camera: camera.instance });
};
resizer.addListener(resize);
resizer.fire();

// ANIMATION LOOP
const update = (o: { deltaMs: number; deltaTime: number }) => {
	const { deltaTime } = o;
	const { renderer, camera, scene } = useThree();
	camera.update({ deltaTime });
	renderer.update({ scene: scene.instance, camera: camera.instance, deltaTime });
};
animator.addListener(update);
animator.play(renderer.instance);

// GUI
const gui = new GUI();
animator.debug(gui);
resizer.debug(gui);
renderer.debug(gui);
camera.debug(gui);
mouse.debug(gui);

// HMR
onHotReload(() => {
	gui.destroy();
	animator.clear();
	resizer.clear();
	renderer.clear();
	camera.clear();
	scene.clear();
	canvas.removeEventListener('pointermove', mouse.onMove, false);
	canvas.removeEventListener('pointerout', mouse.onMove, false);
	canvas.removeEventListener('pointerdown', mouse.onPress, false);
	canvas.removeEventListener('pointerup', mouse.onPress, false);
	window.removeEventListener('scroll', mouse.onScroll, false);
	window.removeEventListener('scrollend', mouse.onScroll, false);
});

// HOOK
const useThree = () => {
	return { gui, canvas, animator, resizer, renderer, scene, camera, mouse };
};

export default useThree;
