/* eslint-disable react/no-unknown-property */
import { useRef } from 'react';

const pointsArray = new Float32Array(5000 * 3);
const size = 5000;

for (let index = 0; index < size; index += 3) {
	pointsArray[index] = Math.random() * 1000 - 500 + 5;
	pointsArray[index + 1] = Math.random() * 1000 - 500 + 5;
	pointsArray[index + 2] = Math.random() * 1000 - 500 + 5;
}

export default function StarField() {
	const pointsRef = useRef();

	return (
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
	);
}
