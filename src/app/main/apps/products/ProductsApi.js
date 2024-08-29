import { apiService as api } from 'app/store/apiService';
import ProductModel from './product/models/ProductModel';

export const addTagTypes = ['products'];
const ECommerceApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getProducts: build.query({
				query: (pagination) => ({
					url: `/products?page=${pagination.page}&limit=${pagination.limit}`,
				}),
				providesTags: ['products']
			}),
			deleteProducts: build.mutation({
				query: (productIds) => ({
					url: `/products`,
					method: 'DELETE',
					data: productIds
				}),
				invalidatesTags: ['products']
			}),
			getProduct: build.query({
				query: (productId) => ({
					url: `/products/${productId}`
				}),
				providesTags: ['product', 'products']
			}),
			createProduct: build.mutation({
				query: (newProduct) => ({
					url: `/products`,
					method: 'POST',
					data: ProductModel(newProduct)
				}),
				invalidatesTags: ['products', 'product']
			}),
			updateProduct: build.mutation({
				query: (product) => ({
					url: `/products/${product.id}`,
					method: 'POST',
					data: product.formData
				}),
				invalidatesTags: ['product', 'products']
			}),
			deleteProduct: build.mutation({
				query: (productId) => ({
					url: `/products/${productId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['product', 'products']
			}),
			deleteImage: build.mutation({
				query: (productId) => ({
					url: `/products/image/${productId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['product', 'products']
			}),
		}),
		overrideExisting: false
	});
export default ECommerceApi;
export const {
useCreateProductMutation,
useDeleteProductMutation,
useDeleteProductsMutation,
useGetProductQuery,
useGetProductsQuery,
useUpdateProductMutation,
useDeleteImageMutation
} = ECommerceApi;
