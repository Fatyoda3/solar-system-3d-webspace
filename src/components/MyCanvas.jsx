/* eslint-disable react/no-unknown-property */
import { useRef, useState, createRef, useMemo } from 'react';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import planetsArray from '../constants/PlanetArray';

import Sun from './Sun';

const pointsArray = new Float32Array(5000 * 3);
const size = 5000;

for (let index = 0; index < size; index += 3) {
	pointsArray[index] = Math.random() * 1000 - 500 + 5;
	pointsArray[index + 1] = Math.random() * 1000 - 500 + 5;
	pointsArray[index + 2] = Math.random() * 1000 - 500 + 5;
}

// react function component
export default function MyCanvas() {
	const pointsRef = useRef();

	const [camera, setCamera] = useState(null);

	// const [animate, setAnimate] = useState(true);

	const [activePlanet, setActivePlanet] = useState(null);

	const planetRefArray = useMemo(
		() => Array.from({ length: 9 }, () => createRef()),
		[],
	);

	return (
		<>
			<Canvas
				onClick={() => {
					setActivePlanet(null);
				}}
				performance={{ min: 0.3, max: 0.4 }}
				camera={{
					fov: 90,
					near: 0.1,
					far: 2000,
					position: [0, 0, 200],
				}}
				onCreated={(state) => {
					setCamera(state.camera);
					camera?.position.set([0, 0, 200]);
				}}>
				<Suspense>
					<OrbitControls minZoom={0.4} />

					<points>
						<bufferGeometry>
							<bufferAttribute
								ref={pointsRef}
								array={pointsArray}
								itemSize={3}
								count={size}
								attach={'attributes-position'}
							/>
						</bufferGeometry>

						<pointsMaterial size={0.3} color={0xffffff} />
					</points>

					{/*THE SUN IS HERE */}


					<Sun  />

					{/* planets are here */}

					<group>
						{planetsArray.map((planet, index) => {
							return (
								<group key={planet.key}>
									<mesh
										onPointerOver={() => {
											console.log('object');
										}}
										onClick={() => {
											const current =
												planetRefArray[index].current;

											if (camera) {
												camera.position.setX(
													current.position.x,
												);
												camera.position.setY(
													current.position.y,
												);
												camera.position.setZ(
													current.position.z +
														current.radius / 100 +
														5,
												);
											}
										}}
										acceleration={planet.acceleration}
										radius={planet.radius}
										ref={planetRefArray[index]}
										position={[
											-10 * index +
												planet.radius / 100 +
												15,
											index === 4
												? planet.radius / 100 + 25
												: -5 * index +
												  planet.radius / 100 +
												  15,
											index === 4
												? planet.distanceFromSun /
														1000 +
												  planet.radius / 100 +
												  15
												: planet.distanceFromSun / 100 +
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
					<ambientLight />
				</Suspense>
			</Canvas>
		</>
	);
}
