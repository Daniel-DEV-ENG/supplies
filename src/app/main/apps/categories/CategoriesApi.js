import { apiService as api } from 'app/store/apiService';
import ProductModel from './product/models/ProductModel';

export const addTagTypes = ['categories'];
const ECommerceApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getCategories: build.query({
				query: () => ({ url: `/categories` }),
				providesTags: ['categories']
			}),
			deleteCategories: build.mutation({
				query: (productIds) => ({
					url: `/categories/${productIds}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['categories']
			}),
			getECommerceProduct: build.query({
				query: (productId) => ({
					url: `/categories/${productId}`
				}),
				providesTags: ['categories']
			}),
			createCategory: build.mutation({
				query: (newProduct) => ({
					url: `/categories`,
					method: 'POST',
					data: ProductModel(newProduct)
				}),
				invalidatesTags: ['categories']
			}),
			updateCategory: build.mutation({
				query: (product) => ({
					url: `/categories/${product.id}`,
					method: 'POST',
					data: product.formData
				}),
				invalidatesTags: ['categories']
			}),
			deleteECommerceProduct: build.mutation({
				query: (productId) => ({
					url: `/categories/${productId}`,
					method: 'DELETE'
				}),
				invalidatesTags: ['categories']
			})
		}),
		overrideExisting: false
	});
export default ECommerceApi;
export const {
	useGetCategoriesQuery,
	useDeleteCategoriesMutation,
	useGetECommerceProductQuery,
	useUpdateCategoryMutation,
	useDeleteECommerceProductMutation,
	useCreateCategoryMutation
} = ECommerceApi;
