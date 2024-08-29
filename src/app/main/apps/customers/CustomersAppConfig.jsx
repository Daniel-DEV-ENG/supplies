import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const UsersApp = lazy(() => import('./CustomersApp'));
const User = lazy(() => import('./Customer/Product'));
const Users = lazy(() => import('./Customers/Products'));
/**
 * The E-Users app configuration.
 */
const CustomersAppConfig = {
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
					element: <Navigate to="customers" />
				},
				{
					path: 'customers',
					element: <Users />
				},
				{
					path: 'customers/:Id/*',
					element: <User />
				}
			]
		}
	]
};
export default CustomersAppConfig;
