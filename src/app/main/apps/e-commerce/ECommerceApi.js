import { apiService as api } from 'app/store/apiService';
import ProductModel from './product/models/ProductModel';

export const addTagTypes = ['eCommerce_orders'];
const ECommerceApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getECommerceOrders: build.query({
				query: (status) => ({ url: `/orders/${status}` }),
				providesTags: ['eCommerce_orders']
			}),
			getECommerceOrder: build.query({
				query: (orderId) => ({ url: `/orders/${orderId}` }),
				providesTags: ['eCommerce_order']
			}),
			updateECommerceOrder: build.mutation({
				query: (order) => ({
					url: `/orders/${order.id}`,
					method: 'PUT',
					data: order
				}),
				invalidatesTags: ['eCommerce_orders']
			}),
			deleteECommerceOrder: build.mutation({
				query: (orderId) => ({
					url: `/orders${orderId}`,
					method: 'DELETE'
				}),
				invalidatesTags: [ 'eCommerce_orders']
			}),
			deleteECommerceOrders: build.mutation({
				query: (ordersId) => ({
					url: `/orders/${ordersId.id}`,
					method: 'POST',
					data: ordersId
				}),
				invalidatesTags: ['eCommerce_orders']
			})
		}),
		overrideExisting: false
	});
export default ECommerceApi;
export const {
	useGetECommerceOrdersQuery,
	useGetECommerceOrderQuery,
	useUpdateECommerceOrderMutation,
	useDeleteECommerceOrderMutation,
	useDeleteECommerceOrdersMutation,
} = ECommerceApi;
