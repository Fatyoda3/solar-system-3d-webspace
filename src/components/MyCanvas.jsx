/* eslint-disable react/no-unknown-property */
import { useState, createRef, useMemo } from 'react';
import { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import planetsArray from '../constants/PlanetArray';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import Sun from './Sun';
import StarField from './StarField';
import Saturn from './Saturn';

const sound = new Audio('./sounds/one.mp3');
sound.preload = 'auto';
sound.play();
sound.loop = true;
sound.autoplay = true;
sound.volume = 0.1;
console.log(sound);

window.addEventListener('keypress', (e) => {
	if (e.key == 'm' && sound.muted) {
		sound.muted = false;
	} else if (e.key == 'm' && !sound.muted) {
		sound.muted = true;
	}
});
// react function component
export default function MyCanvas() {
	const [camera, setCamera] = useState(null);

	const planetRefArray = useMemo(
		() => Array.from({ length: 9 }, () => createRef()),
		[],
	);

	/* 	const colorMap = useMemo(() =>
		Array.from({ length: 8 }, () =>
			useLoader(TextureLoader, `./Planets-3d/0${index}map.jpg`),
		),
	);
	for (let index = 0; index < 9; index++) {
		let Map = useLoader(TextureLoader, `./Planets-3d/0${index}map.jpg`);
 */
	// colorMap.push(Map);
	// }

	/* const texturePaths = [
		'./Planets-3d/00map.jpg',
		'./Planets-3d/01map.jpg',
		'./Planets-3d/02map.jpg',
		'./Planets-3d/03map.jpg',
		'./Planets-3d/04map.jpg',
		'./Planets-3d/05map.jpg',
		'./Planets-3d/06map.jpg',
		'./Planets-3d/07map.jpg',
		'./Planets-3d/08map.jpg',
	];

	const colorMap = texturePaths.map((path) => useLoader(TextureLoader, path));
 */

	const colorMap = [
		useLoader(TextureLoader, './Planets-3d/00map.jpg'),
		useLoader(TextureLoader, './Planets-3d/01map.jpg'),
		useLoader(TextureLoader, './Planets-3d/02map.jpg'),
		useLoader(TextureLoader, './Planets-3d/03map.jpg'),
		useLoader(TextureLoader, './Planets-3d/04map.jpg'),
		useLoader(TextureLoader, './Planets-3d/05map.jpg'),
		useLoader(TextureLoader, './Planets-3d/06map.jpg'),
		useLoader(TextureLoader, './Planets-3d/07map.jpg'),
	];

	setInterval(() => {
		if (sound.volume < 0.3) sound.volume += 0.01;

		console.log(sound.volume);
	}, 5 * 1000);

	function animate() {
		// const duration = sound.duration;

		/* for (let index = 0; index < duration / 10; index++) {
			if (sound.volume < 0.5) sound.volume += 0.01;
			console.log(sound.volume);
		} */

		planetRefArray.forEach((e) => {
			// console.log(e.current?.rotation.y);
			const planet = e.current;

			if (planet) planet.rotation.y += 0.002;

			if (planet?.rotation.y >= 5) planet.rotation.y = 0;
		});

		requestAnimationFrame(animate);
	}

	return (
		<>
			<Canvas
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
					animate();
				}}>
				<Suspense>
					<ambientLight intensity={0.2} />
					<StarField />
					<OrbitControls minZoom={0.4} />

					{/*THE SUN IS HERE */}

					<Sun />
					<directionalLight
						args={[0xffffff, 5]}
						position={[0, 0, -1]}
						rotateX={Math.PI * 2}
					/>
					{/* planets are here */}

					{/* <Saturn scale={0.01} /> */}
					<group>
						{planetsArray.map((planet, index) => {
							if (planet.name == 'Saturn')
								return (
									<group key={planet.key}>
										<Saturn
											radius={planet.radius}
											ref={planetRefArray[index]}
											scale={0.01}
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
													: planet.distanceFromSun /
															100 +
													  planet.radius / 100 +
													  15,
											]}
											camera={camera}
										/>
									</group>
								);
							else
								return (
									<group key={planet.key}>
										<mesh
											onClick={() => {
												const current =
													planetRefArray[index]
														.current;

												if (camera) {
													camera.position.set(
														current.position.x,
														current.position.y,
														current.position.z +
															current.radius /
																100 +
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
													: planet.distanceFromSun /
															100 +
													  planet.radius / 100 +
													  15,
											]}>
											<sphereGeometry
												args={[
													planet.radius > 200
														? planet.radius / 100
														: planet.radius / 25,
													25,
													25,
												]}
											/>

											<meshStandardMaterial
												map={colorMap[planet.index - 1]}
											/>
											<Html
												distanceFactor={
													planet.radius < 200
														? planet.radius / 2
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
