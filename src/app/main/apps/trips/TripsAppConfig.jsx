import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const UsersApp = lazy(() => import('./UsersApp'));
const User = lazy(() => import('./User/Product'));
const Users = lazy(() => import('./Users/Products'));
/**
 * The E-Users app configuration.
 */
const TripsAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/',
			element: <UsersApp />,
			children: [
				{
					path: '',
					element: <Navigate to="trips" />
				},
				{
					path: 'trips',
					element: <Users />
				},
				{
					path: 'trips/:Id/*',
					element: <User />
				}
			]
		}
	]
};
export default TripsAppConfig;
