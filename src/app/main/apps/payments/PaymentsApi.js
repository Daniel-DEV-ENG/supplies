import { apiService as api } from 'app/store/apiService';

export const addTagTypes = ['payments'];
const ECommerceApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getPayments: build.query({
				query: () => ({ url: `/payments` }),
				providesTags: ['payments']
			}),
	
		
		}),
		overrideExisting: false
	});
export default ECommerceApi;
export const {
	useGetPaymentsQuery,


} = ECommerceApi;
