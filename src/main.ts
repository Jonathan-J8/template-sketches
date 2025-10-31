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
import { FXAAShader, OutputPass, RenderPass, ShaderPass } from 'three/examples/jsm/Addons.js';
import onHotReload from './hooks/onHotReload';
import useEngine from './hooks/useEngine';

const { scene, renderer, animator, camera, resizer } = useEngine();
ColorManagement.enabled = true;
camera.instance.position.z = 10;
camera.instance.position.x = 5;
camera.instance.position.y = 5;
camera.instance.lookAt(0, 0, 0);
scene.instance.fog = null;
renderer.instance.toneMapping = LinearToneMapping;

// COMPONENTS
const renderPass = new RenderPass(scene.instance, camera.instance);
const fxaa = new ShaderPass(FXAAShader);
const output = new OutputPass();
renderer.addEffect(renderPass, fxaa, output);

// SETUP SCENE
const light = new DirectionalLight(0xffffff, 1);
const cube = new Mesh(new BoxGeometry(), new MeshLambertMaterial({ color: 0x0000ff }));
const axisHelper = new AxesHelper(10);
const gridHelper = new GridHelper(10);

scene.instance.add(light, axisHelper, gridHelper, cube);

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
	renderer.resize({ width, height, pixelRatio });
	camera.resize({ width, height });
};
const update = (o: { deltaMs: number; deltaTime: number }) => {
	const { deltaTime } = o;
	const { renderer, camera, scene } = useEngine();
	cube.rotation.x += deltaTime * 0.5;
	cube.rotation.y += deltaTime * 0.5;
	camera.update({ deltaTime });
	renderer.update({ scene: scene.instance, camera: camera.instance, deltaTime });
};
resizer.addListener(resize);
animator.addListener(update);
resizer.fire();
animator.play(renderer.instance);

// GUI
