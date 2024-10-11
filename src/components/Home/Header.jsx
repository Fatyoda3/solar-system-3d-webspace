import {
	NavLink,
	Link,
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';

const checkActive = ({ isActive }) =>
	isActive ? '  text-green-400  font-semibold p-2 m-1 shadow-md animate-bounce' : 'p-2 m-1';

export default function Header() {
	return (
		<>
			<nav className=" bg-white  p-2 m-2 lg:text-2xl md:text-xl text-xl sm:text-xl flex justify-around   ">
				<NavLink to={'/'} className={checkActive}>
					Home
				</NavLink>
				<NavLink to={'/About'} className={checkActive}>
					About this project
				</NavLink>
				<NavLink to={'/contact-me'} className={checkActive}>
					Contact me
				</NavLink>
				<NavLink to={'/github'} className={checkActive}>
					Github
				</NavLink>
				<NavLink to={'/discord'} className={checkActive}>
					Discord
				</NavLink>
			</nav>
		</>
	);
}
