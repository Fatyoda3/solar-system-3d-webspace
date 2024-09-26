import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function Model(props) {
	const { nodes, materials } = useGLTF('/pen.glb');
	return (
		<group {...props} dispose={null}>
			<mesh
				geometry={nodes.Cylinder.geometry}
				material={materials.baseColor}
				position={[0, 1.22, 0]}
				rotation={[0, 0, Math.PI / 2]}
			/>
		</group>
	);
}
// every fucking assest has to be in public folder
// or else it will load as a html
useGLTF.preload('/pen.glb');
