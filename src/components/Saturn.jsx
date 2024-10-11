/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useGLTF, Html } from '@react-three/drei';
import { forwardRef } from 'react';

export default forwardRef(function Saturn(
	{ scale, position, camera, radius },
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

				if (camera) {
					camera?.position.set(
						current?.position.x + 1,
						current?.position.y + 1,
						current?.position.z + radius / 100 + 15,
					);
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
