import { apiService as api } from 'app/store/apiService';

export const addTagTypes = ['profile'];
const ProfileApi = api
	.enhanceEndpoints({
		addTagTypes
	})
	.injectEndpoints({
		endpoints: (build) => ({
			getProfileData: build.query({
				query: (id) => ({ url: `/customers/${id}` }),
				providesTags: ['profile']
			}),
			getProfileLocation: build.query({
				query: (id) => ({ url: `/payments?customer_id=${id}` }),
				providesTags: ['profile_timeline']
			}),
			getProfileAbout: build.query({
				query: () => ({ url: `/mock-api/profile/about` }),
				providesTags: ['profile_about']
			}),
			getArchivedOrder: build.query({
				query: (id) => ({ url: `/orders/archived?customer_id=${id}` }),
				providesTags: ['profile_about']
			})
		}),
		overrideExisting: false
	});
export default ProfileApi;
export const { useGetProfileDataQuery, useGetProfileLocationQuery,useGetArchivedOrderQuery, useGetProfileAboutQuery } = ProfileApi;
