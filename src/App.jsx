import React from 'react';
import MyCanvas from './components/MyCanvas';
import { Header, Github } from './components';

import { Route, createRoutesFromChildren } from 'react-router';
import {
	NavLink,
	Link,
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<>
				<Header />
				<div className=" bg-white text-pretty">
					<h1>hellow</h1>
					<h1>ajdfal</h1>
					<h1>adhjfgal</h1>
					<h1>jlakdjf</h1>
					<h1>jaldjfa</h1>
				</div>
			</>
		),
	},

	// when i click a cross X  button it should hide every ui element
	//and only display the r3f canvas

	{
		path: '/About',
		element: (
			<>
				<Header />
				<div className=" bg-white text-pretty">
					<h1>hello</h1>
				</div>
			</>
		),
	},

	{
		path: '/contact-me',
		element: (
			<>
				<Header />
				<div className=" bg-white text-pretty">
					<h1>hello</h1>
					<h1>hello</h1>
					<h1>hello</h1>
					<h1>hello</h1>
				</div>
			</>
		),
	},

	//https://api.github.com/users/Fatyoda3

	{
		path: '/github',
	
		element: (
			<>
				<Header />
				<div className=" bg-white text-pretty">
					<h1>hello</h1>
					<h1>hello</h1>
					<h1>hello</h1>
					<h1>hello</h1>

					<Github />
				</div>
			</>
		),
	},
]);
export default function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}
