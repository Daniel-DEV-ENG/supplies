import { lazy } from 'react';

const ProfileApp = lazy(() => import('./TripApp'));
/**
 * The Profile app config.
 */
const TripAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'apps/trip/:id',
			element: <ProfileApp />
		}
	]
};
export default TripAppConfig;
