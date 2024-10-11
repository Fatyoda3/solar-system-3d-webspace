import { useState } from 'react';

function Github() {
	const [data, setData] = useState({});

	
		fetch('https://api.github.com/users/Fatyoda3')
			.then((res) => {
				return res.json();
			})
			.then((e) => {
				setData(e);
			});
	

	return (
		<div className="bg-orange-200">
			MY github page info
			<h2> name -- {data.name}{data.count}</h2>
		</div>
	);
}

export default Github;
