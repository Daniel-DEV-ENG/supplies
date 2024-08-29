import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const UsersApp = lazy(() => import('./PaymentsApp'));
const User = lazy(() => import('./Payment/Product'));
const Users = lazy(() => import('./Payments/Products'));
/**
 * The E-Users app configuration.
 */
const PaymentsAppConfig = {
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
					element: <Navigate to="payments" />
				},
				{
					path: 'payments',
					element: <Users />
				},
				{
					path: 'payment/:Id/*',
					element: <User />
				}
			]
		}
	]
};
export default PaymentsAppConfig;
