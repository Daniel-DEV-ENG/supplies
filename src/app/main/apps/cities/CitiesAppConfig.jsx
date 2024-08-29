import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Address from '../address/product/Address';

const CitiesApp = lazy(() => import('./CitiesApp'));
const Cities = lazy(() => import('./Cities/Cities'));

const CitiesAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/',
			element: <CitiesApp />,
			children: [
				{
					path: '',
					element: <Navigate to="cities" />
				},
				{
					path: 'cities',
					element: <Cities />
				},
				{
					path: 'cities/:Id/address',
					element: <Address />
				}
			]
		}
	]
};
export default CitiesAppConfig;
