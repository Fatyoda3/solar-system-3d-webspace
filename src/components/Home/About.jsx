import React from 'react';

function About() {
	return (
		<div className="absolute z-20 w-take-half sm:w-take-half h-96 top-28 left-16 m-4">
			<h2 className="border-2 text-xl bg-transparent text-white p-2 m-2 text-center rounded-lg">
				Using
				<code className="bg-gray-700 p-1 m-1 rounded-xl">
					&lt;Iframe&gt;
				</code>
				here did not have enough time to design a page from scratch
			</h2>
			<iframe
				src="https://fatyoda3.github.io/bio.html"
				className=" rounded-lg border-4 border-white w-take-half h-96 scroll-m-1"
				
			/>
		</div>
	);
}

export default About;
