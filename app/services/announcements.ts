// Need to use the React-specific entry point to import createApi
import { IAnnouncement, IAnnouncementFilter, IApiFilters } from '@/types/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const announcementsApi = createApi({
    reducerPath: 'announcementsApi',
    tagTypes: ['announcements'],
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.NEXT_PUBLIC_API_URL}announcements` }),
    endpoints: (builder) => ({
        getAll: builder.query({
            query: ({count, currentPage, filters}: {count: number, currentPage: number, filters: IApiFilters}) => ({
                url: `/`,
                method: 'GET',
                params: {count: count, currentPage, ...filters, foundDate: filters.foundDate.toLocaleString()}
            }),
            providesTags: ['announcements'],
        }),
        getById: builder.query({
            query: (id: number) => ({
                url: `/${id}`,
                method: 'GET'
            }),
        }),
        add: builder.mutation({
            query: ({ ...patch }) => ({
                url: ``,
                method: 'POST',
                body: patch,
            }),
            transformResponse: (response: { data: IAnnouncement}, meta, arg) => response.data,
            transformErrorResponse: (
                response: { status: string | number },
                meta,
                arg,
            ) => response.status,
            invalidatesTags: ['announcements'],
        }),
        edit: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `${id}`,
                method: 'PUT',
                body: patch,
            }),
        })
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllQuery, useGetByIdQuery } = announcementsApi