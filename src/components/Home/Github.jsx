import { useEffect, useRef, useState } from 'react';

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


	for (const key in data) {
		const string =
			typeof data[key] != 'object' ? `${key} -> ${data[key]}` : '';

		stringArr.push(string);
	}

	return (
		<div
			className="bg-transparent p-4 m-2 scroll-m-1 scroll-smooth absolute z-10"
			ref={ref}>
			MY github page info
			{stringArr.map((e, index) => (
				<h2
					key={index}
					className="font-semibold font-mono text-white 
				">
					{e}
				</h2>
			))}
		</div>
	);
}

export default Github;
