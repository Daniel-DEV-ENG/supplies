import { apiService as api } from 'app/store/apiService';
import ProductModel from './Ad/models/ProductModel';

export const addTagTypes = ['ads'];
const ECommerceApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getAds: build.query({
				query: () => ({ url: `/ads` }),
				providesTags: ['ads']
			}),
			deleteAds: build.mutation({
				query: (productIds) => ({
					url: `/ads/${productIds}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['ads']
			}),
			getECommerceProduct: build.query({
				query: (productId) => ({
					url: `/ads/${productId}`
				}),
				providesTags: ['ads']
			}),
			createCategory: build.mutation({
				query: (newProduct) => ({
					url: `/ads`,
					method: 'POST',
					data: ProductModel(newProduct)
				}),
				invalidatesTags: ['ads']
			}),
			updateCategory: build.mutation({
				query: (product) => ({
					url: `/ads/${product.id}`,
					method: 'POST',
					data: product.formData
				}),
				invalidatesTags: ['ads']
			}),
			deleteECommerceProduct: build.mutation({
				query: (productId) => ({
					url: `/ads/${productId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['ads']
			})
		}),
		overrideExisting: false
	});
export default ECommerceApi;
export const {
	useGetAdsQuery,
	useDeleteAdsMutation,
	useGetECommerceProductQuery,
	useUpdateCategoryMutation,
	useDeleteECommerceProductMutation,
	useCreateCategoryMutation
} = ECommerceApi;
