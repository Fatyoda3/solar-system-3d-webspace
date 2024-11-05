import { useRef } from 'react';

export default function Contact() {
	const ref = useRef();
	return (
		<div className="bg-transparent border-2  p-2 m-2 absolute top-28 left-10 z-20 ">
			<button
				ref={ref}
				content="yorkfat@gmail.com"
				type="button"
				className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 r "
				onClick={() => {
					ref.current.innerText = 'copied to clipboard';

					setTimeout(
						() => (ref.current.innerText = 'click to get email Id'),
						2000,
					);
					navigator.clipboard.writeText('yorkfat@gmail.com');
				}}>
				click to get email Id
			</button>

			<a
			target='_blank'
				href="https://www.linkedin.com/in/shivang-singh-6b883928a/"
				className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer ">
				go to my Linkedin
			</a>
		</div>
	);
}
