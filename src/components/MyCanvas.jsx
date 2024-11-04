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
import gsap from 'gsap';
// import { Github, Discord } from './index';
import Header from './Home/Header';
// import { Route, Link, useLocation } from 'wouter';
import { Stars } from '@react-three/drei';
import { Environment } from '@react-three/drei';
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

// const checkActive = '  text-green-400  font-semibold p-4 m-2 shadow-md  ';

export default function MyCanvas() {
	const [camera, setCamera] = useState(null);
	const [aP, setAP] = useState(true);

	const planetRefArray = useMemo(
		() => Array.from({ length: 9 }, () => createRef()),
		[],
	);

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
	// const presetTexture = useEnvironment({ preset: 'city' });

	/* setInterval(() => {
		if (sound.volume < 0.3) sound.volume += 0.01;

		console.log(sound.volume);
	}, 5 * 1000);
 */
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
		<div className="canvas-wrap">
			{!aP && (
				<button
					className={
						'bg-white text-gray-700 p-4 m-2 text-center sticky top-2 z-30 '
					}
					onClick={() => {
						setAP((aP) => !aP);

						gsap.to(camera.position, {
							duration: 2,
							z: 200,
							delay: 0.3,
							ease: 'circ.in',
						});
						// camera.position.set([0,0,200]);// problem with this is that it's not giving a vector-3 so undefined occurs

						console.log(camera.position);
					}}>
					X
				</button>
			)}
			{aP && (
				<div className="bg-gray-800 rounded-md p-4 m-4 w-max ">
					<Header />
				</div>
			)}
			{
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
					{/* <Float> */}
					<Environment
						/* files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/evening_road_01_2k.hdr"
					ground={{ height: 5, radius: 500, scale: 1400 }} */
						backgroundIntensity={0}
						backgroundBlurriness={1}
						environmentIntensity={0}
						ground={{ height: 100, radius: 500, scale: 1400 }}
						resolution={256}
						// preset="night"
						files={'/hdrMap.jpg'}
						background={true}
					/>

					<Stars
						radius={100}
						depth={50}
						count={5000}
						factor={4}
						saturation={0}
						fade
						speed={1}
					/>
					<group>
						<mesh
							onClick={() => setAP(true)}
							rotation={[Math.PI / 2, 0, Math.PI / 2]}
							position={[0, 100, 0]}>
							<torusGeometry args={[65, 15, 12]} />
							<meshPhysicalMaterial
								envMapIntensity={25}
								/* metalness={0.9} */
								roughness={0.2}
								transmission={1}
								thickness={8}
								/* color={0xff00ff} */
							/>
						</mesh>
					</group>
					{/* </Float> */}
					<Suspense>
						<ambientLight intensity={0.2} />
						{/* <StarField /> */}
						<OrbitControls minZoom={0.4} />

						{/*THE SUN IS HERE */}

						<Sun />
						<directionalLight
							args={[0xffffff, 5]}
							position={[0, 0, -1]}
							rotateX={Math.PI * 2}
						/>

						{/* planets are here */}

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
														? planet.radius / 100 +
														  25
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
												aP={aP}
												setAP={setAP}
											/>
										</group>
									);
								else
									return (
										<group key={planet.key}>
											<mesh
												onClick={() => {
													setAP(false);
													const current =
														planetRefArray[index]
															.current;

													if (camera) {
														gsap.to(
															camera.position,
															{
																duration: 1,
																z:
																	current
																		.position
																		.z +
																	current.radius /
																		100 +
																	5,
																x: current
																	.position.x,
																y: current
																	.position.y,
																delay: 0.1,
																ease: 'circ.in',
															},
														);
														/* 	camera.position.set(
														
															
															
														); */
													}
												}}
												acceleration={
													planet.acceleration
												}
												radius={planet.radius}
												ref={planetRefArray[index]}
												position={[
													-10 * index +
														planet.radius / 100 +
														15,
													index === 4
														? planet.radius / 100 +
														  25
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
															? planet.radius /
															  100
															: planet.radius /
															  25,
														25,
														25,
													]}
												/>

												<meshStandardMaterial
													map={
														colorMap[
															planet.index - 1
														]
													}
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
			}
		</div>
	);
}
