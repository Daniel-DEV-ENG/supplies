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
			createAddress: build.mutation({
				query: (newProduct) => ({
					url: `/cities/${newProduct.id}/addresses`,
					method: 'POST',
					data: newProduct.data
				}),
				invalidatesTags: ['cities']
			}),
			updateAddress: build.mutation({
				query: (product) => ({
					url: `/cities/addresses/${product.id}`,
					method: 'PUT',
					data: product
				}),
				invalidatesTags: ['cities']
			}),
			deleteAddress: build.mutation({
				query: (productId) => ({
					url: `/cities/addresses/${productId}`,
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
	useUpdateAddressMutation,
	useDeleteAddressMutation,
	useCreateAddressMutation
} = ECommerceApi;
