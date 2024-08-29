import { apiService as api } from 'app/store/apiService';
import ProductModel from './product/models/ProductModel';

export const addTagTypes = ['cities'];
const ECommerceApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getECommerceProducts: build.query({
				query: () => ({ url: `/cities` }),
				providesTags: ['cities']
			}),
			deleteECommerceProducts: build.mutation({
				query: (productIds) => ({
					url: `/cities/${productIds}`,
					method: 'DELETE',
					data: productIds
				}),
				invalidatesTags: ['cities']
			}),
			getECommerceProduct: build.query({
				query: (productId) => ({
					url: `/cities/${productId}`
				}),
				providesTags: ['cities']
			}),
			createECommerceProduct: build.mutation({
				query: (newProduct) => ({
					url: `/cities`,
					method: 'POST',
					data: ProductModel(newProduct)
				}),
				invalidatesTags: ['cities']
			}),
			updateECommerceProduct: build.mutation({
				query: (product) => ({
					url: `/cities/${product.id}`,
					method: 'PUT',
					data: product
				}),
				invalidatesTags: ['cities']
			}),
			deleteECommerceProduct: build.mutation({
				query: (productId) => ({
					url: `/mock-api/ecommerce/products/${productId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['cities']
			})
		}),
		overrideExisting: false
	});
export default ECommerceApi;
export const {
	useGetECommerceProductsQuery,
	useDeleteECommerceProductsMutation,
	useGetECommerceProductQuery,
	useUpdateECommerceProductMutation,
	useDeleteECommerceProductMutation,
	useCreateECommerceProductMutation
} = ECommerceApi;
