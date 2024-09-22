/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';

import { OrbitControls, Html } from '@react-three/drei';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
// const config = { fov: 75, position: [0, 0, 500] };

const pointsArray = new Float32Array(5000 * 3);
const planetsArray = [
	{
		key: 'first',
		index: 1,
		name: 'Mercury',
		distanceFromSun: 579, // in 100 kilometers
		acceleration: 0.037, // in 100 m/s^2
		mass: 3.3011e21, // in 100 kilograms
		radius: 24.397, // in 100 kilometers
	},
	{
		key: 'second',
		index: 2,
		name: 'Venus',
		distanceFromSun: 1082,
		acceleration: 0.0887,
		mass: 4.8675e22,
		radius: 60.518,
	},
	{
		key: 'third',

		index: 3,
		name: 'Earth',
		distanceFromSun: 1496,
		acceleration: 0.0981,
		mass: 5.97237e22,
		radius: 63.71,
	},
	{
		key: 'fourth',

		index: 4,
		name: 'Mars',
		distanceFromSun: 2279,
		acceleration: 0.0371,
		mass: 6.4171e21,
		radius: 33.99,
	},
	{
		key: 'fifth',

		index: 5,
		name: 'Jupiter',
		distanceFromSun: 7785,
		acceleration: 0.2479,
		mass: 1.8982e25,
		radius: 714.92,
	},
	{
		key: 'sixth',

		index: 6,
		name: 'Saturn',
		distanceFromSun: 1434,
		acceleration: 0.1044,
		mass: 5.6834e24,
		radius: 602.68,
	},
	{
		key: 'seventh',

		index: 7,
		name: 'Uranus',
		distanceFromSun: 2871,
		acceleration: 0.0869,
		mass: 8.681e23,
		radius: 255.59,
	},
	{
		key: 'eighth',

		index: 8,
		name: 'Neptune',
		distanceFromSun: 4495,
		acceleration: 0.1115,
		mass: 1.02413e24,
		radius: 247.64,
	},
];
// let isOnCanvas = false;
const size = 5000;
for (let index = 0; index < size; index += 3) {
	pointsArray[index] = Math.random() * 1000 - 500 + 5;
	pointsArray[index + 1] = Math.random() * 1000 - 500 + 5;
	pointsArray[index + 2] = Math.random() * 1000 - 500 + 5;
}
export default function MyCanvas() {
	let [camera, setCamera] = useState(null);
	const [animate, setAnimate] = useState(true);
	const [activePlanet, setActivePlanet] = useState(null);
	const planetRefArray = new Array(8);
	planetRefArray[0] = useRef();
	planetRefArray[1] = useRef();
	planetRefArray[2] = useRef();

	planetRefArray[3] = useRef();
	planetRefArray[4] = useRef();
	planetRefArray[5] = useRef();

	planetRefArray[6] = useRef();
	planetRefArray[7] = useRef();
	planetRefArray[8] = useRef();

	const canvasRef = useRef();

	let fact = Math.PI * 2;

	function animateLoop() {
		if (animate) {
			planetRefArray.forEach((planet) => {
				if (planet.current) {
					const planetPosition = planet.current.position;
							const f =
						planet.current.factor *
						planet.current.acceleration *
						100;
					// const x = planetPosition.x;
					const x = Math.cos((fact += 0.00001)) * f;
					const y = Math.sin((fact += 0.00001)) * f;

					planetPosition.setX(x);

					planetPosition.setY(y);
					// const active = activePlanet?.uuid == planet.current.uuid;
					/* if (active) {
						console.log(active);
						camera.position.setX([planetPosition.x]);
						camera.position.setY([planetPosition.y]);
						camera.position.setZ([
							planetPosition.z + planet.current.radius / 100 + 5,
						]);
					} */
				}
			});
			requestAnimationFrame(animateLoop);
		}
	}

	animateLoop();

	return (
		<>
			<Canvas
				onClick={(e) => {
					setActivePlanet(null);

					// camera.position.set([0, 0, 200]);
				}}
				// ref={canvasRef}
				performance={{ min: 0.3, max: 0.4 }}
				camera={{
					fov: 77,
					near: 0.1,
					far: 2000,
					position: [0, 0, 200],
				}}
				onCreated={(state) => {
					setCamera(state.camera);
					camera?.position.set([0, 0, 200]);
				}}>
				{/* <PerspectiveCamera  ref={canvasRef} position={[0,150,500]} near={25}/> */}

				<OrbitControls minZoom={0.4} />

				<points>
					<bufferGeometry>
						<bufferAttribute
							ref={canvasRef}
							array={pointsArray}
							itemSize={3}
							count={size}
							attach={'attributes-position'}
							needsUpdate
						/>
					</bufferGeometry>

					<pointsMaterial size={0.3} color={0xffffff} />
				</points>
				{/*THE SUN IS HERE */}
				<mesh>
					<sphereGeometry args={[15, 50, 50]} />
					<meshBasicMaterial color={'orange'} />
				</mesh>
				<group>
					{planetsArray.map((planet, index) => {
						return (
							<group key={planet.key}>
								<mesh
									onClick={(e) => {
										const current = planetRefArray[index].current;

										setActivePlanet(current);

										console.log(activePlanet?.uuid);

										if (camera) {
											camera.position.setX([
												current.position.x,
											]);

											camera.position.setY([
												current.position.y ,
											]);
											camera.position.setZ([
												current.position.z + 5,
											]);
										}
									}}
									acceleration={planet.acceleration}
									radius={planet.radius}
									factor={
										(Math.random() * planet.radius) / 10 + 2
									}
									ref={planetRefArray[index]}
									position={[
										-10 * index + planet.radius / 100 + 15,
										-5 * index + planet.radius / 100 + 15,
										planet.distanceFromSun / 100 +
											planet.radius / 100 +
											15,
									]}>
									<sphereGeometry
										args={[planet.radius / 100, 25, 25]}
									/>
									<meshBasicMaterial color={'cyan'} />
									<Html
										distanceFactor={
											planet.radius < 200
												? planet.radius / 5
												: planet.radius / 20
										}
										className="text-black rounded-3xl p-2 bg-white text-2xl select-none">
										{planet.name}
									</Html>
								</mesh>
							</group>
						);
					})}
				</group>
			</Canvas>
		</>
	);
}
