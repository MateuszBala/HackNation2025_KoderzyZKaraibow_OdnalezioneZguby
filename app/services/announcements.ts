// Need to use the React-specific entry point to import createApi
import { FoundAnnouncement, AnnouncementFilter, ApiFilters } from '@/types/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const announcementsApi = createApi({
    reducerPath: 'announcementsApi',
    tagTypes: ['announcements'],
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
    endpoints: (builder) => ({
        getAll: builder.query({
            query: ({count, currentPage, filters}: {count: number, currentPage: number, filters: ApiFilters}) => ({
                url: `/${filters.district}/${count}`,
                method: 'GET',
                params: {currentPage, ...filters, foundDate: filters.foundDate.toLocaleString()}
            }),
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
            transformResponse: (response: { data: FoundAnnouncement}, meta, arg) => response.data,
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