import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const UsersApp = lazy(() => import('./CustomersApp'));
const User = lazy(() => import('./Customer/Product'));
const Users = lazy(() => import('./Customers/Products'));
/**
 * The E-Users app configuration.
 */
const CustomersManagerAppConfig = {
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
					element: <Navigate to="customers/manager" />
				},
				{
					path: 'customers/manager',
					element: <Users />
				},
				{
					path: 'customers/manager/:Id/*',
					element: <User />
				}
			]
		}
	]
};
export default CustomersManagerAppConfig;
