import { lazy } from 'react';

const ProfileApp = lazy(() => import('./ProfileApp'));
/**
 * The Profile app config.
 */
const profileAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'apps/profile/:id',
			element: <ProfileApp />
		}
	]
};
export default profileAppConfig;
