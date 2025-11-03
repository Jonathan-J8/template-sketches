import './style.css';

import {
	AxesHelper,
	BoxGeometry,
	ColorManagement,
	DirectionalLight,
	GridHelper,
	LinearToneMapping,
	Mesh,
	MeshLambertMaterial,
} from 'three';
import { OutputPass, RenderPass } from 'three/examples/jsm/Addons.js';
import onHotReload from './hooks/onHotReload';
import useThree from './hooks/useThree';

const { scene, renderer, animator, camera, resizer } = useThree();

// SETUP SCENE
ColorManagement.enabled = true;

camera.perspective.position.x = 5;
camera.perspective.position.z = 5;
camera.perspective.position.y = 5;
camera.perspective.lookAt(0, 0, 0);

camera.orthographic.position.z = 10;
camera.orthographic.zoom = 0.1;
camera.orthographic.lookAt(0, 0, 0);

scene.instance.fog = null;
renderer.instance.toneMapping = LinearToneMapping;

const light = new DirectionalLight(0xffffff, 1);
light.rotateX(-Math.PI);
const cube = new Mesh(new BoxGeometry(), new MeshLambertMaterial({ color: 0x0000ff }));
const axisHelper = new AxesHelper(10);
const gridHelper = new GridHelper(10);

scene.instance.add(light, axisHelper, gridHelper, cube);

// SETUP FX
const renderPass = new RenderPass(scene.instance, camera.instance);
const output = new OutputPass();
renderer.addEffect(renderPass, output);

onHotReload(() => {
	cube.geometry.dispose();
	cube.material.dispose();
	axisHelper.geometry.dispose();
	axisHelper.material.dispose();
	gridHelper.geometry.dispose();
	gridHelper.material.dispose();
});

// EVENTS
const resize = (o: { width: number; height: number; pixelRatio: number }) => {
	const { width, height, pixelRatio } = o;
	camera.resize({ width, height });
	renderer.resize({ width, height, pixelRatio });
	renderer.update({ scene: scene.instance, camera: camera.instance });
};
const update = (o: { deltaMs: number; deltaTime: number }) => {
	const { deltaTime } = o;
	const { renderer, camera, scene } = useThree();
	cube.rotation.x += deltaTime * 0.5;
	cube.rotation.y += deltaTime * 0.5;
	camera.update({ deltaTime });
	renderPass.camera = camera.instance;
	renderer.update({ scene: scene.instance, camera: camera.instance, deltaTime });
};
resizer.addListener(resize);
resizer.fire();
animator.addListener(update);
animator.play(renderer.instance);

// GUI
