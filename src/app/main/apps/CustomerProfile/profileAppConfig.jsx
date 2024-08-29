import { lazy } from 'react';

const ProfileApp = lazy(() => import('./ProfileApp'));
/**
 * The Profile app config.
 */
const CustomerprofileAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: 'apps/profile-customer/:id',
			element: <ProfileApp />
		}
	]
};
export default CustomerprofileAppConfig;
