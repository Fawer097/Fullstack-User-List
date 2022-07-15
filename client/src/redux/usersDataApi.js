import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersDataApi = createApi({
  reducerPath: 'usersDataApi',
  tagTypes: ['userData'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (build) => ({
    getUsersData: build.query({
      query: () => 'api/userData',
      providesTags: (result) =>
        result ? [...result.map(() => 'userData'), 'userData'] : ['userData'],
    }),
    addUserData: build.mutation({
      query: (body) => ({
        url: 'api/userData',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['userData'],
    }),
    deleteUserData: build.mutation({
      query: (type) => ({
        url: 'api/userData',
        method: 'DELETE',
        body: {
          type,
        },
      }),
      invalidatesTags: ['userData'],
    }),
  }),
});

export const {
  useGetUsersDataQuery,
  useAddUserDataMutation,
  useDeleteUserDataMutation,
} = usersDataApi;
