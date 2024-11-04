/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useGLTF, Html } from '@react-three/drei';
import { forwardRef } from 'react';
import gsap from 'gsap';
export default forwardRef(function Saturn(
	{ scale, position, camera, radius, setAP, aP },
	ref,
) {
	const { nodes, materials } = useGLTF('./Planets-3d/saturn.glb');

	function animate() {
		// console.log(e.current?.rotation.y);
		const planet = ref.current;

		if (planet) planet.rotation.y += 0.002;

		if (planet?.rotation.y >= 5) planet.rotation.y = 0;

		requestAnimationFrame(animate);
	}

	animate();

	return (
		<group
			scale={scale || 0.5}
			position={position}
			ref={ref}
			onClick={() => {
				const current = ref.current;
				setAP((aP) => !aP);

				if (camera) {
					gsap.to(camera.position, {
						duration: 1,
						z: current.position.z + radius / 100 + 20,
						x: current.position.x + 5,
						y: current.position.y,
						delay: 0.1,
						ease: 'circ.in',
					});
					console.log(camera.position);
				}
			}}>
			<mesh
				geometry={nodes.Saturn001.geometry}
				material={materials.None}
			/>
			<mesh
				geometry={nodes.RingsTop.geometry}
				material={materials.SaturnRings}
			/>
			<mesh
				geometry={nodes.RingsBottom.geometry}
				material={materials.SaturnRings}
			/>

			<Html
				distanceFactor={radius < 200 ? radius / 2 : radius / 20}
				className="text-black rounded-3xl p-2 bg-white text-2xl select-none">
				{'Saturn'}
			</Html>
		</group>
	);
});

useGLTF.preload('./Planets-3d/saturn.glb');
