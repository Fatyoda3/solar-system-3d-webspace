import { forIn } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { string } from 'three/webgpu';

function Github() {
	const ref = useRef();
	const [data, setData] = useState({});
	const [stringArr, setStringArr] = useState([]);
	useEffect(() => {
		fetch('https://api.github.com/users/Fatyoda3')
			.then((res) => {
				return res.json();
			})
			.then((e) => {
				setData(e);
			});
	}, []);

	/* 	fetch('https://api.github.com/users/Fatyoda3')
			.then((res) => {
				return res.json();
			})
			.then((e) => {
				setData(e);
			}); */
	console.log(data);
	for (const key in data) {
		const string =
			typeof data[key] != 'object' ? `${key}---> ${data[key]}` : '';

		// ref.current.append(` ${string}`);
		stringArr.push(string);
	}

	console.log(stringArr);
	return (
		<div className="bg-orange-200 p-4 m-4 w-96" ref={ref}>
			MY github page info
			{stringArr.map((e, index) => (
				<h2 key={index}> {e}</h2>
			))}
		</div>
	);
}

export default Github;
