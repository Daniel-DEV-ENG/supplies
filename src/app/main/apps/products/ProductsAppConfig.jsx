import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const ProductsApp = lazy(() => import('./ProductsApp'));
const Product = lazy(() => import('./Product/Product'));
const Products = lazy(() => import('./Products/Products'));

const ProductsAppConfig = {
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
					element: <Navigate to="products" />
				},
				{
					path: 'products',
					element: <Products />
				},
				{
					path: 'products/:Id/*',
					element: <Product />
				}
			]
		}
	]
};
export default ProductsAppConfig;
