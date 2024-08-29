import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const CompaniesApp = lazy(() => import('./CompaniesApp'));
const Company = lazy(() => import('./Company/Company'));
const Companies = lazy(() => import('./Companies/Companies'));

const CompaniesAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/',
			element: <CompaniesApp />,
			children: [
				{
					path: '',
					element: <Navigate to="companies" />
				},
				{
					path: 'companies',
					element: <Companies />
				},
				{
					path: 'companies/:Id/*',
					element: <Company />
				}
			]
		}
	]
};
export default CompaniesAppConfig;
