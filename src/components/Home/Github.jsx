import { useEffect, useRef, useState } from 'react';

function Github() {
	const ref = useRef();
	const [data, setData] = useState({});
	const [stringArr, setStringArr] = useState([]);
	const [hitCount, setHitCount] = useState(0);

	useEffect(() => {
		if (hitCount > 1) return;

		fetch('https://api.github.com/users/Fatyoda3')
			.then((res) => res.json())
			.then((e) => {
				setData(e);
				setHitCount((prev) => prev + 1);
			});
	}, [hitCount]);

	useEffect(() => {
		const data_needed = [
			'login',
			'name',
			'location',
			'bio',
			'public_repos',
		];
		const newStringArr = data_needed
			.map((key) =>
				data[key] && typeof data[key] !== 'object'
					? `${key} -> ${data[key]}`
					: '',
			)
			.filter((str) => str); // Filter out any empty strings
		setStringArr(newStringArr);
	}, [data]);

	return (
		<div
			className="lg:bg-transparent p-4 m-2 scroll-m-1 scroll-smooth absolute z-10 border-2 border-gray-200 rounded-3xl right-10 top-52  text-white text-center flex
			
	lg:text-2xl 
	lg:w-max
	sm: w-64 
	sm:text-wrap 

	sm:text-sm 
	sm:left-5 
	md:left-10 
	sm:bg-red-500 
	md:bg-green-500"
			ref={ref}>
			<img
				className="rounded-lg border-8 border-blue-400 w-96 h-96"
				src={data.avatar_url}
				alt="image of my avatar "
				width={200}
				height={200}
			/>
			<span>
		
				MY github page info
				{stringArr.map((e, index) => (
					<h2
						key={index}
						className="font-semibold font-mono border p-2 m-2 text-wrap backdrop-blur-sm">
						{e}
					</h2>
				))}
			</span>
		</div>
	);
}

export default Github;
