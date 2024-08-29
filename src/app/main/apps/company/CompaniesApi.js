import { apiService as api } from 'app/store/apiService';
import ProductModel from './Company/models/ProductModel';

export const addTagTypes = ['company'];
const ECommerceApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getCompany: build.query({
				query: () => ({ url: `/companies` }),
				providesTags: ['company']
			}),
			deleteCompany: build.mutation({
				query: (productIds) => ({
					url: `/companies`,
					method: 'DELETE',
					data: productIds
				}),
				invalidatesTags: ['company']
			}),
			getCompanyById: build.query({
				query: (productId) => ({
					url: `/companies/${productId}`
				}),
				providesTags: ['company']
			}),
			createCompany: build.mutation({
				query: (newProduct) => ({
					url: `/companies`,
					method: 'POST',
					headers: {
						'Content-Type': 'multipart/form-data',
					  },
					data: ProductModel(newProduct)
				}),
				invalidatesTags: ['company']
			}),
			updateCompany: build.mutation({
				query: (product) => ({
					url: `/companies/${product.id}`,
					method: 'POST',
					data: product.formData
				}),
				invalidatesTags: ['company']
			}),
			deleteCompany: build.mutation({
				query: (productId) => ({
					url: `/companies/${productId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['company']
			}),
		}),
		overrideExisting: false
	});
export default ECommerceApi;
export const {
	useGetCompanyQuery,
	useDeleteCompanyMutation,
	useGetCompanyByIdQuery,
	useUpdateCompanyMutation,
	useCreateCompanyMutation
} = ECommerceApi;
