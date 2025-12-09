import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: (builder) => ({
    currentUser: builder.query<
      { id: string; email: string; role: "STARTUP" | "INVESTOR"; name?: string },
      void
    >({
      query: () => "/api/auth/current",
    }),

    login: builder.mutation<
      {
        access: string;
        accessTtl: number;
        user: { id: string; email: string; role: "STARTUP" | "INVESTOR" };
      },
      { email: string; password: string }
    >({
      query: (body) => ({
        url: "/api/auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCurrentUserQuery,
  useLoginMutation,
} = api;
