import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { GitHubListItem, ListRequestParams } from '../definitions/GitHubList'

const DEFAULT_PARAMS: ListRequestParams = {
    per_page: 25,
    page: 1,
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.github.com',
    }),
    endpoints: (builder) => ({
        getGitHubList: builder.query<GitHubListItem[], ListRequestParams>({
            query() {
                return {
                    url: '/events',
                    params: DEFAULT_PARAMS,
                }
            },
        }),
    }),
})

export const { useLazyGetGitHubListQuery } = api
