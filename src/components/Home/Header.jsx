import { Route, Link } from 'wouter';
import Github from './Github';
import Contact from './Contact';
import About from './About';

const checkActive = (active) =>
	active
		? '  text-green-400  font-semibold p-2 m-1 shadow-md animate-bounce w-20'
		: ' w-20 p-2 m-1 hover:shadow-lg';

export default function Header() {
	return (
		<>
			<nav className=" bg-white  p-2 m-2 lg:text-2xl md:text-xl text-xl sm:text-xl  justify-around ">
				<Link to={'/'} className={checkActive}>
					Home
				</Link>

				<Link to={'/github'} className={checkActive}>
					Github
				</Link>

				<Link to={'/contact'} className={checkActive}>
					Contact
				</Link>

				<Link to={'/about'} className={checkActive}>
					About
				</Link>

				<Route path="/">
					
				</Route>

				<Route path="/github">
					<Github />
				</Route>
				<Route path="/contact">
					<Contact />
				</Route>
				<Route path="/about">
					<About />
				</Route>
			</nav>
		</>
	);
}
