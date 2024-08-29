import { apiService as api } from 'app/store/apiService';
import ProductModel from './User/models/ProductModel';

export const addTagTypes = ['trips'];
const ECommerceApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getTrips: build.query({
				query: () => ({ url: `/trips` }),
				providesTags: ['trips']
			}),
			deleteTrips: build.mutation({
				query: (productIds) => ({
					url: `/trips/${productIds}`,
					method: 'DELETE',
				}),
				invalidatesTags: ['trips']
			}),
			getTrip: build.query({
				query: (productId) => ({
					url: `/trips/${productId}`
				}),
				providesTags: ['trips']
			}),
			createTrips: build.mutation({
				query: (newProduct) => ({
					url: `/trips`,
					method: 'POST',
					data: ProductModel(newProduct)
				}),
				invalidatesTags: ['trips']
			}),
			updateTrips: build.mutation({
				query: (product) => ({
					url: `/trips/${product.id}`,
					method: 'PUT',
					data: product
				}),
				invalidatesTags: [ 'trips']
			}),
		
		}),
		overrideExisting: false
	});
export default ECommerceApi;
export const {
	useCreateTripsMutation,
	useUpdateTripsMutation,
	useDeleteTripsMutation,
	useGetTripsQuery,
	useGetTripQuery
	
} = ECommerceApi;
