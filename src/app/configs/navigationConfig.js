import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import { authRoles } from '../auth';
// import { authRoles } from '../auth';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('ar', 'navigation', ar);
/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig = [
	{
		id: 'apps',
		title: 'Applications',
		type: 'group',
		icon: 'heroicons-outline:cube',
		translate: 'الادارة',
		children: [
			{
				id: 'apps.cities',
				title: 'المدن',
				type: 'item',
				icon: 'heroicons-outline:map',
				url: '/apps/cities',
				auth: authRoles.admin,
			},
			{
				id: 'apps.company',
				title: 'الشركات',
				type: 'item',
				icon: 'heroicons-outline:office-building',
				url: '/apps/companies',
				auth: authRoles.admin,
			},
			{
				id: 'apps.users',
				title: 'مندوب المبيعات',
				type: 'item',
				icon: 'heroicons-outline:user',
				url: '/apps/salesmen',
				auth: authRoles.manager
			},
			{
				id: 'apps.customers',
				title: 'الزبائن',
				type: 'item',
				icon: 'heroicons-outline:user',
				url: '/apps/customers',
				auth: authRoles.admin
			},
			{
				id: 'apps.customersManager',
				title: 'الزبائن',
				type: 'item',
				icon: 'heroicons-outline:user',
				url: '/apps/customers/manager',
				auth: authRoles.manager
			},
			{
				id: 'apps.categories',
				title: 'التصنيفات',
				type: 'item',
				icon: 'heroicons-outline:view-list',
				url: '/apps/categories',
				auth: authRoles.admin
			},
			{
				id: 'apps.products',
				title: 'المنتجات',
				type: 'item',
				icon: 'heroicons-outline:collection',
				url: '/apps/products',
				auth: authRoles.manager
			},
			{
				id: 'apps.orders',
				title: 'الطلبات',
				type: 'item',
				icon: 'heroicons-outline:shopping-cart',
				url: 'apps/orders',
				auth: authRoles.manager
			},
			{
				id: 'apps.orders',
				title: 'الطلبات المورشفة',
				type: 'item',
				icon: 'heroicons-outline:shopping-cart',
				url: 'apps/orders',
				auth: authRoles.manager
			},
			{
				id: 'apps.trips',
				title: 'الرحلات',
				type: 'item',
				icon: 'heroicons-outline:shopping-cart',
				url: 'apps/trips',
				auth: authRoles.manager
			},
			{
				id: 'apps.ads',
				title: 'الاعلانات',
				type: 'item',
				icon: 'heroicons-outline:paper-clip',
				url: 'apps/ads',
				auth: authRoles.admin
			}
			,
			{
				id: 'apps.payment',
				title: 'الفواتير',
				type: 'item',
				icon: 'heroicons-outline:currency-dollar',
				url: 'apps/payments',
				auth: authRoles.manager
			}

		]
	}
	// {
	// 	type: 'divider',
	// 	id: 'divider-2'
	// }
];
export default navigationConfig;
