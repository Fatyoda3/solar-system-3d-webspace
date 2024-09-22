/* eslint-disable react/no-unknown-property */
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { buffer, bufferAttribute } from 'three/webgpu';

const pointsArray = new Float32Array(500 * 3);
const planetsArray = [
	{
		key: 'zero',
		index: 1,
		name: 'Mercury',
		distanceFromSun: 579, // in 100 kilometers
		acceleration: 0.037, // in 100 m/s^2
		mass: 3.3011e21, // in 100 kilograms
		radius: 24.397, // in 100 kilometers
	},

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

const size = 500;

for (let index = 0; index < size; index += 3) {
	pointsArray[index] = Math.random() * 50 - 25;
	pointsArray[index + 1] = Math.random() * 50 - 25;
	pointsArray[index + 2] = Math.random() * 50 - 25;
}

export default function MyCanvas() {
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
	function animate() {
		if (canvasRef.current) {
			for (let index = 0; index < 500; index += 3) {
				pointsArray[index + 2] += 0.01;
				if (pointsArray[index + 2] > 20) {
					pointsArray[index + 2] = -81;
				}
			}
			canvasRef.current.needsUpdate = true;
		}
		/* 	if (planetRefArray[0].current) {
			console.log(planetRefArray[0].current);
		} */

		requestAnimationFrame(animate);
	}

	animate();
	if (planetRefArray[0].current) {
		console.log(planetRefArray[0].current);
	}
	return (
		<Canvas
			performance={{ min: 0.3, max: 0.4 }}
			camera={{ fov: 75, near: 0.1, far: 2000, position: [0, 0, 100] }}>
			{/* <HookedCanvas /> */}
			<OrbitControls />

			{/* 	<mesh>
				<boxGeometry args={[2, 2, 2]} scale={[2, 5, 2]} />
				<meshBasicMaterial color={'red'} />
			</mesh> */}
			{/* 
			<group>
				<mesh>
					<boxGeometry args={[2, 2, 2]} scale={[2, 5, 2]} />
					<meshBasicMaterial color={'gray'} />
				</mesh>
				<Html position={[1, 1, 1]} pointerEvents="none">
					<span className="text-2xl text-green-400 pointer-events-none">
						hi this is some text
					</span>
				</Html>
			</group> */}

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
				<pointsMaterial size={0.5} color={0xff00ff} />
			</points>

			<group>
				{planetsArray.map((planet, index) => {
				
						return (
							<>
								<group key={planet.key}>
									<mesh
										ref={planetRefArray[index]}
										position={[
											-10 * index + planet.radius / 100,
											-5 * index + planet.radius / 100,
											planet.distanceFromSun / 100 +
												planet.radius / 100,
										]}>
										<sphereGeometry
											args={[planet.radius /10, 25, 25]}
										/>
										<meshBasicMaterial
											color={'blue'}
											wireframe
										/>
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
							</>
						);
				})}
			</group>
		</Canvas>
	);
}
