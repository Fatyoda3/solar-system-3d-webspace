/* eslint-disable react/no-unknown-property */
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export default function Sun(props) {
	const group = useRef();
	const { nodes, materials } = useGLTF('/Planets-3d/SUN.glb');

	return (
		<group ref={group} {...props} scale={1.2}>
			<group>
				<mesh
					geometry={nodes.UnstableStarCore_1_0.geometry}
					material={materials.material}
				/>
			</group>
			<group rotation={[-Math.PI / 2, 0, 0]} scale={1.01}>
				<mesh
					geometry={nodes.UnstableStarref_2_0.geometry}
					material={materials.material_1}
				/>
			</group>
		</group>
	);
}

useGLTF.preload('/Planets-3d/SUN.glb');
