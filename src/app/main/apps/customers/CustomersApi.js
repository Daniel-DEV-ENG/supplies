import { apiService as api } from 'app/store/apiService';
import ProductModel from './Customer/models/ProductModel';

export const addTagTypes = ['customers'];
const ECommerceApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getCustomers: build.query({
				query: () => ({ url: `/customers` }),
				providesTags: ['customers']
			}),
			deleteCustomers: build.mutation({
				query: (productIds) => ({
					url: `/customers/${productIds}`,
					method: 'DELETE',
					
				}),
				invalidatesTags: ['customers']
			}),
			verifiedCustomer: build.mutation({
				query: (newProduct) => ({
					url: `/customers/${newProduct.id}`,
					method: 'PUT',
					data: {is_verified:newProduct.is_verified}
				}),
				invalidatesTags: ['customers']
			}),
			createECommerceProduct: build.mutation({
				query: (newProduct) => ({
					url: `/customers`,
					method: 'POST',
					data: ProductModel(newProduct)
				}),
				invalidatesTags: ['customers']
			}),
			updateECommerceProduct: build.mutation({
				query: (product) => ({
					url: `/customers/${product.id}`,
					method: 'PUT',
					data: product
				}),
				invalidatesTags: ['customers']
			}),
			deleteECommerceProduct: build.mutation({
				query: (productId) => ({
					url: `/customers/${productId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['customers']
			}),
		
		}),
		overrideExisting: false
	});
export default ECommerceApi;
export const {
	useGetCustomersQuery,
	useDeleteCustomersMutation,
	useVerifiedCustomerMutation,
	useCreateECommerceProductMutation,
	useDeleteECommerceProductMutation,
	useUpdateECommerceProductMutation,

} = ECommerceApi;
