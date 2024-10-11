import { Route, Link, useLocation } from 'wouter';

const checkActive = ({ isActive = true }) =>
	isActive
		? '  text-green-400  font-semibold p-2 m-1 shadow-md animate-bounce '
		: 'p-2 m-1 hover:shadow-lg';

export default function Header() {
	return (
		<>
			<nav className=" bg-white  p-2 m-2 lg:text-2xl md:text-xl text-xl sm:text-xl flex justify-around ">


				
				<Link to={'/'} className={checkActive}>
					Home
				</Link>
				<Link to={'/About'} className={checkActive}>
					About this project
				</Link>
				<Link to={'/contact-me'} className={checkActive}>
					Contact me
				</Link>
				<Link to={'/github'} className={checkActive}>
					Github
				</Link>
				<Link to={'/discord'} className={checkActive}>
					Discord
				</Link>
			</nav>
		</>
	);
}
