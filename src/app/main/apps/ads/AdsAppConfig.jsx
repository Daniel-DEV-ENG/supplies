import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const AdsApp = lazy(() => import('./AdsApp'));
const Ads = lazy(() => import('./Ads/Ads'));

const AdsAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/',
			element: <AdsApp />,
			children: [
				{
					path: '',
					element: <Navigate to="ads" />
				},
				{
					path: 'ads',
					element: <Ads />
				}
			]
		}
	]
};
export default AdsAppConfig;
