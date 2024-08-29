import { apiService as api } from 'app/store/apiService';
import ProductModel from './User/models/ProductModel';

export const addTagTypes = ['salesmen'];
const ECommerceApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getSalesMen: build.query({
				query: () => ({ url: `/salesmen` }),
				providesTags: ['salesmen']
			}),
			deleteSalesMan: build.mutation({
				query: (productIds) => ({
					url: `/salesmen/${productIds}`,
					method: 'DELETE',
				}),
				invalidatesTags: ['salesmen']
			}),
			getSalesMan: build.query({
				query: (productId) => ({
					url: `/salesmen/${productId}`
				}),
				providesTags: ['salesmen']
			}),
			createSalesMan: build.mutation({
				query: (newProduct) => ({
					url: `/salesmen`,
					method: 'POST',
					data: ProductModel(newProduct)
				}),
				invalidatesTags: ['salesmen', 'eCommerce_product']
			}),
			updateSalesMan: build.mutation({
				query: (product) => ({
					url: `/salesmen/${product.id}`,
					method: 'PUT',
					data: product
				}),
				invalidatesTags: ['eCommerce_product', 'salesmen']
			}),
		
		}),
		overrideExisting: false
	});
export default ECommerceApi;
export const {
	useCreateSalesManMutation,
	useDeleteSalesManMutation,
	useGetSalesManQuery,
	useGetSalesMenQuery,
	useUpdateSalesManMutation
} = ECommerceApi;
