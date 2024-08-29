import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const ProductsApp = lazy(() => import('./CategoriesApp'));
const Categories = lazy(() => import('./Categories/Categories'));

const CategoriesAppConfig = {
	settings: {
		layout: {}
	},
	routes: [
		{
			path: 'apps/',
			element: <ProductsApp />,
			children: [
				{
					path: '',
					element: <Navigate to="categories" />
				},
				{
					path: 'categories',
					element: <Categories />
				}
			]
		}
	]
};
export default CategoriesAppConfig;
